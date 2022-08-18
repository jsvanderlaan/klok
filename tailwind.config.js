/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: [
            {
                forest: {
                    ...require('daisyui/src/colors/themes')['[data-theme=forest]'],
                    'base-100': '#1c1917',
                },
            },
        ],
    },
};
