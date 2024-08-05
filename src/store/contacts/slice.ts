// slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, fetchContactById, updateContact } from "@/store/contacts/action";
import type { Contact, ContactsAPIResponse } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ContactsState {
  contacts: Contact[];
  isLoading: {
    fetchContacts: boolean;
    addContact: boolean;
    deleteContact: boolean;
    fetchContactById: boolean;
    updateContact: boolean;
  };
  error: {
    fetchContacts: string | null;
    addContact: string | null;
    deleteContact: string | null;
    fetchContactById: string | null;
    updateContact: string | null;
  };
}

const initialState: ContactsState = {
  contacts: [],
  isLoading: {
    fetchContacts: false,
    addContact: false,
    deleteContact: false,
    fetchContactById: false,
    updateContact: false,
  },
  error: {
    fetchContacts: null,
    addContact: null,
    deleteContact: null,
    fetchContactById: null,
    updateContact: null,
  },
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
        state.isLoading.fetchContacts = true;
        state.error.fetchContacts = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<ContactsAPIResponse>) => {
        const contactsData = action.payload.resources;
        state.contacts = contactsData ? contactsData : [];
        state.isLoading.fetchContacts = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error.fetchContacts = action.error.message || "Error fetching contacts";
        state.isLoading.fetchContacts = false;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading.addContact = true;
        state.error.addContact = null;
      })
      .addCase(addContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
        state.isLoading.addContact = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error.addContact = action.error.message || "Error adding contact";
        state.isLoading.addContact = false;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading.deleteContact = true;
        state.error.deleteContact = null;
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<string>) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
        state.isLoading.deleteContact = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error.deleteContact = action.error.message || "Error deleting contact";
        state.isLoading.deleteContact = false;
      })
      .addCase(fetchContactById.pending, (state) => {
        state.isLoading.fetchContactById = true;
        state.error.fetchContactById = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        const hasContact = state.contacts.findIndex((contact) => contact.id === action.payload.id) >= 0;
        if (!hasContact) {
          state.contacts.push(action.payload);
        }
        state.isLoading.fetchContactById = false;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.error.fetchContactById = action.error.message || "Error fetching contact";
        state.isLoading.fetchContactById = false;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading.updateContact = true;
        state.error.updateContact = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const contactToUpdateIndex = state.contacts.findIndex((contact) => contact.id === action.payload.id);
        if (contactToUpdateIndex >= 0) {
          state.contacts[contactToUpdateIndex] = action.payload;
        }
        state.isLoading.updateContact = false;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error.updateContact = action.error.message || "Error updating contact";
        state.isLoading.updateContact = false;
      });
  },
});

export const { setContact } = contactsSlice.actions;
export default contactsSlice.reducer;