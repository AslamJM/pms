import { useGlobalContext } from "../../context/GlobalContext";

const Home = () => {
  const { companies } = useGlobalContext();

  return <div>{JSON.stringify(companies)}</div>;
};

export default Home;
