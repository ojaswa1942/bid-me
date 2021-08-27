// import AuthService from "../../services/AuthService";
import { stripScriptTags } from "../../utils/helpers";
import { CustomRequest, CustomResponse } from "../../types/types";
import AuthService from "../../services/AuthService";

const handleLogin = async (req: CustomRequest, res: CustomResponse) => {
    try {
        let { email, password } = req.body;
        [email] = stripScriptTags(email);
        if (!email || !password) {
          return res.status(400).json('Email and password are required');
        }
        console.log("Context", req.context);
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
