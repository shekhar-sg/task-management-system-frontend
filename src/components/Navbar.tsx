import { useLogout } from '@/modules/auth';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const logout = useLogout();
  return (
    <nav className={'flex h-20 items-center justify-between bg-red-400'}>
      <h4>task manager</h4>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button onClick={() => logout.mutate()} className={'bg-amber-50 p-5'}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
