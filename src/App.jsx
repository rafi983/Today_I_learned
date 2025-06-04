import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./components/AppLayout";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./styles/theme";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("til_theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("til_theme", theme);
  }, [theme]);

  const themeObject = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeObject}>
      <GlobalStyles />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#44403c" : "#e4e4e7",
            color: theme === "dark" ? "#fafaf9" : "#1c1917",
            fontSize: "16px",
          },
        }}
      />
      <AppLayout
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        theme={theme}
      />
    </ThemeProvider>
  );
}

export default App;
