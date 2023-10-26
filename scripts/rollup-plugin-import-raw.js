import fs from 'fs';

function isRelativePath(path) {
    return path.startsWith('./') || path.startsWith('../');
}

export default function importRaw() {
    return {
        name: 'import-raw',
        resolveId(source) {
            if (!isRelativePath(source) && source.endsWith('?raw')) {
                return {
                    id: source.split('?raw')[0],
                    meta: { isRaw: true }
                };
            }

            return null;
        },
        transform(_, id) {
            const { meta } = this.getModuleInfo(id);
            if (meta.isRaw) {
                const rawContent = fs.readFileSync(id, 'utf-8');
                return {
                    code: `export default ${JSON.stringify(rawContent)};`,
                    map: { mappings: '' }
                };
            }
        }
    };
}
