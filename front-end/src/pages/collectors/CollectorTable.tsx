import CustomTable, { IColumn } from "../../components/tables/Table";

const columns: IColumn[] = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "E-Mail" },
];

const CollectorTable = () => {
  return (
    <CustomTable columns={columns} count={0}>
      <></>
    </CustomTable>
  );
};

export default CollectorTable;
