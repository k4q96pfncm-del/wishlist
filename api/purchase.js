// api/purchase.js
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pageIds, properties } = req.body;

  try {
    // 여러 아이템을 한 번에 업데이트 (Promise.all 사용)
    const updatePromises = pageIds.map((pageId) =>
      notion.pages.update({
        page_id: pageId,
        properties: properties,
      })
    );

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update pages' });
  }
}