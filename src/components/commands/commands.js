const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("commands")
        .setDescription("test command")
        .setDMPermission(false),
    async execute(interaction, client) {
        try {
            // Your code here
        }  catch (error) {
            await interaction.editReply({
                content: ["**Error**", `\`\`\`js\n${error}\`\`\``].join("\n"),
                ephemeral: true,
            });
        }
    }
}