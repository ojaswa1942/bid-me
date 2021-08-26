import { NextFunction, Response } from "express";
import { ContextRequest } from "./utils/types";

// const jwt = require('jsonwebtoken');
// const { secrets } = require('./utils/config');
// const logger = require('./utils/logger');
// const models = require('./models');


const provideContext = async (req: ContextRequest, res: Response, next: NextFunction) => {
  const context = {
    // models,
    // logger,
    userEmail: null,
    isAuthenticated: false,
    isPrivileged: false,
  };
  console.log("Het wtf?");

  // const authorizationHeader = null || req.headers.authorization;
  // if (authorizationHeader) {
  //   const token = authorizationHeader.replace('Bearer ', '').replace('bearer ', '');
  //   try {
  //     const decoded = await jwt.verify(token, secrets.jwt);
  //     Object.assign(context, decoded);

  //     context.isAuthenticated = true;
  //     if (context.userEmail === 'ojaswa1942@gmail.com') {
  //       context.isPrivileged = true;
  //     }
  //   } catch (error) {
  //     // Return 401 if required
  //     logger({ type: `ERROR` }, 'Error at JWT Verification: ', error);
  //   }
  // }

  req.context = context;
  next();
};

export default provideContext;
