import { memo } from 'react';

export const IconPlay = memo<JSX.IntrinsicElements['svg']>(function IconPlay(props) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z" fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={32}></path>
        </svg>
    );
});
