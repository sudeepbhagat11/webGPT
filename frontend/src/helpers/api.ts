import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/auth-status");
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Unable to authenticate");
    }
  } catch (error) {
    throw new Error("Unable to authenticate");
  }
};

export const sendChatRequest = async (message: string) => {
  if (!message) {
    throw new Error("Message content cannot be null or undefined");
  }

  const res = await axios.post("/new", { message });
  console.log(res);

  if (res.status !== 200) {
    throw new Error("Unable to send chats");
  }

  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  try {
    const res = await axios.delete("/delete");
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Unable to delete chats");
    }
  } catch (error) {
    throw new Error("Unable to delete chats");
  }
};

// export const logoutUser = async () => {
//   try {
//     const res = await axios.get("/user/logout");
//     if (res.status === 200) {
//       return res.data;
//     } else {
//       throw new Error("Unable to logout");
//     }
//   } catch (error) {
//     throw new Error("Unable to logout");
//   }
// };
