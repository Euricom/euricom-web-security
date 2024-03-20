import { useEffect, useState } from "react";
import * as api from "./api";

export type Session = {
  authenticated: boolean;
  userName: string;
};

export const useSession = () => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    api.getSession().then((result) => {
      setSession(result);
    });
  }, []);

  return {
    session,
    logout: async () => {
      const result = await api.logout();
      console.log("Logged out...", result);
      window.location.href = "/";
    },
  };
};
