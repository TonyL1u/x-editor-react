import * as monaco from 'monaco-editor';
import { CSSProperties } from 'react';

export type Fn = (...args: any[]) => unknown;

export type SpecFn<P, R> = (...args: P[]) => R;

export interface Stoppable<StartFnArgs extends unknown[] = unknown[]> {
    /**
     * A ref indicate whether a stoppable instance is executing
     */
    isPending: Readonly<boolean>;
    /**
     * Stop the effect from executing
     */
    stop: Fn;
    /**
     * Start the effects
     */
    start: (...args: StartFnArgs) => void;
}

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
