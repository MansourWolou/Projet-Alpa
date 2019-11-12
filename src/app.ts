// lib/app.ts
import * as root from "./routes/index"
import express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.use('/', root)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
