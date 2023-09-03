import { google } from "googleapis";
import { Readable } from "stream";
import fs from "fs";

const apiKey = process.env.API_KEY;

async function uploadVideo(accessToken, videoBuffer) {
  const youtube = google.youtube({
    version: "v3",
    auth: apiKey,
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
    const videoStream = Readable.from(videoBuffer);
    const response = await youtube.videos.insert({
      part: "snippet,status",
      resource: videoResource,
      media: {
        body: videoStream,
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
