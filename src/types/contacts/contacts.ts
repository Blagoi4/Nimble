export type ContactField = {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
};

export type Privacy = {
  edit: null | { [key: string]: any };
  read: null | { [key: string]: any };
};

export type Context = {
  context_key: string;
  context: any;
};

export type Contact = {
  id: string;
  record_type: "person" | "company";
  fields: {
    email: ContactField[];
    "first name": ContactField[];
    "last name": ContactField[];
    [key: string]: ContactField[];
  };
  owner_id?: string | null;
  children?: any[];
  employers_info?: any[];
  updated?: string;
  created?: string;
  updater?: string | null;
  creator?: string;
  avatar_url?: string;
  tags?: string[];
  last_contacted?: {
    tstamp: string | null;
    type: string | null;
    object_id: string | null;
    user_id: string | null;
    deletion_tstamp: string | null;
  };
  company_last_contacted?: {
    in: string | null;
    out: string | null;
  };
  last_contacted_user?: string | null;
  lc?: string | null;
  is_important?: boolean | null;
  notice?: string | null;
  reminders?: any | null;
  reminder?: any | null;
  creator_id?: string;
  privacy?: Privacy;
  is_editable?: boolean;
  stages_info?: Record<string, any>;
  files?: any | null;
  contexts?: Context[];
  object_type?: "contact";
  tags2?: string[];
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
