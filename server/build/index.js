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
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./utils/db");
const config_1 = require("./utils/config");
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(__dirname + '/../static'));
app.use('/api/users', routes_1.authRouter);
app.use('/api/shops', routes_1.shopRouter);
app.use('/api/payments', routes_1.paymentRouter);
app.use('/api/collectors', routes_1.collectorRouter);
app.use('/api/companies', routes_1.companyRouter);
app.use('/api/areas', routes_1.areaRouter);
app.use('/api/history', routes_1.historyRouter);
app.use('/api/db', routes_1.seedRouter);
app.get('*', (_, res) => {
    res.sendFile(path_1.default.resolve(__dirname + '/../static/index.html'));
});
const createServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    console.log('database connected');
    app.listen(config_1.PORT, () => console.log(`server started at http://localhost:${config_1.PORT}`));
});
createServer();
