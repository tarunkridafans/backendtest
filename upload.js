import { google } from "googleapis";
import fs from "fs";

async function uploadVideo(accessToken) {
  const youtube = google.youtube({
    version: "v3",
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
  } catch (err) {
    console.log("err", err);
  }
}

export { uploadVideo };
