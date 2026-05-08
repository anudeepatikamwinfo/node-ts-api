"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controllers/usercontroller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = express_1.default.Router();
router.post("/register", usercontroller_1.register);
router.post("/login", usercontroller_1.login);
router.get("/users", auth_middleware_1.authenticate, usercontroller_1.getUsers);
router.put("/users/:id", auth_middleware_1.authenticate, usercontroller_1.updateUser);
router.delete("/users/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("admin"), usercontroller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map