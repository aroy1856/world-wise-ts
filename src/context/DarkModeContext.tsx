import { createContext, useEffect, type ReactNode } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>(
  {} as DarkModeContextType
);

export default function DarkModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    false,
    "dark-mode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((dark) => !dark);
  }

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext };
