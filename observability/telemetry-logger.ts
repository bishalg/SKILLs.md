import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { trace, type Span, SpanStatusCode } from '@opentelemetry/api';

/**
 * Agentic Telemetry Logger
 * Instrumented for GenAI Semantic Conventions (2026)
 */
export class TelemetryLogger {
  private static sdk: NodeSDK;

  static init(serviceName: string) {
    this.sdk = new NodeSDK({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      }),
      spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()), // Replace with OTLP for Jaeger
    });
    this.sdk.start();
    console.error(`📡 Telemetry initialized for ${serviceName}`);
  }

  static async traceStep<T>(
    agentId: string,
    sessionId: string,
    stepName: string,
    inputs: any,
    fn: (span: Span) => Promise<T>
  ): Promise<T> {
    const tracer = trace.getTracer('agentic-skills');
    return tracer.startActiveSpan(`agent.${agentId}.${stepName}`, async (span) => {
      span.setAttribute('gen_ai.agent.id', agentId);
      span.setAttribute('gen_ai.session.id', sessionId);
      span.setAttribute('gen_ai.prompt.input', JSON.stringify(inputs));

      const startTime = Date.now();
      try {
        const result = await fn(span);
        span.setAttribute('gen_ai.completion.output', JSON.stringify(result));
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
      } catch (error: any) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
        throw error;
      } finally {
        span.setAttribute('gen_ai.latency_ms', Date.now() - startTime);
        span.end();
      }
    });
  }

  static async shutdown() {
    await this.sdk.shutdown();
  }
}
