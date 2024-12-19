import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticles } from '../api';
import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';

function ArticlesForTopic() {
    const { topicSlug } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetchArticles({ topic: topicSlug })
            .then((fetchedArticles) => {
                setArticles(fetchedArticles);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError("Failed to load articles.");
                setIsLoading(false);
            });
    }, [topicSlug]);

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Header>
            <section>
                <h2>All articles in the {topicSlug} topic:</h2>
                <div className="articles-list">
                    {articles.map((article) => (
                        <ArticleCard 
                            key={article.article_id}
                            title={article.title}
                            article_img_url={article.article_img_url}
                            author={article.author}
                            votes={article.votes}
                            comment_count={article.comment_count}
                            created_at={article.created_at}
                        />
                    ))}
                </div>
            </section>
        </Header>
    );
}

export default ArticlesForTopic;