const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } = require("@opentelemetry/tracing");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");

const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const provider = new NodeTracerProvider()
const consoleExport = new ConsoleSpanExporter()
const spanProcessor = new SimpleSpanProcessor(consoleExport)
provider.addSpanProcessor(spanProcessor)
provider.register()

const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411/api/v2/spans',
  _serviceName: 'user-service'
})

const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
provider.addSpanProcessor(zipkinProcessor)

registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()],
});

const express = require('express')
const app = express()
const port = 3000

const axios = require('axios')
const cors = require('cors')
app.use(cors())
const users = [
  {
    id: "001",
    name: "objA"
  },
  {
    id: "002",
    name: "objB"
  },
]

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users_and_cars', async (req, res, next) => {
  try {
    let carsRes = await axios({
      method: 'get',
      url: 'http://localhost:3001/cars'
    })
    console.log('==========>>',carsRes.data);
    
    res.send('okay')
  } catch (error) {
    console.log(error);
    // throw error
    res.send('error')
  }
 
})

app.listen(port, () => {
  console.log(`user server is running on ${port}`);
})





