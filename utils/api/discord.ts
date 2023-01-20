import { Client, TextChannel } from 'discord.js';
//const DISCORD_API_TOKEN = process.env.DISCORD_API_TOKEN;
//const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

export async function sendDiscordMsg(message: string, channelId: string, token: string): Promise<void> {
    console.log('1');
    if (!channelId || !token) {
        console.log('Unable to auth discord');
        return;
    }
    console.log('1.1');
    const client = new Client({ intents: ['GuildMessages', 'DirectMessages', 'MessageContent', 'Guilds'] });
    console.log('1.2');
    const x = await client.login(token);
    console.log('login', client.isReady())
    console.log('login-post-5', client.isReady())


    await new Promise<void>((resolve, reject) => {
        client.once("error", reject);
        client.once("ready", () => {
            client.off("error", reject)
            resolve();
        });
    });


    /*     client.once('ready', () => { */
    console.log('2');

    try {
        console.log('3');
        console.log('   - DCRD: 🤖 Connection Established');
        let x = await client.channels.fetch(channelId)
        const channel = client.channels.cache.get(channelId) as TextChannel;
        if (!channel) {
            console.log(`Unable to find channel with id: ${channelId}`);
            return;
        }
        console.log('4');
        channel.send(message).then(() => { console.log('   - DCRD: Message sent to server') });
        console.log('5');
        return;
    }
    catch (error) {
        console.log(`Discord client error: ${error}`);
        return;
    }
    /*     });
        client.on("error", (error: Error) => {
            console.log(`Discord client error: ${error}`);
        }); */
}
