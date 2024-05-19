import { useQuery } from "@tanstack/react-query";
import { Button, Text } from "react-native";

const fetchAPI = async () => {
  console.log("fetching API");
  const response = await fetch("https://swapi.dev/api/films/1/fafafas");
  console.log("response status", response.status);
  return await response.json();
};

const Main = () => {
  const { refetch } = useQuery({
    queryKey: ["key"],
    queryFn: fetchAPI,
  });

  return <Text>Making API Call</Text>;
};

export default Main;
