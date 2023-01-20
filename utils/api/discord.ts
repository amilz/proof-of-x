import { Client, TextChannel } from 'discord.js';
const DISCORD_API_TOKEN = process.env.DISCORD_API_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

export function sendDiscordMsg (message: string):void {
    if (!CHANNEL_ID || !DISCORD_API_TOKEN) {
        console.log('Unable to auth discord');
        return;
    }
    const client = new Client({ intents: ['GuildMessages', 'DirectMessages', 'MessageContent', 'Guilds'] });
    client.login(DISCORD_API_TOKEN);
    client.once('ready', () => {
        try {
            console.log('   - DCRD: 🤖 Connection Established');
            const channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;
            if (!channel) {
                console.log(`Unable to find channel with id: ${CHANNEL_ID}`);
                return;
            }
            channel.send(message).then(()=>{console.log('   - DCRD: Message sent to server')});
            return;
        }
        catch (error) {
            console.log(`Discord client error: ${error}`);
            return;
        }
    });
    client.on("error", (error: Error) => {
        console.log(`Discord client error: ${error}`);
    });
}
