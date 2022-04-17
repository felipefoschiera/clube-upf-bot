const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('Send a message on a chat!')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to send the message to.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('text')
				.setDescription('The text message content')
				.setRequired(true),
		)
		.setDefaultPermission(false),
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel');
		const text = interaction.options.getString('text');
		channel.send(text);
		await interaction.reply({ content: 'Message sent!', ephemeral: true });
	},
};