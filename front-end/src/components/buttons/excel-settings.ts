import { IPayment } from "../../api/client";

// Export settings
export const SETTINGS_FOR_EXPORT = {
  // Table settings
  fileName: "payments",
  workSheets: [
    {
      sheetName: "payments",
      startingRowNumber: 2,
      gapBetweenTwoTables: 2,
      tableSettings: {
        table1: {
          tableTitle: "payment details",

          headerDefinition: [
            {
              name: "Invoice",
              key: "invoice",
            },
            {
              name: "Shop",
              key: "shop",
            },
            {
              name: "Company",
              key: "company",
            },
            {
              name: "Collector",
              key: "collector",
            },
            { name: "Status", key: "paymentStatus" },
            {
              name: "Amount",
              key: "amount",
            },
            {
              name: "Free",
              key: "free",
            },
            {
              name: "Discount",
              key: "discount",
            },
            {
              name: "Paid",
              key: "paidAmount",
            },
            {
              name: "Return",
              key: "returnAmount",
            },
            {
              name: "Due",
              key: "dueAmount",
            },
            {
              name: "Payment",
              key: "paymentDate",
            },
            {
              name: "Due",
              key: "dueDate",
            },
          ],
        },
      },
    },
  ],
};

export function getExcelData(payment: IPayment) {
  const {
    invoice,
    shop,
    collector,
    company,
    paymentStatus,
    amount,
    free,
    discount,
    paidAmount,
    returnAmount,
    dueAmount,
    paymentDate,
    dueDate,
  } = payment;
  return {
    invoice,
    shop: shop.name,
    collector: collector.name,
    company: company.name,
    paymentStatus,
    amount,
    free,
    discount,
    paidAmount,
    returnAmount,
    dueAmount,
    paymentDate: new Date(paymentDate).toDateString(),
    dueDate: new Date(dueDate).toDateString(),
  };
}
