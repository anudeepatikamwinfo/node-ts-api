"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
// ✅ Call DB connection
(0, db_1.connectDB)();
app_1.default.use("/api", user_routes_1.default);
console.log("Routes Loaded");
app_1.default.get("/", (req, res) => {
    res.send("API Running 🚀");
});
app_1.default.listen(3000, () => {
    console.log("Server running");
});
//# sourceMappingURL=server.js.map