const BASE62_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function encodeBase62(num: number): string {
    if (num === 0) return BASE62_CHARS[0];

    let result = '';
    const base = BASE62_CHARS.length;

    while (num > 0) {
        result = BASE62_CHARS[num % base] + result;
        num = Math.floor(num / base);
    }

    return result;
}