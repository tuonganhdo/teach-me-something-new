export default function TagPill({tag}) {
    return(
        <span className='bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1.5 rounded-xl uppercase tracking-wider'>
            {tag}
        </span>
    )
}