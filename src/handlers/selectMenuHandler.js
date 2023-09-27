async function loadSelectMenus(client) {
  const { selectMenus } = client;

  const { loadFiles } = require("../functions/fileLoader.js");

  const Files = await loadFiles("./src/components/selectMenus");

  Files.forEach((file) => {
    const selectMenu = require(file);
    try {
      client.selectMenus.set(selectMenu.name, selectMenu);
    } catch (error) {
      console.log(error);
    }
  });

  if (selectMenus.size < 1) return;
  return console.log(
    `📜 Successfully loaded ${selectMenus.size} select menu(s)!`
  );
}

module.exports = { loadSelectMenus };