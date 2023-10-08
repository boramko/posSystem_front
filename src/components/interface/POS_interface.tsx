export interface MenuType {
    id : number;
    name?: string;
    color?: string;
    cateIds: number[];
    price: number;
    options?: OptionType[];
}

export type CategoryType = {
    id: number;
    name: string;
};

export type CategoryTypeWithout = Pick<MenuType,'cateIds'>;

export interface OptionType {
    id:number;
    option_name: string;
    option_price: number;
}

export interface SelectedMenuType {
    menu: MenuType;
    quantity: number;
    selectedOptions: OptionType[];
}

export interface CategorySelectorProps {
    allCategories: string[];
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

export interface MenuSelectorProps {
    filteredMenus: MenuType[];
    handleMenuClick: (menu: MenuType) => void;
    selectedMenu: MenuType | null;
    handleOptionChange: (option: OptionType, e: React.ChangeEvent<HTMLInputElement>) => void;
    addMenuToSelected: (option: MenuType, e: React.MouseEvent<HTMLButtonElement>) => void;
}


export interface SelectedMenuListProps {
    selectedMenus: SelectedMenuType[];
    updateSelectedMenuQuantity: (selected: SelectedMenuType, newQuantity: number) => void;
    calculateMenuPrice: (selected: SelectedMenuType) => number;
    calculateOptionsPrice: (selected: SelectedMenuType) => number;
    removeSelectedMenu: (selected: SelectedMenuType) => void;
}

export interface TotalPriceProps {
    total: number;
}

export interface PayButtonProps {
    selectedMenus: SelectedMenuType[]; // SelectedMenuType은 해당하는 타입으로 변경해주세요.
    total: number;
    onPaymentSuccess: () => void; 
}


export interface userType {
    user_seq : number
    user_id : string
    user_name : string
    user_password :string
    user_regdate : Date
    user_status : string
}

export interface PaymentType {
    id: number;
    transactionId: string;
    orderId: string;
    status: string;
    amount: number;
    paymentDetails: PaymentDetail;
    payerName: string;
    payerId: string;
    paymentDate: string;
}


export interface PaymentDetail {
    menu: MenuType;
    quantity: number;
    selectedOptions: OptionType[];
  }

export type PaymentDetails = PaymentDetail[];

export interface APIResponse<T> {
    data: T;
    status: number;
}