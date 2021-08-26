import { Context } from "./types";

declare global {
    namespace Express {
        export interface Request {
            context: Context
        }
    }
}
