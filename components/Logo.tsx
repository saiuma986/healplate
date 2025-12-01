import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Heal Plate Logo"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        fill="currentColor"
      />
      <path
        d="M12 7.77C11.39 7.29 10.62 7 9.75 7 8.07 7 6.75 8.32 6.75 10c0 1.94 1.55 3.55 3.84 5.38l1.41 1.12 1.41-1.12C15.7 13.55 17.25 11.94 17.25 10c0-1.68-1.32-3-3-3-.87 0-1.64.29-2.25.77z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo;
