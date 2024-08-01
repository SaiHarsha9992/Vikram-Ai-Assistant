// src/aws-config.js
import AWS from "aws-sdk";

AWS.config.update({
  region: "",
  accessKeyId: "",
  secretAccessKey: "",
});

export const s3 = new AWS.S3();
export const rekognition = new AWS.Rekognition();
