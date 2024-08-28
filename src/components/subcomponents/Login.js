"use client";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [menu, setMenu] = useState(false);
  function signout() {
    window.location.reload();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser("");
        setLoggedIn(false);
        setMenu(false);
        localStorage.setItem("user", "");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  function login() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        setLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        window.location.reload();
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setLoggedIn(true);
    }
  }, []);
  return (
    <>
      {!loggedIn ? (
        <button
          onClick={() => login()}
          className="outline outline-2 outline-black px-6 py-1 font-bold"
        >
          Login
        </button>
      ) : (
        <div className="relative">
          <Image
            className="rounded-full outline outline-2 outline-black cursor-pointer"
            onClick={() => setMenu(!menu)}
            src={user.photoURL}
            alt="User Icon"
            width={36}
            height={36}
          />
          {menu ? (
            <div className="absolute top-12 right-0 translate-y-1/2">
              <button
                onClick={() => signout()}
                className="hover:rotate-[1deg] px-6 py-1 outline outline-black outline-2 font-bold"
              >
                Signout
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
