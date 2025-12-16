import {ThemeToggle} from '@/components/ThemeToggle';
import {useTasks} from '@/modules/tasks';
import {columns} from '@/pages/task/columns';
import DataTable from '@/pages/task/data-table';
import {tasks} from '@/pages/task/type.constants';
import {useLogout} from '@/modules/auth';
import {Button} from '@/components/ui/button';
import {LogOut} from 'lucide-react';
import {ButtonGroupSeparator} from '@/components/ui/button-group';

const MainDashboard = () => {
  const { data } = useTasks();
  const logout = useLogout();

  return (
    <div className={'flex flex-1 overflow-hidden rounded-xl flex-col shadow-inner border'}>
      <div className={'flex items-center bg-background justify-between h-16 px-6'}>
        <h6 className={'text-xl'}>Dashboard</h6>
        <div className={'flex gap-4 items-center'}>
          <ThemeToggle />
          <ButtonGroupSeparator />
          <Button variant={'outline'} onClick={() => logout.mutate()}>
            <LogOut />
          </Button>
        </div>
      </div>
      <div className={'flex flex-col justify-between w-full h-full shadow-inner_soft bg-card'}>
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="h-44 bg-info rounded-xl"></div>
          <div className="h-44 bg-info rounded-xl"></div>
          <div className="h-44 bg-info rounded-xl"></div>
        </div>
        <DataTable columns={columns} data={tasks} />
      </div>
    </div>
  );
};

export default MainDashboard;
