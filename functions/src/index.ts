import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import cors from "cors";

import { auth } from "./routes";
import provideContext from "./context";
import { realtimeDatabase } from "./utils/config";
import logger from "./utils/logger";

import { ServiceAccount } from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(realtimeDatabase.serviceAccounts as ServiceAccount),
  databaseURL: realtimeDatabase.url
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  app.use(provideContext);

  app.get('/', (req: Request, res: Response) => res.sendStatus(200));
  app.use('/auth', auth);
} catch (error) {
  logger({ type: `ERROR` }, `Unhandled Exception@server.js`);
  logger({ type: `ERROR` }, error);
}

exports.api = functions.https.onRequest(app);
