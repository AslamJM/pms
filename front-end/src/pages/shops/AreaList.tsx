import { useGlobalContext } from "../../context/GlobalContext";
import AreaName from "./forms/AreaName";

const AreaList = () => {
  const { areas } = useGlobalContext();
  return (
    <div>
      <h1>List of Areas</h1>
      {areas.map((a) => (
        <AreaName key={a._id} id={a._id} name={a.name} />
      ))}
    </div>
  );
};

export default AreaList;
