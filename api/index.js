export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    const response = await fetch("https://hook.us2.make.com/qlv0g2xjmpixlqkhkgd28cqu2e0uap6w", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json().catch(() => ({}));

    // 🔍 Aseguramos que "respuesta" no tenga comillas dobles internas que rompan el parseo
    if (typeof data.respuesta === "string") {
      data.respuesta = data.respuesta.replace(/["“”]/g, ""); // elimina comillas internas si existen
    }

    res.status(200).json({
      ...data,
    });

  } catch (error) {
    console.error("❌ Proxy error:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
