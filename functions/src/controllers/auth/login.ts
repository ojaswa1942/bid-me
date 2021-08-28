import { stripScriptTags } from "../../utils/helpers";
import AuthService from "../../services/AuthService";
import { Response, Request } from "express";

const handleLogin = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        [email] = stripScriptTags(email);
        if (!email || !password) {
          return res.status(400).json('Email and password are required');
        }

        const serviceRes = await AuthService.login({ email, password }, req.context);
        if (serviceRes.success) {
          return res.status(200).json(serviceRes.body);
        }
        return res.status(400).json(`${serviceRes.error}`);
      } catch (error) {
        req.context.logger({ type: `error` }, `Error while handling auth/login controller:`, error);
        return res.status(500).json('Something went wrong!');
    }
}

export default handleLogin;
