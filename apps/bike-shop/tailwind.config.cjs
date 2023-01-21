module.exports = {
    content: ['./src/**/*.{astro,html,js,ts}'],
    plugins: [
        require('@tailwindcss/typography'),
    ],
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        h1: {
                            color: '#001b3d'
                        }
                    }
                }
            })
        }
    }
}