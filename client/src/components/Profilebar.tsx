export const Profilebar = () => {
  // HARD CODED INFO FOR NOW
  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  const name = 'Ryan Proceccini';
  const profile_pic = 'IMG_0873_2_pepnrb';
  return (
    <>
      <div className='flex gap-3 my-2 align-middle'>
        <div className='picture h-12 w-12 rounded-full overflow-hidden bg-voyagrBlue'>
          <img
            className='object-cover'
            src={`${IMG_BASE_URL}/${profile_pic}`}
          />
        </div>
        <div className='info flex flex-col align-middle '>
          <h3 className='h-fit mt-1  text-md font-semibold font-noto text-voyagrBlack'>
            {name}
          </h3>
          <p className='text-sm text-voyagrLightGrey'>November 24th, 4:40pm</p>
        </div>
      </div>
    </>
  );
};
