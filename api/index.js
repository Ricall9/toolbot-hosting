export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== 'a4eeb802-0264-4a7b-97c0-8d3149562aa5') {
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }

  try {
    const response = await fetch("https://hook.us2.make.com/qlv0g2xjmpixlqkhkgd28cqu2e0uap6w", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json().catch(() => ({}));
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
