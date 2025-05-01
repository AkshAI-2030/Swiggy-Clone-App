import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchMenu = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:3000/api/v1/menu/${resId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
