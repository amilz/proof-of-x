# proof-of-x
Mint and Drop an NFT after Verifying a Specific Solana Event has occurred 

This is a serverless function that handles a POST request from Helius on Vercel using Next.js. The function:

- Validates and authorizes the POST request
- Verifies that the type of transaction received matches what was expected (in this case 'BURN'). 
- It extracts the `tokenTransfer` array from the body, and verifies that the tokens burned is greater than the `MIN_BURN` constant. 
- If the amount of tokens burned is greater than the `MIN_BURN` constant, we send a call to CrossMint to mint an NFT to the burner or `pyro`.

## Getting Started

```sh
yarn
```

```sh
yarn dev
```

Rename `.env.example` to `.env` and update the variables. 