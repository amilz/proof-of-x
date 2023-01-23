export function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function shortHash(address?: string): string {
    if (!address) return '';
    return address.slice(0, 4) + '...' + address.slice(address.length - 4);
}

export function generateExplorerUrl(txId: string, cluster: string = 'devnet', address?: string) {
    if (!address) return `https://explorer.solana.com/tx/${txId}/?cluster=${cluster}`;
    return `https://explorer.solana.com/address/${address}?cluster=${cluster}`;
}

export function addLeadingZeros(n: number) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
}

export function cleanDate(unix: number | string) {
    let date = new Date(Number(unix) * 1000);
    return date.getFullYear() + "-" + addLeadingZeros(date.getMonth() + 1) + "-" + addLeadingZeros(date.getDate());
}

export function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }