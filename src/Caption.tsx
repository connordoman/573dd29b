import { twMerge } from "tailwind-merge";

interface CaptionProps {
    children?: React.ReactNode | string;
    className?: string;
}

export default function Caption({ children, className }: CaptionProps) {
    return <span className={twMerge("text-xs font-thin", className)}>{children}</span>;
}
