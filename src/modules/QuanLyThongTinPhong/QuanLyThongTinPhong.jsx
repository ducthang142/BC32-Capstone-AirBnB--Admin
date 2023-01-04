import { useState, useEffect } from "react";
import ThemPhong from "./ThemPhong";
import TimKiemPhong from "./TimKiemPhong";
import styles from "./QuanLyThongTinPhong.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  ScrollArea,
  Pagination,
  Center,
  Image,
  LoadingOverlay,
  Popover,
  Button,
  Flex,
} from "@mantine/core";
import { roomByPageIndex } from "../../slices/phongSlice";
import vitriAPI from "../../services/vitriAPI";
import SuaPhong from "./SuaPhong/SuaPhong";
import XoaPhong from "./XoaPhong/XoaPhong";
import ChiTietPhong from "./ChiTietPhong/ChiTietPhong";
import SuaAnhPhong from "./SuaAnhPhong/SuaAnhPhong";

const QuanLyThongTinPhong = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [viTri, setViTri] = useState([]);
  const { roomLists, page, loading, count } = useSelector(
    (state) => state.phong
  );

  //Call API lấy danh sách vị trí để điền vào vị trí của phòng 
  useEffect(() => {
    (async () => {
      try {
        const data = await vitriAPI.getDanhSachViTri();
        setViTri(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //Call API lấy danh sách phòng thuê phân trang
  useEffect(() => {
    dispatch(roomByPageIndex([activePage, keyword]));
  }, [activePage, count]);

  return (
    <>
      <ThemPhong viTri={viTri} />
      <TimKiemPhong setKeyword={setKeyword} />

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
                  <th>Tên phòng</th>
                  <th>Vị trí</th>
                  <th>Khách tối đa</th>
                  <th>Hình ảnh</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {roomLists?.map((item, index) => (
                  <tr key={index}>
                    <td className={styles.table__col1}>{item.id}</td>
                    <td>
                      <p className={styles.table__col2}>{item.tenPhong}</p>
                    </td>
                    <td>
                      <p className={styles.table__col3}>
                        {
                          viTri[
                            viTri?.findIndex(
                              (item1) => item1.id === item.maViTri
                            )
                          ]?.tinhThanh
                        }
                      </p>
                    </td>
                    <td>
                      <p className={styles.table__col4}>{item.khach}</p>
                    </td>
                    <td>
                      <div className={styles.table__col5}>
                        <Popover
                          width="auto"
                          position="bottom"
                          withArrow
                          shadow="md"
                        >
                          <Popover.Target>
                            <Button
                              compact
                              color="pink"
                              mr={10}
                              variant="subtle"
                              size="md"
                            >
                              Xem ảnh
                            </Button>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <Image
                              src={item.hinhAnh}
                              alt={item.tenViTri}
                              radius="xs"
                              width={700}
                              height={260}
                            />
                          </Popover.Dropdown>
                        </Popover>
                        <SuaAnhPhong id={item.id} />
                      </div>
                    </td>
                    <td>
                      <Flex className={styles.table__col6}>
                        <ChiTietPhong phong={item} />
                        <SuaPhong phong={item} viTri={viTri} />
                        <XoaPhong id={item.id} />
                      </Flex>
                    </td>
                  </tr>
                ))}
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

export default QuanLyThongTinPhong;
