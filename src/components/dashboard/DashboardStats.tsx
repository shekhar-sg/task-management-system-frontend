import {Card} from "@/components/ui/card";
import {useTasks} from "@/modules/tasks";
import {useTaskStore} from "@/modules/tasks/task.store";

const DashboardStats = () => {
  const filters = useTaskStore((state) => state.filters);
  const setFilters = useTaskStore((state) => state.setFilters);

  // Fetch data for each card separately
  const { data: allTasks } = useTasks({ view: "CREATED" });
  const { data: assignedTasks } = useTasks({ view: "ASSIGNED" });
  const { data: overdueTasks } = useTasks({ overdue: true });

  return (
    <div className="flex items-stretch h-full max-h-60 gap-4 p-4 overflow-x-scroll">
      <Card
        role={"button"}
        className={`w-80 aspect-video cursor-pointer rounded-xl transition-all ${
          filters?.view === "CREATED" ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-info"
        }`}
        onClick={() => setFilters(filters?.view === "CREATED" ? undefined : { view: "CREATED" })}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Total Tasks Created</h3>
          <p className="text-3xl">{allTasks?.length ?? 0}</p>
        </div>
      </Card>
      <Card
        role={"button"}
        className={`w-80 aspect-video cursor-pointer rounded-xl transition-all ${
          filters?.view === "ASSIGNED" ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-info"
        }`}
        onClick={() => setFilters(filters?.view === "ASSIGNED" ? undefined : { view: "ASSIGNED" })}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Tasks Assigned to Me</h3>
          <p className="text-3xl">{assignedTasks?.length ?? 0}</p>
        </div>
      </Card>
      <Card
        role={"button"}
        className={`w-80 aspect-video cursor-pointer rounded-xl transition-all ${
          filters?.overdue ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-info"
        }`}
        onClick={() => setFilters(filters?.overdue ? undefined : { overdue: true })}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Overdue Tasks</h3>
          <p className="text-3xl">{overdueTasks?.length ?? 0}</p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;
