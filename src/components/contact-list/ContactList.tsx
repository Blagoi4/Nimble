import { Box, Container, Typography } from "@mui/material";

import { useContacts } from "@/hooks/useContacts";

import ContactCardInfo from "../card/Card";
import { Contact } from "@/types";

function ContactList() {
  const { contacts, removeContact } = useContacts();
  const handleDeleteContact = (id: string) => {
    removeContact(id);
  };

  const mapContactData = (data: Contact) => {
    return {
      email: data.fields?.email?.[0]?.value || "",
      firstName: data.fields?.["first name"]?.[0]?.value || "",
      lastName: data.fields?.["last name"]?.[0]?.value || "",
      avatar: data.avatar_url || "",
      tags: data.tags2 || [],
      id: data.id,
    };
  };

  const mappedContacts = contacts.map((contact) => mapContactData(contact));

  return (
    <Container sx={{ display: "flex", flexDirection: "column", flex: 3 }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "bold", paddingLeft: "16px" }}
        variant="h5"
        gutterBottom
      >
        Contacts
      </Typography>
      <Box>
        {mappedContacts.map((contact, index) => (
          <ContactCardInfo
            key={contact.id || index}
            contact={contact}
            handleDelete={handleDeleteContact}
          />
        ))}
      </Box>
    </Container>
  );
}

export default ContactList;
