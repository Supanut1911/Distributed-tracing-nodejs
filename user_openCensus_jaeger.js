// "use strict";
// const PORT = process.env.PORT || "8080";
// const express = require("express");
// const app = express();
// // con st { countAllRequests } = require("./monitoring");

// app.use(express.json()) 
// // app.use(countAllRequests());

// let users = [
//   {
//     id: "001",
//     name: "objA"
//   },
//   {
//     id: "002",
//     name: "objB"
//   },
// ]
// app.get("/", (req, res) => { res.send("Hello World"); });

// app.get("/getusers", (req, res) => {
//   res.json(users)
// })

// app.post('/', (req, res) => {
//   console.log(req.body);
//   let {id, name} = req.body

//   try {
//     let item = {
//       id,
//       name
//     }
//     console.log('item =>', item);
//     users.push(item)
//     res.send('add success')
  
//   } catch (error) {
//     console.log(error);
//     res.send('error')
//   }
// })

// app.get('/error', (req, res) => {
//   try {
//     error
//   } catch (error) {
//     throw new error
//   }
// })

// app.get('/date', (req, res) => {
//   res.json({ today: new Date()})
// })

// app.listen(parseInt(PORT, 10), () => { console.log(`Listening for requests on http://localhost:${PORT}`); });



const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } = require("@opentelemetry/tracing");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
// const { registerInstrumentations } = require('@opentelemetry/instrumentation');

// const provider = new NodeTracerProvider()
// const consoleExport = new ConsoleSpanExporter()
// const spanProcessor = new SimpleSpanProcessor(consoleExport)
// provider.addSpanProcessor(spanProcessor)
// provider.register()

// const zipkinExporter = new ZipkinExporter({
//   url: 'http://localhost:9411/api/v2/spans',
//   _serviceName: 'user-service'
// })

// const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
// provider.addSpanProcessor(zipkinProcessor)

// registerInstrumentations({
//   instrumentations: [getNodeAutoInstrumentations()],
// });
const { logger } = require('@opencensus/core');
const tracing = require('@opencensus/nodejs');
const { JaegerTraceExporter } = require('@opencensus/exporter-jaeger');

const jaegerOptions = {
  serviceName: 'userService',
  host: 'localhost',
  port: 6832,
  tags: [], // optional
  maxPacketSize: 65000, // optional
  tags: [{key: 'opencensus-exporter-jeager', value: '0.0.9'}],
  bufferTimeout: 10, // time in milliseconds
  logger: logger.logger('debug')

}

const exporter = new JaegerTraceExporter(jaegerOptions);
tracing.start({'exporter': exporter});


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

app.get('/doError', (req , res, next) => {
  try {
    doAthing();
  } catch(e) {
    console.log(e);
    // [Error: Uh oh!]
    next(e)
  }
})

function doAthing() {
  throw new Error('Uh oh')
}

app.listen(port, () => {
  console.log(`user server is running on ${port}`);
})





