export function wait(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function shortHash(address: string): string {
    return address.slice(0,4) + '...' + address.slice(address.length - 4);
}