module.exports = {
    name: "application",
    async execute(interaction, client) {
        try {
            // Your code here
        } catch (error) {
            console.log(error);
            interaction.reply({
                content: "An error occurred, please try again later.",
                ephemeral: true,
            });
        }
    }
}