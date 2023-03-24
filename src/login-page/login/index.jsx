import { Link } from "react-router-dom"
import React, { useContext, useState } from "react";
import "./styles.css"
import UserContext from "../../context/UserContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";




const Login = () =>{
    const userContext = useContext(UserContext) 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState();
    const auth = getAuth();


    const logUser = async (e) => {
        e.preventDefault();
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            userContext.setUser(userCredential.user)
            
        }
        catch (error){
            setErr(error)
        }
    }

    const shouldHideError = () => {
        if (err) {
            return false
        }
        return true

  }

    const getErrorMessage = () => {
        if(err?.code === "auth/invalid-email"){
            return "Email inválido"
        }
        if (err?.code === "auth/wrong-password") {
            return "Senha incorreta"
        }
        if (err?.code === "auth/user-not-found") {
            return "Usuário não encontrado"
        }
        return "Erro ao fazer login. Tente novamente mais tarde!"
    }

    if (userContext.user) {
        return <Navigate to="/"/>
    }

    return (
        <>
            <section className="vh-100 gradient-custom background-login">
                <form onSubmit={logUser}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-1 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50">Use seu email e senha para fazer o login!</p>
                                <div class="alert alert-danger" hidden={shouldHideError()} role="alert">
                                    {getErrorMessage()}
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input 
                                        type="text" 
                                        id="typeEmailX" 
                                        className="form-control form-control-lg" 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label className="form-label" for="typeEmailX">Email</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input 
                                        type="password" 
                                        id="typePasswordX" 
                                        className="form-control form-control-lg" 
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label className="form-label" for="typePasswordX">Senha</label>
                                </div>

                                <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                </div>

                                <div>
                                <p className="mb-0">Não tem uma conta? <Link to="/register" className="text-white-50 fw-bold">Registre-se</Link>
                                </p>
                                </div>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login