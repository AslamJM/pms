import CustomTable, { IColumn } from "../../components/tables/Table";

const columns: IColumn[] = [
  { id: "shop", label: "Shop" },
  { id: "amount", label: "Amount" },
  { id: "dueAmount", label: "due" },
  { id: "status", label: "Status" },
  { id: "collector", label: "Collector" },
  { id: "paymentDate", label: "Payment Date" },
  { id: "dueDate", label: "Due Date" },
];

const PaymentTable = () => {
  return (
    <CustomTable columns={columns} count={0}>
      <></>
    </CustomTable>
  );
};

export default PaymentTable;
