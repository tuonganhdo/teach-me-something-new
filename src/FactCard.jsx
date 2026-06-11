export default function FactCard({fact}) {
    return(
        <div id='fact-container' className='flex flex-col md:flex-row border border-gray-300 py-7 px-5 rounded-2xl gap-6'>
            {fact.thumbnail && (
            <img id='fact-image' className='flex h-full w-full md:w-1/3 lg:w-1/4 rounded-lg' src={fact.thumbnail.source} alt={fact.title}/>
            )}
            <div id='fact-text-container' className='flex flex-col text-left gap-2'>
            <h2 id='fact-title' className='font-bold text-xl'>{fact.title}</h2>
            <p id='fact-body'>{fact.extract}</p>
            <a id='fact-link' className='underline text-blue-700 italic' href={fact.content_urls.desktop.page} target='_blank'>Learn more</a>
            </div>
        </div>
    )
}