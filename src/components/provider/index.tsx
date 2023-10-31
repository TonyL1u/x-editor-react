import type { PropsWithChildren } from 'react';
import { memo, useRef, useState } from 'react';

import { useExtraLib, useOnMounted, useSandbox, useThrottleFn } from '../../hooks';
import { initMonacoEnv } from '../../logic/initMonacoEnv';
import { parseSource } from '../../logic/parseSource';
import type { MonacoStandaloneCodeEditor, RuntimeError, RuntimeLog, SandboxError } from '../../shared/types';
import { Context } from './context';
import srcdoc from './srcdoc.html?raw';

initMonacoEnv();

export interface LibImport {
    name: string;
    proxyPath: string;
    types?: string;
}

export interface XEditorProviderProps {
    imports?: LibImport[];
    initialCode?: string;
}

function EditorProvider(props: PropsWithChildren<XEditorProviderProps>) {
    const { initialCode = '', imports = [], children } = props;
    const [code, setCode] = useState(initialCode);
    const [runtimeError, setRuntimeError] = useState<RuntimeError>({ message: '', error: null });
    const [runtimeLogs, setRuntimeLogs] = useState<RuntimeLog[]>([]);
    const [compliedCode, setCompliedCode] = useState('');
    const editorInstance = useRef<MonacoStandaloneCodeEditor>(null);
    const { create, proxy, ...rest } = useSandbox({
        imports: imports.reduce((acc, { name, proxyPath }) => ({ ...acc, [name]: proxyPath }), {}),
        srcdoc,
        onConsole(log) {
            if (log.level === 'error') {
                if (log.args[0] instanceof Error) {
                    setRuntimeError({
                        message: log.args[0].message,
                        error: log.args[0]
                    });
                } else {
                    let msg = String(log.args[0]);
                    if (msg.includes('%s')) {
                        let index = 0;
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        msg = (log.args[0] as string).replace(/%s/g, () => `${log.args[++index]}`);
                    }
                    setRuntimeError({ message: msg, error: log.args[0] as SandboxError });
                }
            } else if (log.level === 'log') {
                const message = typeof log.args[0] === 'object' ? JSON.stringify(log.args[0]) : String(log.args[0]);
                setRuntimeLogs(logs => [...logs, { timestamp: +new Date(), message }]);
            }
        },
        onError(event) {
            const msg = event.value instanceof Error ? event.value.message : event.value;
            if (!msg) return;
            setRuntimeError({ message: event.value as string, error: null });
        },
        onHandleRejection(event) {
            setRuntimeError({
                message: `Uncaught (in promise): ${event.value}`,
                error: null
            });
        }
    });

    const runCode = useThrottleFn(async (source: string) => {
        try {
            setCode(source);
            setRuntimeError({ message: '', error: null });
            const result = parseSource(source);
            setCompliedCode(result);
            await proxy.current?.eval([result]);
        } catch (error: unknown) {
            setRuntimeError({
                message: `SyntaxError: ${(error as SandboxError).message}`,
                error: error as SandboxError
            });
        }
    }, 1000);

    const clearLogs = () => {
        setRuntimeLogs(() => []);
    };

    const format = async () => {
        await editorInstance.current?.getAction('editor.action.formatDocument')?.run();
    };

    const reset = () => {
        clearLogs();
        create();
        editorInstance.current?.revealPositionInCenter({ lineNumber: 1, column: 1 });
    };

    useExtraLib(imports.filter(({ types }) => !!types).map(({ name, types }) => ({ name, types: types! })));

    useOnMounted(create);

    return (
        <Context.Provider
            value={{
                code,
                compliedCode,
                runtimeError,
                runtimeLogs,

                runCode,
                clearLogs,
                format,
                reset,

                create,
                proxy,
                ...rest,

                editorInstance
            }}>
            {children}
        </Context.Provider>
    );
}

export default memo(EditorProvider) as typeof EditorProvider;
