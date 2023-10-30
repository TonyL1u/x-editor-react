import type { EditorProps as MonacoEditorProps, Monaco } from '@monaco-editor/react';
import MonacoEditor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { memo, useCallback, useEffect, useRef } from 'react';

import { useLatest } from '../../hooks';
import type { ComponentBaseProps, MonacoStandaloneCodeEditor } from '../../shared/types';
import { ensureCssUnit } from '../../shared/utils';
import { useInternalContext } from '../provider/context';
import { EditorContainer } from './widgets';

const MONACO_BASE_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
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

export interface EditorProps extends MonacoEditorProps, ComponentBaseProps {
    borderless?: boolean;
}

function Editor(props: EditorProps) {
    const { value = '', options = {}, defaultLanguage = 'typescript', path = 'file:///index.tsx', theme = 'vitesse-light', onMount, onChange, borderless = false, className, style, width, height, ...rest } = props;
    const valueRef = useLatest(value);
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
        <EditorContainer className={className} style={style} $borderless={borderless} $width={ensureCssUnit(width || '', 'px')} $height={ensureCssUnit(height || '', 'px')}>
            <MonacoEditor
                value={valueRef.current || code}
                options={{ ...MONACO_BASE_OPTIONS, ...options }}
                defaultLanguage={defaultLanguage}
                path={path}
                theme={theme}
                width="100%"
                height="100%"
                {...rest}
                onMount={handleEditorDidMount}
                onChange={handleEditorContentChange}
            />
        </EditorContainer>
    );
}

export default memo(Editor) as typeof Editor;
