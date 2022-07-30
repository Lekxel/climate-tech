const Button = ({
  children,
  onClick,
  className,
  disabled,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={`${className} bg-blue-400 px-14 text-white py-2 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
