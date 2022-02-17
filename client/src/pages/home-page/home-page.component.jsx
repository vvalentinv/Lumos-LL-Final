import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

const HomePage = () => {

    const [deckList, setDeckList] = useState([]);
    const [userId, setUserId] = useState();
    const { user } = useAuth0();

    useEffect(() => {
        if(!user){
          return;
        }
        axios.post(`http://localhost:8080/api/users/`, { user })
        .then(result => {
            setUserId(result.data);
        })
        .catch(error => console.log(error));
    }, [user]);

    useEffect(() => {
      if(!user){
        return;
      }
        axios.get(`http://localhost:8080/api/decks/${userId}` )
        .then(result => {
            setDeckList(result.data)
          })
          .catch(error => console.log(error));
    }, [userId]);

    console.log("deckList:", deckList);
    console.log("userId:", userId);

    return (
        <p>Home</p>
        // { deckList.map((decks) => ) }
        //=> Iterate over useState Hook and display list of decks
    );
}

export default HomePage;
