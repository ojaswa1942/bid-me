import * as functions from "firebase-functions";
import handleCloseBid from "./closeBid";

const closeBidSchedule = functions.pubsub.schedule("*/1 * * * *").onRun(handleCloseBid);

export default {
  closeBidSchedule
};
