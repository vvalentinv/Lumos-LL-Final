import axios from "axios";
import { useEffect, useState } from "react";

const DataFetching = () => {
  // useState is where data is stored
  const [cards, setCards] = useState([]);

  // Use effect makes the request for you
  useEffect(() => {
    // get all cards from deck 1
    axios.get(`/api/cards/3`).then((response) => {
      // console.log(response);
      console.log(response.data);
      // setCards(response.data);
      // use a callback to prevent infinite loop caused by a dependancy array
      setCards((prevCards) => {
        return [...prevCards, ...response.data];
      });
    });
  }, []);

  return (
    <div>
      <h2>Data Fetching!!!</h2>
      {/* turn array of objects into an array of jsx elements  */}
      {cards.map((card) => {
        return (
          <p key={card.id}>
            Question: {card.question} | Answer: {card.answer} ({card.id})
          </p>
        );
      })}
    </div>
  );
};

export default DataFetching;
