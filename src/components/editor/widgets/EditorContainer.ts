import styled from 'styled-components';

export default styled.div<{ $borderless?: boolean; $width?: string; $height?: string }>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    border: ${({ $borderless }) => ($borderless ? 'none' : '1px solid #f0f0f0')};
    box-sizing: border-box;

    section {
        box-sizing: border-box;
        padding-right: 16px;
    }

    .highlight-line {
        background: rgba(255, 251, 221);
        border-radius: 4px;
    }

    .current-line {
        border-radius: 4px;
    }

    .error-line {
        background: rgb(255, 236, 236);
        // border-top-right-radius: 4px;
        // border-bottom-right-radius: 4px;
        border-radius: 4px;

        &::after {
            content: '\\26A0';
            position: absolute;
            top: -4.5px;
            right: 4px;
            font-size: 24px;
            line-height: 24px;
            color: rgb(239, 68, 68);
        }
    }

    .mtk4 {
        color: #2e6bd0;
    }

    .mtk10 {
        color: #7c5ae3;
    }

    .mtk13 {
        color: #3b3b3b;
    }

    .mtk16 {
        color: #151515;
    }

    .jsx-text {
        color: #151515;
    }

    .jsx-tag-name {
        color: #0971f1;
    }

    .jsx-tag-angle-bracket {
        &.jsx-tag-order-1 {
            color: #151515;
        }

        &.jsx-tag-order-2 {
            color: #151515;
        }

        &.jsx-tag-order-3 {
            color: #151515;
        }
    }

    .jsx-tag-attribute-key {
        color: #3b3b3b;
    }

    .jsx-expression-braces {
        color: #3b3b3b;
    }
`;
