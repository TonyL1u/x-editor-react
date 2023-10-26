import * as monaco from 'monaco-editor';
import { CSSProperties } from 'react';

export type Fn = (...args: any[]) => unknown;

export type MonacoStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

export interface RuntimeLog {
    timestamp: number;
    message: string;
}

export interface RuntimeError {
    message: string;
    error: SandboxError | null;
}

export interface SandboxError extends Error {
    loc?: {
        column: number;
        index: number;
        line: number;
    };
}

export interface ComponentBaseProps {
    style?: CSSProperties;
    className?: string;
}
