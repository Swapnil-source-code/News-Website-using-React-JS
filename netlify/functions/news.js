exports.handler = async (event) => {
  const {
    country = "in",
    category = "top"
  } = event.queryStringParameters || {};

  const API_KEY = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        articles: Array.isArray(data.articles) ? data.articles : []
      })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ articles: [] })
    };
  }
};
