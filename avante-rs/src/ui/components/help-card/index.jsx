import { Link } from "react-router-dom";
import { timeUntilExpiration } from "../../../core/checkExpiration";
import "./index.css";

export function HelpCard({
  id,
  helpTypeLabel,
  urgencyLevelLabel,
  createdAt,
  address,
  distance,
  expirationTimeLabel,
  activeVolunteers,
  numberVolunteersLabel,
}) {
  const timeExpiration = timeUntilExpiration(createdAt, expirationTimeLabel);
  if (timeExpiration === "Expirado") return null;

  return (
    <Link key={id} to={`/visualizar-ajuda/${id}`}>
      <div className="card-help">
        <h1>{helpTypeLabel}</h1>
        <span>Endereço: {address}</span>
        {distance && <span>Distância: {distance} Km</span>}
        <span className="urgency">Nível de urgência: {urgencyLevelLabel}</span>
        <span className="expiration">Este chamado de ajuda expira em: {timeExpiration}</span>
        <span className="volunteers">
          Voluntários: {activeVolunteers} / {numberVolunteersLabel}
        </span>
      </div>
    </Link>
  );
}
