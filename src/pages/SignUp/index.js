import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Logo from "../../assets/Talk_Logo.png";

import { Form, Container } from "./styles";

export default function SignUp({history}){
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState('');

  async function handleSignUp(e){
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        await api.post("/users", { username, email, password });
        history.push("/");
      } catch (err) {
        console.log(err);
        setError("Ocorreu um erro ao registrar sua conta.");
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <img src={Logo} alt="TalkAtive logo" />
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
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
        <button type="submit">Cadastrar grátis</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </Form>
    </Container>
  );
}
