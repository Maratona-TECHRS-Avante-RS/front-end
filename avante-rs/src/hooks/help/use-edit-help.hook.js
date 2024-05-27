import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editHelpApi } from "../../api";

export function useEditHelp() {
  const navigate = useNavigate();
  const [hasError, setError] = useState(null);

  async function editHelp(
    id,
    description,
    customAddress,
    phoneNumber,
    urgencyType,
    helpType,
    expirationTime,
    numberVolunteers,
    idsTools
  ) {
    try {
      await editHelpApi(
        id,
        description,
        customAddress,
        phoneNumber,
        urgencyType,
        helpType,
        expirationTime,
        numberVolunteers,
        idsTools
      );

      navigate("/meus-pedidos");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return { editHelp, hasError };
}
