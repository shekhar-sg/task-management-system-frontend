import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { registerTaskSocketEvents } from "@/modules/tasks";

const Layout = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    registerTaskSocketEvents(queryClient);
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-background">
      {/*<Navbar />*/}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
