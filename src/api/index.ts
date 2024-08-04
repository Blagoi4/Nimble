import { deleteFromAPI, getFromAPI, postToAPI } from '@/shared/utils/fetch';

export interface RemoteClient {
  get(endpoint: string): Promise<any>;
  post(endpoint: string, data: any): Promise<any>;
  delete(endpoint: string): Promise<boolean>;
}

export class RestAPIAdapter implements RemoteClient {
  async get(endpoint: string) {
    return getFromAPI(endpoint);
  }

  async post(endpoint: string, data: any) {
    return postToAPI(endpoint, data);
  }

  async delete(endpoint: string) {
    return deleteFromAPI(endpoint);
  }
}

export interface ContactRepository {
  fetchContactsData(key: string): any;
  saveContactsData(key: string, data: any): void;
  deleteContactsData(key: string): void;
}

export class RemoteContactRepository implements ContactRepository {
  constructor(private client: RemoteClient) {}

  async fetchContactsData(endpoint: string) {
    return this.client.get(endpoint);
  }

  async saveContactsData(endpoint: string, data: any) {
    return this.client.post(endpoint, data);
  }

  async deleteContactsData(endpoint: string) {
    return this.client.delete(endpoint);
  }
}