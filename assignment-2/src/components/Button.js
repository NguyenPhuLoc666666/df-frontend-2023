function Button({ children, ...buttonProps }) {
  return (
    <button
      {...buttonProps}
      onClick={() => {
        buttonProps.handle(buttonProps.data);
      }}
    >
      {children}
    </button>
  );
}
export default Button;
