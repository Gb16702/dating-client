type PictureProps = {
  classes: string;
}

export default function Picture({classes}: PictureProps): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none" className={classes}>
      <path
        d="M18.75 0C19.1642 0 19.5 0.33579 19.5 0.75V2H20.75C21.1642 2 21.5 2.33579 21.5 2.75C21.5 3.16421 21.1642 3.5 20.75 3.5H19.5V4.75C19.5 5.16421 19.1642 5.5 18.75 5.5C18.3358 5.5 18 5.16421 18 4.75V3.5H16.75C16.3358 3.5 16 3.16421 16 2.75C16 2.33579 16.3358 2 16.75 2H18V0.75C18 0.33579 18.3358 0 18.75 0Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0589 2C14.0201 2.2443 14 2.4948 14 2.75C14 5.37335 16.1266 7.5 18.75 7.5C19.0052 7.5 19.2557 7.47987 19.5 7.44112V16.75C19.5 19.3734 17.3734 21.5 14.75 21.5H4.75C2.12665 21.5 0 19.3734 0 16.75V6.75C0 4.12665 2.12665 2 4.75 2H14.0589ZM6.75 8.75C7.85457 8.75 8.75 7.85457 8.75 6.75C8.75 5.64543 7.85457 4.75 6.75 4.75C5.64543 4.75 4.75 5.64543 4.75 6.75C4.75 7.85457 5.64543 8.75 6.75 8.75ZM15.9326 14.721C16.7324 16.0541 15.7722 17.75 14.2176 17.75H4.98607C3.49931 17.75 2.53231 16.1854 3.19722 14.8556L4.60819 12.0336C5.07864 11.0927 6.42136 11.0927 6.89182 12.0336C7.34231 12.9346 8.61002 12.9833 9.1283 12.1195L10.035 10.6083C10.8118 9.3136 12.6882 9.3136 13.465 10.6083L15.9326 14.721Z"
      />
    </svg>
  );
}
