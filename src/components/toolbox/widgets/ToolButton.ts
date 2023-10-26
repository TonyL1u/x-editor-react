import styled from 'styled-components';

export default styled.button.attrs({ type: 'button' })`
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    border: none;
    background: transparent;
    transition: 0.1s;
    outline: none;
    padding: 0 6px;

    .text {
        margin-left: 6px;
    }

    &:hover {
        color: #22c55e;
    }
`;
