interface ContainerProps {
    children?: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="relative w-screen h-screen sm:w-[376px] sm:h-[666px] z-100 bg-white sm:rounded shadow-border flex flex-col justify-start overflow-x-hidden">
            {children}
        </div>
    );
}
