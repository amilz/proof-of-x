import { cmMintNft } from '@/utils/api/crossmint';
import { sendDiscordMsg } from '@/utils/api/discord';
import { cleanDate, generateExplorerUrl, shortHash } from '@/utils/utils';
import { NextApiRequest, NextApiResponse } from 'next';

const AUTH_CODE = process.env.AUTH_CODE;
const MIN_BURN = Number(process.env.MIN_BURN_AMT);
const TOKEN_MINT = process.env.TOKEN_MINT;
const DISCORD_API_TOKEN = process.env.DISCORD_API_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const TOKEN_NAME = process.env.TOKEN_NAME ?? 'TOKEN';
const NOTIFY_DISCORD = true; // set false if no Discord
const envVars = [AUTH_CODE, MIN_BURN, TOKEN_MINT, process.env.CROSS_MINT_SECRET, process.env.CROSS_MINT_PROJECT];

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
    if (!env) { return response.status(500).json({ error: 'Missing environment variable' }) }
  };
  // STEP 1 AUTHORIZE POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed.' });
  }
  if (!request.headers.authorization) {
    return response.status(400).json({ error: 'No credentials sent.' });
  }
  if (request.headers.authorization !== AUTH_CODE) {
    return response.status(403).json({ error: 'Invalid authorization.' });
  }

  // STEP 2 VERIFY BURN
  const data = body[0];
  if (!data || !body || !body.length) {
    return response.status(400).json('No data in body.');
  }
  if (!data.type || data.type !== 'BURN' || !data.tokenTransfers) {
    return response.status(400).json('Data wrong type.');
  }
  const tokenTransfers: TokenTransfer[] = data.tokenTransfers;
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

  const pyro = burnTx.fromUserAccount; // use the owner of the burned tokens
  const burnAmount = burnTx.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const burnQty = burnTx.tokenAmount; // use for tiered rewards
  const { signature, timestamp } = data;
  
  if (burnTx.tokenAmount < MIN_BURN) {
    console.log(`${burnAmount} tokens burned is less than threshold.`);
    return response.status(200).json('Smol burn');
  }

  console.log('Requesting NFT Mint:');
  console.log(`   - Pyro: ${shortHash(pyro)}`);
  console.log(`   - Burn: ${burnAmount} $${TOKEN_NAME}`);
  console.log(`   - TxId: ${shortHash(signature)}`);

  // Step 3 - Mint NFT
  try {
    let newMint = await cmMintNft(pyro, burnAmount, timestamp, TOKEN_NAME, signature, burnQty);
    if (!newMint || !newMint.id) { return response.status(204).json('No response from CM'); };
    if (!newMint.details) { console.log(`New mint not found for ${newMint.id}.`); return response.status(202).json('Mint status unknown'); }
    console.log(`   ✅ Mint: ${newMint.details.onChain.mintHash}`);
    if (NOTIFY_DISCORD && CHANNEL_ID && DISCORD_API_TOKEN) {
      await sendDiscordMsg(
        `${shortHash(pyro)} burned ${burnAmount} $${TOKEN_NAME} and got this NFT: ${shortHash(newMint.details.onChain.mintHash)} <${generateExplorerUrl('', 'devnet', newMint.details.onChain.mintHash)}>`,
        CHANNEL_ID,
        DISCORD_API_TOKEN
      );
    }
    return response.status(200).json('🔥🔥🔥');
  }
  catch {
    return response.status(204).end();
  }
}
