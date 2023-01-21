# proof-of-x
Mint and Drop an NFT after Verifying a Specific Solana Event has occurred 

This is a serverless function that handles a POST request from Helius on Vercel using Next.js. The function:

- Validates and authorizes the POST request
- Verifies that the type of transaction received matches what was expected (in this case 'BURN'). 
- It extracts the `tokenTransfer` array from the body, and verifies that the tokens burned is greater than the `MIN_BURN` constant. 
- If the amount of tokens burned is greater than the `MIN_BURN` constant, we send a call to CrossMint to mint an NFT to the burner or `pyro`.


### Potential Limitations

At present (Jan 21, 2023):
- Webhooks: 
    - BURN Feed does not include inner tx Burns (e.g., burns associated with a Candy Machine mint)
    - BURN Feed does not include BurnChecked tx's
- Vercel: 
    - Base plan is limited to 10s executions (which is only enough time to send a CM request)
    - Pro plan is limited to 60s which is sufficient MOST of the time but I have seen some executions time out 
    - Future phases will have to explore alternatives
    - Note: The Serverless Function logs will automatically be cut-off if the total size reaches over 4KB. This will require a log drain for future use



## Getting Started

```sh
yarn
```

```sh
yarn dev
```

Rename `.env.example` to `.env` and update the variables. 