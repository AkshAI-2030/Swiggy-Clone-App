import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const backendURL = process.env.REACT_APP_API_URL;

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchMenu = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${backendURL}/api/v1/menu/${resId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setResInfo(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    if (resId) {
      fetchMenu();
    }
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
