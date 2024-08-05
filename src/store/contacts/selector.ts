import { createSelector } from "reselect";
import type { Contact } from "@/types";
import type { RootState } from "../store";

const selectContactsState = (state: RootState) => state.contacts;

export const selectAllContacts = createSelector(
  selectContactsState,
  (contactsState) => contactsState.contacts
);

export const selectContactById = (id: string | undefined) =>
  createSelector([selectAllContacts], (contacts: Contact[]) =>
    contacts.find((contact) => contact.id === id)
  );

export const selectContactStatus = createSelector(
  selectContactsState,
  (contactsState) => contactsState.isLoading
);

export const selectContactError = createSelector(
  selectContactsState,
  (contactsState) => contactsState.error
);
