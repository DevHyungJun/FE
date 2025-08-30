const assertNeverIcon = (icon: never): never => {
  throw new Error(`Unhandled icon type: ${icon}`);
};

export default assertNeverIcon;
