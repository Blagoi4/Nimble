import { API_URL, AUTH_TOKEN } from "@/constants/contatcs";
import { API_URL, AUTH_TOKEN } from "@/constants/contatcs";

export async function getFromAPI(endpoint: string) {
  try {
    console.log("URL FINAL", `${API_URL}/${endpoint}`);
    console.log("URL FINAL", `${API_URL}/${endpoint}`);
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function postToAPI(endpoint: string, data: any) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    console.error("Error posting data:", error);
    return null;
  }
}

export async function deleteFromAPI(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    console.error("Error deleting data:", error);
    return false;
  }
}

// export async function updateFromAPI(id: string, newTags: any) {
//   try {
//     const response = await fetch(`${API_URL}/contacts/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${AUTH_TOKEN}`,
//       },
//       body: JSON.stringify({ tags: newTags }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error updating contact: ${errorText}`);
//     }

//     const updatedContact = await response.json();
//     return updatedContact;
//   } catch (error) {
//     console.error("Failed to update contact tags:", error);
//   }
// }
export const updateFromAPI = async (
  id: string,
  newTags: any
): Promise<Response> => {
  const response = await fetch(`${API_URL}/contacts/${id}/tags`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ tags2: newTags }),
  });

  if (!response.ok) {
    throw new Error(`Error updating tags: ${response.statusText}`);
  }

  return response;
};
