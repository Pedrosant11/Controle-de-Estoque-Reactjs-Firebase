import React, { useContext } from "react";
import Header from "./components/Header";
import Estoque from "./components/Estoque";
import firebase from "./components/Firebase";
import UserContext from "./context/UserContext";
import { Navigate } from "react-router-dom";
import LogsPage from "./components/Logs";


function App() {

  const userContext = useContext(UserContext) 

  if(!userContext.user){
    return <Navigate to={"/login"} />
  }

  return (
    <div>
      <Header />
      <Estoque db={firebase.firestore()} />
      <LogsPage db={firebase.firestore()} />
    </div>
  );
}

export default App;