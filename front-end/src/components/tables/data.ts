import dayjs from "dayjs";
import { IPayment } from "../../api/client";

export function createPaymentData(payment: IPayment) {
  const {
    _id,
    invoice,
    shop,
    amount,
    free,
    paidAmount,
    discount,
    returnAmount,
    dueAmount,
    paymentStatus,
    company,
    dueDate,
    paymentDate,
    collector,
  } = payment;
  return {
    _id,
    invoice,
    shop: shop ? shop.name : "-",
    amount,
    free,
    paidAmount,
    discount,
    returnAmount,
    dueAmount,
    paymentStatus,
    company: company ? company.name : "-",
    collector: collector ? collector.name : "-",
    paymentDate: dayjs(new Date(paymentDate)).format("DD/MM/YYYY"),
    dueDate: dayjs(new Date(dueDate)).format("DD/MM/YYYY"),
  };
}
