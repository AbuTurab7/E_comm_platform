import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MyStore = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hydrate() {
      try {
        const res = await axios.post(
          "/api/auth/refresh-token",
          {},
          { withCredentials: true },
        );

        setAccessToken(res.data.data.accessToken);
        setUser(res.data.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    hydrate();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <MyStore.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {children}
    </MyStore.Provider>
  );
};
