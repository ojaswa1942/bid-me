import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

import { auth } from "./routes";
import provideContext from "./context";
import { CustomRequest, CustomResponse } from "./utils/types";

// const { db: dbConfig, port } = require('./utils/config');
// const logger = require('./utils/logger');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  app.use(provideContext);

  app.get('/', (req: CustomRequest, res: CustomResponse) => res.sendStatus(200));
  app.use('/auth', auth);
} catch (error) {
  // logger({ type: `ERROR` }, `Unhandled Exception@server.js`);
  // logger({ type: `ERROR` }, error);
}

exports.api = functions.https.onRequest(app);
