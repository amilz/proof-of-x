import { Client, TextChannel } from 'discord.js';
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
        console.log(`   ❌ DCRD: Connection error.`);
        return;
    }

    try {
        let x = await client.channels.fetch(channelId)
        const channel = client.channels.cache.get(channelId) as TextChannel;
        if (!channel) {
            console.log(`   ❌ DCRD: Unable to find channel with id: ${channelId}`);
            return;
        }
        await channel.send(message);
        console.log('   - DCRD: Message sent to server');
        return;
    }
    catch (error) {
        console.log(`   ❌ DCRD: Client error: ${error}`);
        return;
    }
    finally {
        client.destroy();
        console.log('   - DCRD: 🤖 Connection destroyed');
        return;
    }

}
