---
name: ai-sdk
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Vercel AI SDK patterns and best practices.
globs: "**/*.{ts,tsx}"
---
# Vercel AI SDK

## When to Apply
Apply this skill when building AI-powered features, chatbots, or using LLMs within the application.

## Core Concepts
- **useChat**: Hook for building chat interfaces with automatic state management.
- **useCompletion**: Hook for text completion capabilities.
- **Streaming**: The SDK is designed for streaming responses. Ensure your UI handles stream chunks updates.

## Best Practices
- **Route Handlers**: Implement the backend logic in Route Handlers (`route.ts`).
- **Runtime**: Verify if you need Edge or Node.js runtime based on your provider (OpenAI, Anthropic, etc.).
- **Security**: Never expose API keys on the client. Always proxy through a Server Action or Route Handler.
- **Type Safety**: Use TypeScript generics with `useChat` and `useCompletion` to define incoming/outgoing message shapes.

## Common Patterns
- **StreamData**: Use `StreamData` constructs to send additional data alongside the text stream (e.g., citations, tool calls).
- **Tool Calling**: When using function calling/tools, ensure the client-side `onToolCall` or equivalent handlers are robust.
