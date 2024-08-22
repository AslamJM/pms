"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var Payment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentModel = exports.paymentModel = exports.UpdatePayment = exports.Payment = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const shops_1 = require("./shops");
const collector_1 = require("./collector");
const company_1 = require("./company");
const dayjs_1 = __importDefault(require("dayjs"));
let Payment = Payment_1 = class Payment {
    static getPaymentsOfDay(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({
                paymentDate: {
                    $gte: (0, dayjs_1.default)(date).startOf('D').toISOString(),
                    $lte: (0, dayjs_1.default)(date).endOf('D').toISOString(),
                },
            })
                .populate('collector')
                .populate('shop')
                .populate('company');
        });
    }
    static getPaymentsOfMonth() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({
                paymentDate: {
                    $gte: (0, dayjs_1.default)().startOf('M').toISOString(),
                    $lte: (0, dayjs_1.default)().endOf('M').toISOString(),
                },
            }).populate('company');
        });
    }
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Payment.prototype, "invoice", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => shops_1.Shop }),
    __metadata("design:type", Object)
], Payment.prototype, "shop", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => company_1.Company }),
    __metadata("design:type", Object)
], Payment.prototype, "company", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Payment.prototype, "totalAmount", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Payment.prototype, "paidAmount", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Payment.prototype, "dueAmount", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Payment.prototype, "free", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Payment.prototype, "discount", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Payment.prototype, "returnAmount", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Payment.prototype, "marketReturn", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => collector_1.Collector }),
    __metadata("design:type", Object)
], Payment.prototype, "collector", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], Payment.prototype, "paymentDate", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Payment.prototype, "dueDate", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Payment.prototype, "paymentStatus", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Payment.prototype, "verified", void 0);
Payment = Payment_1 = __decorate([
    (0, typegoose_1.modelOptions)({
        options: {
            allowMixed: typegoose_1.Severity.ALLOW,
        },
    })
], Payment);
exports.Payment = Payment;
class UpdatePayment {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => Payment }),
    __metadata("design:type", Object)
], UpdatePayment.prototype, "payment", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], UpdatePayment.prototype, "amount", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => collector_1.Collector }),
    __metadata("design:type", Object)
], UpdatePayment.prototype, "collector", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], UpdatePayment.prototype, "updateDate", void 0);
exports.UpdatePayment = UpdatePayment;
exports.paymentModel = (0, typegoose_1.getModelForClass)(Payment, {
    schemaOptions: { timestamps: true },
});
exports.updatePaymentModel = (0, typegoose_1.getModelForClass)(UpdatePayment);
