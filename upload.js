import { google } from "googleapis";
import fs from "fs";

async function uploadVideo(accessToken) {
  const youtube = google.youtube({
    version: "v3",
    auth: "AIzaSyCS0V5ed0zPD5Fj4Nv1PqPvaOQRrDJpuKg",
  });

  // Prepare the video resource
  const videoResource = {
    snippet: {
      title: "Uploaded Video Title",
      description: "Uploaded Video Description",
    },
    status: {
      privacyStatus: "private",
    },
  };
  try {
    const response = await youtube.videos.insert({
      part: "snippet,status",
      resource: videoResource,
      media: {
        body: fs.createReadStream("./p.mp4"),
      },
      auth: `Bearer ${accessToken}`,
      access_token: accessToken,
    });
    return response;
  } catch (err) {
    console.error("err", err);
    return err;
  }
}

export { uploadVideo };
