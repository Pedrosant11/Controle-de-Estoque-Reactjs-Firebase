import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import "./estoque.css"
import { Link, Navigate } from "react-router-dom";




function Estoque({ db }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingName, setEditingName] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const [editingQuantity, setEditingQuantity] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  
  const userContext = useContext(UserContext)

 

  useEffect(() => {
    const unsubscribe = db.collection("items").onSnapshot((snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          value: doc.data().value,
          quantity: doc.data().quantity,
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, [db]);

  if(!userContext.user){
    return <Navigate to={"/login"} />
  }


  const addItem = async (e) => {
    e.preventDefault();
    const newItem = await db.collection("items").add({
      name: name,
      value: value,
      quantity: quantity
    });
    addLog("add", newItem.id)
    setName("");
    setValue("");
    setQuantity("");
  };

  const addLog = (action, itemId) => {
    db.collection("logs").add({
      userId: userContext.user.uid,
      item: itemId,
      action: action,
    });
  };

  const deleteItem = (id) => {
    addLog("delete", id)
    db.collection("items").doc(id).delete();
  };

  const updateItem = async (id, updatedItem) => {
    try {
      await db.collection("items").doc(id).update(updatedItem);
      addLog("update", id);
      setEditingItem(null);
      setEditingName("");
      setEditingValue("");
      setEditingQuantity("");

    } catch (error) {
      console.error(error);
    }

  };
  
  const saveChanges = (item) => {
    
    updateItem(item.id, {
      name: editingName,
      value: editingValue,
      quantity: editingQuantity,
    });
    
  };

  const cancelEdit = () => {
    setEditingItem("");
    setEditingName("");
    setEditingValue("");
    setEditingQuantity("");
  };

  const startEdit = (item) => {
    setEditingItem(item.id);
    setEditingName(item.name);
    setEditingValue(item.value);
    setEditingQuantity(item.quantity);
  };

  return (
    <>
    <div className="text-center style-css bg-dark text-white p-5 header">
        <h1>Controle de Estoque</h1>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 lista-nav">
          <li className="nav-item"><Link className="link-nav" to="/">Estoque</Link></li>
          <li className="nav-item"><Link className="link-nav" to="/logs">Logs</Link></li>
        </ul>
    </div>
    <div className="container text-center">
      <h2>Adicionar item ao estoque</h2>
      <form onSubmit={addItem} className="add-estoque">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Adicionar
        </button>
      </form>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Valor</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                {editingItem === item.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingItem === item.id ? (
                  <input
                    type="number"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  `R$ ${item.value}`
                )}
              </td>
              <td>
                {editingItem === item.id ? (
                  <input
                    type="number"
                    value={editingQuantity}
                    onChange={(e) => setEditingQuantity(e.target.value)}
                  />
                ) : (
                  `${item.quantity}`
                )}
              </td>
              <td className="botoes">
                {editingItem === item.id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => saveChanges(item)}
                    >
                      Salvar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => cancelEdit()}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => startEdit(item)}
                    >
                      Alterar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(item.id)}
                      disabled={editingItem === item.id}
                    >
                      Apagar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Estoque;