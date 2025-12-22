import type {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAuthStore} from "@/modules/auth";
import {Loader} from "lucide-react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isAuthLoading } = useAuthStore();
  console.log({ isAuthLoading, isAuthenticated });

  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen relative gap-3 text-center px-4">
        <div
          className="
          absolute inset-0
          bg-cover bg-center
          bg-[url('/tms-background-light-mobile.png')]
          md:bg-[url('/tms-background-light-ipad.png')]
          lg:bg-[url('/tms-background-light.png')]
          dark:bg-[url('/tms-background-dark-mobile.png')]
          md:dark:bg-[url('/tms-background-dark-ipad.png')]
          lg:dark:bg-[url('/tms-background-dark.png')]
        "
        />
        <div className={"absolute inset-0 backdrop-blur-lg bg-black/80 dark:bg-black/50"} />
        <div className={"relative flex flex-col items-center gap-4"}>
          <Loader size={48} className={"text-white animate-spin"} />
          <p className={"text-2xl text-white font-medium"}>Waking up the server…</p>
          <p className={"text-base text-white/60 max-w-md"}>
            This app is hosted on a free server, so the first load may take a few seconds. Thanks for your patience.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
