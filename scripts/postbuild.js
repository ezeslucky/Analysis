/* eslint-disable prettier/prettier */
require('dotenv').config();
const { sendTelemetry } = require('./telemetry');

async function run() {
  if (!process.env.DISABLE_TELEMETRY) {
    await sendTelemetry('build');
  }
}

run();
