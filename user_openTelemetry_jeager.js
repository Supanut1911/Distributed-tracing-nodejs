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
//   console.log(req.body);//   let {id, name} = req.body

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

const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const { Resource } = require('@opentelemetry/resources');
const { ResourceAttributes } = require('@opentelemetry/semantic-conventions');

const provider = new NodeTracerProvider({
  servicName: 'userService',
  resource: new Resource({
    [ResourceAttributes.SERVICE_NAME]: 'userXservice'
  })
})
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

const option = {
  service: {
    name: 'userService'
  },
  serviceName: 'userService',
  tags: [], // optional
  // You can use the default UDPSender
  host: 'localhost', // optional
  port: 6832, // optional
  // OR you can use the HTTPSender as follows
  // endpoint: 'http://localhost:14268/api/traces',
  maxPacketSize: 65000, // optional
  // serviceName: 'userService'
}

const config = {
  servicName: 'userService'
}

const exporter = new JaegerExporter(config, option);

provider.addSpanProcessor(new SimpleSpanProcessor( exporter))


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
    name: "objB"  },
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




