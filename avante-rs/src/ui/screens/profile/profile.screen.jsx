import "./index.css";
import {
  Button,
  Container,
  Label,
  StatusReturnApi,
  Loading,
  Input,
} from "../../components";
import { useState, useEffect } from "react";
import AxiosInstance, {
  axiosInstance,
} from "../../../api/_base/axios-instance";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks";

export function ProfileScreen() {
  const [isEditMode, setIsEditMode] = useState(false);

  const [user, setUser] = useState();
  const [errorGetUser, setErrorGetUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorPutUser, setErrorPutUser] = useState(null);
  const [responsePutUser, setResponsePutUser] = useState(null);
  const navigate = useNavigate();
  const { logoutUser } = useLogout();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isPasswordActice, setIsPasswordActive] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await AxiosInstance.get("/users");
        const userData = {
          name: res.data.name,
          address: res.data.address,
          cpf: res.data.cpf,
          email: res.data.email,
          activePassword: "",
          newPassword: "",
        };
        reset(userData);
        setUser(res.data);
      } catch (error) {
        setErrorGetUser(
          error.response?.data?.message || "Erro ao buscar usuário"
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function handleMyHelps() {
    navigate(`/meus-pedidos`);
  }

  async function onClickLogout() {
    await logoutUser();
  }

  if (errorGetUser) return <p>Erro ao buscar usuário</p>;
  if (isLoading) return <Loading />;

  if (!isEditMode)
    return (
      <Container additionalClass="profile-screen">
        <h1>Dados cadastrados</h1>
        <strong>Nome cadastrado</strong>
        <div>{user.name}</div>
        <strong>Email cadastrado</strong>
        <div>{user.email}</div>
        <strong>CPF cadastrado</strong>
        <div>{user.cpf}</div>
        <strong>Endereço cadastrado</strong>
        <div>{user.address}</div>

        <div className="buttons-profile">
          <Button onClick={() => setIsEditMode(true)}>Editar</Button>

          <Button
            onClick={() => handleMyHelps()}
            style={{ background: "green" }}
          >
            Meus Pedidos
          </Button>
          <Button
            children="Logout"
            style={{ background: "red" }}
            onClick={onClickLogout}
          />
        </div>
      </Container>
    );

  async function onSubmitForm(dataForm) {
    try {
      await axiosInstance.put("/users", {
        name: dataForm.name,
        address: dataForm.address,
        cpf: dataForm.cpf,
        email: dataForm.email,
        activePassword: dataForm.activePassword,
        newPassword: dataForm.newPassword,
      });
      setResponsePutUser("Sucesso");
      setErrorPutUser(null);
    } catch (error) {
      setErrorPutUser(
        error.response?.data?.message || "Erro ao atualizar usuário"
      );
    }
  }

  return (
    <Container additionalClass="profile-screen">
      <h1>Editar usuário</h1>

      <form className="form-register" onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <Label>Insira seu nome completo</Label>
          <Input
            id="name"
            label="Nome completo"
            error={!!errors.name?.message}
            type="text"
            {...register("name", { required: "O nome é obrigatório" })}
          />
          {errors.name && (
            <span className="warring">{errors.name?.message}</span>
          )}
        </div>
        <div>
          <Label>Insira seu endereço completo</Label>
          <Input
            id="address"
            label="Endereço"
            error={!!errors.address?.message}
            type="text"
            {...register("address", { required: "Endereço é obrigatório" })}
          />
          {errors.address && (
            <span className="warring">{errors.address?.message}</span>
          )}
        </div>
        <div>
          <Label>Insira seu CPF</Label>
          <Input
            id="cpf"
            label="CPF"
            error={!!errors.cpf?.message}
            type="text"
            {...register("cpf", { required: "CPF é obrigatório" })}
          />
          {errors.cpf && <span className="warring">{errors.cpf?.message}</span>}
        </div>
        <div>
          <Label>Insira seu endereço de e-mail</Label>
          <Input
            id="email"
            label="Email"
            error={!!errors.email?.message}
            type="text"
            {...register("email", { required: "Email é obrigatório" })}
          />
          {errors.email && (
            <span className="warring">{errors.email?.message}</span>
          )}
        </div>

        <Button
          type="button"
          onClick={() => setIsPasswordActive((old) => !old)}
        >
          Alterar senha
        </Button>
        {isPasswordActice && (
          <>
            <Label>Insira sua senha atual</Label>
            <Input
              id="activePassword"
              label="Senha antiga"
              error={!!errors.activePassword?.message}
              type="password"
              {...register("activePassword")}
            />
            {errors.activePassword && (
              <span className="warring">{errors.activePassword?.message}</span>
            )}

            <Label>Insira sua nova senha</Label>
            <Input
              id="newPassword"
              label="Nova senha"
              error={!!errors.newPassword?.message}
              type="password"
              {...register("newPassword")}
            />
            <span className="warring">{errors.newPassword?.message}</span>
          </>
        )}

        <StatusReturnApi hasError={errorPutUser} />
        {responsePutUser && (
          <p style={{ color: "green" }}>Dados salvos com sucesso!</p>
        )}
        <Button type="submit" style={{ background: "green" }}>
          Atualizar
        </Button>
        <Button
          onClick={() => setIsEditMode(false)}
          style={{ background: "gray" }}
        >
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
