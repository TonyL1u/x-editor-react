import { useEffect } from 'react';

export function useOnMounted(fn: () => void) {
    useEffect(() => {
        fn?.();
    }, []);
}
