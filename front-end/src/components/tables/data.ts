import dayjs from "dayjs";
import { IPayment } from "../../api/client";

export function createPaymentData(payment: IPayment) {
  const {
    _id,
    invoice,
    shop,
    free,
    totalAmount,
    paidAmount,
    discount,
    returnAmount,
    marketReturn,
    dueAmount,
    paymentStatus,
    company,
    paymentDate,
    collector,
  } = payment;
  return {
    _id,
    paymentDate: dayjs(new Date(paymentDate)).format("DD/MM/YYYY"),
    invoice,
    shop: shop ? shop.name : "-",
    company: company ? company.name : "-",
    area: shop && shop.region ? shop.region.name : "-",
    totalAmount,
    paidAmount,
    dueAmount,
    lastPaid: dayjs().diff(dayjs(payment.paymentDate), "days") + " days",
    paymentStatus,
    free,
    discount,
    returnAmount,
    marketReturn,
    collector: collector ? collector.name : "-",
  };
}

export function createJson(payment: IPayment) {
  const {
    invoice,
    shop,
    free,
    totalAmount,
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
    invoice,
    shop: shop ? shop.name : "-",
    free,
    total: totalAmount,
    paid: paidAmount,
    discount,
    return: returnAmount,
    due: dueAmount,
    status: paymentStatus,
    company: company ? company.name : "-",
    collector: collector ? collector.name : "-",
    "Payment Date": dayjs(new Date(paymentDate)).format("DD/MM/YYYY"),
    "Due Date": dayjs(new Date(dueDate)).format("DD/MM/YYYY"),
  };
}

export const calculateLastDays = (payment: IPayment) => {
  const days = dayjs().diff(dayjs(payment.paymentDate), "days");
  return `${days} days`;
};
