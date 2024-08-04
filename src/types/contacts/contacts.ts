export type Contact = {
  lastName: string;
  firstName: string;
  avatar_url: string;
  id: string;
  fields: {
    email: { value: string }[];
    'first name': { value: string }[];
    'last name': { value: string }[];
  };
  tags2: string[];
};

export type ContactsAPIResponse = {
  resources: Contact[];
  meta: {
    per_page: number;
    total: number;
    pages: number;
    page: number;
  };
};
