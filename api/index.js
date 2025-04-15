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

    const result = await response.json().catch(() => ({}));

    // 🔎 Enviamos solo el texto que GPT debe mostrar
    res.status(200).json({
      respuesta: result.respuesta || "No se obtuvo respuesta del sistema.",
    });

  } catch (error) {
    res.status(500).json({
      respuesta: "No se pudo conectar al sistema de gestión en este momento.",
      error: error.message,
    });
  }
}
