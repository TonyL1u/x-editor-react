import styled from 'styled-components';

export default styled.div<{ $borderless?: boolean }>`
    box-sizing: border-box;
    display: flex;
    height: 32px;
    width: 100%;
    align-items: center;
    justify-content: end;
    background: #fff;
    padding: 0 8px;
    border: ${({ $borderless }) => ($borderless ? 'none' : '1px solid #f0f0f0')};
`;
