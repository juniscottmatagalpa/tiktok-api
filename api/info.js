export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({error:"Método no permitido"});

  const q = req.body?.q || req.query?.q;
  if (!q) return res.status(400).json({error:"Falta parámetro q"});

  try {
    const form = new URLSearchParams({ url: q });

    const r = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      body: form,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const json = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.json(json);

  } catch (e) {
    return res.status(500).json({error:String(e)});
  }
}
