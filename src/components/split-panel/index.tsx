import type { PropsWithChildren, ReactElement } from 'react';
import { Children } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';

import type { ComponentBaseProps } from '../../shared/types';
import { ensureCssUnit } from '../../shared/utils';

interface SplitPanelProps {
    vertical?: boolean;
    width?: string | number;
    height?: string | number;
}

const Container = styled.div<{ $vertical?: boolean; $width?: string; $height?: string }>`
    width: ${({ $width }) => ($width ? $width : 'max-content')};
    height: ${({ $height }) => ($height ? $height : 'max-content')};
    display: flex;

    ${({ $vertical }) => ({ flexDirection: $vertical ? 'column' : 'row' })}
`;

const Divider = styled.div<{ $vertical: boolean }>`
    background: #f0f0f0;
    flex-shrink: 0;

    ${({ $vertical }) => {
        if ($vertical) {
            return { width: '100%', height: '1px' };
        }

        return { height: '100%', width: '1px' };
    }}
`;

/**
 * 在数组中每个元素（除了最后一个）后面的位置插入新元素，不改变原数组。
 *
 * @example insertIntoArray([1, 1, 1], 2); // [1, 2, 1, 2, 1]
 * @param array
 * @param insertEl
 * @returns
 */
function insertIntoArray<T, E>(array: T[], fn: (item: T, index: number) => E): (T | E)[];
function insertIntoArray<T, E>(array: T[], insertEl: E): (T | E)[];
function insertIntoArray<T>(array: T[], insertEl: unknown) {
    return array
        .map((item, index) => [item, typeof insertEl === 'function' ? insertEl(item, index) : insertEl] as T[])
        .flat()
        .slice(0, -1);
}

export default function SplitPanel(props: PropsWithChildren<SplitPanelProps & ComponentBaseProps>) {
    const { children, vertical = false, width = '', height = '', className, style } = props;
    const renderChildren = useMemo(() => {
        const elements = Children.toArray(children);

        if (elements.length <= 1) return children;

        return insertIntoArray(elements as ReactElement[], (<Divider $vertical={vertical} />) as ReactElement);
    }, [children, vertical]);

    return (
        <Container className={className} style={style} $vertical={vertical} $width={ensureCssUnit(width, 'px')} $height={ensureCssUnit(height, 'px')}>
            {renderChildren}
        </Container>
    );
}
