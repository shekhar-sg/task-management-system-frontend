import {Button} from "@/components/ui/button";

const NavigationSidebar = () => {
  return (
    <>
      <div className={"flex items-center bg-background h-16 px-6"}>
        <h6 className={"text-xl"}>You</h6>
      </div>
      <div className={"flex gap-4 w-full h-full p-6 shadow-inner_soft bg-card"}>
        <Button variant={"outline"}>View Dashboard</Button>
        <Button variant={"outline"}>Create Task</Button>
      </div>
    </>
  );
};

export default NavigationSidebar;
