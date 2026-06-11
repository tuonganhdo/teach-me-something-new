import { useState } from 'react'
import './App.css'

function App() {
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
      const data = await response.json();
      setFact(data);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main id='app-container'>
        <button id='teach-me-button' className="font-semibold text-white rounded-xl p-3 bg-blue-700 hover:bg-blue-900" onClick={fetchFact} disabled={loading}>
          {loading ? 'Fetching your next tidbit' : 'Teach me something new'}
        </button>
        {fact && (
          <div id='fact-container' className='relative flex flex-col md:flex-row border border-white p-5 rounded-2xl gap-6'>
            {fact.thumbnail && (
              <img id='fact-image' className='relative flex w-1/4 h-full' src={fact.thumbnail.source} alt={fact.title}/>
            )}
            <div id='fact-text-container' className='relative flex-col text-left'>
              <h2 id='fact-title' className='font-bold text-2xl'>{fact.title}</h2>
              <p id='fact-body'>{fact.extract}</p>
              <a id='fact-link' href={fact.content_urls.desktop.page} target='_blank'>Learn more</a>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default App
