import React from 'react';
import { useState, useEffect } from 'react';
import { fetchTopics } from '../api';
import { Link } from 'react-router-dom';
import footballImg from "../../theAppStructurePic/football.png";
import cookingImg from "../../theAppStructurePic/cooking.png";
import codingImg from "../../theAppStructurePic/coding.png";


function Topics() {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);
        setError(null);

        fetchTopics(topics)
            .then((fetchedTopics) => {
                setTopics(fetchedTopics);
                setIsLoading(false);
        })
            .catch((err) => {
                console.error("Error fetching topic:", err);
                setError("Failed to load topics.");
                setTopics(null);
                setIsLoading(false);
        });
  }, []);

  if (isLoading) return <p>Loading Topics...</p>;
  if (error) return <p>{error}</p>; 

  const getTopicImage = (topicSlug) => {
    const images = {
      football: footballImg,
      cooking: cookingImg,
      coding: codingImg,
    };

//     const image = images[topicSlug];
//   console.log(`Topic: ${topicSlug}, Image: ${image}`);

    return images[topicSlug] || null;
  };

  return (
    <div className="topics-list">
        {topics.map((topic) => (

        <Link to={`/topics/${topic.slug}`} key={topic.slug} className="topic-link">
            <div className="topic-card">
                <img
                src={getTopicImage(topic.slug)}
                alt={topic.slug}
                className="topic-image"
                />    
                <div className="topic-content">             
                    <h3 className="topic-title">{topic.slug}</h3>
                    <p className="topic-description">{topic.description}</p>
                </div>
            </div>
        </Link> 

      ))}
    </div>
  );
}

export default Topics;
