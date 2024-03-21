import { forwardRef } from "react";

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <button
      ref={ref}
      className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
