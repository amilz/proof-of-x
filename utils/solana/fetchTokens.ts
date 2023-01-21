import { Connection, PublicKey } from "@solana/web3.js";
export interface TokenAccounts {
    mintAddress: string,
    quantity: number
}

export async function getTokenBalance(wallet: PublicKey, solanaConnection: Connection, tokenMint: PublicKey):Promise<number> {
    const tokenAccounts = await solanaConnection.getTokenAccountsByOwner(
      wallet,
      { mint: tokenMint },
    )
    const balances = await Promise.all(tokenAccounts.value.map(async ({ pubkey }) => {
      const balance = await solanaConnection.getTokenAccountBalance(pubkey)
      return balance.value.uiAmount ?? 0
    }))
  
    return balances.reduce((acc, curr) => acc + curr, 0)
  }