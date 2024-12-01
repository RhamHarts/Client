import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Retrieve the token from the cookie named 'ref'
      const token = Cookies.get("ref");

      if (token) {
        console.log("Access token found:", token);

        // Set the token as the default Authorization header for axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Here, you might send a request to verify this token with the server
        setIsUserLoggedIn(true);
      } else {
        console.log("No access token found; user is not logged in");
        setIsUserLoggedIn(false);

        // Redirect to the login page if no token
        router.push("/login");
      }

      setLoading(false); // End loading state once token presence is checked
    }
  }, [router]); // Add the router as a dependency to useEffect

  return { loading, isUserLoggedIn };
}
