import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import VitesseLight from 'theme-vitesse/themes/vitesse-light.json';

import reactTypes from '../libs/react.d.ts?raw';

export function initMonacoEnv() {
    loader.config({ monaco });
    loader
        .init()
        .then(monaco => {
            // do conditional chaining
            // @ts-ignore
            monaco.editor.defineTheme('vitesse-light', VitesseLight);

            monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

            // validation settings
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                noSemanticValidation: false,
                noSyntaxValidation: false
            });

            // compiler options
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                strict: true,
                noUnusedLocals: false,
                noUnusedParameters: false,
                allowUnreachableCode: true,
                allowUnusedLabels: true,
                target: monaco.languages.typescript.ScriptTarget.ESNext,
                allowNonTsExtensions: true,
                moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                module: monaco.languages.typescript.ModuleKind.CommonJS,
                noEmit: true,
                jsx: monaco.languages.typescript.JsxEmit.Preserve,
                esModuleInterop: true,
                typeRoots: ['node_modules/@types']
            });

            // extra libs
            monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'react' {${reactTypes}}`, 'ts:react');

            // or make sure that it exists by other ways
            // eslint-disable-next-line no-console
            console.log('here is the monaco instance:', monaco);
        })
        .catch(() => {});
}
