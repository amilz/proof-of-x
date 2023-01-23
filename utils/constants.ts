import { clusterApiUrl } from "@solana/web3.js";

export const NETWORK = process.env.NEXT_PUBLIC_RPC
    ?? clusterApiUrl('mainnet-beta');
export const TOKEN_MINT = process.env.NEXT_PUBLIC_TOKEN_MINT
    ?? 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';
export const MIN_BURN_AMT = Number(process.env.NEXT_PUBLIC_MIN_BURN_AMT)
    ?? 1000000;
export const NUM_DECIMALS = Number(process.env.NEXT_PUBLIC_NUM_DECIMALS)
    ?? 5;
export const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME
    ?? 'BONK';

export const IMG_URIS: string[] = [
    "https://arweave.net/brLBMvBhc1epsGMcGd3BIMHHNGp67O3w8BLFnuz6KB4?ext=png",
    "https://arweave.net/S40YOJwfdzGv6O9HfXYtYjs4eIyUYL4F3pmKLyOiFMA?ext=png",
    "https://arweave.net/spFzgmuTFbtHUFiUKAumcqm3NFCGuFYp_4pdZ84KK_Y?ext=png",
    "https://arweave.net/xCJDtMjSayg-Um1VDR8hSsUfAsACaNUjEE91BVaqRts?ext=png",
    "https://arweave.net/u6avFDK2qEZWv3Sy_jU2ylrBSQUYmNia3FEw6FEOd6M?ext=png",
    "https://arweave.net/d38Dr70BoX_vEO8TDj34SAYPBUEfLAbh-O-M4dB9Sfc?ext=png",
    "https://arweave.net/R1EyodNsavfvduSJ1_ye7G9eOR2_LxlP35Z8SLrg1IQ?ext=png",
    "https://arweave.net/CHBrx24sUS3p7q2pQX0b6wLEMfGtn2ByMEdQMoTsgE0?ext=png",
    "https://arweave.net/IQEleLuUqDLj-ZBZZ-0KxnzKZrVXS0E37YNFhoW6r4c?ext=png",
    "https://arweave.net/KP2yCkucDqTtbCK3605ci-tVIOi3xjKPEvzvRVw_Chs?ext=png",
    "https://arweave.net/l6mB4HlifviFqHf0SR1tjR0jPCl02rD49tq_0nndAOk?ext=png",
    "https://arweave.net/tTGfCn7LMX6YYZyCla7ARwMGX2LRx-y4f7Ax5py1ltM?ext=png",
    "https://arweave.net/Dl3FWkx6gAUq1v8TmEXbVCShMTSREVIt-7IVSrNYbp4?ext=png",
    "https://arweave.net/ILOszKonJC3HCnvwoJ7tMcynguk60vSOo7qoZlA7JCU?ext=png",
    "https://arweave.net/Zpd5CHxc1REwSPk5vbvaNA9t9DjyyxHpmi3imSQ4yQw?ext=png",
    "https://arweave.net/sggtJ61vSuKJWqUXYPJ_Tdb5Y_-vQrPIOZtPOEFjO-8?ext=png",
    "https://arweave.net/5xDgytUN0YVKOOwi-ayQ4DBEp8HX6wxKPnMmCX0Zfuk?ext=png"
];