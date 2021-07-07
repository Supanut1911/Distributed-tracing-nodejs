const {
    lightstep,
    opentelemetry,
   } = require('lightstep-opentelemetry-launcher-node');
   
   const sdk = lightstep.configureOpenTelemetry({
    accessToken: 'A0Pd8adJSxkE1lzQxaJ+j+ErPuddVAeucmZeV/nbl6jxVx8q/G8QqjY1nn85nrHDLPkSwFqQMqHFu9JKcHtHKYMddCkT0ZuWg6ev1zET',
    serviceName: 'hello-server-1',
    serviceVersion: 'v1.2.3',
    propagators: 'tracecontext,b3',
   });
   
   sdk.start().then(() => {
    require('./server');
   });
   
   function shutdown() {
    sdk.shutdown().then(
      () => console.log("SDK shut down successfully"),
      (err) => console.log("Error shutting down SDK", err),
    ).finally(() => process.exit(0))
   };
   
   process.on('exit', shutdown);
   process.on('SIGINT', shutdown);
   process.on('SIGTERM', shutdown);