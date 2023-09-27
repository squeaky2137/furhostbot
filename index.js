require("dotenv").config();
const { Client, Collection, Partials } = require("discord.js");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});
const token = process.env.TOKEN;


const { loadButtons } = require("./src/handlers/buttonHandler.js");
const { loadCommands } = require("./src/handlers/commandHandler.js");
const { loadEvents } = require("./src/handlers/eventHandler.js");
const { loadModals } = require("./src/handlers/modalHandler.js");
const { loadSelectMenus } = require("./src/handlers/selectMenuHandler.js");

client.buttons = new Collection();
client.commands = new Collection();
client.events = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();


(async function () {
  await loadButtons(client);
  await loadEvents(client);
  await loadModals(client);
  await loadSelectMenus(client);
}) ();


client.login(token).then(async () => {
  await loadCommands(client);
});
