import { build, buildTypes } from 'fast-bundle';
import importRaw from './rollup-plugin-import-raw.js';

const plugins = [importRaw()];

build({ preserveModules: true, dir: 'dist/lib', format: 'cjs' }, {}, { plugins });
build({ preserveModules: true, dir: 'dist/es', format: 'es' }, {}, { plugins });
buildTypes();
