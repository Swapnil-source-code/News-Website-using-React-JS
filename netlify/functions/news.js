exports.handler = async (event) => {
  const {
    country = "in",
    category = "top",
    language = "en"
  } = event.queryStringParameters || {};

  const API_KEY = process.env.NEWS_API_KEY;

  
  const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${country}&language=${language}&category=${category}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const articles = Array.isArray(data.results)
      ? data.results.map(item => ({
          title: item.title,
          description: item.description,
          content: item.content,
          url: item.link,
          urlToImage: item.image_url
        }))
      : [];

    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({ articles })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ articles: [] })
    };
  }
};
