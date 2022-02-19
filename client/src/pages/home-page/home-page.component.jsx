import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDeckListForUser } from "../../helpers/selectors";

const HomePage = () => {

  const [deckList, setDeckList] = useState([]);
  const selUser = useSelector(state => state.user);
  const { userUUID } = selUser;

  const getDeckNames = (result) => {
    const res = [];

    result.forEach((deck) => {
      res.push(deck.deck_name);
    })

    return res;
  }

  useEffect(() => {
    if (!userUUID) {
      return;
    }
    getDeckListForUser(userUUID)
      .then(result => {
        let allDeckNames = getDeckNames(result.data);
        setDeckList(allDeckNames);
      })
      .catch(error => console.log(error));
  }, [userUUID]);

  console.log("deckList:", deckList);


  return (
    <>
      <p>Home</p>
      <div className='deck-container'>


      </div>
    </>
  );
}

export default HomePage;
