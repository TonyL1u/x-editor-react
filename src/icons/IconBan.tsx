import { memo } from 'react';

export const IconBan = memo<JSX.IntrinsicElements['svg']>(function IconBan(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
            <circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
            <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" d="M108.92 108.92l294.16 294.16" />
        </svg>
    );
});
