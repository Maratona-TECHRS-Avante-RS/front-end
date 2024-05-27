import { useEffect, useState } from "react";
import { Container, Button, StatusReturnApi } from "../../components";
import { axiosInstance } from "../../../api";
import { useParams } from "react-router-dom";
import { timeUntilExpiration } from "../../../core/checkExpiration";
import { useNavigate } from "react-router-dom";
import "./index.css";

export function DetailsHelpScreen() {
  let { id } = useParams();

  const navigate = useNavigate();
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [isVoluntary, setIsVoluntary] = useState(false);
  const [volunteersNumber, setVolunteersNumber] = useState(0);

  useEffect(() => {
    async function fetchListAnswers() {
      try {
        const res = await axiosInstance.get(`/helps/` + id);
        setResponse(res.data);
        setIsVoluntary(res.data.userVoluntary);
        setVolunteersNumber(res.data.activeVolunteers);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListAnswers();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isVoluntary) {
      setVolunteersNumber((oldState) => oldState - 1);
      setIsVoluntary(false);
    } else {
      setIsVoluntary(true);
      setVolunteersNumber((oldState) => oldState + 1);
    }
    await axiosInstance.patch(`/helps/` + id);
  }

  async function handleExclude() {
    try {
      await axiosInstance.delete(`/helps/` + id);
      navigate(`/meus-pedidos`);
    } catch (error) {
      setErrorDelete(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEdit() {
    navigate(`/editar-ajuda/${id}`);
  }

  return isLoading ? (
    <StatusReturnApi hasError={hasError} isLoading={isLoading} />
  ) : (
    <Container additionalClass="details-screen">
      <h2>Dados do pedido de ajuda</h2>
      <p>
        Tempo para o pedido de ajuda expirar:{" "}
        {timeUntilExpiration(response.createdAt, response.expirationTime.name)}
      </p>
      <strong>Tipo de ajuda: {response.helpType.name}</strong>
      <p>{response.defaultAddress}</p>
      <strong>Distância do local: {response.distance} Km</strong>
      <p>Nível de urgência: {response.urgencyLevel.name}</p>

      <p>
        Voluntários ativos: {volunteersNumber} /{" "}
        {response.numberVolunteers.name}
      </p>
      <hr />
      {!!response.toolsOptions.length && (
        <>
          <p>Itens necessários:</p>
          <ul>
            {response.toolsOptions?.map((tool) => (
              <li key={tool.id}>{tool.name}</li>
            ))}
          </ul>
        </>
      )}
<br />
      {response.description && (
        <>
          <p>Descrição:</p>
          <pre>{response.description}</pre>
        </>
      )}

      <div className="div-buttons">
        {!response.userCreator && (
          <button
            className={`button-voluntary ${
              isVoluntary ? "btn-no" : "btn-active"
            }`}
            onClick={(e) => handleSubmit(e)}
          >
            {isVoluntary ? "Sair do chamado de ajuda" : "Ser voluntário"}
          </button>
        )}
        {!response.userCreator && (
          <a href={`https://wa.me/${response.phoneNumber}`} target="_blank"  rel="noreferrer">
            Conversar via WhatsApp
          </a>
        )}
        {response.userCreator && (
          <button className="button-edit" onClick={() => handleEdit()}>
            Editar
          </button>
        )}
        {response.userCreator && (
          <button className="button-exclude" onClick={() => handleExclude()}>
            Excluir
          </button>
        )}
        {errorDelete && <p className="warring">{errorDelete}</p>}
      </div>
    </Container>
  );
}
