import styled, { keyframes } from 'styled-components';

const fading = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const typing = keyframes`
    from {
        width: 0;
    }
`;

const effect = keyframes`
    50% {
        border-color: transparent;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    animation: ${fading} 1s ease-in-out forwards;
`;

const TypingText = styled.span`
    width: 435px;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid;
    font-family: monospace;
    animation:
        ${typing} 2s steps(22),
        ${effect} 0.5s step-end infinite alternate;
`;

export default function App() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-y-4">
            <Title className="text-8xl tracking-wide">
                <span className="mr-1 rounded bg-blue-400 px-4 py-1.5 text-white">X</span>Editor
            </Title>
            <TypingText className="text-gray-400">A monaco-based code editor with live preview.</TypingText>
        </div>
    );
}
