// src/utils/mapperData.ts

import { Contact } from "@/types";

export const mapperData = (data: Contact) => {
  if (!data || !data.fields) {
    return {
      email: "",
      firstName: "",
      lastName: "",
      avatar: "",
      tags: [],
      id: "",
    };
  }

  return {
    email: data.fields?.email?.[0]?.value || "",
    firstName: data.fields?.["first name"]?.[0]?.value || "",
    lastName: data.fields?.["last name"]?.[0]?.value || "",
    avatar: data.avatar_url || "",
    tags: data.tags2 || [],
    id: data.id,
  };
};