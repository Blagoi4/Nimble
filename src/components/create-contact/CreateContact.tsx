import { useContacts } from "@/hooks/useContacts";
import { setContact } from "@/store/contacts/slice";
import { Contact } from "@/types";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

function CreateContact() {
  const dispatch = useDispatch();
  const { createContact } = useContacts();
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleAddContact = () => {
    const formatContact: Contact = {
      record_type: "person",
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,
      id: new Date().toISOString(),
      fields: {
        email: [
          {
            label: "email",
            modifier: "",
            value: newContact.email,
            is_primary: true,
          },
        ],
        "first name": [
          {
            label: "first name",
            modifier: "",
            value: newContact.firstName,
            is_primary: true,
          },
        ],
        "last name": [
          {
            label: "last name",
            modifier: "",
            value: newContact.lastName,
            is_primary: true,
          },
        ],
      },
    };

    dispatch(setContact(formatContact));
    createContact(formatContact);
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", flex: 1.7, gap: 4 }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
        Create Contacts
      </Typography>

      <TextField
        label="First Name"
        value={newContact.firstName}
        onChange={(e) =>
          setNewContact({ ...newContact, firstName: e.target.value })
        }
      />
      <TextField
        label="Last Name"
        value={newContact.lastName}
        onChange={(e) =>
          setNewContact({ ...newContact, lastName: e.target.value })
        }
      />
      <TextField
        label="Email"
        value={newContact.email}
        onChange={(e) =>
          setNewContact({ ...newContact, email: e.target.value })
        }
      />
      <Button onClick={handleAddContact}>Add Contact</Button>
    </Container>
  );
}

export default CreateContact;
