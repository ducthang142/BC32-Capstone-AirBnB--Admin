import { useState, useEffect } from "react";
import ThemViTri from "./ThemViTri";
import TimKiemViTri from "./TimKiemViTri";
import styles from "./QuanLyThongTinViTri.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  ScrollArea,
  Pagination,
  Center,
  Image,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { locationByPageIndex } from "../../slices/vitriSlice";
import SuaThongTinViTri from "./SuaThongTinViTri";
import XoaViTri from "./XoaViTri";

const QuanLyThongTinViTri = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { locationLists, page, loading, count } = useSelector(
    (state) => state.vitri
  );

  useEffect(() => {
    dispatch(locationByPageIndex([activePage, keyword]));
  }, [activePage, count]);

  return (
    <>
      <ThemViTri />
      <TimKiemViTri setKeyword={setKeyword} />

      {/* Table */}
      <div style={{ position: "relative" }}>
        <ScrollArea type="always" style={{ width: "100%", height: 650 }}>
          <div className={styles.table}>
            <Table
              // horizontalSpacing="xs"
              verticalSpacing="xs"
              // sx={{ tableLayout: "fixed", minWidth: "700"}}
              withBorder
              miw={800}
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên vị trí</th>
                  <th>Tỉnh thành</th>
                  <th>Quốc gia</th>
                  <th>Hình ảnh</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {locationLists?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <p className={styles.table__col1}>{item.id}</p>
                    </td>
                    <td>
                      <p className={styles.table__col2}>{item.tenViTri}</p>
                    </td>
                    <td>
                      <p className={styles.table__col3}>{item.tinhThanh}</p>
                    </td>
                    <td>
                      <p className={styles.table__col4}>{item.quocGia}</p>
                    </td>
                    <td>
                      <div className={styles.table__col5}>
                        <Image
                          src={item.hinhAnh}
                          alt={item.tenViTri}
                          radius="xs"
                          width={300}
                          height={180}
                        />
                      </div>
                    </td>
                    <td>
                      <div className={styles.table__col6}>
                        <SuaThongTinViTri viTri={item} />{" "}
                        <XoaViTri id={item.id} />
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

export default QuanLyThongTinViTri;
