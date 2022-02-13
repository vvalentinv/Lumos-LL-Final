import axios from "axios";
import { useEffect } from "react";

const DataFetching = () => {
  useEffect(() => {
    // get all cards from deck 1
    axios.get(`/api/cards/1`).then((response) => {
      // console.log(response);
      console.log(response.data);
    });
  });

  return (
    <div>
      <h2>Data Fetching!!!</h2>
    </div>
  );
};

export default DataFetching;
