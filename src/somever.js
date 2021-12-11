import Button from "./components/Button";
import { useState } from "react";
import Card from "./components/Card";
import cards from "./content/cards.json";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBxU8G07VGdiOpJ5NG61g9oUW-RbcsX19U",
  authDomain: "cypher-9d473.firebaseapp.com",
  projectId: "cypher-9d473",
  storageBucket: "cypher-9d473.appspot.com",
  messagingSenderId: "460802231045",
  appId: "1:460802231045:web:860614a8b4b53736dcc56c",
  measurementId: "${config.measurementId}",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const answers = [];
const noOfCards = cards.length;

function App() {
  const [user] = useAuthState(auth);
  const [currentCardIndex, setCardIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [buttonText, setButtonText] = useState("Text");

  const selectHandler = (id) => {
    setSelected(id);
  };

  const onSubmit = () => {
    const nextCardIndex = currentCardIndex + 1;

    if (currentCardIndex < noOfCards) {
      if (nextCardIndex === noOfCards - 1) {
        setButtonText("Submit & Sign Out");
      }

      console.log(selected);

      if (selected) {
        answers.push({
          cardId: cards[currentCardIndex].cardId,
          optId: selected,
        });
      }

      setCardIndex(nextCardIndex);
      console.log(answers);
    }
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div id="app">
      {user ? (
        <div className="quiz">
          <Card
            key={cards[currentCardIndex].cardId}
            cardId={cards[currentCardIndex].cardId}
            content={cards[currentCardIndex].content}
            options={cards[currentCardIndex].options}
            selected={selected}
            onSelect={selectHandler}
          />

          <Button id="submit" text={buttonText} onClick={onSubmit}>
            Next
          </Button>
        </div>
      ) : (
        <Button
          text={`Sign in with Google`}
          onClick={signInWithGoogle}
        ></Button>
      )}
    </div>
  );
}

export default App;
