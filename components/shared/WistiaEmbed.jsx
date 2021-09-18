import React, { Component } from "react"

class WistiaEmbed extends Component {
  constructor(props) {
    super(props)
    const { hashedId, ...embedOptions } = { ...this.props }
    if (process.browser && window) {
      window._wq = window._wq || []
      window._wq.push({
        id: hashedId,
        options: embedOptions,
      })
    }
  }

  render() {
    return (
      <div className="wistia_responsive_padding h-full">
        <div className="wistia_responsive_wrapper w-full h-full">
          <div
            className={`wistia_embed wistia_async_${this.props.hashedId}`}
            style={{ height: "100%", width: "100%" }}
          >
            &nbsp;
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (!document.getElementById("wistia_script")) {
      var wistiaScript = document.createElement("script")
      wistiaScript.id = "wistia_script"
      wistiaScript.type = "text/javascript"
      wistiaScript.src = "https://fast.wistia.com/assets/external/E-v1.js"
      wistiaScript.async = true
      document.body.appendChild(wistiaScript)
    }

    window._wq = window._wq || []
    // window._wq.push({
    //   id: this.props.hashedId,
    //   onEmbedded: video => {
    //     this.handle = video
    //   },
    // })
    window._wq.push({
      id: this.props.hashedId,
      onEmbedded: video => {
        this.handle = video
        video.ready(function() {
          const elm = document.getElementById(video._containerId)
          // const videoElm = elm.childNodes
          //   .item(0)
          //   .childNodes.item(0)
          //   .childNodes.item(1)
          //   .childNodes.item(1)
          //   .childNodes.item(0).firstChild
          const imgElm = elm.childNodes
            .item(0)
            .childNodes.item(0)
            .childNodes.item(1)
            .childNodes.item(1)
            .childNodes.item(1)
            .childNodes.item(0)
            .childNodes.item(0)
            .childNodes.item(2).firstChild.firstChild.firstChild

          if (!imgElm) return
          // videoElm.className = `${videoElm.className} video-fit`
          imgElm.className = `${imgElm.className} img-fit`
        })
      },
    })
  }

  componentWillUnmount() {
    this.handle && this.handle.remove()
  }
}

export default WistiaEmbed
