import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

function App() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const observerTarget = useRef(null);

  const fetchFact = useCallback(async () => {
    try {
      const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
      const data = await response.json();
      setFacts((currFacts) => [...currFacts, data]);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const currTarget = observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if(entries[0].isIntersecting && !loading) {
          fetchFact();
        }
      }, {threshold: 0.1 }
    );

    if (currTarget) {
      observer.observe(currTarget);
    }

    return () => {
      if (currTarget) {
        observer.unobserve(currTarget);
      }
    };
  }, [fetchFact]);

  return (
    <>
      <main id='app-container' className='flex flex-col gap-y-4 py-4'>
        <div id='facts-feed' className="flex flex-col gap-y-4">
          {facts.map((fact, index) => (
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
          ))}
        </div>

        <div ref={observerTarget} id='scroll-trigger' className='flex justify-center'>
          {loading ? (
            <span className="text-gray-400 font-bold">Fetching your next fact...</span>
          ) : (
            <span className="text-gray-400">Scroll for more</span>
          )}
        </div>
      </main>
    </>
  )
}

export default App
