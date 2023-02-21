import {React} from 'react';
import MainContainer from './navigation/pages/MainContainer'

async function addNote() {
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, "notes"), {
      id: counter + 1,
      title: "Hello",
      note: "Hello"
    });
    console.log("Document written with ID: ", docRef.id);
    setCounter(counter + 1);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function editNote(/* noteId, title, note */) {
  try {
    const db = getFirestore(app);
    await setDoc(db.collection("notes").doc(1), {
      title: "Test",
      note: "Test"
    });
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}



const App = () => {
  return (
   <MainContainer />
  );
}

export default App