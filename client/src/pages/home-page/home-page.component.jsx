import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getDeckListForUser } from "../../helpers/selectors";

import HomePageCard from "../../components/home-page-card/home-page-card";

const HomePage = () => {

  const { user } = useAuth0();

  const [deckList, setDeckList] = useState([]);
  const selUser = useSelector(state => state.user);
  const { userUUID } = selUser;

  useEffect(() => {
    if (!userUUID) {
      return;
    }
    getDeckListForUser(userUUID)
      .then(result => {
        setDeckList(result.data);
      })
      .catch(error => console.log(error));
  }, [userUUID]);

  return (
    <div className='deck-container'>
      <p>YOUR DECKS</p>
      {deckList.length && deckList.map((deck) => {
        const { id, deck_name } = deck
        return (
          <HomePageCard
            key={id}
            deckID={id}
            deckName={deck_name}
            deckList={deckList}
            setDeckList={setDeckList}
          />
        )
      })}
    </div>
  );
}

export default HomePage;
