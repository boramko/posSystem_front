import React from 'react';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';

import {SelectedMenuType, MenuType, OptionType} from "./../../components/interface/POS_interface"

Font.register({
  family: 'SpoqaHanSans',
  src:
    'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    margin: 10,
    fontSize: 40,
    borderBottom: '4 solid black',
    fontFamily: 'SpoqaHanSans',
    fontWeight: 'bold',
  },
  date: {
    margin: 10,
    fontSize: 12,
    fontFamily: 'SpoqaHanSans',
  },
  table: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'SpoqaHanSans',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'SpoqaHanSans',
  },
  footer: {
    // marginTop: 20,
    fontSize: 10,
    // borderTop: '1 solid black',
    // paddingTop: 10,
    fontFamily: 'SpoqaHanSans',
  }
  ,korean: {
    fontFamily: 'SpoqaHanSans',
  }
  ,totalView : {
    marginTop: 20,
    fontSize: 15,
    borderTop: '1 solid black',
    paddingTop: 10,
    fontFamily: 'SpoqaHanSans',
  } ,
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '2 solid black',
    marginBottom: 10,
    fontFamily: 'SpoqaHanSans',
    fontWeight: 'bold',
    fontSize: 15,
  },
  footerContainer: {
    marginTop: 20,
  },
  mainContent: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between', 
  },
});


type PDFDocumentProps = {
  selectedMenus: SelectedMenuType[];
  total: number;
};

const PDFDocument: React.FC<PDFDocumentProps> = ({ selectedMenus, total }) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}  ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  return (
    <Document>
    <Page style={{ padding: 30, flex: 1 }}>
      <View style={styles.pageContainer}>
        <View style={styles.mainContent}>
          <Text style={styles.header}>Pos System</Text>
          <Text style={styles.date}>날짜: {formattedDate}</Text>
          <View style={styles.tableHeader}>
            <Text>수량</Text>
            <Text>메뉴</Text>
            <Text>금액</Text>
          </View>
          <View style={styles.table}>
              {selectedMenus.map((menu, index) => (
                <React.Fragment key={index}>
                  <View style={styles.row}>
                    <Text>{menu.quantity}</Text>
                    <Text>{menu.menu.name}</Text>
                    <Text>{menu.menu.price * menu.quantity}원</Text>
                  </View>
                 
                  {menu.selectedOptions && menu.selectedOptions.map((option, idx) => (
                    <View style={styles.row} key={idx}>
                      <Text>{option.option_name}</Text>
                      <Text>{option.option_price}원</Text>
                    </View>
                  ))}
                   <Text>======================================================</Text>
                </React.Fragment>
                
              ))}
            </View>
        </View>
          <Text style={styles.totalView}>합계: {total}원</Text>
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>상호: Pos System</Text>
          <Text style={styles.footer}>사업자 번호: 000000000</Text>
          <Text style={styles.footer}>TEL: 032-0000-0000</Text>
          <Text style={styles.footer}>주소: 서울 강서구</Text>
        </View>
      </View>
    </Page>
  </Document>
  );
};

export default PDFDocument;