interface ContainerProps {
    children?: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="relative xs:w-[376px] xs:h-[666px] z-100 bg-white rounded shadow-border flex flex-col justify-start overflow-x-hidden">
            {children}
        </div>
    );
}
