import axios from "axios"

const authURL = 'https://todo-list.alphacamp.io/api/auth'

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    console.log(data);
    
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
}

export const register = async ({username, email, password}) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });

    console.log(data);
    
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Register Failed]:', error); 
  }
}

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`, {
      headers: {
        // Bearer 跟 authToken 之間一定要空一格。
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};