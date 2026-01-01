// api/notion.js
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY });

export default async function handler(req, res) {
  try {
    const databaseId = process.env.NOTION_DB_ID;
    
    // 노션 데이터베이스 쿼리
    const response = await notion.databases.query({
      database_id: databaseId,
      // 필요한 경우 여기에 정렬(sorts)이나 필터(filter) 추가 가능
    });

    res.status(200).json({ results: response.results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}