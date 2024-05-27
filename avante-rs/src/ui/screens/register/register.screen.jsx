import "./index.css";
import { useState } from "react";
import { useRegister } from "../../../hooks";
import {
  Button,
  Container,
  Form,
  Input,
  Label,
  StatusReturnApi,
} from "../../components";
import { useNavigate } from "react-router-dom";

export function RegisterScreen() {
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    cpf: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { registerUser, hasError } = useRegister();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormInput((oldFormInput) => ({ ...oldFormInput, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await registerUser(
      formInput.name,
      formInput.address,
      formInput.cpf,
      formInput.email,
      formInput.password
    );
  }

  async function handleLogin() {
    navigate(`/`);
  }

  return (
    <Container additionalClass="register-screen">
      <h1>Avante RS</h1>
      <h2>Faça o registro da sua conta</h2>
      <Form className="form-register" onSubmit={handleSubmit}>
        <div>
          <Label>Insira seu nome completo</Label>
          <Input
            id="name"
            name="name"
            label="Nome completo"
            type="text"
            value={formInput.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label>Insira seu endereço completo</Label>
          <Input
            id="address"
            name="address"
            label="Endereço"
            type="text"
            value={formInput.address}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label>Insira seu CPF</Label>
          <Input
            id="cpf"
            name="cpf"
            label="CPF"
            type="text"
            value={formInput.cpf}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label>Insira um endereço de e-mail</Label>
          <Input
            id="email"
            name="email"
            label="Email"
            type="text"
            value={formInput.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label>Insira uma senha para sua conta</Label>
          <Input
            id="password"
            name="password"
            label="Senha"
            type="password"
            value={formInput.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <StatusReturnApi hasError={hasError} />
        <Button type="submit">Registar</Button>
      </Form>
      <Button type="button" onClick={() => handleLogin()}>
        Acessar
      </Button>
    </Container>
  );
}
