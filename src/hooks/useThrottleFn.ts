import type { DebouncedFunc } from 'lodash-es';
import { throttle } from 'lodash-es';
import { useCallback } from 'react';

import { useLatest } from './useLatest';
import { useOnUnmounted } from './useOnUnmounted';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionArgs<P = any, R = unknown> = (...args: P[]) => R;

export function useThrottleFn<T extends FunctionArgs>(fn: T, wait = 200, trailing = true, leading = true): DebouncedFunc<(...args: Parameters<T>) => ReturnType<T>> {
    const fnRef = useLatest(fn);

    const throttled = useCallback(
        throttle(
            (...args: Parameters<T>) => {
                return fnRef.current(...args) as ReturnType<T>;
            },
            wait,
            { trailing, leading }
        ),
        []
    );

    useOnUnmounted(() => throttled.cancel());

    return throttled;
}
