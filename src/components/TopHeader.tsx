interface TopHeaderProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  title?: string
}

const TopHeader = ({ prefix, suffix, title } : TopHeaderProps) => {
  return (
    <header className="flex items-center gap-x-3 md:fixed w-full bg-background top-0 md:pt-10 pb-5 z-[50]">
      {prefix}
      <h1 className="text-3xl font-bold">{title}</h1>
      {suffix}
    </header>
  )
}

export default TopHeader