export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  console.log("📥 Request body recibido en Vercel:", req.body);

  try {
    const response = await fetch("https://hook.us2.make.com/qlv0g2xjmpixlqkhkgd28cqu2e0uap6w", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const responseText = await response.text();

    console.log("📤 Respuesta desde Make:", responseText);

    // Intenta enviar el contenido tal cual lo recibe desde Make
    res.status(response.status).send(responseText);
  } catch (error) {
    console.error("❌ Error en el proxy:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
