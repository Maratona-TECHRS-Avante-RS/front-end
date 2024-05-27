import "./index.css";
import { Container, StatusReturnApi } from "../../components";
import { useListHelps } from "../../../hooks";
import { HelpCard } from "../../components/help-card";

export function HomeScreen() {
  const { helps, isLoading, hasError } = useListHelps();

  if (!helps?.length) return <p className="center-text">Sem chamados disponíveis</p>
  if (hasError)
    return <StatusReturnApi hasError={hasError} isLoading={isLoading} />;

  return (
    <Container additionalClass="home-screen">
      <h1>Pedidos de ajuda próximos</h1>
      <div className="helps-container">
        {helps?.map((help) => (
          <HelpCard
            activeVolunteers={help.activeVolunteers}
            createdAt={help.createdAt}
            expirationTimeLabel={help.expirationTimeLabel}
            helpTypeLabel={help.helpTypeLabel}
            id={help.id}
            key={help.id}
            distance={help.distance}
            address={help.address}
            numberVolunteersLabel={help.numberVolunteersLabel}
            urgencyLevelLabel={help.urgencyLevelLabel}
          />
        ))}
      </div>
    </Container>
  );
}
