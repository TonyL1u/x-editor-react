import type { CSSProperties, MouseEvent, PropsWithChildren } from 'react';
import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { createGlobalStyle } from 'styled-components';

import { useClipboard } from '../../hooks';
import { IconCheck, IconCopy } from '../../icons';
import { createInjectKey } from '../../shared/utils';

export interface CopyProps {
    content: string;
    iconSize?: number;
    onCopied?: () => void;
    className?: string;
    style?: CSSProperties;
}

const key = createInjectKey();

const Styles = createGlobalStyle`
    .${key}_iconSwitchEnter .icon {
        opacity: 0;
        transform: scale(0.4);
    }

    .${key}_iconSwitchEnterActive .icon {
        opacity: 1;
        transform: scale(1);
    }

    .${key}_iconSwitchExit .icon {
        opacity: 1;
        transform: scale(1);
    }

    .${key}_iconSwitchExitActive .icon {
        opacity: 0;
        transform: scale(0.4);
    }

    .${key}_iconSwitchEnterActive .icon,
    .${key}_iconSwitchExitActive .icon {
        transition: opacity 150ms, transform 150ms;
    }
`;

export default function Copy(props: PropsWithChildren<CopyProps>) {
    const { content, iconSize = 14, onCopied, className, style, children } = props;
    const { copied, copy } = useClipboard();
    const copyRef = useRef<HTMLDivElement>(null);
    const checkRef = useRef<HTMLDivElement>(null);
    const nodeRef = copied ? checkRef : copyRef;
    const Icon = copied ? IconCheck : IconCopy;

    const handleCopy = async (e: MouseEvent) => {
        if (copied) return;

        e.stopPropagation();
        e.preventDefault();
        await copy(content);
        onCopied?.();
    };

    if (children) {
        return (
            <div className={className} style={style} onClick={handleCopy}>
                {children}
            </div>
        );
    }

    return (
        <>
            <Styles />
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={String(copied)}
                    nodeRef={nodeRef}
                    addEndListener={done => {
                        nodeRef.current?.addEventListener('transitionend', done as EventListener, false);
                    }}
                    classNames={{
                        enter: `${key}_iconSwitchEnter`,
                        enterActive: `${key}_iconSwitchEnterActive`,
                        exit: `${key}_iconSwitchExit`,
                        exitActive: `${key}_iconSwitchExitActive`
                    }}>
                    <div className={className} style={style} ref={nodeRef} onClick={handleCopy}>
                        <Icon width={iconSize} height={iconSize} className="icon" style={{ marginTop: '2px' }} />
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </>
    );
}
