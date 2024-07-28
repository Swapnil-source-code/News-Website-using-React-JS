import  './NewsPage-Style.css'


const Category = ({ categories, activeCategory, selectCategory }) => {
  
  return (
    <div className="options-container">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`option ${cat === activeCategory ? "active" : ""}`}
          onClick={() => selectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Category