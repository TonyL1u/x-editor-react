import { useMonaco } from './useMonaco';

interface LibData {
    name: string;
    types: string;
}

export function useExtraLib(libs: LibData[]) {
    const monaco = useMonaco();

    for (const { name, types } of libs) {
        monaco?.languages.typescript.typescriptDefaults.addExtraLib(`declare module '${name}' {${types}}`, `ts:${name}`);
    }
}
