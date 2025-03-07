require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

async function addMoodEntry(date, moods) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                Date: { date: { start: date } },
                Mood: { multi_select: moods.map(mood => ({ name: mood })) }
            }
        });
        console.log("Notion värskendatud:", response.id);
    } catch (error) {
        console.error("Viga Notioni saatmisel:", error.body);
    }
}

const date = new Date().toISOString().split('T')[0];
const moods = ["Rõõmus", "Kurb"];  // Testimiseks, asenda dünaamilise väärtusega

addMoodEntry(date, moods);
