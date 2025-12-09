import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		// Check localStorage for saved theme
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("theme") as Theme;
			return saved || "light";
		}
		return "light";
	});

	useEffect(() => {
		// Apply theme to document
		const root = document.documentElement;

		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}

		// Save to localStorage
		if (typeof window !== "undefined") {
			localStorage.setItem("theme", theme);
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return { theme, toggleTheme };
};
