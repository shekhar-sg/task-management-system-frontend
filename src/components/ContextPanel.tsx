import type {ReactNode} from "react";
import {useMediaQuery} from "react-responsive";
import {Sheet, SheetContent} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {useGlobalStore} from "@/stores/global.store";

interface ContextPanelProps {
  children?: ReactNode;
}

const ContextPanel = (props: ContextPanelProps) => {
  const { children } = props;
  const isBelowXl = useMediaQuery({ maxWidth: 1279 });
  const { isContextPanelOpen, contextType, closeContextPanel } = useGlobalStore();

  const Title = (() => {
    switch (contextType) {
      case "TASK_DETAILS":
        return "Task Details";
      case "TASK_CREATE":
        return "Create Task";
      case "TASK_UPDATE":
        return "Update Task";
      case "NOTIFICATIONS":
        return "Notifications";
    }
  })();

  if (!isContextPanelOpen) return null;

  return (
    <>
      {isBelowXl ? (
        <Sheet open={isContextPanelOpen} onOpenChange={closeContextPanel}>
          <SheetContent className="[&>button]:hidden p-0 overflow-hidden max-md:min-w-full">
            <div className="flex h-full overflow-hidden flex-col border bg-background w-full xl:w-[500px]">
              <div className="flex items-center justify-between bg-background min-h-16 px-6 border-b">
                <h6 className="text-xl font-semibold">{Title}</h6>
                <button onClick={closeContextPanel} className="text-muted-foreground hover:text-foreground">
                  ✕
                </button>
              </div>
              <div className="w-full h-full overflow-y-auto p-3">{children}</div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={cn(
            "absolute left-full top-0 md:top-2 bottom-0 md:bottom-2 transition-transform duration-300 ease-in-out z-40",
            isContextPanelOpen ? "-translate-x-full md:-translate-x-[calc(100%+0.5rem)]" : "translate-x-0"
          )}
        >
          <div className="flex h-full shadow-inner_soft overflow-hidden rounded-xl flex-col border bg-card w-full md:w-[400px]">
            <div className="flex items-center justify-between bg-background min-h-16 px-6">
              <h6 className="text-xl font-semibold">{Title}</h6>
              <button onClick={closeContextPanel} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>
            <div className="w-full h-full overflow-y-auto p-3">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default ContextPanel;
