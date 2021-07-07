// 'use strict';

// const { MeterProvider, ConsoleMetricExporter } = require('@opentelemetry/metrics');

// const exporter = new ConsoleMetricExporter()

// const meter = new MeterProvider({
//   exporter,
//   interval: 5000
// }).getMeter('your-meter-name');

// const requestCount = meter.createCounter("requests", {
//   description: "Count all incoming requests"
// });

// const boundInstruments = new Map();

// module.exports.countAllRequests = () => {
//   return (req, res, next) => {
//     if (!boundInstruments.has(req.path)) {
//       const labels = { route: req.path };
//       const boundCounter = requestCount.bind(labels);
//       boundInstruments.set(req.path, boundCounter);
//     }

//     boundInstruments.get(req.path).add(1);
//     next();
//   };
// };

'use strict';
const { MeterProvider, ConsoleMetricExporter } = require('@opentelemetry/metrics');
const exporter = new ConsoleMetricExporter()

const meter = new MeterProvider({
  exporter,
  interval:5000
}).getMeter('node-meter-app');
const requestCount = meter.createCounter("Count-requests", { description: "Count all incoming requests" });
const boundInstruments = new Map();
module.exports.countAllRequests = () => { 

  return (req, res, next) => {
    console.log(req.path);
    if (!boundInstruments.has(req.path)) {
      const labels = { route: req.path };
      const boundCounter = requestCount.bind(labels);
      boundInstruments.set(req.path, boundCounter);
    }
    boundInstruments.get(req.path).add(1);
    next();
  };
};