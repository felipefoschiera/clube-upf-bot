import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageSelectMenu } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('addrole')
	.setDescription('Adiciona um cargo ao menu de seleção de cargos em uma mensagem.')
	.addChannelOption(option =>
		option.setName('channel')
			.setDescription('O canal contendo a mensagem.')
			.setRequired(true),
	)
	.addStringOption(option =>
		option.setName('message_id')
			.setDescription('O ID da mensagem.')
			.setRequired(true),
	)
	.addRoleOption(option =>
		option.setName('role')
			.setDescription('O cargo a ser adicionado à mensagem.')
			.setRequired(true),
	)
	.setDefaultPermission(false);

export const execute = async (interaction) => {
	const channel = interaction.options.getChannel('channel');
	const messageId = interaction.options.getString('message_id');
	const role = interaction.options.getRole('role');

	const targetMessage = await channel.messages.fetch(messageId, {
		cache: true,
		force: true,
	});

	if (!targetMessage) {
		return 'ID de mensagem desconhecido!';
	}

	let row = targetMessage.components[0];
	if (!row) {
		row = new MessageActionRow();
	}
	const option = [{
		label: role.name,
		value: role.id,
	}];

	const menu = row.components[0];

	if (menu) {
		for (const menuOption of menu.options) {
			if (menuOption.value === option[0].value) {
				await interaction.reply({ content: `<@&${menuOption.value}> já está presente no menu!`, ephemeral: true });
				return;
			}
		}
		menu.addOptions(option);
		menu.setMaxValues(menu.options.length);
	} else {
		row.addComponents(new MessageSelectMenu()
			.setCustomId('auto_roles')
			.setMinValues(0)
			.setMaxValues(1)
			.setPlaceholder('Selecione seus cargos...')
			.addOptions(option),
		);
	}

	targetMessage.edit({
		components: [row],
	});

	await interaction.reply({ content: `Cargo <@&${role.id}> adicionado ao menu!`, ephemeral: true });
};