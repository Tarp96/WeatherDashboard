import { WeatherTheme } from "../../utils/helpers/GetWeatherBackground";

type FooterProps = {
  weatherTheme: WeatherTheme;
};

export const Footer = ({ weatherTheme }: FooterProps) => {
  return (
    <footer
      className={`mt-12 border-t border-white/20 backdrop-blur-sm transition-colors duration-500 ${weatherTheme.footerBackground}`}
    >
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-8 text-center text-sm transition-colors duration-500 ${weatherTheme.footerText}`}
      >
        <p>Built with React, TypeScript, Tailwind CSS & TanStack Query.</p>

        <p>Powered by OpenWeather API.</p>

        <div className="flex gap-4">
          <a
            href="https://github.com/Tarp96/WeatherDashboard"
            className={`${weatherTheme.linkText} transition-opacity hover:opacity-80`}
          >
            View source on GitHub
          </a>
        </div>

        <p>© 2026 Tarpinderjot Singh</p>
      </div>
    </footer>
  );
};
