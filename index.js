export const config = {
  api: {
    bodyParser: false, // desactivamos parser automático
  },
};

export default async function handler(req, res) {
  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const rawBody = Buffer.concat(buffers).toString();

    const response = await fetch("https://hook.us2.make.com/qlv0g2xjmpixlqkhkgd28cqu2e0uap6w", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawBody,
    });

    const responseText = await response.text();
    res.status(response.status).send(responseText);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
