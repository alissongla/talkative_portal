import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/Talk_Logo.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

export default function SignIn({history}){
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[error,setError] = useState('');

  async function handleSignIn(e){
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        history.push("/app");
      } catch (err) {
        setError("Houve um problema com o login, verifique suas credenciais.")      
      }
    }
  };
    return (
      <Container>
        <Form onSubmit={handleSignIn}>
          <img src={Logo} alt="TalkAtive logo" />
          {error && <p>{error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  
}