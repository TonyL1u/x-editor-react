import { useEffect, useRef, useState } from 'react';

import { IconBan, IconTerminal } from '../../icons';
import { ComponentBaseProps } from '../../shared/types';
import { useInternalContext } from '../provider/context';
import { ConsoleContainer, Header, LoggerItem, MessagePanel } from './widgets';

interface ConsoleProps extends ComponentBaseProps {}

export default function Console(props: ConsoleProps) {
    const { className, style } = props;
    const { runtimeLogs, clearLogs } = useInternalContext();
    const messagePanel = useRef<HTMLDivElement>(null);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        if (messagePanel.current) {
            messagePanel.current.scrollTop = 9999;
        }
    }, [runtimeLogs]);

    return (
        <ConsoleContainer className={className} style={style}>
            <Header onClick={() => setCollapsed(c => !c)}>
                <IconTerminal width={14} height={14} className="iconTerminal" />
                Console
            </Header>
            {!collapsed && (
                <MessagePanel ref={messagePanel}>
                    {runtimeLogs.length > 0 ? (
                        runtimeLogs.map(({ timestamp, message }, index) => (
                            <LoggerItem key={timestamp + index}>
                                <span className="ts">{new Date(timestamp).toLocaleString()}</span>
                                <pre className="msg">{message}</pre>
                            </LoggerItem>
                        ))
                    ) : (
                        <div className="empty">Nothing Output</div>
                    )}
                </MessagePanel>
            )}
            {runtimeLogs.length > 0 && !collapsed && <IconBan width={14} height={14} color="#999" className="iconBan" onClick={clearLogs} />}
        </ConsoleContainer>
    );
}
