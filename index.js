import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { uploadVideo } from "./upload.js";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());
app.use(cors());

// Set up Multer for file upload
const storage = multer.memoryStorage(); // Store files in memory (you can change this)
const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello from your express app" });
});

app.post("/", upload.single("videoFile"), async (req, res) => {
  let { accessToken } = req.body;

  try {
    let response = await uploadVideo(accessToken, req.file.buffer);

    if (response?.data) {
      res
        .status(200)
        .json({ message: "Video uploaded successfully", data: response.data });
    } else {
      res.status(500).json({ message: "Video upload error", data: response });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unexpected error" });
  }
});

app.post("/test", upload.single("videoFile"), async (req, res) => {
  let { accessToken } = req.body;
  console.log("accessToken", accessToken);
  console.log("req.file", req.file);
  console.log("reqBody", req.body);

  fs.writeFile(req.file.originalname, req.file.buffer, (err) => {
    if (err) {
      console.error("Error writing MP4 file:", err);
    } else {
      console.log("MP4 file written successfully.");
    }
  });

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
