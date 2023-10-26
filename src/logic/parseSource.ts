import { parse } from '@babel/parser';
import MagicString from 'magic-string';

export function parseSource(source: string) {
    const s = new MagicString(source);
    const ast = parse(source, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
    }).program.body;
    const exportDefaultDeclaration = ast.find(node => node.type === 'ExportDefaultDeclaration');
    if (!exportDefaultDeclaration) {
        throw new Error('The React script should has an export default declaration');
    }

    let name = '';
    // fix react import declaration
    for (const node of ast) {
        if (node.type === 'ImportDeclaration' && node.source.value === 'react') {
            const { start, end } = node;
            s.update(start!, end!, '');
            for (const spec of node.specifiers) {
                if (spec.type === 'ImportSpecifier') {
                    s.prepend(`const { ${spec.local.name} } = React;\n`);
                }
            }
        } else if (node.type === 'ExportDefaultDeclaration') {
            const declaration = node.declaration;
            switch (declaration.type) {
                case 'Identifier':
                    name = declaration.name;

                    break;
                case 'ArrowFunctionExpression':
                    if (declaration.async) {
                        throw new Error('Export an async function');
                    }

                    name = 'Module';
                    s.update(declaration.start!, declaration.body.start! - 1, 'function Module() ');

                    break;
                case 'FunctionDeclaration':
                    if (declaration.async) {
                        throw new Error('Export an async function');
                    }

                    if (declaration.id) {
                        name = declaration.id.name;
                    } else {
                        name = 'Module';
                        s.update(declaration.start!, declaration.body.start! - 1, 'function Module() ');
                    }

                    break;
                default:
                    throw new Error(`Default export type is invalid: expect a FunctionExpression but got ${declaration.type}`);
            }
        }
    }
    s.prepend(`import React from 'react';\n`);
    s.append(`\n window.__root__.render(<${name} />)`);
    return s.toString();
}
