import styled, { css } from 'styled-components';

export default styled.div<{ $borderless?: boolean; $width?: string; $height?: string; $styleless?: boolean }>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    border: ${({ $borderless }) => ($borderless ? 'none' : '1px solid #f0f0f0')};
    position: relative;

    ${({ $styleless }) => {
        if (!$styleless)
            return css`
                padding: 24px;
                background: rgb(246, 247, 249);
                box-sizing: border-box;

                #sandbox_iframe {
                    border-radius: 8px;
                    background-color: #fff;
                    box-shadow:
                        0 1px 3px 0 rgb(0 0 0 / 0.1),
                        0 1px 2px -1px rgb(0 0 0 / 0.1);
                }
            `;
    }}

    #sandbox_iframe {
        overflow: auto;
        border: none;
        width: 100%;
        height: 100%;
    }

    &:hover .runningButton {
        opacity: 1;
        cursor: pointer;
    }
`;
