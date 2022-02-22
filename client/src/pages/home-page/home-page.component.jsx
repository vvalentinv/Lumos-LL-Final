import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getDeckListForUser } from "../../helpers/selectors";

import HomePageSkeleton from "../../components/home-page-skeleton/home-page-skeleton.component";
import HomePageCard from "../../components/home-page-card/home-page-card";
import DeletePopUp from "../../components/delete-pop-up/delete-pop-up.component";

import { deleteDeck } from "../../helpers/selectors";

import './home-page.styles.scss';

const HomePage = () => {

  const { user } = useAuth0();

  const [deckList, setDeckList] = useState([]);
  const [popup, setPopUp] = useState({
    showPopUp: false,
    deckID: null,
  });

  const selUser = useSelector(state => state.user);
  const { userUUID } = selUser;

  const summonPopUp = (deckID) => {
    setPopUp({
      showPopUp: true,
      deckID: deckID
    });
  };

  const handleDeleteTrue = () => {
    if (popup.showPopUp && popup.deckID) {
      let deleteDeckID = popup.deckID;

      let updatedDeckList = deckList.filter((deck) => deck.id !== deleteDeckID);

      setDeckList(updatedDeckList);

      setPopUp({
        showPopUp: false,
        deckID: null,
      });
      deleteDeck(deleteDeckID)
        .then((result) => console.log("Deck Deleted:", result))
        .catch((error) => console.log(error))
    }
  };

  const handleDeleteFalse = () => {
    setPopUp({
      showPopUp: false,
      deckID: null,
    });
  };

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
      <div className='deck-div'>
        <h3 className='deck-title'>{`YOUR DECKS (${deckList.length})`}</h3>
      </div>
        {deckList.length > 0 ? deckList.map((deck) => {
          const { id, deck_name } = deck
          return (
            <HomePageCard
              className='home-page-card'
              key={id}
              deckID={id}
              deckName={deck_name}
              summonPopUp={summonPopUp}
            />
          )
        }) : (
          <HomePageSkeleton />
        )}
        {popup.showPopUp && (
          <DeletePopUp
            deckList={deckList}
            setDeckList={setDeckList}
            handleDeleteTrue={handleDeleteTrue}
            handleDeleteFalse={handleDeleteFalse}
          />
        )}
      </div>
  );
}

export default HomePage;
