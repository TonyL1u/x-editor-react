import { useRef, useState } from 'react';

import { ComponentBaseProps } from '../../shared/types';
import { useInternalContext } from '../provider/context';
import { ErrorPanel, LoadingCube, PreviewContainer, RunningButton } from './widgets';

export interface PreviewProps extends ComponentBaseProps {
    code?: string;
    width?: number;
    height?: number;
}

export default function Preview(props: PreviewProps) {
    const { code: previewCode = '', className, style } = props;
    const { code, runtimeError, editorInstance, runCode, onBeforeCreate, onCreated, onLoaded } = useInternalContext();
    const [loading, setLoading] = useState(true);
    const container = useRef<HTMLDivElement>(null);

    const handleRun = async () => {
        await runCode(editorInstance?.current?.getValue() || previewCode || code);
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
        await runCode(previewCode || editorInstance?.current?.getValue() || code);
    });

    return (
        <PreviewContainer ref={container} className={className} style={style}>
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