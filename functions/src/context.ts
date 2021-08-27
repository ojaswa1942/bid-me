import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from "express";
import logger from "./utils/logger.js";
import models from "./models";

// const jwt = require('jsonwebtoken');
// import jwt from "jsonwebtoken";
// import { secrets } from "./utils/config";


const provideContext = async (req: Request, res: Response, next: NextFunction) => {
  const context = {
    models,
    logger,
    uid: null,
    userEmail: null,
    isAuthenticated: false,
    isPrivileged: false,
  };

  console.log("Hey wtf?", req.originalUrl);

  const authorizationHeader = req.headers?.authorization;
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.replace('Bearer ', '').replace('bearer ', '');
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      Object.assign(context, {
        uid: decoded.uid,
        userEmail: decoded.email
      });

      context.isAuthenticated = true;
      if (context.userEmail === 'ojaswa1942@gmail.com') {
        context.isPrivileged = true;
      }
    } catch (error) {
      // Return 401 if required
      logger({ type: `ERROR` }, 'Error at JWT Verification: ', error);
    }
  }

  req.context = context;
  next();
};

export default provideContext;
