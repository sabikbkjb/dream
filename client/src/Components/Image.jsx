import React, { useEffect, useState } from 'react';
import './Image.css'; // Import the CSS file

const Image = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/images`);
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return (
      <div className="loading-message">
        Loading images...
      </div>
    );

  return (
    <div className="image-container">
      <h2 className="image-title">Match Visuals</h2>
      <div className="image-grid">
        {images.map((src, i) => (
          <div key={i} className="image-card">
            <img
              src={src}
              alt={`Scraped ${i}`}
              className="image-card-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Image;

