import { useState, useEffect } from "react";
import Category from "./Category";
import Menu_admin from "./Menu_admin";
import { CategoryType, MenuType } from "components/interface/POS_interface";
import axiosInstance from "@axiosInstance";
import useEventError401 from "components/hook/eventHook";

const Product_Tab: React.FC = () => {
  
  const [activeTab, setActiveTab] = useState<'CATEGORY' | 'MENU' | 'OPTION'>('CATEGORY');

  const eventError401 = useEventError401();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  
  const [MenuData, setMenuData] = useState<MenuType[]>([]);

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
  const handleDataChange = () => {
    searchCategories();
    searchMenu();
  };

  return (
    <div style={{
      width: '100%',
      height: '100%'
  }}>
        <div className="flex justify-center space-x-4 mb-2">
          <button className={`px-2 py-2 ${activeTab === 'CATEGORY' ? 'bg-green-500 text-white' : ''}`} onClick={() => setActiveTab('CATEGORY')}>카테고리</button>
          <button className={`px-2 py-2 ${activeTab === 'MENU' ? 'bg-green-500 text-white' : ''}`} onClick={() => setActiveTab('MENU')}>메뉴</button>
      </div>

        {activeTab === 'CATEGORY' && (
          <Category onDataChange={handleDataChange} Menu={MenuData} AllCategories={categories} setAllCategories={setCategories}/>
        )}
  
        {activeTab === 'MENU' && (
          <Menu_admin onDataChange={handleDataChange}  Menu={MenuData} setMenu={setMenuData} AllCategories={categories} />
        )}
      </div>
    );
  }
export default Product_Tab