const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } = require("@opentelemetry/tracing");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const provider = new NodeTracerProvider()
const consoleExport = new ConsoleSpanExporter()
const spanProcessor = new SimpleSpanProcessor(consoleExport)
provider.addSpanProcessor(spanProcessor)
provider.register()

// const zipkinExporter = new ZipkinExporter({
//   url: 'http://localhost:9411/api/v2/spans',
//   _serviceName: 'car-service'
// })

// const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
// provider.addSpanProcessor(zipkinProcessor)

registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()],
});


const option = {
    tags: [], // optional
    // You can use the default UDPSender
    host: 'localhost', // optional
    port: 6832, // optional
    // OR you can use the HTTPSender as follows
    // endpoint: 'http://localhost:14268/api/traces',
    maxPacketSize: 65000, // optional,
    serviceName: 'carService'
  }
  
  const exporter = new JaegerExporter(option);
  
  provider.addSpanProcessor(new BatchSpanProcessor(exporter))

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

app.get('/cars', (req, res, next) => {
    // res.json(cars)
    next()
})

app.listen(port, () => {
  console.log(`user server is running on ${port}`);
})