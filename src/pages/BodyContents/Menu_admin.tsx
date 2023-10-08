import React, { useEffect, useState } from "react";
import { SketchPicker } from 'react-color';
import { MenuType, CategoryTypeWithout, CategoryType } from "../../components/interface/POS_interface";
import axiosInstance from "@axiosInstance";


const Menu_admin: React.FC<{ Menu: MenuType[], setMenu: React.Dispatch<React.SetStateAction<MenuType[]>>,  AllCategories: CategoryType[],  onDataChange: () => void}> = ({ Menu, setMenu, AllCategories, onDataChange}) => {
    const [categories, setCategories] = useState<number[]>([]); // 문자열 배열에서 숫자 배열로 변경
    const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    
    const getCategoryNameById = (id: number) => {
        const category = AllCategories.find(cat => cat.id === id);
        return category ? category.name : '';
    };

    const [newMenu, setNewMenu] = useState<Omit<MenuType, 'id' | 'cate'>>({
        name: '',
        color: '',
        price: 0,
        options: [],
        cateIds: [],
    });
      
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

    const handleColorChange = (color: any) => {
        setNewMenu(prev => ({ ...prev, color: color.hex }));
    };

    const registerMenu = async () => {
        try {
            const menuToRegister = {
                ...newMenu,
                cateIds: checkedCategories.map(Number),
                options: options,
            };
            await axiosInstance.post('/product/menu', menuToRegister);
            onDataChange(); // Refresh the data after registering
        } catch (error) {
            console.error('Menu registration failed', error);
        }
    };

    const updateMenu = async () => {
        if (selectedMenu) {
            try {
                const menuToUpdate = {
                    ...newMenu,
                    cateIds: checkedCategories.map(Number),
                    options: options,
                };
                await axiosInstance.put(`/product/menu/${selectedMenu.id}`, menuToUpdate);
                onDataChange(); // Refresh the data after updating
            } catch (error) {
                console.error('Menu update failed', error);
            }
        }
    };
    
    useEffect(() => {
        setCategories(extractCategories());
    }, [Menu]);

    const extractCategories = () => {
        const allCategories: number[] = [];
        Menu.forEach(item => {
            allCategories.push(...item.cateIds); // cate 대신 cateIds 사용
        });
        return [...new Set(allCategories)];
    };

    const deleteMenu = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        if (window.confirm("정말로 이 메뉴를 삭제하시겠습니까?")) {
            setMenu(prev => prev.filter(menu => menu.id !== id));
            setNewMenu({
                name: '',
                color: '',
                price: 0,
                options: [],
                cateIds: [],
            });
            setCheckedCategories([]);
            setOptions([]);
            deleteMenuAPI(id);
        }
    };

    const deleteMenuAPI = async (id:number) => {
        try {
            await axiosInstance.delete(`/product/menu/${id}`);
            onDataChange(); // 데이터가 변경되었으므로, 데이터를 다시 불러옵니다.
        } catch (error) {
            console.error('Menu deletion failed', error);
        }
    };
      
      
    const handleCategoryCheck = (categoryId: number) => {
        if (checkedCategories.includes(categoryId.toString())) {
            setCheckedCategories(prev => prev.filter(id => id !== categoryId.toString()));
        } else {
            setCheckedCategories(prev => [...prev, categoryId.toString()]);
        }
    };
      
    const saveMenu = () => {
        if (newMenu.name && newMenu.color && (typeof newMenu.price === 'number' && newMenu.price > 0) && checkedCategories.length > 0) {
            const existingMenu = Menu.find(menu => menu.name === newMenu.name && menu.id !== selectedMenu?.id);

            if (existingMenu) {
                alert("이미 같은 이름의 메뉴가 존재합니다.");
                return;
            }
            const action = selectedMenu ? "수정" : "등록";
            if (window.confirm(`메뉴를 ${action}하시겠습니까?`)) {
                if (selectedMenu) {
                    // 이미 선택된 메뉴가 있으면 해당 메뉴를 업데이트
                    const updatedMenus = Menu.map(menu => {
                        if (menu.id === selectedMenu.id) {
                            return { ...newMenu, id: selectedMenu.id, cateIds: checkedCategories.map(Number), options: options };
                        }
                        return menu;
                    });
                    setMenu(updatedMenus);
                    updateMenu();
                } else {
                    const newId = options.length > 0 ? Math.max(...options.map(o => o.id)) + 1 : 1;
                    const updatedOptions = options.map((option, idx) => {
                        return { ...option, id: newId + idx };
                    });
                    setMenu(prev => [...prev, { ...newMenu, id: Date.now(), cateIds: checkedCategories.map(Number), options: updatedOptions }]);
                    registerMenu();
                }
                setNewMenu({ name: '', color: '', price: 0, options: [], cateIds: [], });
                setSelectedMenu(null); // 선택된 메뉴 초기화
                setCheckedCategories([]);
                setOptions([]);
                onDataChange();
            }
        } else {
            alert("메뉴 정보를 올바르게 입력해주세요.");
        }
    };

    const handleMenuClick = (menu: MenuType) => {
        // 이미 선택된 메뉴를 다시 클릭한 경우
        if (selectedMenu && selectedMenu.id === menu.id) {
            setSelectedMenu(null);
            setNewMenu({
                name: '',
                color: '',
                price: 0,
                options: [],
                cateIds: [],
            });
            setCheckedCategories([]);
            setOptions([]); // 옵션 상태 초기화
        } else {
            setSelectedMenu(menu);
            setNewMenu({
                name: menu.name,
                color: menu.color,
                price: menu.price,
                options: menu.options,
                cateIds: menu.cateIds,
            });
            setOptions(menu.options || []);
            const validCategories = menu.cateIds.filter(cat => categories.includes(cat)).map(cat => cat.toString());
            console.log("menu.cate:", menu.cateIds);
            console.log("validCategories:", validCategories);
            setCheckedCategories(validCategories);
        }
    };

    // 옵션 상태 관리
    const [options, setOptions] = useState<{ id: number, option_name: string, option_price: number }[]>([]); // 초기값 설정

    // 옵션 추가
    const addOption = () => {
        const newId = options.length > 0 ? Math.max(...options.map(o => o.id)) + 1 : 1;
        setOptions(prev => [...prev, { id: newId, option_name: '', option_price: 0 }]);
    };

    // 옵션 삭제
    const deleteOption = (index: number) => {
        setOptions(prev => prev.filter((_, idx) => idx !== index));
    };

    // 옵션 값 변경
    const handleOptionChange = (index: number, field: 'option_name' | 'option_price', value: string) => {
        const updatedOptions = [...options];
        if (field === 'option_name') {
            updatedOptions[index].option_name = value;
        } else {
            updatedOptions[index].option_price = parseInt(value);
        }
        setOptions(updatedOptions);
    };
      
    return (
        <div className="rounded bg-white p-6 shadow-lg w-full max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">메뉴 및 옵션 관리</h2>
            
            {/* 메뉴 목록 */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                {Menu.map(menu => (
                    <div 
                        key={menu.id} 
                        className={`border rounded p-2 relative hover:shadow-md cursor-pointer flex justify-between items-center ${selectedMenu && selectedMenu.id === menu.id ? 'bg-blue-100' : ''}`}
                        onClick={() => handleMenuClick(menu)}>
                        <span>{menu.name}</span>
                        <span 
                            className="ml-2 text-red-500" 
                            onClick={(e) => { e.stopPropagation(); deleteMenu(e,menu.id); }}>
                            x
                        </span>
                    </div>
                ))}
            </div>

            {/* 선택된 메뉴 정보 노출 */}
    
            {/* 메뉴 정보 입력 */}
            <div className="mb-4">
                {/* 메뉴 이름 */}
                <div className="mb-2">
                    <label className="font-semibold mr-2" htmlFor="menuName">메뉴 이름:</label>
                    <input
                        id="menuName"
                        className="border rounded p-2 flex-grow"
                        value={newMenu.name}
                        onChange={e => setNewMenu(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="메뉴 이름 입력" />
                </div>
    
                {/* 메뉴 가격 */}
                <div className="mb-2">
                    <label className="font-semibold mr-2" htmlFor="menuPrice">가격:</label>
                    <input
                        id="menuPrice"
                        type="number"
                        className="border rounded p-2 flex-grow"
                        value={newMenu.price || 0}
                        onChange={e => setNewMenu(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                        placeholder="가격 입력" />
                </div>
    
                {/* 메뉴 색상 */}
                <div className="mb-2">
                <label className="font-semibold mr-2" htmlFor="menuColor">색상:</label>
                <div className="cursor-pointer" onClick={() => setShowColorPicker(!showColorPicker)}>
                    <div style={{ background: newMenu.color, width: '36px', height: '36px', borderRadius: '4px' }}></div>
                </div>
                {showColorPicker && (
                    <SketchPicker
                        color={newMenu.color || '#FFFFFF'}
                        onChangeComplete={handleColorChange}
                    />
                )}
                </div>
    
                {/* 메뉴 카테고리 선택 */}
                <div className="mb-2">
                    <span className="font-semibold">카테고리 선택:</span>
                    <div className="flex flex-wrap mt-2">
                        {AllCategories.map(category => (
                            <div key={category.id} className="m-1">
                                <input
                                    type="checkbox"
                                    id={`category-${category.id}`}
                                    checked={checkedCategories.includes(category.id.toString())} 
                                    onChange={() => handleCategoryCheck(category.id)} /> 
                                <label htmlFor={`category-${category.id}`}>{category.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
             {/* 옵션 입력 필드 */}
             <div className="mb-4">
                <span className="font-semibold">옵션:</span>
                {options.map((option, index) => (
                    <div key={index} className="flex items-center mt-2">
                        <input
                            type="text"
                            className="border rounded p-2 flex-grow mr-2"
                            value={option.option_name}
                            onChange={e => handleOptionChange(index, 'option_name', e.target.value)}
                            placeholder="옵션 이름" />
                        <input
                            type="number"
                            className="border rounded p-2 w-24 mr-2"
                            value={option.option_price}
                            onChange={e => handleOptionChange(index, 'option_price', e.target.value)}
                            placeholder="가격" />
                        <button onClick={() => deleteOption(index)}>삭제</button>
                    </div>
                ))}
                <button className="mt-2" onClick={addOption}>옵션 추가</button>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" onClick={saveMenu}>메뉴 저장</button>
        </div>
    );
}

export default Menu_admin