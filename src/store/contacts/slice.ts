import { createSlice } from "@reduxjs/toolkit";

import {
  fetchContacts,
  addContact,
  deleteContact,
  fetchContactById,
  updateContact,
} from "@/store/contacts/action";
import type { Contact, ContactsAPIResponse } from "@/types";

import type { PayloadAction } from "@reduxjs/toolkit";

interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<ContactsAPIResponse>) => {
          const contactsData = action.payload.resources;
          state.contacts = contactsData ? contactsData : [];
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.error.message || "Error fetching contacts";
        state.isLoading = false;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.contacts.push(action.payload);
          state.isLoading = false;
        }
      )
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.error.message || "Error adding contact";
        state.isLoading = false;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.contacts = state.contacts.filter(
            (contact) => contact.id !== action.payload
          );
          state.isLoading = false;
        }
      )
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.error.message || "Error deleting contact";
        state.isLoading = false;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        const hasContact =
          state.contacts.findIndex(
            (contact) => contact.id === action.payload.id
          ) >= 0;
        if (!hasContact) {
          state.contacts.push(action.payload);
        }
        state.isLoading = false;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const contactToUpdateIndex = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.contacts[contactToUpdateIndex] = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setContact } = contactsSlice.actions;

export default contactsSlice.reducer;
