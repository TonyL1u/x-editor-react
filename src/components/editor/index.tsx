import { type EditorProps } from '@monaco-editor/react';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { memo, useCallback, useEffect, useRef } from 'react';

import { type MonacoStandaloneCodeEditor } from '../../shared/types';
import { useInternalContext } from '../provider/context';
import { EditorContainer } from './widgets';

const BASE_MONACO_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    lineHeight: 24,
    padding: {
        top: 16,
        bottom: 16
    },
    automaticLayout: true,
    folding: false,
    minimap: {
        enabled: false
    },
    lineNumbers: 'off',
    scrollbar: {
        useShadows: false,
        verticalScrollbarSize: 0,
        horizontalScrollbarSize: 0
    },
    lineDecorationsWidth: 16,
    guides: {
        indentation: false
    },
    cursorStyle: 'line-thin',
    overviewRulerBorder: false,
    contextmenu: false,
    renderLineHighlightOnlyWhenFocus: true
};

function Editor(props: EditorProps) {
    const { value = '', options = {}, defaultLanguage = 'typescript', path = 'file:///index.tsx', theme = 'vitesse-light', onMount, onChange, ...rest } = props;
    const { code, runCode, runtimeError, editorInstance } = useInternalContext();
    const errorDecorator = useRef<string[]>();
    const setErrorLine = useCallback(
        (line: number) => {
            if (errorDecorator.current) {
                editorInstance?.current?.removeDecorations(errorDecorator.current);
                errorDecorator.current = void 0;
            }

            if (line > -1) {
                errorDecorator.current = editorInstance?.current?.deltaDecorations(
                    [],
                    [
                        {
                            range: new monaco.Range(line, 1, line, 1),
                            options: {
                                isWholeLine: true,
                                className: 'error-line',
                                linesDecorationsClassName: 'error-line-decorations'
                            }
                        }
                    ]
                );
            }
        },
        [editorInstance]
    );

    const handleEditorDidMount = (editor: MonacoStandaloneCodeEditor, monaco: Monaco) => {
        onMount?.(editor, monaco);
        // @ts-ignore
        editorInstance.current = editor;
    };

    const handleEditorContentChange = (value: string = '', evt: monaco.editor.IModelContentChangedEvent) => {
        onChange?.(value, evt);
        runCode(value)?.catch(() => {});
    };

    useEffect(() => {
        setErrorLine(runtimeError?.error?.loc?.line ?? -1);
    }, [runtimeError, setErrorLine]);

    return (
        <EditorContainer>
            <MonacoEditor value={value || code} options={{ ...BASE_MONACO_OPTIONS, ...options }} defaultLanguage={defaultLanguage} path={path} theme={theme} {...rest} onMount={handleEditorDidMount} onChange={handleEditorContentChange} />
        </EditorContainer>
    );
}

export default memo(Editor) as typeof Editor;
