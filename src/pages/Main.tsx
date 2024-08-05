import { Container } from "@mui/material";
import { useEffect } from "react";

import { useContacts } from "@/hooks/useContacts";
import CreateContact from "@/components/create-contact/CreateContact";
import ContactList from "@/components/contact-list/ContactList";

export const Main = () => {
  const { loadContacts, contacts, status } = useContacts();

  useEffect(() => {
    if (!status && contacts.length === 0) {
      loadContacts();
    }
  }, [status, contacts.length, loadContacts]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        marginTop: "30px",
        gap: 2,
        alignItems: { xs: "center", md: "flex-start" },
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <CreateContact />
      <ContactList />
    </Container>
  );
};