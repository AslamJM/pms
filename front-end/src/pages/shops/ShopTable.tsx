import CustomTable, { IColumn } from "../../components/tables/Table";

const columns: IColumn[] = [
  { id: "name", label: "Name" },
  { id: "address", label: "Address" },
  { id: "region", label: "Region" },
  { id: "lastPayment", label: "Last Payment" },
];

const ShopTable = () => {
  return (
    <CustomTable columns={columns} count={0}>
      <></>
    </CustomTable>
  );
};

export default ShopTable;
