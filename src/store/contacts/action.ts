import { createAsyncThunk } from "@reduxjs/toolkit";

import { deleteFromAPI } from "@/shared/utils/fetch";
import type { Contact, ContactsAPIResponse } from "@/types";
import { RemoteContactRepository, RestAPIAdapter } from "@/api";

const converterRepository = new RemoteContactRepository(new RestAPIAdapter());

export const fetchContacts = createAsyncThunk<
  ContactsAPIResponse,
  void,
  { rejectValue: string }
>("contacts/fetchContacts", async (_, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams({
      sort: "created:desc",
    });
    const url = `contacts?${params.toString()}`;
    const response: ContactsAPIResponse =
      await converterRepository.fetchContactsData(url);
    console.log("Response from API:", response);
    return response;
  } catch (error: any) {
    console.error("Error in fetchContacts:", error);
    return rejectWithValue(error.message || "Failed to fetch contacts");
  }
});

// Add a new contact
export const addContact = createAsyncThunk<
  Contact,
  Contact,
  { rejectValue: string }
>("contacts/addContact", async (newContact, { rejectWithValue }) => {
  try {
    console.log("Sending data:", newContact);

    const response = await converterRepository.saveContactsData(
      "contact",
      newContact
    );
    console.log("Received response:", response);

    return response;
  } catch (error: any) {
    console.error("Error in addContact:", error.message || "Unknown error");
    return rejectWithValue(error.message || "Failed to add contact");
  }
});

// Delete a contact
export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("contacts/deleteContact", async (contactId, { rejectWithValue }) => {
  try {
    await deleteFromAPI(`contacts/${contactId}`);
    return contactId;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to delete contact");
  }
});
