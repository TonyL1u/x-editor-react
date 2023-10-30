import { useMonaco } from './useMonaco';
import { useOnMounted } from './useOnMounted';

interface LibData {
    name: string;
    types: string;
}

export function useExtraLib(libs: LibData[]) {
    const monaco = useMonaco();

    useOnMounted(() => {
        for (const { name, types } of libs) {
            monaco?.languages.typescript.typescriptDefaults.addExtraLib(`declare module '${name}' {${types}}`, `ts:${name}`);
        }
    });
}
