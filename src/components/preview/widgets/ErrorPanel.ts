import styled from 'styled-components';

export default styled.div`
    position: absolute;
    padding: 24px;
    top: 24px;
    right: 24px;
    bottom: 24px;
    left: 24px;
    z-index: 20;
    overflow: auto;
    border-radius: 8px;
    border: 2px solid #ef4444;
    background: #fff;

    .title {
        font-size: 24px;
        line-height: 32px;
        color: #dc2626;
    }

    .content {
        margin-top: 12px;
        letter-spacing: 0.025em;
    }
`;
