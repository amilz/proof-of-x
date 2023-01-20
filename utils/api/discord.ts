import { Client, TextChannel } from 'discord.js';
//const DISCORD_API_TOKEN = process.env.DISCORD_API_TOKEN;
//const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
import { once } from "node:events"

export async function sendDiscordMsg(message: string, channelId: string, token: string): Promise<void> {
    if (!channelId || !token) {
        console.log('Unable to auth discord');
        return;
    }
    const client = new Client({ intents: ['GuildMessages', 'DirectMessages', 'MessageContent', 'Guilds'] });

    try {
        await client.login(token);
        await once(client, "ready");
        console.log('   - DCRD: 🤖 Connection Established');
    }
    catch {
        console.log(`Discord connection error.`);
        return;
    }

    try {
        let x = await client.channels.fetch(channelId)
        const channel = client.channels.cache.get(channelId) as TextChannel;
        if (!channel) {
            console.log(`Unable to find channel with id: ${channelId}`);
            return;
        }
        channel.send(message).then(() => { console.log('   - DCRD: Message sent to server') });
        return;
    }
    catch (error) {
        console.log(`Discord client error: ${error}`);
        return;
    }
}
