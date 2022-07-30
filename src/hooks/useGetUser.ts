import axios from "axios";
import { removeFalsyValues } from "helpers";
import { currentUser, currentUserAuthToken } from "helpers/storage";
import { useEffect, useState } from "react";

const useGetUser = () => {
  const [user, setUser] = useState<any>(currentUser());

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/auth/me`, {
        headers: {
          ...removeFalsyValues({
            Authorization: currentUserAuthToken()
              ? `Bearer ${currentUserAuthToken() || ""}`
              : undefined,
          }),
        },
      })
      .then(({ data }) => {
        if (data.user) {
          setUser(data.user);
        }
      });
  }, []);

  return user;
};

export default useGetUser;
