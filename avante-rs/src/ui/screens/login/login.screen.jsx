import "./index.css";
import { useState, useEffect } from "react";
import { useLogin } from "../../../hooks/auth/use-login.hook";
import { useNavigate } from "react-router-dom";
import { useGlobalUser } from "../../../context";
import {
  Button,
  Container,
  Form,
  Input,
  Label,
  StatusReturnApi,
} from "../../components";

export function LoginScreen() {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const { loginUser, hasError } = useLogin();
  const navigate = useNavigate();
  const [user] = useGlobalUser();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormInput((oldFormInput) => ({ ...oldFormInput, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await loginUser(formInput.email, formInput.password);
  }

  async function handleRegister() {
    navigate(`/registrar`);
  }

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <Container additionalClass="login-screen">
      <h1>Avante RS</h1>
      <h2>Entre em sua conta para acessar a plataforma!</h2>
      <Form className="login-form" onSubmit={handleSubmit}>
        <div>
          <Label>Insira seu e-mail</Label>
          <Input
            id="username"
            name="email"
            label="Email"
            type="text"
            value={formInput.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label forId="password" content="Password" />
          <Label>Insira sua senha</Label>
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
        <Button type="submit">Acessar</Button>
      </Form>
      <Button type="button" onClick={() => handleRegister()}>
        Registrar-se
      </Button>
    </Container>
  );
}
