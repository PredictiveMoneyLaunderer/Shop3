const tracer = require('dd-trace').init({
  service: 'shop3-agent',
  env: process.env.NODE_ENV || 'development',
  hostname: process.env.DD_AGENT_HOST || 'localhost',
  port: process.env.DD_AGENT_PORT || 8126,
  logInjection: true,
});

// Wrap an async fn in a named span, attaching arbitrary tags
async function withSpan(name, tags, fn) {
  return tracer.trace(name, { tags }, fn);
}

// Increment a counter metric
function increment(metric, tags = {}) {
  tracer.dogstatsd.increment(`shop3.${metric}`, 1, tagsArray(tags));
}

// Record a gauge value
function gauge(metric, value, tags = {}) {
  tracer.dogstatsd.gauge(`shop3.${metric}`, value, tagsArray(tags));
}

// Record a timing in ms
function timing(metric, ms, tags = {}) {
  tracer.dogstatsd.distribution(`shop3.${metric}`, ms, tagsArray(tags));
}

function tagsArray(obj) {
  return Object.entries(obj).map(([k, v]) => `${k}:${v}`);
}

module.exports = { tracer, withSpan, increment, gauge, timing };
