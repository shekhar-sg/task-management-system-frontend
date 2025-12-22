import {Outlet} from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative min-h-svh flex items-center justify-evenly overflow-hidden">
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
      <div className={"relative z-10 hidden xl:block"}>
        <h1 className={"text-6xl font-bold mb-6 text-white max-w-xl leading-tight"}>Work smarter. Stay aligned. Deliver on time.</h1>
        <p className={"text-2xl max-w-xl text-white/60"}>
          TaskMaster helps teams plan, track, and execute work with clarity — from daily tasks to long-term goals, all
          in one streamlined workspace.
        </p>
      </div>
      <div className={"z-10 w-full max-w-md mx-4"}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
