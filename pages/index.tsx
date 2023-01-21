import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import usePhantom from '@/utils/solana/phantom'
import { shortHash } from '@/utils/utils'
import { useCallback } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { provider, balance, tokenBalance, logs, pubKey, connect, disconnect, isConnected } = usePhantom();
  const handleClick = useCallback(() => {
    if (!isConnected) { connect() }
    else { disconnect() }
  }, [isConnected])

  return (
    <>
      <Head>
        <title>Proof of X</title>
        <meta name="description" content="A Solana Websocket Tool for verifying and rewarding on-chain activity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
          <Image
            src="/burn.png"
            alt="A burning bonk"
            className={styles.logo}
            width={400}
            height={400}
            priority
          />
          <button
            className={styles.card}
            style={{ textAlign: 'left' }}
            onClick={handleClick}
          >
            <h2 className={inter.className}>
              Try Now 🔥🔥🔥
            </h2>
            <p className={inter.className}>
              Earn a Proof of Burn NFT<br />by burning 1M BONK
            </p><br />
            {!isConnected ?
              <p className={inter.className}>
                🔴 Not Connected <small><i>click here</i></small>
              </p> :
              <p className={inter.className}>
                🟢 Connected <span className={styles.walletDetails}><i>{shortHash(pubKey?.toString())}</i></span>
              </p>}
          </button>

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
              Websockets trigger on-chain events instantly <code>(Helius)</code>
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
              Rules engine processes and finds qualifying actions <code>(Vercel)</code>
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
              NFT Trophys airdropped immediately to actor's wallets <code>(CrossMint)</code>
            </p>
          </a>
        </div>
      </main>
    </>
  )
}

