import db from "../../utils/db";

const entry = async (req, res) => {
  try {
    const entries = await db.collection("entries").get();

    const { id } = await db.collection("entries").add({
      ...req.body,
      created: new Date().toISOString(),
    });
    res.status(200).json({ id });
  } catch (e) {
    res.status(400).end();
  }
};

export default entry;
