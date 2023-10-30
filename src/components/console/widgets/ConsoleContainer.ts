import styled from 'styled-components';

export default styled.div<{ $borderless?: boolean }>`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    font-size: 14px;
    border: ${({ $borderless }) => ($borderless ? 'none' : '1px solid #f0f0f0')};

    .iconTerminal {
        margin-right: 6px;
    }

    .iconBan {
        position: absolute;
        bottom: 8px;
        right: 8px;
        cursor: pointer;
    }
`;
