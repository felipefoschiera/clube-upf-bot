import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
	.setName('send')
	.setDescription('Enviar uma mensagem em um canal!')
	.addChannelOption(option =>
		option.setName('channel')
			.setDescription('O canal para onde enviar a mensagem.')
			.setRequired(true),
	)
	.addStringOption(option =>
		option.setName('text')
			.setDescription('O conteúdo da mensagem')
			.setRequired(true),
	)
	.setDefaultPermission(false);

export const execute = async (interaction) => {
	const channel = interaction.options.getChannel('channel');
	const text = interaction.options.getString('text');
	channel.send(text);
	await interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
};