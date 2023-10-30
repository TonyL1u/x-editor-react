import styled from 'styled-components';

export default styled.div<{ $borderless?: boolean; $width?: string; $height?: string }>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    display: flex;
    padding: 24px;
    overflow: auto;
    position: relative;
    background: rgb(246, 247, 249);
    box-sizing: border-box;
    border: ${({ $borderless }) => ($borderless ? 'none' : '1px solid #f0f0f0')};

    &:hover .runningButton {
        opacity: 1;
        cursor: pointer;
    }
`;
