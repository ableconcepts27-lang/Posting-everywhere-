// Uploads a photo or small video to Ayrshare and returns a public URL.
// Needs an Ayrshare plan that includes media upload.

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Use POST." });

  if (!process.env.APP_PASSWORD || !process.env.AYRSHARE_API_KEY) {
    return json(500, { error: "Set APP_PASSWORD and AYRSHARE_API_KEY in your Netlify environment variables." });
  }
  if (event.headers["x-app-password"] !== process.env.APP_PASSWORD) {
    return json(401, { error: "Wrong app password." });
  }

  let input;
  try { input = JSON.parse(event.body || "{}"); }
  catch { return json(400, { error: "Bad request body." }); }

  if (!input.file) return json(400, { error: "No file received." });

  try {
    const res = await fetch("https://api.ayrshare.com/api/media/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AYRSHARE_API_KEY}`
      },
      body: JSON.stringify({ file: input.file, fileName: input.fileName || "upload" })
    });
    const data = await res.json().catch(() => ({}));
    return json(res.status, data);
  } catch (err) {
    return json(502, { error: "Could not reach Ayrshare: " + err.message });
  }
};
