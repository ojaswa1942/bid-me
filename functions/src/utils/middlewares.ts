import { NextFunction, Request, Response } from 'express';
import logger from './logger';

const withPrivilege = (req: Request, res: Response, next: NextFunction) => {
  const { isAuthenticated, isPrivileged, userEmail } = req.context;
  if (!isAuthenticated || !isPrivileged) {
    logger(
      { type: `warning` },
      `Unauthorized priviledge operation attempted`,
      `${userEmail || ``}`
    );
    return res.status(401).json('Not authorized');
  }
  return next();
};

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.context.isAuthenticated) {
    return res.status(401).json('Not authorized');
  }
  return next();
};

export {
  withAuth,
  withPrivilege,
};
