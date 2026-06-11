import TagPill from "./TagPill"

export default function FactCard({fact}) {
    return(
        <div id='fact-container' className='flex flex-col border border-gray-300 py-7 px-5 rounded-2xl w-full gap-6 max-w-[600px] mx-auto'>
            {/* thumbnail image */}
            {fact.thumbnail && (
            <img id='fact-image' className='flex h-full w-full rounded-lg' src={fact.thumbnail.source} alt={fact.title}/>
            )}

            <div id='fact-text-container' className='flex flex-col text-left gap-2'>
                {/* page title + summary */}
                <h2 id='fact-title' className='font-bold text-xl'>{fact.title}</h2>
                <p id='fact-body' className='leading-[1.5]'>{fact.extract}</p>
                
                {/* wikipedia page tags */}
                {fact.tags && fact.tags.length > 0 && (
                    <div id='topic-pills' className='flex flex-wrap gap-1.5 my-2'>
                        {fact.tags.map((tag, i) => <TagPill tag={tag} key={i}/>)}
                    </div>
                )}

                {/* learn more button */}
                <a id='fact-link' className='bg-blue-700 hover:bg-blue-800 rounded-lg py-3 text-white mt-2 font-medium flex justify-center' href={fact.content_urls.desktop.page} target='_blank'>Learn more</a>
            </div>
        </div>
    )
}