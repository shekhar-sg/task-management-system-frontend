import ContextPanel from "@/components/ContextPanel";
import { cn } from "@/lib/utils";
import { useRegisterTaskSocketEvents } from "@/modules/tasks";
import { useGlobalStore } from "@/stores/global.store";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  useRegisterTaskSocketEvents();
  const { isContextPanelOpen, closeContextPanel } = useGlobalStore();
  const isBelowLg = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    if (isBelowLg) {
      closeContextPanel();
    }
  }, [isBelowLg, closeContextPanel]);

  return (
    <main className={"flex overflow-hidden min-h-svh bg-background gap-2 p-0 md:p-2 relative"}>
      <div
        className={cn(
          "flex flex-1 overflow-auto h-svh rounded-xl flex-col shadow-inner border transition-all duration-300 ease-in-out",
          isContextPanelOpen ? "xl:mr-[calc(400px+0.5rem)]" : "xl:mr-0"
        )}
      >
        <Outlet />
      </div>
      <ContextPanel />
    </main>
  );
};

export default RootLayout;
