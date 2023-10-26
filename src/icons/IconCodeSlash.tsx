import { memo } from 'react';

export const IconCodeSlash = memo<JSX.IntrinsicElements['svg']>(function IconCodeSlash(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" {...props}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 368L32 256l128-112M352 368l128-112-128-112M304 96l-96 320" />
        </svg>
    );
});
