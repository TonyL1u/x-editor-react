import { useRef, useState } from 'react';

import { useLatest } from '../../hooks';
import { ComponentBaseProps } from '../../shared/types';
import { ensureCssUnit } from '../../shared/utils';
import { useInternalContext } from '../provider/context';
import { ErrorPanel, LoadingCube, PreviewContainer, RunningButton } from './widgets';

export interface PreviewProps extends ComponentBaseProps {
    code?: string;
    width?: string | number;
    height?: string | number;
    borderless?: boolean;
}

export default function Preview(props: PreviewProps) {
    const { code: previewCode = '', className, style, width = 300, height, borderless = false } = props;
    const previewCodeRef = useLatest(previewCode);
    const { code, runtimeError, editorInstance, runCode, onBeforeCreate, onCreated, onLoaded } = useInternalContext();
    const [loading, setLoading] = useState(true);
    const container = useRef<HTMLDivElement>(null);

    const handleRun = async () => {
        await runCode(previewCodeRef.current || editorInstance?.current?.getValue() || code);
    };

    onBeforeCreate(sandbox => {
        setLoading(true);
        const parentElement = sandbox?.parentElement;
        if (sandbox && parentElement === container.current) {
            container.current?.removeChild(sandbox);
        }
    });

    onCreated(sandbox => {
        sandbox && container.current?.appendChild(sandbox);
    });

    onLoaded(async () => {
        setLoading(false);
        await handleRun();
    });

    return (
        <PreviewContainer ref={container} className={className} style={style} $borderless={borderless} $width={ensureCssUnit(width || '', 'px')} $height={ensureCssUnit(height || '', 'px')}>
            {loading && <LoadingCube />}
            {runtimeError?.message && (
                <ErrorPanel>
                    <span className="title">Error</span>
                    <div className="content">{String(runtimeError.message)}</div>
                </ErrorPanel>
            )}
            {!loading && <RunningButton width={16} height={16} onClick={handleRun} />}
        </PreviewContainer>
    );
}
