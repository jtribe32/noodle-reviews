import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status({ statusCode: 405 })
      .send({ body: { message: "Only Post Rrequests are allowed" } });
  }
  const body = req.body;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "A1:E1",
      valueInputOption: "RAW",
      resource: {
        values: [
          [body.timeStamp, body.name, body.taste, body.spice, body.size],
        ],
      },
    });

    return res.status({ statusCode: 200 }).json({ body: response.data });
  } catch (e) {
    return res
      .status({ statusCode: 500 })
      .send({ body: { message: e.message } });
  }
}
