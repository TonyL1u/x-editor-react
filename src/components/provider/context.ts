import { pick } from 'lodash-es';
import { createContext, type RefObject, useContext } from 'react';

import type { UseSandboxReturn } from '../../hooks';
import type { MonacoStandaloneCodeEditor, RuntimeError, RuntimeLog } from '../../shared/types';

type XEditor = RefObject<MonacoStandaloneCodeEditor>;

interface XEditorState {
    readonly code: string;
    readonly compliedCode: string;
    readonly runtimeError: RuntimeError;
    readonly runtimeLogs: RuntimeLog[];
}

interface XEditorHelper {
    runCode: (source: string) => Promise<void> | undefined;
    clearLogs: () => void;
    format: () => void;
    reset: () => void;
}

type XEditorContext = XEditorState & XEditorHelper & UseSandboxReturn & { editorInstance: XEditor };

export const Context = createContext({} as XEditorContext);

export function useInternalContext() {
    const context = useContext(Context);

    return context;
}

export function useXEditor() {
    const { editorInstance } = useInternalContext();

    return editorInstance;
}

export function useXEditorState() {
    const context = useInternalContext();

    return pick(context, 'code', 'compliedCode', 'runtimeError', 'runtimeLogs') as XEditorState;
}

export function useXEditorHelper() {
    const context = useInternalContext();

    return pick(context, 'runCode', 'format', 'clearLogs', 'reset') as XEditorHelper;
}
