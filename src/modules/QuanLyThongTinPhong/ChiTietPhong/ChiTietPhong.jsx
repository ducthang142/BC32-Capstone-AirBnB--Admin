import { useState } from "react";
import {
  IconWashMachine,
  IconDeviceTv,
  IconAirConditioning,
  IconWifi,
  IconToolsKitchen2,
  IconParking,
  IconPool,
  IconIroning3,
  IconEyeTable,
} from "@tabler/icons";
import {
  Text,
  Paper,
  Modal,
  Button,
  ScrollArea,
  Image,
  Grid,
} from "@mantine/core";

const ChiTietPhong = ({ phong }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        color="pink"
        onClick={() => setOpened(true)}
        compact
        size="md"
        mr={10}
        variant="subtle"
      >
        Chi tiết phòng
      </Button>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Thông tin chi tiết phòng"
        centered
      >
        <ScrollArea>
          <Paper>
            <Image src={phong.hinhAnh} alt={phong.tenPhong} w={300} h="auto" />
            <Text fw={700}>Tên Phòng:</Text>
            {phong.tenPhong}
            <Text fw={700}>Mô tả:</Text>
            {phong.moTa}
            <Text>
              <span style={{ fontWeight: "700" }}>Khách:</span> {phong.khach}
            </Text>
            <Text>
              <span style={{ fontWeight: "700" }}>Phòng ngủ:</span>{" "}
              {phong.phongNgu}
            </Text>
            <Text>
              <span style={{ fontWeight: "700" }}>Giường:</span> {phong.giuong}
            </Text>
            <Text>
              <span style={{ fontWeight: "700" }}>Phòng tắm:</span>{" "}
              {phong.phongTam}
            </Text>
            <Text fw={700}>Tiện ích:</Text>
            <Grid>
              <Grid.Col span={6} hidden={!phong.mayGiat}>
                <IconWashMachine /> Máy giặt
              </Grid.Col>
              <Grid.Col span={6} hidden={!phong.tivi}>
                <IconDeviceTv /> Tivi
              </Grid.Col>
              <Grid.Col span={6} hidden={!phong.dieuHoa}>
                <IconAirConditioning /> Điều hòa
              </Grid.Col>
              <Grid.Col span={6} hidden={!phong.wifi}>
                <IconWifi /> Wifi
              </Grid.Col>
              <Grid.Col span={6} hidden={!phong.bep}>
                <IconToolsKitchen2 /> Nhà bếp
              </Grid.Col>
              <Grid.Col span={6} hidden={!phong.doXe}>
                <IconParking /> Chỗ đậu xe
              </Grid.Col>
              <Grid.Col span={6} hidden={!phong.hoBoi}>
                <IconPool /> Hồ bơi
              </Grid.Col>
              <Grid.Col span={6} hidden={!phong.banUi}>
                <IconIroning3 /> Bàn ủi
              </Grid.Col>
              <Grid.Col span={6} hidden={!phong.banLa}>
                <IconEyeTable /> Bàn là
              </Grid.Col>
            </Grid>
            <Text>
              <span style={{ fontWeight: "700" }}>Giá tiền:</span>{" "}
              {phong.giaTien}$ /đêm
            </Text>
          </Paper>
        </ScrollArea>
      </Modal>
    </>
  );
};

export default ChiTietPhong;
