import { useTasks } from '@/modules/tasks';
import { columns } from '@/pages/task/columns';
import DataTable from '@/pages/task/data-table';

const Dashboard = () => {
  const { data } = useTasks();
  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default Dashboard;
