import { Context } from "../types/types";

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { secrets } = require('../utils/config');

type LoginArgs = {
    email: string;
    password: string;
};

type SignupArgs = {
    name: string;
    email: string;
    password: string;
};


class AuthService {
  static login = async (args: LoginArgs, context: Context) => {
    // const { email, password } = args;
    // const { logger, models } = context;
    // const { Admin } = models;

    // const authUser = await Admin.findOne({ email });
    // if (!authUser) return { success: false, error: `Incorrect Credentials` };

    // const match = await bcrypt.compare(password, authUser.password);
    // if (!match) return { success: false, error: `Incorrect Credentials` };

    // const payload = {
    //   userEmail: email,
    // };
    // const token = jwt.sign(payload, secrets.jwt, {
    //   expiresIn: '10d',
    // });

    // logger(`[LOGIN]`, payload.userEmail);

    // return { success: true, body: { message: 'Logged in', token } };
  };

  static signup = async (args: SignupArgs, context: Context) => {
    // const { email, password } = args;
    // const { models, logger, userEmail } = context;
    // const { Admin } = models;

    // const authUser = await Admin.findOne({ email });
    // if (authUser) return { success: false, error: `User already exists` };

    // const hash = await bcrypt.hash(password, 10);

    // await Admin.create({ email, password: hash });

    // logger({ type: `warning` }, `[SIGNUP]`, email, `by: ${userEmail}`);

    // return { success: true, body: { message: 'Signed up' } };
  };
}

export default AuthService;
