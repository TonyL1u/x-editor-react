import styled from 'styled-components';

export default styled.div`
    width: 300px;
    display: flex;
    padding: 24px;
    overflow: auto;
    position: relative;
    background: rgb(246, 247, 249);
    perspective: 300px;

    &:hover .runningButton {
        opacity: 1;
        cursor: pointer;
    }
`;
