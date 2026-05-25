
type TitleProps = {
    children: string
}

export function Title({ children }: TitleProps) {
    return (
        <h1 className="mb-4  font-semibold text-black sm:mb-5 sm:text-3xl text-lg">{children}</h1>
    )
}