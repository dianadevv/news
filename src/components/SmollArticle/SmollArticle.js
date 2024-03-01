import './SmollArticle.css';
import React from 'react';

export const SmollArticle = ({ title, source, date }) => { 
    return ( 
        <article className="smoll-article"> 
            <h2 className="smoll-article__title">{title}</h2> 
            <span className="article-date">{source}</span> 
            <span className="article-source"> 
                {new Date(date).toLocaleDateString('ru-RU', { 
                month: 'long', 
                day: 'numeric' 
                })} 
            </span> 
        </article> 
    ) 
}; 