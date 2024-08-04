import { API_URL, AUTH_TOKEN } from '@/constants/contatcs';

export async function getFromAPI(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function postToAPI(endpoint: string, data: any) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
}

export async function deleteFromAPI(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error('Error deleting data:', error);
    return false;
  }
}

// export async function postToAPTwo(endpoint: string, data: any) {
//   try {
//     const response = await fetch(`${API_URL}/${endpoint}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${AUTH_TOKEN}`
//       },
//       body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error posting data:', error);
//     return null;
//   }
// }
