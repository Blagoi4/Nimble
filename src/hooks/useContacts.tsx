import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "@/store/contacts/action";
import {
  selectAllContacts,
  selectContactStatus,
  selectContactError,
} from "@/store/contacts/selector";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import type { Contact } from "@/types";
  selectContactError,
} from "@/store/contacts/selector";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import type { Contact } from "@/types";

export function useContacts() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectAllContacts);
  const status = useAppSelector(selectContactStatus);
  const error = useAppSelector(selectContactError);

  const loadContacts = () => {
    dispatch(fetchContacts());
  };

  const createContact = (contact: Contact) => dispatch(addContact(contact));
  const createContact = (contact: Contact) => dispatch(addContact(contact));

  const removeContact = (id: string) => dispatch(deleteContact(id));

  const updateContacts = (id: string, newTags: string[]) =>
    dispatch(updateContact({ id, tags2: newTags }));

  return {
    contacts,
    status,
    error,
    loadContacts,
    createContact,
    removeContact,
    updateContacts,
  };
}
