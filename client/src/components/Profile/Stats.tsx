type Props = {
  tripCount: number;
  followingCount: number;
  followerCount: number;
};
export const Stats = ({ tripCount, followingCount, followerCount }: Props) => {
  return (
    <>
      <div className='lineDiv border-b-[1px] border-voyagrBorders mt-4' />
      <div className='font-didact flex'>
        <p className='mx-auto text-center w-[33.3%] mt-4 text-voyagrLightGrey'>
          Trips
        </p>
        <p className='mx-auto text-center w-[33.3%] mt-4 text-voyagrLightGrey'>
          Followers
        </p>
        <p className='mx-auto text-center w-[33.3%] mt-4 text-voyagrLightGrey'>
          Following
        </p>
      </div>
      <div className='font-noto flex'>
        <p className='mx-auto text-xl font-semibold text-center w-[33.3%] text-voyagrBlack'>
          {tripCount}
        </p>
        <p className='mx-auto text-xl font-semibold text-center w-[33.3%] text-voyagrBlack'>
          {followerCount}
        </p>
        <p className='mx-auto text-xl font-semibold text-center w-[33.3%] text-voyagrBlack'>
          {followingCount}
        </p>
      </div>
      <div className='lineDiv border-b-[1px] border-voyagrBorders mt-4' />
    </>
  );
};
