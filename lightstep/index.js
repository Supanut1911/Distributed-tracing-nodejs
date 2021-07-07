'use strict';


const { lightstep, opentelemetry } =
      require("lightstep-opentelemetry-launcher-node");
      
// Set access token. If you prefer, set the LS_ACCESS_TOKEN environment variable instead, and remove accessToken here.
const accessToken = 'A0Pd8adJSxkE1lzQxaJ+j+ErPuddVAeucmZeV/nbl6jxVx8q/G8QqjY1nn85nrHDLPkSwFqQMqHFu9JKcHtHKYMddCkT0ZuWg6ev1zET';

const sdk = lightstep.configureOpenTelemetry({
  accessToken,
  serviceName: 'tacktoken',
});

const PORT = process.env.PORT || 8080;

sdk.start().then(() => {
    // All of your application code and any imports that should leverage
    // OpenTelemetry automatic instrumentation must go here; e.g.,
    // const express = require('express');
  
    // // If you're using an automatically instrumented library (such as Express,
    // // as above), spans will be created automatically.  If you would like to manually
    // // create a span, uncomment the lines below:
    // const tracer = opentelemetry.trace.getTracer('example');
    // const span = tracer.startSpan('test-span');
    // span.end();
    // tracer.getActiveSpanProcessor().shutdown();


  const express = require('express');
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('running...');
  });

  app.get('/ping', (req, res) => {
    console.log(req.rawHeaders);
    res.send('pong');
  });

  app.listen(PORT);
  console.log(`Running on ${PORT}`);
});