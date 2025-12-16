import MainDashboard from '@/pages/task/MainDashboard';
import TaskDetailsPanel from '@/pages/task/TaskDetailsPanel';
import UserInformation from '@/pages/task/UserInformation';

const DashboardLayout = () => {
  return (
    <div className={'flex h-svh overflow-hidden gap-2 p-0 md:p-2 relative'}>
      <UserInformation />
      <MainDashboard />
      <TaskDetailsPanel />
    </div>
  );
};

export default DashboardLayout;
