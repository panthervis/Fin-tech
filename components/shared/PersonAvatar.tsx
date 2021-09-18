/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"

type PersonAvatarProps = {
  img: any
}

const PersonAvatar: React.FunctionComponent<PersonAvatarProps> = ({ img }) => (
  <div
    css={css`
      max-width: 2rem;
    `}
  >
    <div
      className="bg-center bg-no-repeat bg-cover rounded-full shadow-soft mr-4"
      css={css`
              width: 2.5rem;
              height: 2.5rem;
              background-image: url("${img}");
            `}
    ></div>
  </div>
)

export default PersonAvatar
