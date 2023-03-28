const express = require('express')
const app = express()
const mongoose = require('mongoose')
const AnalyzedSpeechesModel = require('./models/analyzed-speeches')
const PORT = 7000

mongoose.Promise = global.Promise;

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Siibato:NRwsxHQNxZirPeuT@googlesolutionchallenge.fsl35oy.mongodb.net/GoogleSolutionChallengeBSSE1?retryWrites=true&w=majority")

app.get('/getSpeeches', async (req, res) => {
  const allSpeeches = await AnalyzedSpeechesModel.find()
  res.status(200).send({
    status: 'Success',
    data: allSpeeches,
  })
})

app.get('/getSpeeches', async (req, res) => {
  const allSpeeches = await AnalyzedSpeechesModel.find()
  res.status(200).send({
    status: 'Success',
    data: allSpeeches,
  })
})

app.post("/createSpeech", async (req, res) => {
  const speech = req.body;
  const newSpeech = new AnalyzedSpeechesModel(speech);
  await newSpeech.save();

  res.json(speech);
});

app.delete("/deleteSpeech/:id", async (req, res) => {
  try {
    const speechId = req.params.id;
    const result = await AnalyzedSpeechesModel.findByIdAndDelete(speechId);
    if (result === null) {
      res.status(404).json({ error: "Speech not found" });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("listening to port " + PORT);
});