// src/aws-config.js
import AWS from "aws-sdk";

AWS.config.update({
  region: "us-west-2",
  accessKeyId: "AKIAZI2LIV5VCL4IGU3W",
  secretAccessKey: "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",
});

export const s3 = new AWS.S3();
export const rekognition = new AWS.Rekognition();
