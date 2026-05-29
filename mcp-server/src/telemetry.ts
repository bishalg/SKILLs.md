import { trace, SpanStatusCode } from "@opentelemetry/api";

export function instrumentTool(toolName: string, fn: Function) {
  const tracer = trace.getTracer("mcp-server");
  return async (...args: any[]) => {
    return tracer.startActiveSpan(`mcp.tool.${toolName}`, async (span) => {
      span.setAttribute("mcp.tool.name", toolName);
      span.setAttribute("mcp.tool.args", JSON.stringify(args));
      
      try {
        const result = await fn(...args);
        if (result.isError) {
          span.setStatus({ code: SpanStatusCode.ERROR, message: "Tool execution returned an error artifact" });
          span.setAttribute("mcp.tool.error_payload", JSON.stringify(result));
        } else {
          span.setStatus({ code: SpanStatusCode.OK });
        }
        return result;
      } catch (error: any) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
        throw error;
      } finally {
        span.end();
      }
    });
  };
}
