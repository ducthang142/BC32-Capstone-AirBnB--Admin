import { useState, useEffect } from "react";
import styles from "./QuanLyNguoiDung.module.scss";
import {
  Table,
  ScrollArea,
  Pagination,
  Center,
  Avatar,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import ThemQuanTriVien from "./ThemQuanTriVien/ThemQuanTriVien";
import { useDispatch, useSelector } from "react-redux";
import { userListByPageIndex } from "../../slices/authSlice";
import TimKiemNguoiDung from "./TimKiemNguoiDung";
import SuaThongTinNguoiDung from "./SuaThongTinNguoiDung/SuaThongTinNguoiDung";
import XoaNguoiDung from "./XoaNguoiDung/XoaNguoiDung";

const QuanLyNguoiDung = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { userLists, page, loading, count } = useSelector(
    (state) => state.auth
  );

  //call API lấy thông tin người dung theo trang
  useEffect(() => {
    dispatch(userListByPageIndex([activePage, keyword]));
  }, [activePage, count]);

  return (
    <>
      <ThemQuanTriVien />

      <TimKiemNguoiDung setKeyword={setKeyword} />

      {/* Table */}
      <div style={{ position: "relative" }}>
        <ScrollArea type="always" style={{ width: "100%", height: 605 }}>
          <div className={styles.table}>
            <Table
              // horizontalSpacing="xs"
              verticalSpacing="xs"
              // sx={{ tableLayout: "fixed", minWidth: "700"}}
              withBorder
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Avatar</th>
                  <th>Email</th>
                  <th>Ngày sinh</th>
                  <th>Số điện thoại</th>
                  <th>Loại người dùng</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {userLists?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <p className={styles.table__col1}>{item.id}</p>
                    </td>
                    <td>
                      <p className={styles.table__col2}>{item.name}</p>
                    </td>
                    <td>
                      <div className={styles.table__col3}>
                        <Avatar
                          src={item.avatar}
                          alt={item.name}
                          radius="xl"
                          width={40}
                          height={40}
                        />
                      </div>
                    </td>
                    <td>
                      <p className={styles.table__col4}>{item.email}</p>
                    </td>
                    <td>
                      {" "}
                      <p className={styles.table__col5}>{item.birthday}</p>
                    </td>
                    <td>
                      <p className={styles.table__col6}>{item.phone}</p>
                    </td>
                    <td>
                      <div className={styles.table__col7}>
                        {item.role === "ADMIN" ? (
                          <Text color="red" fw={500}>
                            ADMIN
                          </Text>
                        ) : (
                          item.role
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.table__col8}>
                        <SuaThongTinNguoiDung nguoiDung={item} />{" "}
                        <XoaNguoiDung id={item.id} />
                      </div>
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

export default QuanLyNguoiDung;
