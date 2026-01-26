type IdempotentResponse = {
    status: number;
    body: any;
};

const store = new Map<string, IdempotentResponse>();

export function getIdempotentResponse(key: string): IdempotentResponse | undefined {
    return store.get(key);
}

export function saveIdempotentResponse(key: string, response: IdempotentResponse) {
    store.set(key, response);
}