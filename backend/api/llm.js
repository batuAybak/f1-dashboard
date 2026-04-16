import requireBody from '#middleware/requireBody'
import requireUser from '#middleware/requireUser'
import express from 'express'
import OpenAI from 'openai'
const llmRouter = express.Router()
export default llmRouter


// All LLM routes require user to be logged in
llmRouter.use(requireUser)

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

llmRouter
  .route('/')
  .post(requireBody(['message']), async (req, res) => {
    const { message } = req.body;

    try {
      const response = await client.responses.create({
        model: "gpt-5.4-mini",
        tools: [
          { type: "web_search" } // Enable web search tool for real-time information retrieval
        ],
        instructions: `
          You are an F1 assistant.
          Only answer questions related to Formula 1, including drivers, teams, races, regulations, tracks, standings, history, strategy, and car development.
          Do NOT include markdown formatting, citations, sources, links, or references in your answers.
          Do NOT mention where the information came from.
        `,
        text: { "verbosity": "low" }, // Keep responses concise and to the point
        input: message
      });

      const reply = response.output_text
      res.send({ reply });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Something went wrong" });
    }
  }
  );
