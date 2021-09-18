import Head from "next/head"
import * as React from "react"

import useScrolled from "../../utils/useScrolled"
import Footer from "./Footer"
import Navbar from "./Navbar"

import "./layout/index.css"

type Props = {
  title?: string
  description?: string
  url?: string
  image?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "ETFs | Mutual Funds | Asset Management | Purpose Investments",
  description = "Purpose Investments Inc. All rights reserved.",
  url,
  image = "https://images.ctfassets.net/jedpjsv2glq1/3fm9AmU2pVRTRoeqXX7kyK/eb46be698caa4a6b0764535572b59082/purpose-logo.png",
}) => {
  const scrolled = useScrolled(30)
  let darkMode: boolean = false
  if (process.browser && window) {
    darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  }
  if (process.browser) {
    if (sessionStorage.getItem("imgFormat") == null) {
      function WebpIsSupported(callback: any) {
        // If the browser doesn't has the method createImageBitmap, you can't display webp format
        if (!window.createImageBitmap) {
          callback(false)
          return
        }

        // Base64 representation of a white point image
        var webpdata =
          "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA="

        // Retrieve the Image in Blob Format
        fetch(webpdata)
          .then(function(response) {
            return response.blob()
          })
          .then(function(blob) {
            // If the createImageBitmap method succeeds, return true, otherwise false
            createImageBitmap(blob).then(
              function() {
                callback(true)
              },
              function() {
                callback(false)
              }
            )
          })
      }
      WebpIsSupported(function(isSupported: any) {
        if (isSupported) {
          sessionStorage.setItem("imgFormat", "webp")
        } else {
          sessionStorage.setItem("imgFormat", "jpg")
        }
      })
    }
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        {url ? <meta property="og:url" content={url} /> : ""}
        <meta property="og:image" content={image + "?w=1000"} />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image" content={image + "?w=500"} />
        <meta property="og:image:width" content="500" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@purposeinvest" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "http://schema.org",
              "@type": "Organization",
              "name": "Purpose Investments Inc.",
              "url": "https://www.purposeinvest.com",
              "logo": "https://www.purposeinvest.com/purpose-512.png",
              "sameAs": [
                "https://www.linkedin.com/company/purpose-investments/",
                "https://twitter.com/PurposeInvest",
                "https://www.youtube.com/user/PurposeInvestments"
              ],
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.purposeinvest.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }`,
          }}
        ></script>
        <meta
          name="google-site-verification"
          content="MvIXHsW9qShXf1JhFxkzcyFidSzGwjOroPQ27Kh84Xo"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {darkMode ? (
          <link rel="shortcut icon" href="/favicon.ico" />
        ) : (
          <link rel="shortcut icon" href="/faviconDark.ico" />
        )}
        <script
          type="text/javascript"
          src="//js.hsforms.net/forms/v2.js"
        ></script>
        <link rel="preconnect" href="//images.ctfassets.net"></link>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TR9JVP5');`,
          }}
        ></script>
        <script
          charSet="utf-8"
          src="https://js.hscta.net/cta/current.js"
        ></script>
        {/* End Google Tag Manager */}
      </Head>
      {/* Google Tag Manager */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TR9JVP5"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager */}
      <header>
        <Navbar scrolled={scrolled} />
      </header>
      {children}
      <footer>{<Footer />}</footer>
    </>
  )
}

export default Layout
