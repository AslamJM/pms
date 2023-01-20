export const FORM_MODEL = {
  shop: "shop",
  amount: "amount",
  paidAmount: "paidAmount",
  dueAmount: "dueAmount",
  free: "free",
  discount: "discount",
  returnAmount: "returnAmount",
  marketReturn: "marketReturn",
  collector: "collector",
  company: "company",
  invoice: "invoice",
  paymentDate: "paymentDate",
  dueDate: "dueDate",
  paymentStatus: "paymentStatus",
  paymentMethod: "paymentMethod",
};

export const PAYMENT_STATUS = ["PAID", "DUE", "CANCELLED"];
export const PAYMENT_METHOD = ["CASH", "CHEQUE"];

export function parseToNumber(str: string) {
  const num = str === "" ? 0 : Number(str);
  return num;
}

export function calculateDue(
  amount: string,
  paidAmount: string,
  free: string,
  discount: string,
  returnAmount: string
) {
  return (
    parseToNumber(amount) -
    parseToNumber(paidAmount) -
    parseToNumber(free) -
    parseToNumber(discount) -
    parseToNumber(returnAmount)
  );
}
