import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";


const LogsPage = ({ db }) => {
  const [logs, setLogs] = useState([]);

  const userContext = useContext(UserContext)

  useEffect(() => {
    const unsubscribe = db.collection("logs").onSnapshot((snapshot) => {
      setLogs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.data().userId,
          item: doc.data().item,
          action: doc.data().action,
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

  return (
    <>
        <div className="text-center style-css bg-dark text-white p-5 header">
        <h1>Logs de movimentação</h1>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 lista-nav">
          <li className="nav-item"><Link className="link-nav" to="/">Estoque</Link></li>
          <li className="nav-item"><Link className="link-nav" to="/logs">Logs</Link></li>
        </ul>
    </div>
    <div className="container text-center">
      <h1>Logs</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Ação</th>
            <th scope="col">Usuário</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.item.name}</td>
              <td>{log.action}</td>
              <td>{log.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default LogsPage;
