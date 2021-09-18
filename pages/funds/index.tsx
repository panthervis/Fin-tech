import { Component } from "react"
import Router from "next/router"

export default class Browse extends Component {
  static async getInitialProps(ctx: any) {
    if (ctx && ctx.req) {
      ctx.res.writeHead(302, { Location: `/invest` })
      ctx.res.end()
    } else {
      Router.push(`/invest`)
    }
  }
}
