import { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-md px-5 font-medium",

  variants: {
    variant: {
      primary: "bg-sky-300 text-sky-950 hover:bg-sky-400",
      secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700",
    },

    size: {
      default: "py-2",
      full: "h-11 w-full",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({ children, variant, size, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
}
