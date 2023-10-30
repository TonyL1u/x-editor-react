import type { MouseEvent, ReactNode } from 'react';

import { IconCodeSlash, IconRefresh } from '../../icons';
import { ComponentBaseProps } from '../../shared/types';
import Copy from '../copy';
import { useInternalContext } from '../provider/context';
import { ToolboxContainer, ToolButton } from './widgets';

export interface ToolConfig {
    icon?: ReactNode;
    text?: ReactNode;
    onClick?: (e: MouseEvent) => void;
}

export interface ToolboxProps extends ComponentBaseProps {
    borderless?: boolean;
    extraTools?: ToolConfig[];
}

export default function Toolbox(props: ToolboxProps) {
    const { className, style, borderless = false, extraTools = [] } = props;
    const { code, format, reset } = useInternalContext();
    const tools: ToolConfig[] = [
        {
            icon: <IconCodeSlash height={14} width={14} />,
            onClick: format
        },
        {
            icon: <IconRefresh height={14} width={14} />,
            onClick: reset
        },
        {
            icon: <Copy content={code} />
        },
        ...extraTools
    ];

    return (
        <ToolboxContainer className={className} style={style} $borderless={borderless}>
            {tools.map(({ icon, text, onClick }, index) => {
                return (
                    <ToolButton key={index} onClick={onClick}>
                        {icon} {text && <span className="text">{text}</span>}
                    </ToolButton>
                );
            })}
        </ToolboxContainer>
    );
}
