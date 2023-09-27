module.exports = {
    id: "button",
    async execute(interaction, client) {
        try {
            // Your code here
        }  catch (error) {
            console.log(error);
            interaction.reply({
                content:
                    "An unknown error occurred, check the console for more information.",
                ephemeral: true,
            });
        }
    }
}