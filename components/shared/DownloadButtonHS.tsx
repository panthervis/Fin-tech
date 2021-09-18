/** @jsx jsx */ jsx
import { jsx } from "@emotion/core"
import * as React from "react"
import DownloadButton from "./DownloadButton"

const DownloadButtonHS: React.FunctionComponent<any> = props => {
  var hubId = props.href.split("/")
  hubId = hubId.pop()

  React.useEffect(() => {
    const formCreationScript = document.createElement("script")
    const scriptBody = document.createTextNode(
      `if (hbspt && hbspt.cta) {
			  hbspt.cta.load(5610934, "${hubId}", {});
				document.getElementById("brochureButton").style.display = "none";
      } else {
        document.getElementById("hs-cta-${hubId}").style.display = "none";
      }`
    )
    formCreationScript.appendChild(scriptBody)
    const hsBtn = document.getElementById("hs-cta-" + hubId)
    hsBtn && hsBtn.appendChild(formCreationScript)

    return () => {
      if (document.getElementById("hs-cta-" + hubId))
        document
          .getElementById("hs-cta-" + hubId)!
          .removeChild(formCreationScript)
    }
  }, [])

  return (
    <>
      <div>
        <span className="hs-cta-wrapper" id={`hs-cta-wrapper-${hubId}`}>
          <span
            className={`hs-cta-node hs-cta-${hubId}`}
            id={`hs-cta-${hubId}`}
          >
            <a
              className="inline-flex items-center bg-white text-teal-1 rounded-sm py-1 px-3 md:px-3 md:py-1 text-3xs items-center cursor-pointer text-xs"
              href={`https://cta-redirect.hubspot.com/cta/redirect/5610934/${hubId}`}
              target="_blank"
            ></a>
          </span>
        </span>
      </div>
      <a id="brochureButton" href={props.href} target="_self">
        <DownloadButton iconURL={props.iconURL} xs color="teal-1">
          {props.children}
        </DownloadButton>
      </a>
    </>
  )
}

export default DownloadButtonHS
