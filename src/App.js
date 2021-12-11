import Button from "./components/Button";
import { useState } from "react";
import Card from "./components/Card";
import cards from "./content/cards.json";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyBxU8G07VGdiOpJ5NG61g9oUW-RbcsX19U",
  authDomain: "cypher-9d473.firebaseapp.com",
  projectId: "cypher-9d473",
  storageBucket: "cypher-9d473.appspot.com",
  messagingSenderId: "460802231045",
  appId: "1:460802231045:web:860614a8b4b53736dcc56c",
  // measurementId: "${config.measurementId}",
});

const auth = firebase.auth();

const answers = [];
const noOfCards = cards.length;

function App() {
  const [user] = useAuthState(auth);
  const [currentCardIndex, setCardIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [buttonText, setButtonText] = useState("Next");

  const selectHandler = (id) => {
    setSelected(id);
  };

  const onSubmit = async () => {
    if (user) {
      const { serverTimestamp } = firebase.firestore.FieldValue;

      const players = firebase.firestore().collection("players");

      await players.add({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
        answers: answers,
      });

      auth.signOut();
    }
  };

  const onNext = () => {
    const nextCardIndex = currentCardIndex + 1;
    if (selected !== "") {
      setSelected("");

      if (currentCardIndex === noOfCards - 1) {
        onSubmit();
      }

      if (nextCardIndex < noOfCards) {
        answers.push({
          cardId: cards[currentCardIndex].cardId,
          optId: selected,
        });

        console.log(answers);
        setCardIndex(nextCardIndex);

        if (nextCardIndex === noOfCards - 1) {
          setButtonText("Submit");
        }
      }
    }
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div id="app">
      {user ? (
        <div id="quiz">
          <Card
            key={cards[currentCardIndex].cardId}
            cardId={cards[currentCardIndex].cardId}
            content={cards[currentCardIndex].content}
            options={cards[currentCardIndex].options}
            selected={selected}
            onSelect={selectHandler}
          />

          <Button id="proceed" text={buttonText} onClick={onNext}>
            Next
          </Button>
        </div>
      ) : (
        <div id="login">
          <Button
            text={`Sign in with Google`}
            onClick={signInWithGoogle}
          ></Button>
        </div>
      )}
    </div>
  );
}

export default App;
