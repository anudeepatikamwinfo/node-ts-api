import express from "express";

import {
    register,
    login,
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/usercontroller";


import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
    "/users",
    authenticate,
    getUsers
);

router.put(
    "/users/:id",
    authenticate,
    updateUser
);

router.delete(
    "/users/:id",
    authenticate,
    authorize("admin"),
    deleteUser
);

export default router;