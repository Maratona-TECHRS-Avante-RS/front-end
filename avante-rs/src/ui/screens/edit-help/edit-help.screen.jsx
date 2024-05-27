import "./index.css";
import { useEffect, useState } from "react";
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
import {
  useListAnswers,
  useListTools,
  useEditHelp,
  useAnswers,
} from "../../../hooks";
import { useParams } from "react-router-dom";
import { Checkbox, ListItemText, MenuItem } from "@mui/material";

export function EditHelpScreen() {
  let { id } = useParams();
  const { resposta, fetchListAnswers } = useAnswers();

  useEffect(() => {
    fetchListAnswers(id);
  }, []);

  const [formInput, setFormInput] = useState({
    description: "",
    customAddress: "",
    phoneNumber: "",
    urgencyType: "",
    helpType: "",
    expirationTime: "",
    numberVolunteers: "",
  });

  const [toolsSelect, setToolsSelect] = useState([]);

  useEffect(() => {
    if (resposta) {
      setFormInput({
        description: resposta.description,
        customAddress: resposta.customAddress,
        phoneNumber: resposta.phoneNumber,
        urgencyType: resposta.urgencyLevel.id,
        helpType: resposta.helpType.id,
        expirationTime: resposta.expirationTime.id,
        numberVolunteers: resposta.numberVolunteers.id,
      });

      setToolsSelect(resposta.toolsOptions?.map((tool) => tool.id));
    }
  }, [resposta]);

  const { editHelp, hasError } = useEditHelp();

  const { respostas } = useListAnswers();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormInput((oldFormInput) => ({ ...oldFormInput, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await editHelp(
      id,
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

  function handleChangeList(event) {
    const {
      target: { value },
    } = event;
    setToolsSelect(value);
  }

  return (
    <Container additionalClass="edit-help-screen ">
      <h1>Editar pedido de ajuda</h1>

      <Form className="form-edit" onSubmit={handleSubmit}>
        <div>
          <Label>Selecione o tipo do seu pedido de ajuda</Label>
          <Select
            id={"helpType"}
            name={"helpType"}
            label={"Tipo de Ajuda"}
            value={formInput.helpType}
            defaultOption={"Escolha o Tipo de Ajuda"}
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
            Após este tempo selecionado, seu pedido de ajuda será
            automaticamente desativado do sistema;
          </p>
          <Select
            id={"expirationTime"}
            name={"expirationTime"}
            label={"Tempo de Expiração"}
            value={formInput.expirationTime}
            defaultOption={"Escolha o Tempo de Expiração"}
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
            defaultOption={"Escolha o Numero de Voluntarios"}
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
            Selecione uma lista de itens que podem ser úteis para sua ajuda
          </Label>

          <MultiSelect
            id={"checkboxTools"}
            name={"checkboxTools"}
            label={"Itens"}
            value={toolsSelect}
            onChange={(e) => handleChangeList(e)}
            renderValue={(selected) =>
              selected.map((id) => ferramentas?.find((e) => e.id == id)?.name)
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
            Caso não preenchido, o sistema irá consideraro endereço do seu
            perfil de cadastro
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
            Caso ache necessário, é possível detalhar uma descrição para seu
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
          <Label>
            Insira seu número de telefone, o mesmo poderá ser visualizado pelos
            voluntários, onde poderão entrar em contato
          </Label>
          <p className="details-span">
            O mesmo poderá ser visualizado pelos voluntários, onde poderão
            entrar em contato
          </p>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            label={"Numero de Telefone"}
            value={formInput.phoneNumber}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <StatusReturnApi hasError={hasError} isLoading={isLoading} />
        <Button type="submit" style={{ width: "100%" }}>Atualizar</Button>
      </Form>
    </Container>
  );
}
