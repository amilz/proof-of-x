export function wait(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function shortHash(address?: string): string {
    if (!address) return '';
    return address.slice(0,4) + '...' + address.slice(address.length - 4);
}

export function generateExplorerUrl(txId:string, cluster: string = 'devnet', address?: string){
    if (!address) return `https://explorer.solana.com/tx/${txId}/?cluster=${cluster}`;
    return `https://explorer.solana.com/address/${address}?cluster=${cluster}`;
}