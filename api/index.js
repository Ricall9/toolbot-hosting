export const config = {
  api: {
    bodyParser: true, // ACTIVAMOS bodyParser
  },
};

export default async function handler(req, res) {
  try {
    const response = await fetch("https://hook.us2.make.com/qlv0g2xjmpixlqkhkgd28cqu2e0uap6w", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body), // accedemos directamente al body
    });

    const data = await response.json().catch(() => ({}));
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
