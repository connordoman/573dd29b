/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                border: "0 0 5px 0 rgba(0, 0, 0, 0.9)",
                header: "0 1px 0 rgba(0, 0, 0, 0.1)",
            },
        },
    },
    plugins: [],
};
