import React, { useEffect, useState } from "react";
import { MenuType, CategoryType } from "../../components/interface/POS_interface";
import axiosInstance from "@axiosInstance";

const Category: React.FC<{ 
  Menu: MenuType[], 
  AllCategories: CategoryType[],
  setAllCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>,
  onDataChange: () => void,
   // 이 부분을 추가합니다.
}> = ({ AllCategories, setAllCategories, onDataChange }) => {
  const [categories, setCategories] = useState<number[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryNames, setCategoryNames] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    const categoryNamesMap: { [id: number]: string } = {};
    AllCategories.forEach(cat => {
        categoryNamesMap[cat.id] = cat.name;
    });
    setCategoryNames(categoryNamesMap);
    setCategories(AllCategories.map(cat => cat.id));
    console.log(categories)
}, [AllCategories]);

const addCategory = async () => {
  try {
    const response = await axiosInstance.post('/product/category', {
      name: newCategory
    });
    // 반환받은 새 카테고리 데이터를 상태에 반영
    setAllCategories([...AllCategories, response.data]);
  } catch (error) {
    console.error('Error adding category:', error);
  }
};

const updateCategory = async () => {
  try {
    if (selectedCategory === null) return; // 선택된 카테고리가 없으면 리턴
    const response = await axiosInstance.put(`/product/category/${selectedCategory}`, {
      name: newCategory
    });
    // 반환받은 수정된 카테고리 데이터를 상태에 반영
    setAllCategories(AllCategories.map(cat => cat.id === selectedCategory ? response.data : cat));
  } catch (error) {
    console.error('Error updating category:', error);
  }
};


const saveCategoryToMenu = () => {
  if (!newCategory) {
    alert("다시입력 해주세요.");
    return;
  }

  try{
    // 카테고리 수정
    if (selectedCategory) {
        const existingCategoryIndex = AllCategories.findIndex(cat => cat.id === selectedCategory);
        if (existingCategoryIndex === -1) {
            alert("선택된 카테고리가 존재하지 않습니다.");
            return;
        }
        if (window.confirm(` 해당 "${AllCategories[existingCategoryIndex].name}" 카테고리를 "${newCategory}"로 수정 하시겠습니까?`)) {
            const updatedCategories = [...AllCategories];
            updatedCategories[existingCategoryIndex].name = newCategory;
            setAllCategories(updatedCategories);
            updateCategory();
        }
    } 
    // 새 카테고리 추가
    else {
        const existingCategory = AllCategories.find(cat => cat.name === newCategory);
        if (existingCategory) {
            alert("이미 존재하는 카테고리입니다.");
            return;
        }
        if (window.confirm(` 해당 "${newCategory}" 카테고리를 추가 하시겠습니까?`)) {
            const newCategoryId = Math.max(...AllCategories.map(cat => cat.id)) + 1; // 새로운 ID 생성
            const updatedCategories = [...AllCategories, { id: newCategoryId, name: newCategory }];
            setAllCategories(updatedCategories);
            addCategory();
        }
    }
    setSelectedCategory(null); // 선택된 카테고리 초기화     
    setNewCategory(''); // 입력 필드 초기화
    onDataChange();
  }catch(e){
    alert("카테고리 작업 중 오류가 발생했습니다.");
  }
};

  const handleCategoryClick = (category: number) => {
    if (selectedCategory === category) {
        setSelectedCategory(null);
        setNewCategory(''); // 선택 해제시 입력 폼 초기화
    } else {
        setSelectedCategory(category);
        const categoryName = categoryNames[category]; // 카테고리 ID를 사용하여 카테고리 이름 가져오기
        setNewCategory(categoryName); // 가져온 카테고리 이름을 newCategory 상태에 설정
    }
};

const deleteCategory = async (event: React.MouseEvent, categoryId: number) => {
  event.stopPropagation();
  if (window.confirm(`해당 카테고리를 삭제하시겠습니까?`)) {
    try {
      await axiosInstance.delete(`/product/category/${categoryId}`);
      // 삭제된 카테고리를 상태에서 제거
      setAllCategories(AllCategories.filter(cat => cat.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }
};
  // const deleteCategory = (event: React.MouseEvent, category: number) => {
  //   event.stopPropagation();
  //   if (window.confirm(`해당 카테고리를 삭제하시겠습니까?`)) {
  //     setCategories(prev => prev.filter(c => c !== category));
  //     setNewCategory('');
  //     setSelectedCategory(null);
  //     setAllCategories(prevAllCategories => {
  //       return prevAllCategories.filter(cat => cat.id !== category);
  //     });
  //   }
  // };

 return (
    <div className="rounded bg-white p-6 shadow-lg w-full max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">카테고리 관리</h2>
      <div className="mb-4">
        <div className="flex flex-wrap mt-2">
        {categories.map(category => (
            <div key={category} className="border rounded p-2 m-1 flex items-center" onClick={() => handleCategoryClick(category)}>
                {categoryNames[category]}
                {selectedCategory === category && <span className="ml-2 text-green-500">선택되었습니다</span>}
                <button className="ml-2 text-red-500" onClick={(e) => deleteCategory(e,category)}>x</button>
            </div>
        ))}
        </div>
      </div>
      <div className="mb-4 flex items-center">
      <label className="font-semibold mr-2" htmlFor="categoryInput">카테고리 이름:</label>
      <input
        id="categoryInput"
        className="border rounded p-2 flex-grow"
        value={newCategory}
        onChange={e => setNewCategory(e.target.value)}
        placeholder="카테고리 이름 입력"
      />
    </div>

      <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600" onClick={saveCategoryToMenu}>카테고리 저장/수정</button>
    </div>
  );
}

export default Category
