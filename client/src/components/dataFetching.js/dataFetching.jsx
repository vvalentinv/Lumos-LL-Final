import axios from "axios";
import { useEffect, useState } from "react";

const DataFetching = () => {
  // useState is where data is stored
  const [cards, setCards] = useState([]);

  // Use effect makes the request for you
  useEffect(() => {
    // get all cards from deck 1
    axios.get(`/api/cards/1`)
    .then((response) => {
      // console.log(response);
      console.log(response.data);
      // setCards(response.data);
      // use a callback to prevent infinite loop caused by a dependancy array
      setCards((prevCards) => {
        return [...prevCards, ...response.data];
      })
      //! Cannot read properties of undefined (reading 'catch')
      .catch((error)=> {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
    });
  }, []);

  return (
    <div>
      <h2>Data Fetching!!!</h2>
      <p>you have {cards.length} cards</p>
      {/* turn array of objects into an array of jsx elements  */}
      {cards.map((card) => {
        return (
          <section key={card.id}>
            <h1>Card {card.id}</h1>
            <p>
              Question: {card.question} | Answer: {card.answer} 
            </p>
          </section>
        );
      })}
    </div>
  );
};

export default DataFetching;
