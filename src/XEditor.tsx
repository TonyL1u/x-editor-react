import { type CSSProperties, useMemo, useState } from 'react';

import type { EditorProps, LibImport } from '.';
import { Console, Editor, Preview, Toolbox, XEditorProvider } from '.';
import SplitPanel from './components/split-panel';
import { IconFullscreen } from './icons';
import { ComponentBaseProps } from './shared/types';

export interface XEditorProps extends ComponentBaseProps, Omit<EditorProps, 'width' | 'height' | 'borderless' | 'style' | 'className'> {
    code?: string;
    width?: number;
    height?: number;
    imports?: LibImport[];
    fullscreen?: boolean;
    showToolbox?: boolean;
    showConsole?: boolean;
    showPreview?: boolean;
}

export default function XEditor(props: XEditorProps) {
    const { code, imports, className, style, width = 1000, height = 400, fullscreen = false, showConsole = false, showPreview = false, showToolbox = false, ...editorProps } = props;
    const [isFullscreen, setIsFullscreen] = useState(fullscreen);
    const mergedStyle = useMemo<CSSProperties>(() => {
        const common = { border: '1px solid #f0f0f0', ...style };

        if (!isFullscreen) return common;

        return { ...common, position: 'fixed', zIndex: 5000, top: 0, left: 0, width: '100vw', height: '100vh' };
    }, [style, isFullscreen]);
    const tools = [
        {
            icon: <IconFullscreen height={14} width={14} />,
            onClick: () => setIsFullscreen(f => !f)
        }
    ];

    return (
        <XEditorProvider initialCode={code} imports={imports}>
            <SplitPanel vertical className={className} style={mergedStyle}>
                {showToolbox && <Toolbox borderless extraTools={tools} />}
                <SplitPanel width={isFullscreen ? '100%' : width} height={height} style={{ flex: isFullscreen ? 1 : '' }}>
                    {showPreview && <Preview width="40%" borderless />}
                    <Editor width="60%" height="100%" borderless style={{ flex: 1 }} {...editorProps} />
                </SplitPanel>
                {showConsole && <Console borderless />}
            </SplitPanel>
        </XEditorProvider>
    );
}
