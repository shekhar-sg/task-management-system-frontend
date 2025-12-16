const UserInformation = () => {
  return (
    <div className={'flex overflow-hidden rounded-xl flex-col border w-full md:w-[400px]'}>
      <div className={'flex items-center bg-background h-16 px-6'}>
        <h6 className={'text-xl'}>You</h6>
      </div>
      <div className={'w-full h-full shadow-inner_soft bg-card'}></div>
    </div>
  );
};

export default UserInformation;
