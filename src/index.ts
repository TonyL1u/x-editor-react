import XEditor from './XEditor';

export type { ConsoleProps } from './components/console';
export { default as Console } from './components/console';
export type { EditorProps } from './components/editor';
export { default as Editor } from './components/editor';
export type { PreviewProps } from './components/preview';
export { default as Preview } from './components/preview';
export type { LibImport, XEditorProviderProps } from './components/provider';
export { default as XEditorProvider } from './components/provider';
export { useXEditor, useXEditorHelper, useXEditorState } from './components/provider/context';
export type { ToolboxProps, ToolConfig } from './components/toolbox';
export { default as Toolbox } from './components/toolbox';
export { useExtraLib, useMonaco } from './hooks';
export type { XEditorProps } from './XEditor';

export default XEditor;
