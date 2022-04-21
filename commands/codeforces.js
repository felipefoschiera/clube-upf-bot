import { SlashCommandBuilder } from '@discordjs/builders';
import { getContestsMessage } from '../codeforces';

export const data = new SlashCommandBuilder()
	.setName('codeforces')
	.setDescription('Exibir constests do Codeforces!')
	.addChannelOption(option =>
		option.setName('channel')
			.setDescription('O canal para onde enviar a mensagem.')
			.setRequired(true),
	)
	.setDefaultPermission(false);

export const execute = async (interaction) => {
	const channel = interaction.options.getChannel('channel');
	await interaction.deferReply({ ephemeral: true });

	const text = await getContestsMessage();
	channel.send(text);
	await interaction.editReply({ content: 'Mensagem de contests enviada!', ephemeral: true });
};