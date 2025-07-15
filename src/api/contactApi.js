import instance from "./api";

export const sendContact = (formData) => instance.post("/contact/create", formData);
export const fetchContacts = () => instance.get("/contact/get");
