module.exports = {
    name: 'bakaisdabest',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = process.env.CHANNEL_ID;
        const rollCall = message.guild.roles.cache.find(role => role.name === "Roll Calls");
        const eventCall = message.guild.roles.cache.find(role => role.name === "Event Calls");
 
        const rollCallEmoji = '🌕';
        const eventCallEmoji = '🌑';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#417663')
            .setTitle('We have created the Calls : **ROLL CALLS** and **EVENT CALLS**.')
            .setDescription( 'What are Roll Calls? When a chapter of Supreme Magus is released, you can be notified of the release, if you have the role Roll Calls. You will also be notified for the Mini-Mass release if you have the Roll Calls\n'+
            '\n'+
            'The second call is the Event Calls.\n'+
            'If you want to be notified in advance about some events we organize here which the Author, Legion20, will attend.\n'+
            'E.g. that can be sessions of Q&A (questions and answers) where the Author answers our questions about Supreme Magus.\n'+
            '\n'+
            'Remember to vote for Supreme Magus with Power Stones and Golden Tickets!' +
            '\n'+
            '**NOTE:** If you already have one of the roles and have not reacted to the bot, to remove it, you will have to **REACT AND THEN UNREACT TO THE SAID ROLE**'+
            '\n'+
            '\n'+
            'ALL HAIL LEGION!' +
            '\n' +
            '\n' +
            'In order to subscribe to Roll Calls and Event Calls, react to the following emojis:\n'+
            '**ROLL CALL:**  =>  '+ `${rollCallEmoji}`+
            '\n'+
            '\n'+
            '**EVENT CALL:**  =>  ' +`${eventCallEmoji}`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(rollCallEmoji);
        messageEmbed.react(eventCallEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === rollCallEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(rollCall);
                }
                if (reaction.emoji.name === eventCallEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(eventCall);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === rollCallEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(rollCall);
                }
                if (reaction.emoji.name === eventCallEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(eventCall);
                }
            } else {
                return;
            }
        });
    }
 
}  