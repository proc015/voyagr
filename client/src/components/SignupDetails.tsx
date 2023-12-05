
import traveller from '../assets/icons/traveller.svg';

function SignupDetails({ signupState, handleChange, handlePhotoUpload }) {

  return (
    <main className='bg-voyagrWhite h-[600px] relative z-10 rounded-2xl'>
      <img src={`${traveller}`} className='h-24 w-auto m-auto my-8' />
      <form className='flex justify-center'>
        <div
          id='parent-container'
          className='flex flex-col w-[90%] items-center'
        >
          <input
            type='file'
            accept='image/png, image/jpeg'
            name='displayPicSrc'
            required={true}
            onChange={(e) => handlePhotoUpload(e)}
            // className='block w-full text-lg border rounded-xl cursor-pointer h-12'
            className='image-upload'
          />
          <input
            type='text'
            name='displayName'
            value={signupState.displayName}
            required={true}
            placeholder='Display name'
            onChange={handleChange}
            className='login-box rounded'
          />
          <button className='landing-btn'>Finish</button>
        </div>
      </form>
    </main>
  );
}

export default SignupDetails;
