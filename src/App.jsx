import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

import FactCard from './FactCard';

function App() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const observerTarget = useRef(null);

  const fetchFact = useCallback(async () => {
    setLoading(true);
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
      <main id='app-container' className='flex flex-col pb-4'>
        <div id='header' className='sticky top-0 left-0 px-5 py-3 w-full border-b border-gray-300 bg-white'>
          <p className='font-medium text-gray-700 justify-center flex text-sm'>Teach me something new</p>
        </div>
        <div id='facts-feed' className="flex flex-col gap-y-4 my-4 w-[90vw] mx-auto">
          {facts.map((fact, index) => (
            <FactCard fact={fact} key={index}/>
          ))}
        </div>

        <div ref={observerTarget} id='scroll-trigger' className='flex justify-center'>
          {loading ? (
            <span className="text-gray-400">Fetching your next fact...</span>
          ) : (
            <span className="text-gray-400">Scroll for more</span>
          )}
        </div>
      </main>
    </>
  )
}

export default App
