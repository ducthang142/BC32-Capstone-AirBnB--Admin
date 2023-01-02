import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingList,
  increaseCount,
  resetSearch,
  search,
  resetIsGetList,
} from "../../slices/datphongSlice";
import styles from "./QuanLyDatPhong.module.scss";
import {
  Table,
  Flex,
  Center,
  Pagination,
  LoadingOverlay,
  ScrollArea,
  Button,
} from "@mantine/core";
import formatDateToBooking from "../../utils/formatDateToBooking";
import TimKiemDatPhong from "./TimKiemDatPhong";
import SuaDatPhong from "./SuaDatPhong";
import XoaDatPhong from "./XoaDatPhong";
import DatPhong from "./DatPhong";

const QuanLyDatPhong = () => {
  const dispatch = useDispatch();
  const { searchLists, bookingLists, count, loading, isGetList } = useSelector(
    (state) => state.datphong
  );
  const [activePage, setActivePage] = useState(1);

  const [keyword, setKeyword] = useState("");

  //Lấy danh sách đặt phòng từ API
  useEffect(() => {
    dispatch(bookingList());
  }, [count]);

  useEffect(() => {
    if (!keyword) {
    } else {
      const lists = bookingLists.filter((item) => item.maNguoiDung === keyword);
      dispatch(search(lists));
    }
    dispatch(resetIsGetList());
  }, [isGetList]);

  let page = keyword
    ? Math.ceil(searchLists.length / 10)
    : bookingLists
    ? Math.ceil(bookingLists.length / 10)
    : null;

  return (
    <>
      <DatPhong />
      <Flex>
        <TimKiemDatPhong
          setActivePage={setActivePage}
          setKeyword={setKeyword}
        />
        <Button
          color="pink"
          w={100}
          onClick={() => {
            dispatch(increaseCount());
            dispatch(resetSearch());
            setKeyword("");
          }}
        >
          Refresh
        </Button>
      </Flex>

      {/* Table */}
      <div style={{ position: "relative" }}>
        <ScrollArea type="always" style={{ width: "100%", height: 650 }}>
          <div className={styles.table}>
            <Table
              verticalSpacing="xs"
              horizontalSpacing="sm"
              withBorder
              miw={800}
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mã người dùng</th>
                  <th>Mã Phòng</th>
                  <th>Ngày đến - Ngày đi</th>
                  <th>Số lượng khách</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {keyword
                  ? searchLists
                      .slice((activePage - 1) * 10, (activePage - 1) * 10 + 10)
                      .map((item, index) => (
                        <tr key={index}>
                          <td className={styles.table__col1}>{item.id}</td>
                          <td>
                            <p className={styles.table__col2}>
                              {item.maNguoiDung}
                            </p>
                          </td>
                          <td>
                            <p className={styles.table__col3}>{item.maPhong}</p>
                          </td>
                          <td>
                            <p className={styles.table__col4}>
                              {formatDateToBooking(item.ngayDen)} -{" "}
                              {formatDateToBooking(item.ngayDi)}
                            </p>
                          </td>
                          <td>
                            <p className={styles.table__col5}>
                              {item.soLuongKhach}
                            </p>
                          </td>
                          <td>
                            <Flex className={styles.table__col6}>
                              <SuaDatPhong datPhong={item} />
                              <XoaDatPhong id={item.id} keyword={keyword} />
                            </Flex>
                          </td>
                        </tr>
                      ))
                  : bookingLists
                  ? bookingLists
                      .slice((activePage - 1) * 10, (activePage - 1) * 10 + 10)
                      .map((item, index) => (
                        <tr key={index}>
                          <td className={styles.table__col1}>{item.id}</td>
                          <td>
                            <p className={styles.table__col2}>
                              {item.maNguoiDung}
                            </p>
                          </td>
                          <td>
                            <p className={styles.table__col3}>{item.maPhong}</p>
                          </td>
                          <td>
                            <p className={styles.table__col4}>
                              {formatDateToBooking(item.ngayDen)} -{" "}
                              {formatDateToBooking(item.ngayDi)}
                            </p>
                          </td>
                          <td>
                            <p className={styles.table__col5}>
                              {item.soLuongKhach}
                            </p>
                          </td>
                          <td>
                            <Flex className={styles.table__col6}>
                              <SuaDatPhong datPhong={item} />{" "}
                              <XoaDatPhong id={item.id} keyword={keyword} />
                            </Flex>
                          </td>
                        </tr>
                      ))
                  : null}
              </tbody>
            </Table>
          </div>
        </ScrollArea>
        {page ? (
          <Center mt={32}>
            <Pagination
              page={activePage}
              onChange={setActivePage}
              total={page}
              color="pink"
            />
          </Center>
        ) : null}
        <LoadingOverlay
          visible={loading}
          overlayBlur={2}
          loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
        />
      </div>
    </>
  );
};

export default QuanLyDatPhong;
