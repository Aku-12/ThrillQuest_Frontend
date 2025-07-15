import { sendContact, fetchContacts } from "../api/contactApi";

export const sendContactService = async (formData) => {
  const res = await sendContact(formData);
  return res.data;
};

export const fetchContactsService = async () => {
  const res = await fetchContacts();
  return res.data;
};
