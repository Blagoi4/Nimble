import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Contact, ContactsAPIResponse } from "@/types";
import { RemoteContactRepository, RestAPIAdapter } from "@/api";

const contactsRepository = new RemoteContactRepository(new RestAPIAdapter());

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
      await contactsRepository.fetchContactsData(url);
    console.log("Response from API:", response);
    return response;
  } catch (error: any) {
    console.error("Error in fetchContacts:", error);
    return rejectWithValue(error.message || "Failed to fetch contacts");
  }
});

export const addContact = createAsyncThunk<
  Contact,
  Contact,
  { rejectValue: string }
>("contacts/addContact", async (newContact, { rejectWithValue }) => {
  try {
    console.log("Sending data:", newContact);

    const response = await contactsRepository.saveContactsData(
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


export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("contacts/deleteContact", async (contactId, { rejectWithValue }) => {
  try {
    await contactsRepository.deleteContactsData(`contact/${contactId}`);
    return contactId;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to delete contact");
  }
});


export const updateContact = createAsyncThunk<
  Contact,
  { id: string; tags: string[] },
  { rejectValue: string }
>("contacts/updateContact", async ({ id, tags }, { rejectWithValue }) => {
  try {
    const response = await contactsRepository.updateContactsData(
      `contacts/${id}`,
      tags
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating contact: ${errorText}`);
    }

    const updatedContact = await response.json();
    return updatedContact;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to update contact");
  }
});

export const fetchContactById = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>("contacts/fetchContactById", async (contactId, { rejectWithValue }) => {
  try {
    const url = `contact/${contactId}`;
    const response: { resources: Contact[] } =
      await contactsRepository.fetchContactsData(url);
    console.log("Response from API:", response);
    return response.resources[0];
  } catch (error: any) {
    console.error("Error fetching contact by ID:", error);
    return rejectWithValue(error.message || "Failed to fetch contact");
  }
});
