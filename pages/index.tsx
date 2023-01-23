import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import usePhantom from '@/utils/solana/phantom'
import { generateExplorerUrl, shortHash } from '@/utils/utils'
import { useCallback, useState } from 'react'
import { MIN_BURN_AMT, NUM_DECIMALS, TOKEN_MINT } from '@/utils/constants'
import { createBurnCheckedInstruction, createBurnInstruction } from '@solana/spl-token'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [resultMsg, setResultMsg] = useState<string>('');
  const [txid, setTxid] = useState<string>('');
  const [notice, setNotice] = useState<JSX.Element>(<></>);
  const { provider, connection, tokenBalance, pubKey, connect, disconnect, isConnected, ata } = usePhantom();
  const handleClick = useCallback(() => {
    if (!isConnected) { connect() }
    else { disconnect() }
  }, [isConnected, connect, disconnect])
  const handleBurn = useCallback(async () => {
    if (!provider) return;
    if (!pubKey || !ata) return;
    if (!tokenBalance) return;
    if (tokenBalance < MIN_BURN_AMT) return;
    setLoading(true);
    let burnIx: TransactionInstruction = createBurnInstruction(
      ata,
      new PublicKey(TOKEN_MINT),
      pubKey,
      MIN_BURN_AMT * (10 ** NUM_DECIMALS)
    )
    // At the momeont (2023/1/21), Hook does not appear to include BurnChecked
    let burnIxChecked: TransactionInstruction = createBurnCheckedInstruction(
      ata,
      new PublicKey(TOKEN_MINT),
      pubKey,
      MIN_BURN_AMT * (10 ** NUM_DECIMALS),
      NUM_DECIMALS
    );
    let burnTx = new Transaction().add(burnIx);
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    if (!blockhash || !lastValidBlockHeight) return;
    burnTx.lastValidBlockHeight = lastValidBlockHeight;
    burnTx.recentBlockhash = blockhash;
    burnTx.feePayer = pubKey;

    try {
      const { signature } = await provider.signAndSendTransaction(burnTx);
      const confirmation = await connection.confirmTransaction({ signature, lastValidBlockHeight, blockhash }, 'confirmed');
      if (confirmation.value.err) {
        throw Error("unable to confirm transaciton")
      }
      setResultMsg('🔥 BURN SUCCESS 🔥');
      setTxid(signature);
      setNotice(<>Proof of X is now listening for this transaction on chain!
        <br /><br />If NFTs are still available, you should recieve an airdrop shortly!
        <br />Keep an eye on your wallet...</>
      )
    }
    catch {
      setResultMsg('💥 BONK! 💥');
      setNotice(<>Something went wrong with your transaction.<br />
        <br />Take a breather and try again!</>
      )
    }
    finally {
      setComplete(true);
      setLoading(false);
    }


  }, [pubKey, tokenBalance, ata, connection, provider])
  const handleReset = useCallback(() => {
    setLoading(false);
    setComplete(false);
    setResultMsg('');
    setTxid('');
    setNotice(<></>);
  }, [])
  return (
    <>
      <Head>
        <title>Proof of X</title>
        <meta name="description" content="A Solana Websocket Tool for verifying and rewarding on-chain activity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* MODAL TEXT */}
        <div className={complete ? 'modal' : 'hide'}>
          <div className='modal-content'>
            {/* CLOSE BUTTON */}
            <span className="close" onClick={handleReset}>&times;</span>

            <div className='result-msg'>{resultMsg}</div>
            {notice}<br /><br />
            {txid && <>Transaction ID: <a
              href={generateExplorerUrl(txid, 'mainnet-beta')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortHash(txid)}
            </a></>}
          </div>
        </div>
        {/* BODY */}
        <div className={styles.description}>
          <p >
            <span className={styles.title}>Proof of X</span> <br /> <span className={styles.subhead}>Real-time rewards for on-chain events</span>
          </p>
          <div>
            <a
              href="https://github.com/amilz/proof-of-x"
              target="_blank"
              rel="noopener noreferrer"
            >
              amilz
              <Image
                src="/github.svg"
                alt="GitHub Logo"
                width={22}
                height={22}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <button
            className={loading ? 'image_wrapper' : 'dog-button image_wrapper'}
            onClick={handleBurn}
            disabled={!isConnected || ((tokenBalance ?? 0) < MIN_BURN_AMT || loading)}
          >
            <Image
              src="/burn.png"
              alt="A burning bonk"
              className={loading ? 'loading' : ''}
              width={400}
              height={400}
              priority
            />
            <div className="overlay blink">
              <h3>{loading && 'BURNING'}</h3>
            </div>
          </button>
          {!isConnected ? <button
            className={styles.card + ' overflow primary'}
            onClick={handleClick}
          >
            <h2 className={inter.className}>
              Try Now 🔥🔥🔥
            </h2>
            <p className={inter.className}>
              Earn a Proof of Burn NFT<br />by burning 1M BONK
            </p><br />

            <p className={inter.className}>
              🔴 Not Connected <br /><span className={styles.walletDetails}><i>click here to connect</i></span>
            </p>
          </button> :
            <button
              className={styles.card+ ' overflow primary'}
              onClick={handleClick}
            >
              <h2 className={inter.className}>
                {((tokenBalance ?? 0) >= MIN_BURN_AMT) ? '🔥Click Dog to Burn🔥' : 'MORE BONK NEEDED'}
              </h2>
              <p className={inter.className}>
                Burn 1M BONK -&gt;Get  NFT<br /><i >WARNING: Burn is irreversible</i>
              </p><br />
              <p className={inter.className}>
                🟢 Connected to {shortHash(pubKey?.toString())} <br /><span className={styles.walletDetails}><i>click to disconnect</i></span>
              </p>
            </button>}

        </div>
        <div className={styles.grid}>
          <a
            href="#"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Real Time
            </h2>
            <p className={inter.className}>
              Websockets trigger on-chain events instantly <br/><code>[Helius]</code>
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Verified
            </h2>
            <p className={inter.className}>
              Rules engine processes and finds qualifying actions <br/><code>[Vercel]</code>
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Rewards
            </h2>
            <p className={inter.className}>
              NFT Trophys airdropped immediately to actor&apos;s wallets <br/><code>[CrossMint]</code>
            </p>
          </a>
        </div>
      </main>
    </>
  )
}

