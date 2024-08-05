import { RootState } from "../store";
import type { Contact } from "@/types";

const selectContactsState = (state: RootState) => state.contacts;

export const selectAllContacts = (state: RootState) =>
  selectContactsState(state).contacts;

export const selectContactStatus = (state: RootState) =>
  selectContactsState(state).isLoading;

export const selectContactError = (state: RootState) =>
  selectContactsState(state).error;

export const selectContactById = (id: string) => (state: RootState) =>
  selectAllContacts(state).find((contact) => contact.id === id);