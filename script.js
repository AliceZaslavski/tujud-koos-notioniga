const NOTION_API_KEY = process.env.NOTION_API_KEY;  // Loeb GitHub Secrets-ist
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;  // Loeb GitHub Secrets-ist

async function sendDataToNotion(date, moods) {
    const response = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${NOTION_API_KEY}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
            parent: { database_id: NOTION_DATABASE_ID },
            properties: {
                "Kuupäev": { date: { start: date } },
                "Tujude loetelu": { 
                    title: [{ text: { content: moods.map(m => m.mood).join(", ") } }]
                },
                "Protsendid": { 
                    number: moods.reduce((sum, m) => sum + m.percentage, 0) / moods.length 
                },
                "Värvid": { 
                    rich_text: [{ text: { content: moods.map(m => `${m.mood}: ${m.color}`).join(", ") } }]
                }
            }
        })
    });

    if (!response.ok) {
        console.error("Notion API viga:", await response.text());
        alert("Viga Notioniga ühendamisel!");
    } else {
        console.log("Andmed edukalt saadetud Notioni!");
        alert("Andmed salvestatud Notioni!");
    }
}
