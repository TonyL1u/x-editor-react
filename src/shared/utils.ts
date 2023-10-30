export function ensureCssUnit(value: string | number, unit: string) {
    return typeof value === 'number' ? `${value}${unit}` : value;
}

export function createInjectKey() {
    return Math.random().toString(36).slice(-6);
}
