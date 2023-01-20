import { cmMintNft } from '@/utils/api/crossmint';
import { NextApiRequest, NextApiResponse } from 'next';

const AUTH_CODE = process.env.AUTH_CODE;
const MIN_BURN = 1000000;
const TOKEN_MINT = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

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

  // STEP 1 AUTHORIZE USER
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed.' });

  }
  if (!request.headers.authorization) {
    return response.status(400).json({ error: 'No credentials sent.' });
  }
  if (!(request.headers.authorization === AUTH_CODE)) {
    return response.status(403).json({ error: 'Invalid authorization.' });
  }
  response.status(200).json('🔥');
  

  // STEP 2 VERIFY BURN

  let data = body[0];
  if (!data) {
    console.log('No data found.');
    return;
  }
  if (data.type !== 'BURN') {
    console.log('Data wrong type.');
    return;
  }

  let tokenTransfers = data.tokenTransfers as TokenTransfer[];

  let burnTx = tokenTransfers.find(transfer =>  {return (
    (transfer.mint == TOKEN_MINT) && 
    !transfer.toTokenAccount && // Helius shows burns and transfers to nobody
    !transfer.toUserAccount  // ^^
  )})
  if (!burnTx) {
    console.log('No burn transaction found.');
    return;
  }
  if (burnTx.tokenAmount < MIN_BURN) {
    console.log(`${burnTx.tokenAmount} tokens burned is less than threshold.`);
    return;
  }

  let result = {
    pyro: burnTx.fromUserAccount, // use the owner of the burned tokens
    burnAmount: burnTx.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 0 }),
    signature: data.signature,
    timestamp: data.timestamp
  }

  console.log(result);

  // Step 3 - Mint NFT
  console.log('1-Initiating CM Request.');
  let newMint = await cmMintNft(result.pyro, result.burnAmount, result.timestamp)
  if (!newMint || !newMint.id) return;
  if (!newMint.details) {console.log(`New mint not found for ${newMint.id}.`); return;}
  console.log(`${result.pyro} burned ${result.burnAmount} BONK and got an NFT!`);
  console.log(`Mint Address: ${newMint.details.onChain.mintHash}`);
  return;
}
