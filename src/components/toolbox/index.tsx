import type { MouseEvent, ReactNode } from 'react';

import { IconCodeSlash, IconRefresh } from '../../icons';
import { ComponentBaseProps } from '../../shared/types';
import { useInternalContext } from '../provider/context';
import { ToolboxContainer, ToolButton } from './widgets';

interface ToolConfig {
    icon?: ReactNode;
    text?: ReactNode;
    onClick?: (e: MouseEvent) => void;
}

interface ToolboxProps extends ComponentBaseProps {
    toolList?: ToolConfig[];
}

export default function Toolbox(props: ToolboxProps) {
    const { className, style, toolList = [] } = props;
    const { format, reset } = useInternalContext();
    const tools: ToolConfig[] = [
        {
            icon: <IconCodeSlash height={14} width={14} />,
            onClick: format
        },
        {
            icon: <IconRefresh height={14} width={14} />,
            onClick: reset
        },
        ...toolList
    ];

    return (
        <ToolboxContainer className={className} style={style}>
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
