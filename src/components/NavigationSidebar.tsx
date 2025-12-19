import {BadgeCheckIcon, ExternalLink, LogOut, User2} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {CardDescription, CardTitle} from "@/components/ui/card";
import {Item, ItemActions, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item";
import {ScrollArea} from "@/components/ui/scroll-area";
import {type Task, useTasks, useTaskStore} from "@/modules/tasks";
import {useGlobalStore} from "@/stores/global.store";
import {useAuthStore, useLogout} from "@/modules/auth";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

const NavigationSidebar = () => {
  const user = useAuthStore((store) => store.user);
  const logout = useLogout();
  const { data: createdTasks } = useTasks({ view: "CREATED" });
  const { data: assignedTasks } = useTasks({ view: "ASSIGNED" });
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
  const openContextPanel = useGlobalStore((state) => state.openContextPanel);
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    openContextPanel("TASK_DETAILS");
  };
  return (
    <>
      <div className="flex items-center bg-background min-h-16 px-6">
        <h6 className="text-xl">You</h6>
      </div>

      <div className="flex flex-col gap-4 w-full h-full p-6 shadow-inner_soft bg-card">
        <Button variant="outline">View Dashboard</Button>
        <Button variant="outline">Create Task</Button>

        <Accordion type="single" collapsible className="w-full" defaultValue={"Created Tasks"}>
          <TaskSection title="Created Tasks" tasks={createdTasks} onSelectTask={handleSelectTask} />
          <TaskSection title="Assigned Tasks" tasks={assignedTasks} onSelectTask={handleSelectTask} />
        </Accordion>
      </div>

      <Item variant={"default"} size={"default"}>
        <ItemMedia>
          <Avatar>
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </ItemContent>
        <ItemActions>
          <Button variant={"outline"} onClick={() => logout.mutate()}>
            <LogOut />
          </Button>
        </ItemActions>
      </Item>
    </>
  );
};

export default NavigationSidebar;

interface TaskSectionProps {
  title: string;
  tasks?: Array<Task>;
  onSelectTask: (task: Task) => void;
}

const TaskSection = ({ title, tasks, onSelectTask }: TaskSectionProps) => {
  if (!tasks || tasks.length === 0) return null;

  return (
    <AccordionItem value={title}>
      <AccordionTrigger>
        {title} ({tasks.length})
      </AccordionTrigger>
      <AccordionContent>
        <ScrollArea className="h-72 md:h-96">
          <div className={"space-y-2"}>
            {tasks.map((task) => (
              <Item variant="outline" size="sm" key={task.id}>
                <ItemMedia>
                  <BadgeCheckIcon className="size-5" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{task.title}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ExternalLink role="button" className="size-4" onClick={() => onSelectTask(task)} />
                </ItemActions>
              </Item>
            ))}
          </div>
        </ScrollArea>
      </AccordionContent>
    </AccordionItem>
  );
};
