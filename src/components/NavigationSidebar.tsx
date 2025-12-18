import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/modules/tasks/task.store";

const NavigationSidebar = () => {
  const { setIsTaskDetailPanelOpen } = useTaskStore();
  return (
    <>
      <div className={"flex items-center bg-background h-16 px-6"}>
        <h6 className={"text-xl"}>You</h6>
      </div>
      <div className={"flex gap-4 w-full h-full p-6 shadow-inner_soft bg-card"}>
        <Button variant={"outline"} onClick={() => setIsTaskDetailPanelOpen(true)}>
          View Dashboard
        </Button>
        <Button variant={"outline"} onClick={() => setIsTaskDetailPanelOpen(true)}>
          Create Task
        </Button>
      </div>
    </>
  );
};

export default NavigationSidebar;
