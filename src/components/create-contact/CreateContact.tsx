import { useContacts } from "@/hooks/useContacts";
import { CustomBtn } from "@/shared/ui-kit/button/CustomBtn";
import Input from "@/shared/ui-kit/input/Input";
import { setContact } from "@/store/contacts/slice";
import { Contact, ContactField } from "@/types";
import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hasValidNameAndEmail } from "../../shared/validator";

const createContactField = (label: string, value: string): ContactField => ({
  label,
  modifier: "",
  value,
  is_primary: true,
});

const generateFields = (
  firstName: string,
  lastName: string,
  email: string
) => ({
  email: [createContactField("email", email)],
  "first name": firstName ? [createContactField("first name", firstName)] : [],
  "last name": lastName ? [createContactField("last name", lastName)] : [],
});

function CreateContact() {
  const dispatch = useDispatch();
  const { createContact } = useContacts();
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleAddContact = () => {
    const { firstName, lastName, email } = newContact;

    if (!email || (!firstName && !lastName)) {
      console.error(
        "Ошибка валидации: Email или одно из полей (First Name или Last Name) должно быть заполнено."
      );
      return;
    }

    const fields = generateFields(firstName, lastName, email);

    const formatContact: Contact = {
      id: new Date().toISOString(),
      record_type: "person",
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,
      fields,
    };

    dispatch(setContact(formatContact));
    createContact(formatContact).catch((error) => {
      console.error("Ошибка при создании контакта:", error);
    });
  };

  const isValid = hasValidNameAndEmail(
    newContact.firstName,
    newContact.lastName,
    newContact.email
  );

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", flex: 1.7, gap: 4 }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
        Create Contacts
      </Typography>
      <Input
        label="First Name"
        value={newContact.firstName}
        onChange={(e) =>
          setNewContact({ ...newContact, firstName: e.target.value })
        }
      />
      <Input
        label="Last Name"
        value={newContact.lastName}
        onChange={(e) =>
          setNewContact({ ...newContact, lastName: e.target.value })
        }
      />
      <Input
        label="Email"
        value={newContact.email}
        onChange={(e) =>
          setNewContact({ ...newContact, email: e.target.value })
        }
        error={!isValid && newContact.email !== ""}
        helperText={
          !isValid && newContact.email !== "" ? "Invalid email address" : ""
        }
      />
      <CustomBtn
        sx={{ mt: 2, bgcolor: "primary.main", color: "white" }}
        onClick={handleAddContact}
        disabled={!isValid}
      >
        Add Contact
      </CustomBtn>
    </Container>
  );
}

export default CreateContact;
