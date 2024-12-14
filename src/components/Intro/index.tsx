interface IntroProps {
  title: string | undefined
  description: string | undefined
}

export function Intro({ title, description }: IntroProps) {
  return (
    <div className="py-20 bg-bg-intro w-full text-center bg-no-repeat bg-cover">
      <h1 className="font-bold text-white text-2xl mb-2 tracking-wide">
        {title}
      </h1>
      <p className="text-white text-xs">{description}</p>
    </div>
  )
}
