import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    const setInitialStatus = () => {
      if (navigator.onLine) {
        document.title = "Online:✅";
        setOnlineStatus(true);
      } else {
        document.title = "Offline:🔴";
        setOnlineStatus(false);
      }
    };
    setInitialStatus();
    const handleOnline = () => {
      document.title = "Online:✅";
      setOnlineStatus(true);
    };
    const handleOffline = () => {
      document.title = "Offline:🔴";
      setOnlineStatus(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
