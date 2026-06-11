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
      // fetch page summary
      const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
      const data = await response.json();

      // fetch categories for page
      const encodedTitle = encodeURIComponent(data.title);
      const categoryResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=categories&titles=${encodedTitle}&cllimit=10&format=json&origin=*`)
      const categoryData = await categoryResponse.json();

      // extract categories
      const pages = categoryData.query?.pages || {};
      const pageId = Object.keys(pages)[0];
      const rawCategories = pages[pageId]?.categories || [];

      // clean up tags
      const cleanTags = rawCategories
        .map(cat => cat.title.replace("Category:", ""))
        .filter(tag => !tag.includes("Articles") && !tag.includes("All ") && !tag.includes("CS1"));

      // add to list of facts to display
      setFacts((currFacts) => [...currFacts, {...data, tags: cleanTags}]);
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
        <div id='header' className='sticky top-0 left-0 px-5 py-4 w-full border-b border-gray-300 bg-white'>
          <p className='font-bold uppercase tracking-wider text-blue-700 justify-center flex text-sm'>Teach me something new</p>
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
