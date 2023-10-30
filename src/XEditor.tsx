import { type CSSProperties, useMemo, useState } from 'react';

import { Console, Editor, type EditorProps, Preview, Toolbox, XEditorProvider } from '.';
import SplitPanel from './components/split-panel';
import { IconFullscreen } from './icons';
import { ComponentBaseProps } from './shared/types';

export interface XEditorProps extends ComponentBaseProps {
    code?: string;
    onChange?: EditorProps['onChange'];
    width?: number;
    height?: number;
    fullscreen?: boolean;
    showToolbox?: boolean;
    showConsole?: boolean;
    showPreview?: boolean;
}

export default function XEditor(props: XEditorProps) {
    const { code, onChange, className, style, width = 1000, height = 400, fullscreen = false, showConsole = false, showPreview = false, showToolbox = false } = props;
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
        <XEditorProvider code={code}>
            <SplitPanel vertical className={className} style={mergedStyle}>
                {showToolbox && <Toolbox borderless extraTools={tools} style={{ flexShrink: 0 }} />}
                <SplitPanel width={isFullscreen ? '100%' : width} height={height} style={{ flex: isFullscreen ? 1 : '' }}>
                    {showPreview && <Preview width="40%" borderless />}
                    <Editor width="60%" borderless onChange={onChange} style={{ flex: 1 }} />
                </SplitPanel>
                {showConsole && <Console borderless />}
            </SplitPanel>
        </XEditorProvider>
    );
}
