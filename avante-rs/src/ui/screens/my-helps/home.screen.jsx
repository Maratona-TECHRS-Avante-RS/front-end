import "./index.css";
import { Container, StatusReturnApi } from "../../components";
import { axiosInstance } from "../../../api";
import { useEffect, useState } from "react";
import { HelpCard } from "../../components/help-card";

export function MyHelpsScreen() {
  const [helps, setHelps] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(null);

  useEffect(() => {
    async function fetchListHelps() {
      try {
        const response = await axiosInstance.get(`/helps/me`);
        setHelps(response?.data?.content);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListHelps();
  }, []);

  if (!helps?.length)
    return <p className="center-text">Sem chamados disponíveis</p>;
  if (hasError)
    return <StatusReturnApi hasError={hasError} isLoading={isLoading} />;

  return (
    <Container additionalClass="my-help-screen">
      <h1>Seus pedidos de ajuda cadastrados</h1>

      <div className="helps-container">
        {helps?.map((help) => (
          <HelpCard
            activeVolunteers={help.activeVolunteers}
            createdAt={help.createdAt}
            expirationTimeLabel={help.expirationTimeLabel}
            helpTypeLabel={help.helpTypeLabel}
            id={help.id}
            key={help.id}
            address={help.address}
            numberVolunteersLabel={help.numberVolunteersLabel}
            urgencyLevelLabel={help.urgencyLevelLabel}
          />
        ))}
      </div>
    </Container>
  );
}
