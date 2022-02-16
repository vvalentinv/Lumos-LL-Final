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
            // console.log("Result-----------:", result.data);
            setUserId(result.data);
        });

        //useEffect => get All Decks for Current User via Axios => Store in useState Hook
        // setDeckList(res
    }, [user])

    useEffect(() => {
      if(!user){
        return;
      }
        axios.get(`http://localhost:8080/api/decks/${userId}` )
        .then(result => {
            console.log("Result+++++++++++:", result.data);
            setDeckList(result.data);
        }, [userId]);

        //useEffect => get All Decks for Current User via Axios => Store in useState Hook
        // setDeckList(res)
    }, [userId])

   
    // console.log(user);
    console.log("userId:",userId);
    console.log(deckList)
    return (
        <p>Home</p>
        //=> Iterate over useState Hook and display list of decks
    );
}

export default HomePage;
