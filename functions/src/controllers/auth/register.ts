// import AuthService from "../../services/AuthService";
import { stripScriptTags } from "../../utils/helpers";
import { CustomRequest, CustomResponse } from "../../types/types";
import AuthService from "../../services/AuthService";

const handleRegister = async (req: CustomRequest, res: CustomResponse) => {
    try {
        let { name, email, password } = req.body;
        [name, email] = stripScriptTags(name, email);
        if (!name || !email || !password) {
          return res.status(400).json('Name, email and password are required');
        }
    
        const serviceRes = await AuthService.register({ name, email, password }, req.context);
        if (serviceRes.success) {
          return res.status(200).json(serviceRes.body);
        }
        return res.status(400).json(`${serviceRes.error}`);
      } catch (error) {
        req.context.logger({ type: `error` }, `Error while handling auth/register controller:`, error);
        return res.status(500).json('Something went wrong!');
    }
}

export default handleRegister;
