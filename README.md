Submitted to the 2023 Sandstorm Hackathon. Application available: `sandstorm.md`

# proof-of-x
Mint and Drop an NFT after Verifying a Specific Solana Event has occurred 

This is a serverless function that handles a `POST` request from Helius on Vercel using Next.js. The function:

- Validates and authorizes the `POST` request
- Verifies that the type of transaction received matches what was expected (in this case 'BURN'). 
- It extracts the `tokenTransfer` array from the body, and verifies that the tokens burned is greater than the `MIN_BURN` constant. 
- If the amount of tokens burned is greater than the `MIN_BURN` constant, we send a call to CrossMint to mint an NFT to the burner or `pyro`.

>*Note, the front end here is really is just a tool to let ppl easily burn tokens. There's no link between the FE/BE. So you're welcome to play around with the FE, but the fun stuff is in `pages/api/burn.ts`.*

## Getting Started

- Clone from GH. 
- Rename `.env.example` to `.env` and update the variables. \
    - `AUTH_CODE` is self generated (i like solana keygen-grind to find something secure)
    - `CROSS_MINT` envs require a dev account from [CrossMint](https://staging.crossmint.com/)
    - `DISCORD` keys are available via the [Developer Portal](https://discord.com/developers/docs/intro)
        - * NOTE: You can disable DISCORD BOT by setting `const NOTIFY_DISCORD = false` in `pages/api/burn.ts`, in which case you shouldn't need these keys
- You'll need a [Helius WebHook](https://dev.helius.xyz/webhooks/my). At present this repo is only really indexed for the `Enhanced Transaction` type `BURN`. The verification component is pretty modular and could easily be replaced with some other Tx Type and different success criteria. You'll need to wait to deploy the webhook until after you've launched your server. 
- Modify NFT rewards/metadata to your liking. 

You should be able to test things out. Install dependencies and launch the app: 

```sh
yarn
```

```sh
yarn dev
```

- Out the gate, you should be able to use `utils/samples/samplePOST.md` to run a `curl` command in a seperate terminal--this should effectively simulate recieving a `POST` request from the WebHook. Just make sure you're sending the request to the right path (in my case, `http://localhost:3000/api/burn`)
You should see something like this in your server terminal: 

```sh
Requesting NFT Mint:
   - Pyro: Cw9P...4J1E
   - Burn: 10,055,679 $BONK
   - TxId: JWSn...JoDR
   - CMID: w44177a9-02e9-4d04-a5ce-de7d5739d5bx
   ✅ Mint: arGbzUJQ1vTmjqPdDTqXsuqPxLQb1MGkUX5qTXt483Kx
   ✅ DCRD: 🤖 Connection Established
   ✅ DCRD: Message sent to server
   ✅ DCRD: 🤖 Connection destroyed
```

To get the feed from Helius, you need to push your component to a serverless function hosting provider. I used [Vercel](https://vercel.com). I note some issues/limitations below, especially on their free plan. 


### Potential Limitations / Known Issues

At present (Jan 21, 2023):
- Webhooks: 
    - BURN Feed does not include inner tx Burns (e.g., burns associated with a Candy Machine mint)
    - BURN Feed does not include BurnChecked tx's
- Vercel: 
    - Base plan is limited to 10s executions (which is only enough time to send a CM request)
    - Pro plan is limited to 60s which is sufficient MOST of the time but I have seen some executions time out 
    - Future phases will have to explore alternatives
    - Note: The Serverless Function logs will automatically be cut-off if the total size reaches over 4KB. This will require a log drain for future use
- CM:
    - I don't believe metadata currently uses [Metaplex's latest standard](https://docs.metaplex.com/programs/token-metadata/token-standard). I think the lack of `properties.files` for the img file causes the NFT to not render on all platforms (e.g., Solana Explorer)