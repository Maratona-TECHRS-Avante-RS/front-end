import { axiosInstance } from "../_base/axios-instance";

export async function editHelpApi(
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
  const response = await axiosInstance.put(`/helps/${id}`, {
    description: description,
    customAddress: customAddress,
    phoneNumber: phoneNumber,
    urgencyType: Number(urgencyType),
    helpType: Number(helpType),
    expirationTime: Number(expirationTime),
    numberVolunteers: Number(numberVolunteers),
    idsTools: idsTools,
  });
  return response.data;
}
