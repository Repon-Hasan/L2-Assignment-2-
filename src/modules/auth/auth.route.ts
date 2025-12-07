import { Router } from "express";
import { authControllers } from "./auth.controller";

const router=Router()
router.post("/signin",authControllers.loginUser)

export const authRoutes={
    router
}