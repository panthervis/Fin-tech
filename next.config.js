const withPlugins = require("next-compose-plugins")
const withCSS = require("@zeit/next-css")
//const withPurgeCss = require('next-purgecss')
const withFonts = require("next-fonts")
const webpack = require("webpack")
const withTM = require("next-transpile-modules")
const optimizedImages = require("next-optimized-images")
require("dotenv").config()

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.node = {
      fs: "empty",
    }

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries["server.js"] &&
        !entries["server.js"].includes("./client/polyfills.js")
      ) {
        entries["server.js"].unshift("./client/polyfills.js")
      }

      return entries
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    config.module.rules.push({
      test: /\.jpe?g$/,
      loaders: [
        {
          loader: "lqip-loader",
          options: {
            path: "/public", // your image going to be in media folder in the output dir
            name: "[name].[ext]", // you can use [hash].[ext] too if you wish,
            base64: true, // default: true, gives the base64 encoded image
            palette: false, // default: false, gives the dominant colours palette
          },
        },
      ],
    })
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))

    return config
  },
}

module.exports = withPlugins(
  [
    [withCSS],
    // [withPurgeCss, {
    //   purgeCssEnabled: ({ dev, isServer }) => (!dev && !isServer), // Only enable PurgeCSS for client-side production builds
    // }],
    [withFonts],
    [
      withTM,
      {
        transpileModules: [
          "@apollo/react-hooks",
          "@emotion/core",
          "@emotion/styled",
          "@svgr/webpack",
          "@tryghost/content-api",
          "apollo-boost",
          "apollo-cache-inmemory",
          "apollo-client",
          "apollo-link",
          "apollo-link-rest",
          "chart.js",
          "chartjs-plugin-piechart-outlabels",
          "classnames",
          "contentful",
          "cookie",
          "cookie-parser",
          "dotenv",
          "downshift",
          "fetch-headers",
          "graphql",
          "graphql-anywhere",
          "graphql-tag",
          "highcharts",
          "highcharts-pattern-fill",
          "highcharts-react-official",
          "isomorphic-fetch",
          "isomorphic-unfetch",
          "js-cookie",
          "json-csv",
          "moment",
          "moment-timezone",
          "next-cookies",
          "next-routes",
          "node-fetch",
          "qs",
          "react-apollo-hooks",
          "react-chartjs-2",
          "react-html-parser",
          "react-paginate",
          "react-popper",
          "react-scrollbars-custom",
          // "react-select",
          // "react-slick",
          "react-spinners",
          // "react-sticky",
          "react-table",
          "react-tabs",
          "react-tooltip",
          "save",
          "strip-ansi",
          "scheduler",
          "tinycolor2",
          "underscore",
        ],
      },
    ],
    [
      optimizedImages,
      {
        handleImages: ["jpeg", "png", "webp", "gif"],
        optimizeImagesInDev: true,
      },
    ],
  ],
  nextConfig
)
