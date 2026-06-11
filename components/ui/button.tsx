import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-[350ms] ease-in outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-none",
        aiedu:
          "bg-[var(--navy)] text-white shadow-[4px_4px_0_var(--mandarin)] hover:shadow-none",
        "aiedu-light":
          "bg-white text-[var(--green)] shadow-[4px_4px_0_var(--green)] hover:shadow-none",
        "aiedu-dark":
          "bg-white text-[var(--mandarin)] shadow-[4px_4px_0_var(--mandarin)] hover:shadow-none",
        outline:
          "border-border bg-background text-[var(--navy)] hover:bg-secondary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "text-[var(--navy)] hover:bg-secondary hover:text-[var(--navy)]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-[var(--navy)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-4",
        sm: "h-8 gap-1 px-3 text-xs",
        lg: "h-10 gap-2 px-5 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-xs": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : ButtonPrimitive
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
