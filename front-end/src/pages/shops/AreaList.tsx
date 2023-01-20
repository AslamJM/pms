import { useGlobalContext } from "../../context/GlobalContext";

const AreaList = () => {
  const { areas } = useGlobalContext();
  return (
    <div>
      <h1>List of Areas</h1>
      {areas.map((a) => (
        <p key={a._id}>{a.name}</p>
      ))}
    </div>
  );
};

export default AreaList;
