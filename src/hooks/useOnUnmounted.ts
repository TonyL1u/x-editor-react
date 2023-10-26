import { useEffect, useRef } from 'react';

export function useOnUnmounted(fn: () => void) {
    const ref = useRef(fn);
    ref.current = fn;

    useEffect(
        () => () => {
            fn?.();
        },
        []
    );
}
