import {CategorySelectorProps} from "../interface/POS_interface"

// CategorySelector.tsx
const CategorySelector: React.FC<CategorySelectorProps> = ({ allCategories, selectedCategory, setSelectedCategory }) => {
  return (
    <>
    <h3 className="text-lg font-bold mb-2">Category</h3>
    <div className="flex flex-wrap mb-5 space-x-1 md:space-x-2 space-y-2">
    <button
      className={`px-2 py-1 md:px-4 md:py-2 rounded ${selectedCategory === null ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
      onClick={() => setSelectedCategory(null)}
    >
      전체
    </button>
    {allCategories.map((cate, index) => (
      <button
        key={index}
        className={`px-2 py-1 md:px-4 md:py-2 rounded ${selectedCategory === cate ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
        onClick={() => setSelectedCategory(cate)}
      >
        {cate}
      </button>
    ))}
  </div>
  </>
  );
};

export default CategorySelector;
