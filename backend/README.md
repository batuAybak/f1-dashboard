## AI Assistant Configuration

The authenticated F1 assistant route lives at `POST /ask` and uses the OpenAI Responses API.

Required environment variables:

- `OPENAI_API_KEY`: API key used for the assistant.

Optional environment variables:

- `OPENAI_MODEL`: Overrides the default model (`gpt-5.4-mini`).
- `OPENAI_ENABLE_WEB_SEARCH`: Set to `false` to disable live web search.

Request body:

```json
{
  "message": "Who won the last race?",
  "history": [
    { "role": "user", "content": "Summarize the 2026 season so far." },
    { "role": "assistant", "content": "McLaren has started strongly..." }
  ]
}
```

The API sanitizes chat history, limits conversation context, and keeps responses scoped to Formula 1 topics.
