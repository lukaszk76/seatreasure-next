import React, { memo } from "react"

export const ExampleSection = memo(() => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex h-[100vh] flex-col items-start gap-4">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
          Placeholder
        </h2>
      </div>
    </section>
  )
})

ExampleSection.displayName = "ExampleSection"
