import styled from 'styled-components';

import { IconPlay } from '../../../icons';

export default styled(IconPlay).attrs({ className: 'runningButton' })`
    position: absolute;
    bottom: 32px;
    right: 32px;
    z-index: 30;
    opacity: 0;
    transition: 0.15s;
`;
