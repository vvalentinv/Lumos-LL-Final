import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDeckListForUser } from "../../helpers/selectors";

const HomePage = () => {

    const [deckList, setDeckList] = useState([]);
    const selUser = useSelector(state => state.user);
    const { userUUID } = selUser;

    useEffect(() => {
      if(!userUUID){
        return;
      }
      getDeckListForUser(userUUID)  
      .then(result => {
            setDeckList(result.data)
          })
          .catch(error => console.log(error));
    }, [userUUID]);

    console.log("deckList:", deckList);
    console.log("userId:", userUUID);

    return (
        <p>Home</p>
        // { deckList.map((decks) => ) }
        //=> Iterate over useState Hook and display list of decks
    );
}

export default HomePage;
