import { useTasks } from "@/modules/tasks";
import { columns } from "@/pages/task/columns";
import DaTaTable from "@/pages/task/DaTaTable";

const Dashboard = () => {
  const { data } = useTasks();
  return (
    <div className="space-y-6">
      <DaTaTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default Dashboard;
