import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: "AIzaSyAuF31DCTvxq_UD3UtN9d0Ydx5KtCfap1o",
  authDomain: "gestao-de-estoque-dbca4.firebaseapp.com",
  projectId: "gestao-de-estoque-dbca4",
  storageBucket: "gestao-de-estoque-dbca4.appspot.com",
  messagingSenderId: "995901724091",
  appId: "1:995901724091:web:c5eebac090971cfbb7609e",
  measurementId: "G-F1ZMNPRL17"
});

const db = firebase.firestore();

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    db.collection("items").onSnapshot((snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          value: doc.data().value,
          quantity: doc.data().quantity,
        }))
      );
    });
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    db.collection("items").add({
      name: name,
      value: value,
      quantity: quantity,
    });
    setName("");
    setValue("");
    setQuantity("");
  };

  return (
    <div>
      <h1>Controle de Estoque</h1>
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;