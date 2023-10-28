import styled from 'styled-components';

import { Console, Editor, Preview, Toolbox, XEditorProvider } from '.';
import { ComponentBaseProps } from './shared/types';

const Container = styled.div`
    width: max-content;
    display: flex;
    flex-direction: column;
    border: 1px solid #f0f0f0;
`;

const StyledPreview = styled(Preview)`
    flex: 1;
`;

const StyledEditor = styled(Editor)`
    border: 1px solid #f0f0f0;
`;

export interface XEditorProps extends ComponentBaseProps {
    code?: string;
    width?: number;
    height?: number;
    showToolbox?: boolean;
    showConsole?: boolean;
    showPreview?: boolean;
}

export default function XEditor(props: XEditorProps) {
    const { code, className, style, width = 800, height = 400, showConsole = false, showPreview = false, showToolbox = false } = props;

    return (
        <XEditorProvider code={code}>
            <Container className={className} style={style}>
                {showToolbox && <Toolbox />}
                <div className="flex">
                    {showPreview && <StyledPreview />}
                    <StyledEditor width={width} height={height} />
                </div>
                {showConsole && <Console />}
            </Container>
        </XEditorProvider>
    );
}
