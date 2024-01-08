import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const colors = {
    reportly: {
        primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#475569",
            50: "#7A92B5",
            100: "#7086A6",
            200: "#667a97",
            300: "#5c6e87",
            400: "#516178",
            500: "#475569",
            600: "#3d495a",
            700: "#323c4b",
            800: "#28303b",
            900: "#1E242B",
        },
    },
};

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "2rem",
                },
                screens: {
                    lg: "1100px",
                },
            },
            colors: {
                reportly: colors.reportly,
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            // addCommonColors: true,
            themes: {
                "reportly-theme": {
                    extend: "light",
                    colors: {
                        // background: "#c3c3c3",
                        // foreground: "#475569",
                        primary: colors.reportly.primary,
                    },
                },
            },
        }),
    ],
};

export default config;
