import { useState } from "react";

global 

export default function Phantom({ }) {
    const [wallet, setWallet] = useState('');
    const isPhantomInstalled = window.phantom?.solana?.isPhantom;
    const getProvider = () => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;

            if (provider?.isPhantom) {
                return provider;
            }
        }

        window.open('https://phantom.app/', '_blank');
    };
    const provider = getProvider();
    const handleClick = async () => {
        if (!isPhantomInstalled) { return }
        try {
            const resp = await provider.connect();
            console.log(resp.publicKey.toString());
            setWallet(resp.publicKey.toString());
        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
        }
    }


    return (
        <>
            <button
                style={{
                    background: 'purple',
                    color: 'white',
                    margin: '5px',
                    display: 'block',
                    padding: '10px',
                    borderRadius: '5px'
                }}
                onClick={handleClick}>
                connect phantom
            </button>
            {wallet && <div>Connected to: {wallet}</div>}
        </>
    )
}