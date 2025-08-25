"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { NextPage } from "next";
import { LOCAL_STORAGE_KEYS } from "~~/constants/localStorageKeys";
import { useLoginStore } from "~~/services/store/daoLogin.store";

const LogOutPage: NextPage = () => {
  const { setIsLogin } = useLoginStore();

  const router = useRouter();

  //TODO: no confiarme aun de esto
  //effects
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.IS_LOGIN);
    setIsLogin(false);
    router.push("/");
  }, [router, setIsLogin]);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div>
        <Loader className="w-8 h-8 animate-spin" />
        <h1>Log Out...</h1>
      </div>
    </main>
  );
};

export default LogOutPage;
