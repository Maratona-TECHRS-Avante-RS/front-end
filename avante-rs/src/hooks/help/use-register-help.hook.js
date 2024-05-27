import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerHelpApi } from "../../api";

export function useRegisterHelp() {
  const navigate = useNavigate();
  const [hasError, setError] = useState(null);

  async function registerHelp(
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
      await registerHelpApi(
        description,
        customAddress,
        phoneNumber,
        urgencyType,
        helpType,
        expirationTime,
        numberVolunteers,
        idsTools
      );

      navigate("/home");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return { registerHelp, hasError };
}
