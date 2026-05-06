import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (
    req: Request,
    res: Response
) => {

    const {
        name,
        email,
        password,
        role
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    res.status(201).json({
        message: "User created",
        user
    });
};
export const login = async (
    req: Request,
    res: Response
) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.password) {

        return res.status(400).json({
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {

        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d"
        }
    );

    res.json({
        message: "Login successful",
        token
    });
  
};

export const getUsers = async (
    req: Request,
    res: Response
) => {

    const users = await User.find();

    res.json(users);
};

export const updateUser = async (
    req: Request,
    res: Response
) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(user);
};

export const deleteUser = async (
    req: Request,
    res: Response
) => {

    await User.findByIdAndDelete(req.params.id);

    res.json({
        message: "User deleted"
    });
};
