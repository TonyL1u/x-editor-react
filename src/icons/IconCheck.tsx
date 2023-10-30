import { memo } from 'react';

export const IconCheck = memo<JSX.IntrinsicElements['svg']>(function IconCheck(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M416 128L192 384l-96-96" />
        </svg>
    );
});
