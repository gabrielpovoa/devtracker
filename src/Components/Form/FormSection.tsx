type Props = {
    children: React.ReactNode;
    columns?: number;
};

export default function FormSection({ children, columns = 2 }: Props) {
    return (
        <div
            className="flex flex-col md:grid gap-8"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {children}
        </div>
    );
}

