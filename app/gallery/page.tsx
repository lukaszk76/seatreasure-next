import React, { memo } from "react"

const page = memo(() => {
  return <div id="gallery">Gallery</div>
})

page.displayName = "page"

export default page
