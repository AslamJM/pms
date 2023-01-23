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
    marketReturn,
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
    area: shop.region.name ? shop.region.name : "-",
    amount,
    free,
    paidAmount,
    discount,
    returnAmount,
    marketReturn,
    dueAmount,
    paymentStatus,
    company: company ? company.name : "-",
    collector: collector ? collector.name : "-",
    paymentDate: dayjs(new Date(paymentDate)).format("DD/MM/YYYY"),
    dueDate: dayjs(new Date(dueDate)).format("DD/MM/YYYY"),
  };
}

export function createJson(payment: IPayment) {
  const {
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
    invoice,
    shop: shop ? shop.name : "-",
    amount,
    free,
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
