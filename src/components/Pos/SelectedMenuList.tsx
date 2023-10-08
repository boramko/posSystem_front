import {SelectedMenuListProps} from "../interface/POS_interface"

const SelectedMenuList: React.FC<SelectedMenuListProps> = ({ selectedMenus, updateSelectedMenuQuantity, calculateMenuPrice, calculateOptionsPrice, removeSelectedMenu }) => {
    return (
        <>
        <h3 className="text-lg font-bold mb-2">Selected Menus</h3>
        {selectedMenus?.map((selected, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center space-x-4 mb-1">
              <p className="flex-grow">{selected.menu.name}</p>
              <select
                value={selected.quantity}
                onChange={(e) => updateSelectedMenuQuantity(selected, Number(e.target.value))}
                className="w-1/4"
              >
                {[...Array(99).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <p className="w-1/4 text-right">
                ={' '}
                {calculateMenuPrice(selected) +
                  calculateOptionsPrice(selected)}원
              </p>
              <button className="text-red-500" onClick={()=>removeSelectedMenu(selected)}>X</button>
            </div>
            {selected.selectedOptions.map((option, idx) => (
              <div key={idx} className="pl-4">
                {option.option_name} {option.option_price}원
              </div>
            ))}
          </div>
        ))}
        </>
    )
  };

export default SelectedMenuList