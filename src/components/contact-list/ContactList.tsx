import { Box, Container, Typography } from "@mui/material";
import { useContacts } from "@/hooks/useContacts";
import ContactCardInfo from "../card/Card";
import { mapperData } from "../../shared/helper/mapperData";
import { useMemo } from "react";
import { Loader } from "@/shared/ui-kit/status/Loader";

function ContactList() {
  const { contacts, removeContact, status } = useContacts();
  const handleDeleteContact = (id: string) => {
    removeContact(id);
  };
  const mappedContacts = useMemo(
    () => contacts.map((contact) => mapperData(contact)),
    [contacts]
  );

  return (
    <Container sx={{ display: "flex", flexDirection: "column", flex: 3 }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "bold", paddingLeft: "16px" }}
        variant="h5"
        gutterBottom
      >
        Contacts
      </Typography>

      {status.fetchContacts ? (
        <Loader />
      ) : (
        <Box>
          {mappedContacts.map((contact, index) => (
            <ContactCardInfo
              key={contact.id || index}
              contact={contact}
              handleDelete={handleDeleteContact}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

export default ContactList;
