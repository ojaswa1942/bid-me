import * as admin from "firebase-admin";
import * as bcrypt from "bcrypt";

import { Context, LoginArgs, ServiceResponse, SignupArgs } from "../types/types";

class AuthService {
  static login = async (args: LoginArgs, context: Context): Promise<ServiceResponse> => {
    const { email, password } = args;
    const { logger, models } = context;
    const { User } = models;

    const authUser = await User.findOneByEmail(email);
    if (!authUser) return { success: false, error: `Incorrect Credentials` };

    const match = await bcrypt.compare(password, authUser.password);
    if (!match) return { success: false, error: `Incorrect Credentials` };

    const token = await admin.auth().createCustomToken(authUser.id, {
      email: authUser.email
    });

    logger(`[LOGIN]`, authUser.email);

    return { success: true, body: { message: 'Logged in', token } };
  };

  static register = async (args: SignupArgs, context: Context): Promise<ServiceResponse> => {
    const { name, email, password } = args;
    const { models, logger } = context;
    const { User } = models;

    const authUser = await User.findOneByEmail(email);
    if (authUser) return { success: false, error: `User already exists` };


    const hash = await bcrypt.hash(password, 10);
    const uid = await User.create({ name, email, password: hash });

    logger({ type: `warning` }, `[SIGNUP]`, email, uid);
    return { success: true, body: { message: 'Successfully signed up', uid } };
  };
}

export default AuthService;
