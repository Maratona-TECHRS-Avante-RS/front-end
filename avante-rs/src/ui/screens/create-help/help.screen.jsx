import "./index.css";
import { useState } from "react";
import { useRegisterHelp } from "../../../hooks";
import {
  Button,
  Container,
  Form,
  Input,
  Label,
  MultiSelect,
  Select,
  StatusReturnApi,
} from "../../components";
import { useListAnswers, useListTools } from "../../../hooks";
import { Checkbox, ListItemText, MenuItem } from "@mui/material";

export function HelpScreen() {
  const [formInput, setFormInput] = useState({
    description: "",
    customAddress: "",
    phoneNumber: "",
    urgencyType: "",
    helpType: "",
    expirationTime: "",
    numberVolunteers: "",
  });

  const { registerHelp, hasError } = useRegisterHelp();

  const { respostas } = useListAnswers();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInput((oldFormInput) => ({ ...oldFormInput, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await registerHelp(
      formInput.description,
      formInput.customAddress,
      formInput.phoneNumber,
      formInput.urgencyType,
      formInput.helpType,
      formInput.expirationTime,
      formInput.numberVolunteers,
      toolsSelect
    );
  }

  const { ferramentas, isLoading } = useListTools();

  const [toolsSelect, setToolsSelect] = useState([]);

  function handleChangeList(event) {
    const {
      target: { value },
    } = event;
    setToolsSelect(value);
  }

  return (
    <Container additionalClass="create-help-screen">
      <h1>Criar pedido de ajuda</h1>
      <Form className="form-create" onSubmit={handleSubmit}>
        <div>
          <Label>Selecione o tipo do seu pedido de ajuda</Label>
          <Select
            id={"helpType"}
            name={"helpType"}
            label={"Tipo de Ajuda"}
            value={formInput.helpType}
            defaultOption={"Escolha o tipo de ajuda"}
            onChange={(e) => handleChange(e)}
          >
            {respostas?.helpType.map((resposta) => (
              <MenuItem key={resposta.id} value={resposta.id}>
                {resposta.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <Label>Selecione o nível de urgência</Label>
          <Select
            id={"urgencyType"}
            name={"urgencyType"}
            label={"Nivel de Urgência"}
            value={formInput.urgencyType}
            defaultOption={"Escolha o nível de urgência"}
            onChange={(e) => handleChange(e)}
          >
            {respostas?.urgencyType.map((resposta) => (
              <MenuItem key={resposta.id} value={resposta.id}>
                {resposta.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <Label>
            Selecione o tempo em que seu pedido de ajuda irá expirar
          </Label>
          <p className="details-span">
            Após este tempo selecionado, seu pedido de ajuda será desativado no sistema.
          </p>
          <Select
            id={"expirationTime"}
            name={"expirationTime"}
            label={"Tempo de Expiração"}
            value={formInput.expirationTime}
            defaultOption={"Escolha o tempo de expiração"}
            onChange={(e) => handleChange(e)}
          >
            {respostas?.expirationTime.map((resposta) => (
              <MenuItem key={resposta.id} value={resposta.id}>
                {resposta.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <Label>Selecione o número de voluntários necessários</Label>
          <Select
            id={"numberVolunteers"}
            name={"numberVolunteers"}
            label={"Número de Voluntarios"}
            value={formInput.numberVolunteers}
            defaultOption={"Escolha o número de voluntários"}
            onChange={(e) => handleChange(e)}
          >
            {respostas?.numberVolunteers.map((resposta) => (
              <MenuItem key={resposta.id} value={resposta.id}>
                {resposta.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <Label>
            Selecione uma lista de itens necessários para realizar o serviço necessário
          </Label>
          <MultiSelect
            id={"checkboxTools"}
            name={"checkboxTools"}
            label={"Itens"}
            value={toolsSelect}
            onChange={(e) => handleChangeList(e)}
            renderValue={(selected) =>
              selected.map((id) => ferramentas?.find((e) => e.id === id)?.name)
            }
          >
            {ferramentas?.map((ferramenta) => (
              <MenuItem key={ferramenta.id} value={ferramenta.id}>
                <Checkbox checked={toolsSelect.includes(ferramenta.id)} />
                <ListItemText primary={ferramenta.name} />
              </MenuItem>
            ))}
          </MultiSelect>
        </div>
        <div>
          <Label>Preencha o endereço onde é necessário a ajuda</Label>
          <p className="details-span">
            Caso não preenchido, o sistema irá considerar o endereço do seu
            perfil de cadastro.
          </p>
          <Input
            id="customAddress"
            name="customAddress"
            label={"Endereço personalizado (Opcional)"}
            value={formInput.customAddress}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label>
            Caso ache necessário, é possível incluir uma descrição para seu
            pedido de ajuda
          </Label>
          <Input
            id="description"
            name="description"
            label={"Descrição (Opcional)"}
            value={formInput.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label>Insira seu número de telefone</Label>
          <p className="details-span">
            O mesmo poderá ser visualizado pelos voluntários, onde poderão
            entrar em contato.
          </p>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            label={"Número de telefone"}
            value={formInput.phoneNumber}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <StatusReturnApi hasError={hasError} isLoading={isLoading} />
        <Button type="submit" style={{ width: "100%" }}>Incluir</Button>
      </Form>
    </Container>
  );
}
