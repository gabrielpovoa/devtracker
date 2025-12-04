type Props = {
    Title: string,
    TextTransform: 'uppercase' | 'lowercase' | 'capitalize',
    Weight:string,
    Fontsize:string,
    Color?:string,
    Gapping?:string,
}

export const Heading =  (props: Props) => {
    const data = props

    return (
        <h1 className={`${data.TextTransform} ${data.Weight} ${data.Fontsize} ${data.Color} ${data.Gapping}`}>
            {data.Title}
        </h1>
    )
}