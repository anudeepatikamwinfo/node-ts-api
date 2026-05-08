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


export const getUsers = async (
    req: Request,
    res: Response
) => {

    const controller = new AbortController();

    const signal = controller.signal;

    req.on("close", () => {

        console.log("❌ User cancelled request");

        controller.abort();

    });

    try {

        // Simulate delay
        await delay(10000, signal);

        // IMPORTANT
        if (signal.aborted || req.destroyed) {

            console.log("🛑 Request stopped");

            return;
        }

        const users = await User.find();

        console.log("✅ API Completed");

        res.json(users);

    } catch (error: any) {

        console.log(error.message);

    }

};


const delay = (
    ms: number,
    signal: AbortSignal
) => {

    return new Promise((resolve, reject) => {

        const timeout = setTimeout(() => {

            resolve(true);

        }, ms);

        signal.addEventListener("abort", () => {

            clearTimeout(timeout);

            reject(new Error("Request Cancelled"));

        });

    });

};