import { Router } from "express";
import {
 getAccountById,
 performActionIntoAccount,
 resetAccounts,
} from "../controllers/API/Account/createOne";

const accountRoutes = Router();
accountRoutes.get("/balance", getAccountById);
accountRoutes.post("/event", performActionIntoAccount);
accountRoutes.post("/reset", resetAccounts);

export default accountRoutes;
