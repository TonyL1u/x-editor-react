import { memo } from 'react';

export const IconTerminal = memo<JSX.IntrinsicElements['svg']>(function IconTerminal(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" {...props}>
            <rect x="32" y="48" width="448" height="416" rx="48" ry="48" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" />
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M96 112l80 64-80 64M192 240h64" />
        </svg>
    );
});
