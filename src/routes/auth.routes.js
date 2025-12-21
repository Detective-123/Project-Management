import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validator, registerUser);
router.route("/login").post(userLoginValidator(), validator, loginUser);

export default router;
