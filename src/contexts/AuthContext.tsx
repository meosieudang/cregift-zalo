// src/AuthContext.ts
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  clearStorage,
  getStorage,
  removeStorage,
  setStorage,
} from "zmp-sdk/apis";

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: (data) => {},
  logout: () => {},
  setUser: () => {},
  setAccessTokenZalo(token) {},
  accessTokenZalo: "",
  hasAuthor: false,
  setHasAuthor(flag) {},
  phoneNumberZalo: "",
  setPhoneNumberZalo: (d) => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [phoneNumberZalo, setPhoneNumberZalo] = useState("");
  const [accessTokenZalo, setAccessTokenZalo] = useState(null);
  const [hasAuthor, setHasAuthor] = useState(false);

  const getLocalStorageItem = async () => {
    const res = await getStorage({ keys: ["username", "accessToken"] });
    console.log(res, "get");
    if (res) {
      // setUser({ username: res.username, token: res.accessToken });
    }
    return res;
  };

  useEffect(() => {
    getLocalStorageItem();
    console.log("AuthProvider");
  }, []); // Empty dependency array to run only on initial render

  const login = async (data: { username: string; password: string }) => {
    // Simulate authentication (replace with your backend integration)
    const simulatedToken = "your_auth_token";
    // setUser({ username: data.username, token: simulatedToken });
    setStorage({
      data: {
        accessToken: simulatedToken,
        username: data.username,
      },
      success: (data) => {
        // xử lý khi gọi api thành công
        const { errorKeys } = data;
        console.log(errorKeys, "erk");
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };

  const logout = () => {
    removeStorage({ keys: ["username", "accessToken"] });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        accessTokenZalo,
        setAccessTokenZalo,
        hasAuthor,
        setHasAuthor,
        phoneNumberZalo,
        setPhoneNumberZalo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
