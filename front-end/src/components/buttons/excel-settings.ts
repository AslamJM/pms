import { IPayment } from "../../api/client";

// Export settings
export const SETTINGS_FOR_EXPORT = {
  // Table settings
  fileName: "payments",
  workSheets: [
    {
      sheetName: "payments",
      startingRowNumber: 1,
      gapBetweenTwoTables: 2,
      tableSettings: {
        table1: {
          tableTitle: "payment details",
          headerGroups: [
            {
              name: "Details",
              key: "details",
              groupKey: "details",
            },
            {
              name: "Transactions",
              key: "transactions",
              groupKey: "transactions",
            },
            {
              name: "Dates",
              key: "dates",
            },
          ],
          headerDefinition: [
            {
              name: "Invoice",
              key: "invoice",
              groupKey: "details",
            },
            {
              name: "Shop",
              key: "shop",
              groupKey: "details",
            },
            {
              name: "Company",
              key: "company",
              groupKey: "details",
            },
            {
              name: "Collector",
              key: "collector",
              groupKey: "details",
            },
            { name: "Status", key: "paymentStatus", groupKey: "details" },
            {
              name: "Amount",
              key: "amount",
              groupKey: "transactions",
            },
            {
              name: "Free",
              key: "free",
              groupKey: "transactions",
            },
            {
              name: "Discount",
              key: "discount",
              groupKey: "transactions",
            },
            {
              name: "Paid",
              key: "paidAmount",
              groupKey: "transactions",
            },
            {
              name: "Return",
              key: "returnAmount",
              groupKey: "transactions",
            },
            {
              name: "Due",
              key: "dueAmount",
              groupKey: "transactions",
            },
            {
              name: "Payment",
              key: "paymentDate",
              groupKey: "dates",
            },
            {
              name: "Due",
              key: "dueDate",
              groupKey: "dates",
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
    paymentDate,
    dueDate,
  };
}
