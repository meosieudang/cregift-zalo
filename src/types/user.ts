// src/types.ts
interface User {
  username: string;
  token: string;
}

interface AuthContextValue {
  user: {
    id: string;
    name: string;
    avatar: string;
    idByOA?: string;
    isSensitive?: boolean;
    followedOA?: boolean;
  } | null;
  login: (data: { username: string; password: string }) => void;
  logout: () => void;
  setUser: (d) => void;
  setAccessTokenZalo: (token) => void;
  accessTokenZalo: string | null;
  hasAuthor: boolean;
  setHasAuthor: (flag) => void;
  phoneNumberZalo: string;
  setPhoneNumberZalo: (d) => void;
}
