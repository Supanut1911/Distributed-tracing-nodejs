// 'use strict';

// const { LogLevel } = require("@opentelemetry/api");
// // const { LogLevel } = require("@opentelemetry/core");
// const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
// const { NodeTracerProvider } = require("@opentelemetry/node");
// const { SimpleSpanProcessor } = require("@opentelemetry/tracing");

// const provider = new NodeTracerProvider({
//   logLevel: LogLevel.ERROR
// });

// console.log('tracing called');

// provider.register();

// provider.addSpanProcessor(
//     new SimpleSpanProcessor(
//         new ZipkinExporter({
//             serviceName: 'getting-start'
//         })
//     )
// )


// Require dependencies
const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { JaegerExporter}  = require("@opentelemetry/exporter-jaeger")


// Create a tracer provider
const provider = new NodeTracerProvider();

const exporter = new ConsoleSpanExporter();

const processor = new SimpleSpanProcessor(exporter);
provider.addSpanProcessor(processor);

provider.register();

// This will automatically enable all instrumentations
registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()],
});

provider.addSpanProcessor(
    new SimpleSpanProcessor(
        new ZipkinExporter({
            'serviceName': 'get-date'
        }),

        new JaegerExporter({
            serviceName: 'startTrace-Jaeger'
        })
    )
)
// provider.addSpanProcessor(
//     new SimpleSpanProcessor(
//         new JaegerExporter({
//             serviceName: 'startTrace-Jaeger'
//         })
//     )
// )