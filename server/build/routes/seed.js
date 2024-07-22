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
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const router = express_1.default.Router();
router.get('/seed/:secret', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret = req.params.secret;
        if (secret === "spm123@") {
            const admin = yield user_1.userModel.create({
                username: 'admin',
                password: "spm123@A",
                role: "ADMIN"
            });
            const employee = yield user_1.userModel.create({
                username: 'emp',
                password: "emp123@A",
                role: "EMPLOYEE"
            });
            return res.status(201).json({
                message: "admin users created successfully"
            });
        }
        else {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed"
        });
    }
}));
exports.default = router;
