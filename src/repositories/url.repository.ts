type UrlRecord = {
    id: number;
    longUrl: string;
    shortCode: string;
    createdAt: Date;
    expiresAt?: Date;
    clickCount: number;
};

let currentId = 1;
const urls: UrlRecord[] = [];

export function createUrl(longUrl: string): UrlRecord {
    const id = currentId++;
    return {
        id, 
        longUrl,
        shortCode: "",
        createdAt: new Date(),
        clickCount: 0,
    };
}

export function saveUrl(record: UrlRecord): UrlRecord {
    urls.push(record);
    return record;
}

export function findByShortCode(shortCode: string): UrlRecord | undefined {
    return urls.find((u) => u.shortCode === shortCode);
}

export function incrementCounter(record: UrlRecord) {
    record.clickCount += 1;
}