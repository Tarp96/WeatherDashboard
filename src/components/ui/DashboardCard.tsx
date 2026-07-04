type DashboardCardProps = {
  children: React.ReactNode;
  className?: string;
};

export const DashboardCard = ({
  children,
  className = "",
}: DashboardCardProps) => {
  return (
    <section
      className={`rounded-3xl border border-gray-200 bg-white p-6 shadow-lg ${className}`}
    >
      {children}
    </section>
  );
};
