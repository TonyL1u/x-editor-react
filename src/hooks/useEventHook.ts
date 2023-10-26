import { useRef } from 'react';

export type EventHookOn<T = unknown> = (fn: (param?: T) => void) => { off: () => void };
export type EventHookOff<T = unknown> = (fn: (param?: T) => void) => void;
export type EventHookTrigger<T = unknown> = (param?: T) => void;

export interface EventHook<T = unknown> {
    on: EventHookOn<T>;
    off: EventHookOff<T>;
    trigger: EventHookTrigger<T>;
}

export function useEventHook<T = unknown>(): EventHook<T> {
    const fns = useRef<((param?: T) => void)[]>([]);

    const off = (fn: (param?: T) => void) => {
        const index = fns.current.indexOf(fn);
        if (index !== -1) fns.current.splice(index, 1);
    };

    const on = (fn: (param?: T) => void) => {
        fns.current.push(fn);

        return {
            off: () => off(fn)
        };
    };

    const trigger = (param?: T) => {
        fns.current.forEach(fn => fn(param));
    };

    return { on, off, trigger };
}
