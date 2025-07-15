import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendContactService, fetchContactsService } from "../services/contactService";

export const useSendContact = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: sendContactService,
    onSuccess: () => {
      toast.success("Message sent! We'll be in touch.");
      qc.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => toast.error("Failed to send message."),
  });
};

export const useGetContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContactsService,
    onError: () => toast.error("Failed to load messages."),
  });
};
