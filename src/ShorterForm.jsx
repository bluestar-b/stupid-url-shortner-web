import { useState } from 'react';
import config from '../config';


const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://${config.domain}/api/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longURL: originalUrl }),
      });

      if (response.ok) {
        const result = await response.json();
        setShortenedUrl(`https://${config.domain}/${result.ID}`);
        setError('');
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
        setShortenedUrl('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while shortening the URL.');
      setShortenedUrl('');
    }
  };


  return (
    <div className="border border-white max-w-md md:max-w-lg mx-auto mt-8 p-6 text-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-black dark:text-gray-200 font-bold text-lg">Original URL:</span>
          <input
            type="url"
            className="mt-1 p-2 w-full border border-gray-200 rounded-md text-black dark:text-gray-200 focus:outline-none focus:shadow-outline-gray"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="border-2 font-bold text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors focus:outline-none focus:shadow-outline-blue"
        >
          Shorten URL
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-4">
          <p className="text-gray-200 font-bold text-lg">Shortened URL:</p>
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
