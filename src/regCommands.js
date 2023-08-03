require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'fics',
    description: 'Displays fics.',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Resgistered");
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
})();
