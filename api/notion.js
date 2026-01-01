// api/notion.js
const { Client } = require('@notionhq/client'); // 중괄호 { } 가 반드시 있어야 합니다!

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export default async function handler(req, res) {
  try {
    const databaseId = process.env.NOTION_DB_ID;
    
    // 데이터베이스 목록 가져오기
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'item', // 정렬 기준 (필요하면 수정)
          direction: 'ascending',
        },
      ],
    });

    res.status(200).json({ results: response.results });
  } catch (error) {
    console.error(error); // Vercel 로그에 에러를 자세히 남김
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}