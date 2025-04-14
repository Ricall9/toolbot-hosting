export default async function handler(req, res) {
  const forwardRes = await fetch("https://hook.us2.make.com/qlv0g2xjmpixlqkhkgd28cqu2e0uap6w", {
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(req.body)
  });

  const data = await forwardRes.json().catch(() => ({}));

  res.status(forwardRes.status).json(data);
}
