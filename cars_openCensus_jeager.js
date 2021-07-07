const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } = require("@opentelemetry/tracing");
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

    const provider = new NodeTracerProvider()
    const consoleExport = new ConsoleSpanExporter()
    const spanProcessor = new SimpleSpanProcessor(consoleExport)
    provider.addSpanProcessor(spanProcessor)
    provider.register()



registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()],
});

const tracing = require('@opencensus/nodejs');
const { JaegerTraceExporter } = require('@opencensus/exporter-jaeger');

const jaegerOptions = {
  serviceName: 'carService',
  host: 'localhost',
  port: 6832,
  tags: [], // optionalq
  maxPacketSize: 65000, // optional

}

const exporter = new JaegerTraceExporter(jaegerOptions);
tracing.start({exporter: exporter})
tracing.registerExporter(exporter).start();



const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
app.use(cors())
const cars = [
  {
    name: "GTR"
  },
  {
    name: "AE86" 
  },
]

app.get('/cars', (req, res) => {
    res.json(cars)
})

app.listen(port, () => {
  console.log(`user server is running on ${port}`);
})