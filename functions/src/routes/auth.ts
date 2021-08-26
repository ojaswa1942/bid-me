import { CustomRequest, CustomResponse } from "../types/types";

const express = require('express');
// const {
//   auth,
//   signup,
//   createAccount,
//   findAccount,
//   getAccount,
//   transferFunds,
// } = require('../controllers');
// const { withAuth, withPrivilege } = require('../utils/middlewares');

const router = express.Router();

// router.post('/auth', auth);

// router.use(withAuth);

router.get('/login', (req: CustomRequest, res: CustomResponse) => res.status(200).json("hey you?"));

// router.post('/account/create', createAccount);
// router.post('/account/get', getAccount);
// router.post('/account/search', findAccount);
// router.post('/account/transfer', transferFunds);

// router.post('/signup', withPrivilege, signup);

export default router;
