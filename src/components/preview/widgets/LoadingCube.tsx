import styled, { css, keyframes } from 'styled-components';

const cubeRotate = keyframes`
    0% {
        transform: rotateX(-25.5deg) rotateY(45deg);
    }

    100% {
        transform: rotateX(-25.5deg) rotateY(405deg);
    }
`;

const CubeWrapper = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;
    right: 24px;
    bottom: 24px;
    z-index: 10;

    * {
        box-sizing: border-box;
    }
`;

const Cube = styled.div`
    display: flex;
    transform: translate(-4px, 9px) scale(0.13, 0.13);

    * {
        position: absolute;
        width: 96px;
        height: 96px;
    }
`;

const Sides = styled.div`
    animation: ${cubeRotate} 1s linear infinite;
    animation-fill-mode: forwards;
    transform-style: preserve-3d;
    transform: rotateX(-25.5deg) rotateY(45deg);
    box-sizing: border-box;

    * {
        border: 10px solid #808080;
        border-radius: 8px;
        background: #fff;
    }
`;

const CubeFaces = styled.div<{ $direction: 'left' | 'right' | 'bottom' | 'top' | 'front' | 'back' }>`
    ${props => {
        switch (props.$direction) {
            case 'left':
                return css`
                    transform: rotateY(-90deg) translateZ(44px);
                    transform-origin: 50% 50%;
                `;
            case 'right':
                return css`
                    transform: rotateY(90deg) translateZ(44px);
                    transform-origin: 50% 50%;
                `;
            case 'bottom':
                return css`
                    transform: rotateX(-90deg) translateZ(44px);
                    transform-origin: 50% 50%;
                `;
            case 'top':
                return css`
                    transform: rotateX(90deg) translateZ(44px);
                    transform-origin: 50% 50%;
                `;
            case 'front':
                return css`
                    transform: rotateY(0deg) translateZ(44px);
                    transform-origin: 50% 50%;
                `;
            case 'back':
                return css`
                    transform: rotateY(-180deg) translateZ(44px);
                    transform-origin: 50% 50%;
                `;
        }
    }}
`;

export default function LoadingCube() {
    return (
        <CubeWrapper>
            <Cube>
                <Sides>
                    <CubeFaces $direction="top" />
                    <CubeFaces $direction="right" />
                    <CubeFaces $direction="bottom" />
                    <CubeFaces $direction="left" />
                    <CubeFaces $direction="front" />
                    <CubeFaces $direction="back" />
                </Sides>
            </Cube>
        </CubeWrapper>
    );
}
