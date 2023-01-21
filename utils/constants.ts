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