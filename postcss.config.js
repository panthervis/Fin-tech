const tailwindcss = require("tailwindcss")
const url = require("postcss-url")

module.exports = ({ env }) => ({
  plugins: [
    require("postcss-import"),
    url({ url: "rebase" }),
    tailwindcss("./tailwind.config.js"),
    require(`postcss-preset-env`)({ stage: 1 }),
    require("postcss-extend-rule"),
    ...(env === `production`
      ? [
          require("@fullhuman/postcss-purgecss")({
            content: [
              "./pages/**/*.{js,jsx,ts,tsx}",
              "./components/**/*.{js,jsx,ts,tsx}",
            ],
            defaultExtractor: content =>
              content.match(/[A-Za-z0-9-_:/]+/g) || [],
            whitelistPatterns: [
              /rt-/,
              /bg-gray/,
              /highcharts-/,
              /^ReactTable/,
              /^slick-/,
              /^hubCTA/,
              /loading/,
              /Montserrat/,
              /^font-/,
              /^@font-face/,
            ],
            whitelist: ["@font-face"],
          }),
          require("autoprefixer"),
          require("cssnano"),
        ]
      : []),
  ],
})
