function Button({ children, handle, ...buttonProps }) {
  return (
    <button
      {...buttonProps}
      onClick={() => {
        handle(buttonProps.data);
      }}
    >
      {children}
    </button>
  );
}
export default Button;
