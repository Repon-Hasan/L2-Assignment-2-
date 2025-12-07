import { Router } from "express";
import { userControllers } from "./users.controllers";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/signup", userControllers.createUser);
router.put("/:userId",auth('admin'),userControllers.userUpdate)
router.delete("/:userId",auth('admin'),userControllers.deleteUser)

export const userRouter = router;
