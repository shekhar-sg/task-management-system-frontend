import {useLogout} from '@/modules/auth';

const Navbar = () => {
  const logout = useLogout();
  return (
    <nav className={'flex h-20 px-3 items-center justify-around bg-red-400'}>
      <h4>task manager</h4>
      <button onClick={() => logout.mutate()} className={'bg-amber-50 p-5'}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
