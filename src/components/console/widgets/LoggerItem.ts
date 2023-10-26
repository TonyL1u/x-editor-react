import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: start;
    padding: 8px 0;
    line-height: 16px;

    .ts {
        color: #9ca3af;
        text-decoration: underline;
    }

    .msg {
        margin: 0 0 0 12px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        white-space: pre-wrap;
        font-weight: 500;
        font-family: inherit;
    }
`;
