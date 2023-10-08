// MenuSelector.tsx
import {MenuSelectorProps} from "../interface/POS_interface"

const MenuSelector: React.FC<MenuSelectorProps> = ({ filteredMenus, handleMenuClick, selectedMenu, handleOptionChange, addMenuToSelected }) => {
  return (
        <div>
          <h3 className="text-lg font-bold mb-2">Menus</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {filteredMenus.map((menu, index) => (
        <button
          key={index}
          className="flex flex-col justify-center items-center px-4 py-2.5 rounded w-full h-16 lg:h-20 mb-2"
          style={{ backgroundColor: menu.color }}
          onClick={() => handleMenuClick(menu)}
        >
          <div>{menu.name}</div>
          <div>{menu.price}원</div>
        </button>
      ))}
    </div>
    {selectedMenu && (
        <div>
          <h3 className="text-lg font-bold mb-2">Options</h3>
          <div className="overflow-y-auto max-h-[200px] mb-4"> {/* 옵션 목록에 대해 높이 제한과 스크롤 적용 */}
            {selectedMenu.options?.map((option, index) => (
              <div key={index} className="flex flex-col justify-center items-center px-4 py-2.5 rounded w-32 h-20 mb-2">
                <input
                  type="checkbox"
                  id={option.option_name}
                  onChange={(e) => handleOptionChange(option, e)}
                />
                <label htmlFor={option.option_name}>
                  {option.option_name} (+{option.option_price}원)
                </label>
              </div>
            ))}
          </div>
          <button 
            className="px-4 py-2 rounded bg-blue-500 text-white" 
            onClick={(e) => selectedMenu && addMenuToSelected(selectedMenu, e)}
          >
            선택 메뉴 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuSelector