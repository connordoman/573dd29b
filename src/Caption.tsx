interface CaptionProps {
    children?: React.ReactNode | string;
}

export default function Caption({ children }: CaptionProps) {
    return <span className="text-xs text-zinc-400 font-thin">{children}</span>;
}
