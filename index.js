import express from "express";
import cors from "cors";
import { uploadVideo } from "./upload.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello from your express app" });
});

app.post("/", async (req, res) => {
  let { accessToken } = req.body;
  try {
    let response = await uploadVideo(accessToken);

    if (response?.data) {
      console.log("Video uploaded:", response.data);
      res.status(200).json({ message: "Video uploaded successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unexpected error" });
  }
});

app.post("/test", async (req, res) => {
  let { accessToken } = req.body;
  console.log("accessToken", accessToken);
  try {
    const responseObject = {
      message: "This is a test endpoint",
      data: { key1: "value1", key2: "value2" },
    };

    // Send the object as JSON response
    res.json(responseObject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
