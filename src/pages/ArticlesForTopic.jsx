import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesWithParams } from '../api';
import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';
import { Link } from "react-router-dom";
import SortBy from '../components/SortByBlock';

function ArticlesForTopic() {
    const { topicSlug } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('created_at');
    const [order, setOrder] = useState('desc');

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetchArticlesWithParams({ topic: topicSlug, sortBy, order })
            .then((fetchedArticles) => {
                setArticles(fetchedArticles);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError("Failed to load articles.");
                setIsLoading(false);
            });
    }, [topicSlug, sortBy, order]);

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Header>
            <section>
                <h2>All articles in the {topicSlug} topic:</h2>

                <SortBy 
                    sortBy={sortBy}
                    order={order}
                    onSortChange={setSortBy}
                    onOrderChange={setOrder}
                />

                <div className="articles-list">
                    {articles.map((article) => (
                        <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                            <ArticleCard 
                                key={article.article_id}
                                title={article.title}
                                article_img_url={article.article_img_url}
                                author={article.author}
                                votes={article.votes}
                                comment_count={article.comment_count}
                                created_at={article.created_at}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </Header>
    );
}

export default ArticlesForTopic;
