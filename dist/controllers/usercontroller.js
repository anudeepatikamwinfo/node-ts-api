"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.deleteUser = exports.updateUser = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_model_1.default.create({
        name,
        email,
        password: hashedPassword,
        role
    });
    res.status(201).json({
        message: "User created",
        user
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    if (!user || !user.password) {
        return res.status(400).json({
            message: "User not found"
        });
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    res.json({
        message: "Login successful",
        token
    });
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.findByIdAndDelete(req.params.id);
    res.json({
        message: "User deleted"
    });
});
exports.deleteUser = deleteUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new AbortController();
    const signal = controller.signal;
    req.on("close", () => {
        console.log("❌ User cancelled request");
        controller.abort();
    });
    try {
        // Simulate delay
        yield delay(10000, signal);
        // IMPORTANT
        if (signal.aborted || req.destroyed) {
            console.log("🛑 Request stopped");
            return;
        }
        const users = yield user_model_1.default.find();
        console.log("✅ API Completed");
        res.json(users);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getUsers = getUsers;
const delay = (ms, signal) => {
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
//# sourceMappingURL=usercontroller.js.map