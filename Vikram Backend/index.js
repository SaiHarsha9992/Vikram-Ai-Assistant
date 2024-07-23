import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { promises as fs } from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AWS from "aws-sdk";

//env file to save the api keys
dotenv.config();

//Api keys for using external sources
const geminiApiKey = process.env.GEMINI_API_KEY;

//AWS Polly configuration
AWS.config.update({
  accessKeyId: "AKIAZQ3DTBTRWELFEIW3",
  secretAccessKey: "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",
  region: "us-east-1",
});
const polly = new AWS.Polly();

//Voice id for AWS Polly
const voiceID = "Matthew"; // Change this to your preferred voice

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//commands for automatically executing
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

//Lip Sync for 3D model
const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message ${message}`);
  const ffmpegPath = "C:/PATH_Programs/ffmpeg";
  await execCommand(
    `${ffmpegPath} -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
    // -y to overwrite the file
  );
  console.log(`Conversion done in ${new Date().getTime() - time}ms`);
  const rhubarbPath =
    "D:/Three/r3f-virtual-backend/Rhubarb-Lip-Sync-1.13.0-Windows/rhubarb";
  await execCommand(
    `${rhubarbPath} -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
  );
  // -r phonetic is faster but less accurate
  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};
let userName = "";

// Endpoint to receive and store username
app.post("/user", (req, res) => {
  userName = req.body.name;
  console.log("Received user name:", userName);
  res.json({ message: `User name ${userName} received successfully.` });
});

//Chat for using from front end to use the Chat and Text to speech
app.post("/chat", async (req, res) => {
  //from the front end
  const userMessage = req.body.message;

  //if user is not send any message then character react for this message
  if (!userMessage) {
    res.send({
      messages: [
        {
          text: "Hey dear... How was your day?",
          audio: await audioFileToBase64("audios/intro_0.wav"),
          lipsync: await readJsonTranscript("audios/intro_0.json"),
          facialExpression: "smile",
          animation: "Talking_1",
        },
        {
          text: "I missed you so much... Please don't go for so long!",
          audio: await audioFileToBase64("audios/intro_1.wav"),
          lipsync: await readJsonTranscript("audios/intro_1.json"),
          facialExpression: "sad",
          animation: "Crying",
        },
      ],
    });
    return;
  }

  //if user is not providing the api keys then character responds to this message
  if (!geminiApiKey) {
    res.send({
      messages: [
        {
          text: "Please my dear, don't forget to add your API keys!",
          audio: await audioFileToBase64("audios/api_0.wav"),
          lipsync: await readJsonTranscript("audios/api_0.json"),
          facialExpression: "angry",
          animation: "Angry",
        },
        {
          text: "You don't want to ruin G.K.S.Harsha with a crazy ChatGPT bill, right?",
          audio: await audioFileToBase64("audios/api_1.wav"),
          lipsync: await readJsonTranscript("audios/api_1.json"),
          facialExpression: "smile",
          animation: "Laughing",
        },
      ],
    });
    return;
  }

  let text;
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const completion = async (userMessage) => {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a virtual ai assistant and it has physical body your name is Vikram you have a feature an ai assistant with security. Your creator or boss name is G.K.S.Harsha, your user name is "${userName}" Respond to the following user message with a array of up to 3 messages in json format of objects. Each message should have text without emoji's, a facial expression, and an animation. 
      The different facial expressions are: smile, sad, angry, surprised,and default.
      The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Dance, Fight, Idle, Argue, and Angry.
      use fight animation if user ask do you fight
      Make sure the animations are different for each message.
      
      User message: "${userMessage}"
      `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      text = await response.text();
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };
  // send the user message to gemini ai
  await completion(userMessage);

  // the gemini ai sendining json and '' some gaps so i removed it replace with ''
  text = text.replace(/json/g, "");
  text = text.replace(/`/g, "");

  console.log(text);
  const messages = JSON.parse(text);

  //Looping the message the json array file
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    console.log(message.text);

    // generate audio file making filename
    const fileName = `audios/message_${i}.mp3`;

    //text input to from gemini ai
    const textInput = message.text;

    //using AWS Polly to convert text to speech
    const params = {
      OutputFormat: "mp3",
      Text: textInput,
      VoiceId: voiceID,
    };

    try {
      const data = await polly.synthesizeSpeech(params).promise();
      await fs.writeFile(fileName, data.AudioStream);
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }

    // generate lipsync
    await lipSyncMessage(i);

    //converting audio bytes code to base64 and saved in into json object
    message.audio = await audioFileToBase64(fileName);

    //converting audio file to the json wave script for generation the lipsync script
    message.lipsync = await readJsonTranscript(`audios/message_${i}.json`);
  }

  //sending the messages to the front end
  res.send({ messages });
});

//This function converts the parsing into json
const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

//This function converts the parsing into audio file
const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

//Listening the portal in the server of 3000
app.listen(port, () => {
  console.log(`Virtual Girlfriend listening on port ${port}`);
});
