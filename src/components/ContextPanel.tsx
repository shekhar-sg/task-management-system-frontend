import type {ReactNode} from "react";
import {useMediaQuery} from "react-responsive";
import {Sheet, SheetContent} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {useTaskStore} from "@/modules/tasks/task.store";

interface ContextPanelProps {
  children?: ReactNode;
}

const ContextPanel = (props: ContextPanelProps) => {
  const { children } = props;
  const { isTaskDetailPanelOpen, setIsTaskDetailPanelOpen, selectedTask } = useTaskStore();
  const isBelowXl = useMediaQuery({ maxWidth: 1279 });

  return (
    <>
      {isBelowXl ? (
        <Sheet open={isTaskDetailPanelOpen} onOpenChange={setIsTaskDetailPanelOpen}>
          <SheetContent className="[&>button]:hidden p-0 overflow-hidden max-md:min-w-full">
            <div className="flex h-full overflow-hidden flex-col border bg-background w-full xl:w-[500px]">
              <div className="flex items-center justify-between bg-background h-16 px-6 border-b">
                <h6 className="text-xl font-semibold">{selectedTask ? "Task Details" : "Create Task"}</h6>
                <button
                  onClick={() => setIsTaskDetailPanelOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
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
            isTaskDetailPanelOpen ? "-translate-x-full md:-translate-x-[calc(100%+0.5rem)]" : "translate-x-0"
          )}
        >
          <div className="flex h-full shadow-inner_soft overflow-hidden rounded-xl flex-col border bg-card w-full md:w-[400px]">
            <div className="flex items-center justify-between bg-background h-16 px-6">
              <h6 className="text-xl font-semibold">{selectedTask ? "Task Details" : "Create Task"}</h6>
              <button
                onClick={() => setIsTaskDetailPanelOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
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
