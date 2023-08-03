require("dotenv").config();
const mysql = require("mysql");
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASS,
  database: "fics",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected.");
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "fics") {
    let sql = "SELECT * FROM fics LIMIT 20";
    db.query(sql, (err, result) => {
      if (err) throw err;
      const embed = new EmbedBuilder()
      .setTitle('RE:Zero fics')
      .setDescription('Fics from Ao3.')
      .setColor('Random')
      .addFields(
        {
          name: `${result[0].name} by ${result[0].author} as of ${result[0].date}`,
          value: `${result[0].url}`,
        },
        {
          name: `${result[1].name} by ${result[1].author} as of ${result[1].date}`,
          value: `${result[1].url}`,
        },
        {
          name: `${result[2].name} by ${result[2].author} as of ${result[2].date}`,
          value: `${result[2].url}`,
        },
        {
          name: `${result[3].name} by ${result[3].author} as of ${result[3].date}`,
          value: `${result[3].url}`,
        },
        {
          name: `${result[4].name} by ${result[4].author} as of ${result[4].date}`,
          value: `${result[4].url}`,
        }
      );
      interaction.reply({ embeds: [embed] });
    });
  }
});

client.login(
  process.env.TOKEN
);
