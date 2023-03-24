import React, {createContext, useState} from "react"
import { Link, Navigate } from "react-router-dom"
import "./styles.css"
import { updateProfile, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useContext} from "react";
import UserContext from "../../context/UserContext";

const Register = () =>{
    const userContext = useContext(UserContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [err, setErr] = useState();
    const auth = getAuth();


    const checkPasswords = () => {
        setPasswordMatch(password === confirmPassword)
    }

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {
                displayName: name
            })
            console.log(userCredential)
            userContext.setUser(userCredential.user)
        } catch (error) {
            console.log(error)
            setErr(error)
        }
    }

    const shouldHideError = () => {
        if(!passwordMatch){
            return false
        }
        if (err) {
            return false
        }
        return true
  }

    const getErrorMessage = () => {
        if(err?.code === "auth/email-already-exists"){
            return "Email já cadastrado"
        }
        if(!passwordMatch){
            return "Senhas não conferem"
        }

        return "Erro ao fazer cadastro. Tente novamente mais tarde!"
    }

    if (userContext.user) {
        return <Navigate to="/" />
    }
    return (
            <>
            <section className="vh-100 gradient-custom background-register">
                <form onSubmit={registerUser}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-1 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Registre-se</h2>
                                <p className="text-white-50">Coloque seu nome, email e senha!</p>
                                <div class="alert alert-danger" hidden={shouldHideError()} role="alert">
                                    {getErrorMessage()}
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input 
                                        type="text" 
                                        id="typeNameX" 
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control form-control-lg" 
                                    />
                                    <label className="form-label" for="typeNameX">Nome</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input 
                                        type="text" 
                                        id="typeEmailX" 
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control form-control-lg" 
                                    />
                                    <label className="form-label" for="typeEmailX">Email</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input 
                                        type="password" 
                                        id="typePasswordX" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control form-control-lg" 
                                    />
                                    <label className="form-label" for="typePasswordX">Senha</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input 
                                        type="password" 
                                        id="typeConfirmPasswordX" 
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onBlur={checkPasswords}
                                        className="form-control form-control-lg" 
                                    />
                                    <label className="form-label" for="typePasswordX">Confirmar senha</label>
                                </div>

                                <button className="btn btn-outline-light btn-lg px-5" type="submit">Cadastrar</button>

                                </div>

                                <div>
                                <p className="mb-0">Já tem uma conta? <Link to="/login" className="text-white-50 fw-bold">Login</Link>
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

export default Register