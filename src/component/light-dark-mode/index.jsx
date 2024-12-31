import UseLocalStroage from "../load-more-data/useLocalStroage";
import "./style.css";

const LightDarkMode = () => {
  const [theme, setTheme] = UseLocalStroage("theme", "dark");

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");

    const icon = document.querySelector(".theme-icon");

    if (icon) {
      icon.classList.add("rotate");

      setTimeout(() => icon.classList.remove("rotate"), 500);
    }

    const audio = new Audio(
      theme === "light"
        ? "public/sounds/dark-sound.mp3"
        : "public/sounds/light-sound.mp3"
    );
    audio.play();
  };
  console.log(theme);

  const TimeDisplay = ({ theme }) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return (
      <p style={{ color: theme === "light" ? "black" : "white" }}>
        {hours}:{minutes < 10 ? `0${minutes}` : minutes}
      </p>
    );
  };

  const getGreetingMassege = () => {
    const hours = new Date().getHours()
    if(hours < 12) return 'Good Morning'
    if(hours < 18) return 'Good Afternoon'
    return 'Good Night'
  }

  return (
    <div className="light-dark-mode" data-theme={theme}>
      <div className="container">
        <img
          className="theme-icon"
          src={theme === "light" ? "/light-mode.png" : "/dark-mode.png"}
          alt="Theme icon"
          width={50}
        />
        <button onClick={handleToggleTheme}>
          Change to {theme === "light" ? "Dark" : "Light"} mode
        </button>
        <p className="greeting-message">{getGreetingMassege()}</p>
        <TimeDisplay theme={theme}/>
      </div>
    </div>
  );
};

export default LightDarkMode;
