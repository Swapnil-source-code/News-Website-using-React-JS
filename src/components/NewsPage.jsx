import  { useEffect, useState } from 'react';
import './NewsPage-Style.css'
import Category from './Category';

function NewsPage() {

  const country = "in";
  const categories = ["general", "entertainment", "health", "science", "sports", "technology"];
  
  const [requestURL, setRequestURL] = useState(`https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${import.meta.env.VITE_API_KEY}`);

  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("general");

  const generateUI = (articles) => {
    return articles.map((item, index) => (
      <div className="news-card" key={index}>
        <div className="news-image-container">
          <img src={item.urlToImage || "./newspaper.jpg"} alt="" />
        </div>
        <div className="news-content">
          <div className="news-title">{item.title}</div>
          <div className="news-description">{item.description || item.content || ""}</div>
          <a href={item.url} target="_blank" className="view-button">Read more</a>
        </div>
      </div>
    ));
  };

  const getNews = async () => {
    const response = await fetch(requestURL);
    if (!response.ok) {
      alert("Data unavailable at the moment, Please try again later");
      return false;
    }
    const data = await response.json();
    setArticles(data.articles);
  };

  const selectCategory = (category) => {
    setRequestURL(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`);
    setActiveCategory(category);
  };

  useEffect(() => {
    getNews();
  });

  return (
    <>
     <div className="heading-container">
        <h4>News</h4>
      </div>

      <Category categories={categories} activeCategory={activeCategory} selectCategory={selectCategory} />

      <div className="container">
        {generateUI(articles)}
      </div>
    </>
  );
}

export default NewsPage