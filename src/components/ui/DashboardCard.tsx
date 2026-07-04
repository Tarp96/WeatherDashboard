export const DashboardCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
      {children}
    </section>
  );
};
