import {Sheet, SheetContent} from "@/components/ui/sheet";
import {useTaskStore} from "@/modules/tasks/task.store";
import {useMediaQuery} from "react-responsive";
import {cn} from "@/lib/utils";

const TaskDetailsPanel = () => {
  const { isTaskDetailPanelOpen, setIsTaskDetailPanelOpen } = useTaskStore();
  const isBelowXl = useMediaQuery({ maxWidth: 1279 });

  return (
    <>
      {isBelowXl ? (
        <Sheet open={isTaskDetailPanelOpen} onOpenChange={setIsTaskDetailPanelOpen}>
          <SheetContent className="[&>button]:hidden p-0 overflow-hidden max-md:min-w-full">
            <div className="flex h-full overflow-hidden flex-col border bg-background w-full xl:w-[400px]">
              <div className="flex items-center bg-background h-16 px-6">
                <h6 className="text-xl font-semibold">Task Details</h6>
              </div>
              <div className="w-full shadow-inner_soft h-full overflow-y-auto bg-card p-6">
                <p className="text-muted-foreground">Select a task to view details</p>
              </div>
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
          <div className="flex h-full overflow-hidden rounded-xl flex-col border bg-background w-full md:w-[400px]">
            <div className="flex items-center bg-background h-16 px-6">
              <h6 className="text-xl font-semibold">Task Details</h6>
            </div>
            <div className="w-full shadow-inner_soft h-full overflow-y-auto bg-card p-6">
              <p className="text-muted-foreground">Select a task to view details</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskDetailsPanel;
