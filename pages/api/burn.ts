import { cmMintNft } from '@/utils/api/crossmint';
import { sendDiscordMsg } from '@/utils/api/discord';
import { generateExplorerUrl, shortHash } from '@/utils/utils';
import { NextApiRequest, NextApiResponse } from 'next';

const AUTH_CODE = process.env.AUTH_CODE;
const MIN_BURN = Number(process.env.MIN_BURN_AMT);
const TOKEN_MINT = process.env.TOKEN_MINT;
const NOTIFY_DISCORD = true; // set false if no Discord
const envVars = [AUTH_CODE, MIN_BURN, TOKEN_MINT, process.env.CROSS_MINT_SECRET, process.env.CROSS_MINT_PROJECT ];

interface TokenTransfer {
  fromAccount: string,
  fromUserAccount: string,
  mint: string,
  toTokenAccount: string,
  toUserAccount: string,
  tokenAmount: number,
  tokenStandard: string
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { body } = request;
  // CHECK ENV VAR SET
  for (const env of envVars) {
    if (!env) {return response.status(500).json({ error: 'Missing environment variable' })}
  };
  // STEP 1 AUTHORIZE POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed.' });
  }
  if (!request.headers.authorization) {
    return response.status(400).json({ error: 'No credentials sent.' });
  }
  if (!(request.headers.authorization === AUTH_CODE)) {
    return response.status(403).json({ error: 'Invalid authorization.' });
  }

  // STEP 2 VERIFY BURN
  let data = body[0];
  if (!data || !body || !body.length) {
    return response.status(400).json('No data in body.');
  }
  if (!data.type || data.type !== 'BURN' || !data.tokenTransfers) {
    return response.status(400).json('Data wrong type.');
  }
  let tokenTransfers = data.tokenTransfers as TokenTransfer[];
  // Find the tx for specified mint and verify reciever is null (Helius shows burns and transfers to nobody)
  let burnTx = tokenTransfers.find(transfer => {
    return (
      (transfer.mint == TOKEN_MINT) &&
      !transfer.toTokenAccount &&
      !transfer.toUserAccount
    )
  })
  if (!burnTx) {
    console.log('No burn transaction found.');
    return response.status(400).json('No burn tranfer found');
  }
  if (burnTx.tokenAmount < MIN_BURN) {
    console.log(`${burnTx.tokenAmount} tokens burned is less than threshold.`);
    return response.status(200).json('Smol burn');
  }

  let {pyro, burnAmount, signature, timestamp} = {
    pyro: burnTx.fromUserAccount, // use the owner of the burned tokens
    burnAmount: burnTx.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 0 }),
    signature: data.signature,
    timestamp: data.timestamp
  }
  console.log('Requesting NFT Mint:');
  console.log(`   - Pyro: ${shortHash(pyro)}`);
  console.log(`   - Burn: ${burnAmount} $BONK`);
  console.log(`   - TxId: ${shortHash(signature)}`);
  console.log(`   - Time: ${timestamp}`);

  // Step 3 - Mint NFT
  try {
    let newMint = await cmMintNft(pyro, burnAmount, timestamp)
    if (!newMint || !newMint.id) { return response.status(204).json('No response from CM'); };
    if (!newMint.details) { console.log(`New mint not found for ${newMint.id}.`); return response.status(202).json('Mint status unknown'); }
    console.log(`   - Mint: ${newMint.details.onChain.mintHash}`);
    if (NOTIFY_DISCORD) {await sendDiscordMsg(`${shortHash(pyro)} burned ${burnAmount} $BONK and got this NFT: ${shortHash(newMint.details.onChain.mintHash)}\n<${generateExplorerUrl('','devnet',newMint.details.onChain.mintHash)}>`);}
    return response.status(200).json('🔥🔥🔥');
  }
  catch {
    return response.status(204).end();
  }
}
