interface ContainerProps {
    children?: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="relative w-[376px] h-[666px] z-100 bg-white rounded shadow-border flex flex-col justify-center">
            {children}
        </div>
    );
}
