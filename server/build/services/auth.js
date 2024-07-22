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
exports.verifyToken = exports.loginUser = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const findUser = (username) => user_1.userModel.findOne({ username });
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield findUser(username);
        if (!user) {
            return res.status(400).json({ message: 'invalid username' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'incorrect password' });
        }
        const token = jsonwebtoken_1.default.sign({ user }, config_1.JWT_SECRET, {
            expiresIn: '30d',
        });
        return res.status(200).json({
            token: token,
            user: { username: user.username, role: user.role },
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.loginUser = loginUser;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = yield findUser(decoded.username);
    if (!user)
        return false;
    if (decoded.password !== user.password)
        return false;
    return true;
});
exports.verifyToken = verifyToken;
