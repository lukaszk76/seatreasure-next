import React, { memo } from "react"

export const ExampleSection = memo(() => {
  return (
    <section className="grid max-w-[980px] items-center gap-6 pb-8 pt-6  md:py-10">
      <div className="flex h-[100vh] flex-col items-start gap-4">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-3xl">
          Przygotuj się na niezapomniane safari nurkowe w Egipcie z SeaTreasure
          - Twoim przewodnikiem po tajemnicach podwodnego świata!
        </h2>
        <p className="text-lg font-medium leading-relaxed tracking-tight text-muted-foreground md:text-xl">
          Zanurz się w fascynujący świat raf koralowych i tętniącego życiem
          morza Czerwonego. SeaTreasure to doświadczenie, które przeniesie Cię w
          inny wymiar nurkowania. Nasze safari nurkowe to nie tylko podróż, to
          wyjątkowa przygoda, która spełni marzenia każdego nurka.
        </p>
        <p className="text-lg font-medium leading-relaxed tracking-tight text-muted-foreground md:text-xl">
          Pod okiem naszych doświadczonych instruktorów, będziesz miał okazję
          odkryć niesamowite miejsca nurkowe, jak Ras Mohammed, Brothers Islands
          czy Abu Dabbab. Spotkasz kolorowe rafy, rekiny, żółwie morskie, a może
          nawet delfiny, które towarzyszą Ci w niezapomnianych nurkowaniach.
        </p>
        <p className="text-lg font-medium leading-relaxed tracking-tight text-muted-foreground md:text-xl">
          Nie musisz martwić się o organizację - SeaTreasure zadba o wszystko.
          Od komfortowego zakwaterowania na luksusowych łodziach nurkowych po
          wyżywienie i transport. Nasza pasja do nurkowania pozwoli Ci skupić
          się tylko na tym, co najważniejsze - na podziwianiu piękna podwodnego
          świata.
        </p>
        <p className="text-lg font-medium leading-relaxed tracking-tight text-muted-foreground md:text-xl">
          Dołącz do nas w niesamowitej przygodzie nurkowej w Egipcie.
          Niezależnie od tego, czy jesteś początkującym nurkiem, czy
          doświadczonym zapaleńcem - SeaTreasure ma coś dla Ciebie. Przygotuj
          się na niezapomniane wspomnienia i przeżycia, które zostaną z Tobą na
          zawsze.
        </p>

        <p className="text-lg font-bold leading-relaxed tracking-tight text-muted-foreground md:text-xl">
          Zarezerwuj swoje miejsce już dziś i odkryj magię nurkowania z
          SeaTreasure w Egipcie!
        </p>
      </div>
    </section>
  )
})

ExampleSection.displayName = "ExampleSection"
