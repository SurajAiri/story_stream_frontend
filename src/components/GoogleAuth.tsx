import { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

const GoogleAuth = () => {
  useEffect(() => {
    /* global google */
    window.google?.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
      callback: handleCallbackResponse,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

    // Optional: show the Google One Tap prompt
    window.google?.accounts.id.prompt();
  }, []);

  const handleCallbackResponse = async (response: any) => {
    const idToken = response.credential;
    console.log("Encoded JWT ID token: " + idToken);

    const res = await fetch("http://localhost:3000/api/v1/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: idToken }),
    });

    const data = await res.json();
    console.log(data);
  };

  return <div id="googleSignInDiv"></div>;
};

export default GoogleAuth;
