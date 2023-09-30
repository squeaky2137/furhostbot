const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Request a page from the documentation")
        .addStringOption((option) => option.setName("page").setDescription("The page you want to request").setRequired(true).setAutocomplete(true))
        .setDMPermission(false),
    async execute(interaction, client) {
        try {
            if(interaction.isAutocomplete()) {
                const focusedValue = interaction.options.getFocused();
                const choices = Object.keys(client.config.urls)
                const filtered = choices.filter(choice => choice.startsWith(focusedValue)).slice(0, 24);
                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );
            } else {
                let pageKey = interaction.options.getString("page");
                let unknownPage = new EmbedBuilder()
                    .setTitle("Unknown page")
                    .setDescription(`The page \`${pageKey}\` does not exist!`)
                    .setColor("#ff0000");
                if(!client.config.urls[pageKey]) return interaction.reply({embeds: [unknownPage], ephemeral: true});
                let page = client.config.urls[pageKey];


                let embed = new EmbedBuilder()
                    .setColor(client.config.embed.color || "#800080");

                if(client.config.embed.footer) {
                    embed.setFooter({
                        text: client.config.embed.footer
                            .replaceAll("%urlname%", pageKey)
                            .replaceAll("%url%", page.url)
                            .replaceAll("%description%", page.description),
                        iconURL: client.config.embed.footerIcon || null
                    })
                }
                if(client.config.embed.authorName) {
                    embed.setAuthor({
                        name: client.config.embed.authorName
                            .replaceAll("%urlname%", pageKey)
                            .replaceAll("%url%", page.url)
                            .replaceAll("%description%", page.description),
                        iconURL: client.config.embed.authorIcon || null,
                    })
                }
                if(client.config.embed.title) {
                    embed.setTitle(client.config.embed.title
                        .replaceAll("%urlname%", pageKey)
                        .replaceAll("%url%", page.url)
                        .replaceAll("%description%", page.description))
                }
                if(client.config.embed.description) {
                    embed.setDescription(client.config.embed.description
                        .replaceAll("%urlname%", pageKey)
                        .replaceAll("%url%", page.url)
                        .replaceAll("%description%", page.description))
                }
                if(client.config.embed.titleUrl) {
                    embed.setURL(client.config.embed.titleUrl
                        .replaceAll("%urlname%", pageKey)
                        .replaceAll("%url%", page.url)
                        .replaceAll("%description%", page.description))
                }

                interaction.reply({embeds: [embed]});
            }
        }  catch (error) {
            await interaction.editReply({
                content: ["**Error**", `\`\`\`js\n${error}\`\`\``].join("\n"),
                ephemeral: true,
            });
        }
    }
}

