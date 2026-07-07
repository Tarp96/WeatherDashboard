export const Footer = () => {
  return (
    <>
      <footer className="mt-12 border-t border-sky-200 bg-white/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-8 text-center text-sm text-slate-600">
          <p>Built with React, TypeScript, Tailwind CSS & TanStack Query.</p>

          <p>Powered by OpenWeather API.</p>

          <div className="flex gap-4">
            <a href="https://github.com/Tarp96/WeatherDashboard">
              View source on GitHub
            </a>
          </div>

          <p>© 2026 Tarpinderjot Singh</p>
        </div>
      </footer>
    </>
  );
};
