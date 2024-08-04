import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFromAPI, deleteFromAPI, postToAPI } from '@/shared/utils/fetch';
import type { Contact, ContactsAPIResponse } from '@/types';

export const fetchContacts = createAsyncThunk<
  ContactsAPIResponse,
  void,
  { rejectValue: string }
>('contacts/fetchContacts', async (_, { rejectWithValue }) => {
  try {
    const response: ContactsAPIResponse = await getFromAPI('contacts');
    console.log('Response from API:', response);
    return response;
  } catch (error: any) {
    console.error('Error in fetchContacts:', error);
    return rejectWithValue(error.message || 'Failed to fetch contacts');
  }
});

// Add a new contact
export const addContact = createAsyncThunk<
  Contact,
  Partial<Contact>,
  { rejectValue: string }
>('contacts/addContact', async (newContact, { rejectWithValue }) => {
  try {
    // Лог отправляемых данных
    console.log('Sending data:', newContact);

    // Проверка структуры данных перед отправкой
    if (
      !newContact.fields ||
      !newContact.fields['first name'] ||
      !newContact.fields['last name']
    ) {
      throw new Error('Missing required fields');
    }

    const response = await postToAPI('contacts', newContact);

    // Лог ответа от API
    console.log('Received response:', response);

    return response;
  } catch (error: any) {
    console.error('Error in addContact:', error.message || 'Unknown error');
    return rejectWithValue(error.message || 'Failed to add contact');
  }
});

// Delete a contact
export const deleteContact = createAsyncThunk<string, string, { rejectValue: string }>(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      await deleteFromAPI(`contacts/${contactId}`);
      return contactId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete contact');
    }
  }
);
