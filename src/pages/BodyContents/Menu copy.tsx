import React, { useEffect, useState } from 'react'

import {SelectedMenuType, MenuType, OptionType, CategoryType} from "./../../components/interface/POS_interface"

import CategorySelector from 'components/Pos/CategorySelector'
import MenuSelector from 'components/Pos/MenuSelector'
import SelectedMenuList from 'components/Pos/SelectedMenuList'
import TotalPrice from 'components/Pos/TotalPrice'
import  './../../public/style.css';
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocument from 'components/PDF/MyDocument'
import CommonDialog from 'components/Popup'
import CommonButton from 'components/Button'
import { If } from 'react-conditional-components-renderer'
import PayButton from 'components/Payment/PayButton'
import axiosInstance from '@axiosInstance'
import useEventError401 from 'components/hook/eventHook'

const POS = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [MenuData, setMenuData] = useState<MenuType[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<SelectedMenuType[]>([])
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([])
  const [open, setOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const eventError401 = useEventError401();
  
  const getCategoryNameById = (id: number | null) => {
    if (!id) return null;
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : null;
  }

  // 카테고리에 따른 메뉴 필터링
  const filteredMenus = selectedCategoryId
  ? MenuData.filter((menu) => menu.cateIds.includes(selectedCategoryId))
  : MenuData;

  useEffect(() => {
    searchCategories();
    searchMenu();
  },[]);

  const searchCategories = () => {
    try{
      axiosInstance.get("/product/category", {
      }).then(data => {
          console.log(data.data);
          setCategories(data.data);
      }).catch(error => {
          if (error.response) {
              // 서버가 2xx 외의 상태 코드로 응답한 경우
              const status = error.response.status;
              console.log(status);
              if (status === 401) {
                eventError401()
              } else if (status === 500) {
                  console.error('500 서버 내부 오류입니다.');
              } else {
                  console.error(`Unexpected Error: ${status}`);
              }
          } 
      });
    } catch(error) {
        console.error('Synchronous error:', error);
    }
  }
  const searchMenu = () => {
    try{
      axiosInstance.get("/product/menu", {
      }).then(data => {
          console.log(data.data);
          setMenuData(data.data);
      }).catch(error => {
          if (error.response) {
              // 서버가 2xx 외의 상태 코드로 응답한 경우
              const status = error.response.status;
              console.log(status);
              if (status === 401) {
                eventError401();
              } else if (status === 500) {
                  console.error('500 서버 내부 오류입니다.');
              } else {
                  console.error(`Unexpected Error: ${status}`);
              }
          } 
      });
    } catch(error) {
        console.error('Synchronous error:', error);
    }
  }

  const handleMenuClick = (menu: MenuType) => {
    setSelectedMenu(menu)
    setSelectedOptions([])
  }

  const calculateMenuPrice = (selected: SelectedMenuType) => {
    return (selected.menu.price || 0) * selected.quantity;
  }

  const calculateOptionsPrice = (selected: SelectedMenuType) => {
    return (
      selected.selectedOptions.reduce(
        (acc:number, curr:OptionType) => acc + curr.option_price,
        0
      ) * selected.quantity
    )
  }
  const addMenuToSelected = () => {
    setSelectedMenus((prev) => {
      const existing = prev.find(
        (item) =>
          item.menu.name === selectedMenu!.name &&
          JSON.stringify(item.selectedOptions) ===
            JSON.stringify(selectedOptions)
      );
      if (existing) {
        // existing.quantity += 1; // 이미 선택된 메뉴는 수량을 +1
        // return [...prev];
          const updatedMenus = prev.map(item =>
            (item.menu.name === existing.menu.name &&
            JSON.stringify(item.selectedOptions) === JSON.stringify(existing.selectedOptions)) 
            ? { ...item, quantity: item.quantity + 1 }
            : item
          );
          return updatedMenus;
      } else {
        return [...prev, { menu: selectedMenu!, quantity: 1, selectedOptions }];
      }
    });
    setSelectedMenu(null);
    setSelectedOptions([]);
  };

  const removeSelectedMenu = (selectedToRemove: SelectedMenuType) => {
    console.log(selectedToRemove)
    setSelectedMenus((prev) =>
      prev.filter(
        (item) =>
          item.menu.name !== selectedToRemove.menu.name ||
          JSON.stringify(item.selectedOptions) !==
            JSON.stringify(selectedToRemove.selectedOptions)
      )
    )
  }

  const handleOptionChange = (
    option: OptionType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedOptions((prev) => [...prev, option])
    } else {
      setSelectedOptions((prev) =>
        prev.filter((op) => op.option_name !== option.option_name)
      )
    }
  }

  const handlePaymentSuccess = () => {
    alert("결제 완료되었습니다!"); // Inform the user of the successful payment
    setOpen(true);
    //setSelectedMenus([]); // Clear selected menus
  }

  const initSelect = () => {
    if(window.confirm(`초기화 하시겠습니까?`)){
      setSelectedMenus([]);
    }
  }
  
  const updateSelectedMenuQuantity = (
    selectedToUpdate: SelectedMenuType,
    newQuantity: number
  ) => {
    setSelectedMenus((prev) =>
      prev.map((item) => {
        if (
          item.menu.name === selectedToUpdate.menu.name &&
          JSON.stringify(item.selectedOptions) ===
            JSON.stringify(selectedToUpdate.selectedOptions)
        ) {
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const calculateTotal = () => {
    return selectedMenus.reduce(
      (acc, curr) =>
        acc +
        ((curr.menu.price || 0) +
          curr.selectedOptions.reduce(
            (acc2:number, curr2:OptionType) => acc2 + curr2.option_price,
            0
          )) *
          curr.quantity,
      0
    );
  }

  const ReceiptViewer: React.FC = () => (
    <PDFViewer width="100%" height="100%">
      <PDFDocument selectedMenus={selectedMenus} total={calculateTotal()} />
    </PDFViewer>
  );

  return (
    <>
     <div className="rounded bg-white p-4 shadow-md flex-grow-7 flex-shrink-0 flex-basis-0">
     <CategorySelector 
        allCategories={categories.map(cat => cat.name)} // 카테고리 이름으로 변환
        selectedCategory={getCategoryNameById(selectedCategoryId)} // 선택된 카테고리 ID를 이름으로 변환
        setSelectedCategory={(categoryName) => {
          const category = categories.find(cat => cat.name === categoryName);
          setSelectedCategoryId(category ? category.id : null);
        }} 
      />
       {/* <div className="grid grid-cols-6 grid-rows-3 gap-4 mt-4"> */}
      <MenuSelector 
        filteredMenus={filteredMenus}
        handleMenuClick={handleMenuClick}
        selectedMenu={selectedMenu}
        handleOptionChange={handleOptionChange}
        addMenuToSelected={addMenuToSelected}
      />
      {/* </div> */}
    </div>

    <div className="rounded bg-white p-4 shadow-md flex-grow-3 flex-shrink-0 flex-basis-0 ml-4">
            <If test={calculateTotal() != 0}>
              {/* <CommonButton
                label="영수증출력"
                onClick={() => {
                  setOpen(true)
                }}
                variant="Black"
                size="middle"
              ></CommonButton> */}
                <CommonButton
                label="초기화하기"
                onClick={() => {
                  initSelect()
                }}
                variant="Black"
                size="middle"
              ></CommonButton>
            </If>

            <CommonDialog
              open={open}
              title={'결제정보'}
              onSave={() => {
                setOpen(false)
              }}
              onClose={()=> {
                setOpen(false);
              }}
              loading={false}
              cancelButtonText={'닫기'}
              showCancelButton={true}
              showSaveButton={false}
              cancelButtonColor='gray'
              height={1000}
              width={500}
            >
               <ReceiptViewer/>
            </CommonDialog>
      <SelectedMenuList 
        selectedMenus={selectedMenus}
        updateSelectedMenuQuantity={updateSelectedMenuQuantity}
        calculateMenuPrice={calculateMenuPrice}
        calculateOptionsPrice={calculateOptionsPrice}
        removeSelectedMenu={removeSelectedMenu}
      />
        <TotalPrice 
          total={calculateTotal()}
        />
        <If test={calculateTotal() != 0}>
            <PayButton selectedMenus={selectedMenus} total={calculateTotal()} onPaymentSuccess={handlePaymentSuccess} />
        </If>
    </div>
    </>
  );
}  

export default POS
