type Props = {
  className: string;
};

export const SearchIcon = ({ className }: Props) => {
  return (
    <div className={className}>
      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22.8667 24.5L15.5167 17.15C14.9333 17.6167 14.2625 17.9861 13.5042 18.2583C12.7458 18.5306 11.9389 18.6667 11.0833 18.6667C8.96389 18.6667 7.17033 17.9324 5.70267 16.464C4.235 14.9956 3.50078 13.202 3.5 11.0833C3.5 8.96389 4.23422 7.17033 5.70267 5.70267C7.17111 4.235 8.96467 3.50078 11.0833 3.5C13.2028 3.5 14.9963 4.23422 16.464 5.70267C17.9317 7.17111 18.6659 8.96467 18.6667 11.0833C18.6667 11.9389 18.5306 12.7458 18.2583 13.5042C17.9861 14.2625 17.6167 14.9333 17.15 15.5167L24.5 22.8667L22.8667 24.5ZM11.0833 16.3333C12.5417 16.3333 13.7814 15.8227 14.8027 14.8015C15.8239 13.7803 16.3341 12.5409 16.3333 11.0833C16.3333 9.625 15.8227 8.38522 14.8015 7.364C13.7803 6.34278 12.5409 5.83256 11.0833 5.83333C9.625 5.83333 8.38522 6.34394 7.364 7.36517C6.34278 8.38639 5.83256 9.62578 5.83333 11.0833C5.83333 12.5417 6.34394 13.7814 7.36517 14.8027C8.38639 15.8239 9.62578 16.3341 11.0833 16.3333Z'
          fill={className}
        />
      </svg>
    </div>
  );
};
