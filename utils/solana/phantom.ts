import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { NETWORK, TOKEN_MINT } from '../constants';
import { getTokenBalance } from "./fetchTokens";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect";
type PhantomRequestMethod =
    | "connect"
    | "disconnect"
    | "signTransaction"
    | "signAllTransactions"
    | "signMessage";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    publicKey: PublicKey | null;
    isConnected: boolean | null;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
    signMessage: (
        message: Uint8Array | string,
        display?: DisplayEncoding
    ) => Promise<any>;
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, handler: (args: any) => void) => void;
    request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}
export interface UsePhantom {
    provider: PhantomProvider;
    balance: number | undefined;
    logs: string[];
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    isConnected: PublicKey | null;
}

const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
        const anyWindow: any = window;
        const provider = anyWindow.solana;
        if (provider.isPhantom) {
            return provider;
        }
    }
    // window.open("https://phantom.app/", "_blank");
};

function usePhantom() {
    const connection = new Connection(NETWORK);
    const [provider, setProvider] = useState<PhantomProvider>();
    const [balance, setBalance] = useState<number>();
    const [tokenBalance, setTokenBalance] = useState<number>();
    const [pubKey, setPubKey] = useState<PublicKey | null>(null)
    const [logs, setLogs] = useState<string[]>([]);
    const addLog = (log: string) => setLogs([...logs, log]);
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (provider) {
            return () => {
                provider.disconnect();
            };
        }
        const theProvider = getProvider();
        setProvider(theProvider);
    }, [provider]);

    const connect = async () => {
        console.log('trying');
        if (!provider) return;
        try {
            const res = await provider.connect();
            addLog(JSON.stringify(res));
            const publicKey = (res.publicKey);
            setPubKey(publicKey);
            connection.getBalance(publicKey).then((bal) => {
                const balance = bal / LAMPORTS_PER_SOL;
                console.log('connected. soL :', balance)
                setBalance(balance);
            });
            if (!TOKEN_MINT) return;
            getTokenBalance(publicKey, connection, new PublicKey(TOKEN_MINT)).then((balance)=>{
                console.log('connected. bonk:', balance)
                setTokenBalance(balance);
            })
        } catch (err) {
            addLog("Error: " + JSON.stringify(err));
        }
    };

    const disconnect = async () => {
        if (!provider) return;
        try {
            const res = await provider.disconnect();
            setPubKey(null);
            addLog(JSON.stringify(res));
        } catch (err) {
            console.warn(err);
            addLog("Error: " + JSON.stringify(err));
        }
    };
    return {
        provider,
        balance,
        tokenBalance,
        logs,
        pubKey,
        connect,
        disconnect,
        isConnected: provider && provider.publicKey,
    };
}

export default usePhantom;