import { useState, useEffect } from "react";
import {
  Drawer,
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  Modal,
  Select,
  LoadingOverlay,
  Flex,
  Chip,
  NumberInput,
  ScrollArea
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  updateRoom,
  increaseCount,
  resetIsUpdate,
} from "../../../slices/phongSlice";
import { useDispatch, useSelector } from "react-redux";
import TickSuccessIcon from "../../../components/TickSuccessIcon";
import styles from './SuaPhong.module.scss'

const SuaPhong = ({ phong, viTri }) => {
  const [opened, setOpened] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});
  const dispatch = useDispatch();
  const { loading, updateError, isUpdate } = useSelector(
    (state) => state.phong
  );

  //Form
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongTam: "",
      moTa: "",
      giaTien: "",
      maViTri: "",
      hinhAnh: "",
    },

    validate: {
      tenPhong: (value) =>
        value.length < 6 ? "Tên phải có ít nhất 6 kí tự" : null,
      khach: (value) => (value < 1 ? "Khách tối đa không hợp lệ" : null),
      phongNgu: (value) => (value < 0 ? "Phòng ngủ không hợp lệ" : null),
      giuong: (value) => (value < 0 ? "Số giường không hợp lệ" : null),
      phongTam: (value) => (value < 0 ? "Phòng tắm không hợp lệ" : null),
      moTa: (value) => (value.length < 1 ? "Vui lòng nhập vào mô tả" : null),
      giaTien: (value) =>
        /^[0-9]*$/.test(value) ? null : "Giá tiền chỉ bao gồm kí số",
      maViTri: (value) => (value.length === 0 ? "Vui lòng chọn vị trí" : null),
    },
  });

  useEffect(() => {
    form.setValues({
      tenPhong: phong.tenPhong,
      khach: phong.khach,
      phongNgu: phong.phongNgu,
      giuong: phong.giuong,
      phongTam: phong.phongTam,
      moTa: phong.moTa,
      giaTien: phong.giaTien,
      mayGiat: phong.mayGiat,
      banLa: phong.banLa,
      tivi: phong.tivi,
      dieuHoa: phong.dieuHoa,
      wifi: phong.wifi,
      bep: phong.bep,
      doXe: phong.doXe,
      hoBoi: phong.hoBoi,
      banUi: phong.banUi,
      maViTri: phong.maViTri,
      hinhAnh: phong.hinhAnh,
    });
  }, [opened]);

  useEffect(() => {
    if (isUpdate) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      dispatch(increaseCount());
      dispatch(resetIsUpdate());
    }
  }, [isUpdate]);

  const handleSubmit = (values) => {
    setRoomInfo(values);
    setOpenModal(true);
  };

  const handleUpdate = () => {
    const values = [phong.id, roomInfo];
    dispatch(updateRoom(values));
    setOpenModal(false);
  };

  //data cho select input của maViTri
  const data = viTri.map((item) => ({
    value: item.id,
    label: `${item.tenViTri}/${item.tinhThanh}/${item.quocGia}`,
  }));

  return (
    <>
      <Button compact color="pink" onClick={() => setOpened(true)} size="md">
        Sửa
      </Button>

      {/* Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
      >
        <Paper radius={15} p={30} shadow="xl">
          <ScrollArea h={550}>
            <form
              onSubmit={form.onSubmit((values) => handleSubmit(values))}
              style={{ position: "relative" }}
            >
              <Title order={2} align="center" mt="md" mb={50}>
                Thêm phòng thuê
              </Title>

              <TextInput
                label="Tên phòng"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                })}
                {...form.getInputProps("tenPhong")}
              />

              <Flex justify="flex-start" align="center" gap="lg">
                <div>
                  <NumberInput
                    label="Khách"
                    mt="md"
                    size="md"
                    styles={(theme) => ({
                      input: {
                        "&:focus-within": {
                          borderColor: theme.colors.pink[6],
                        },
                      },
                    })}
                    {...form.getInputProps("khach")}
                  />

                  <NumberInput
                    label="Phòng ngủ"
                    mt="md"
                    size="md"
                    styles={(theme) => ({
                      input: {
                        "&:focus-within": {
                          borderColor: theme.colors.pink[6],
                        },
                      },
                    })}
                    {...form.getInputProps("phongNgu")}
                  />

                  <NumberInput
                    label="Giường"
                    mt="md"
                    size="md"
                    styles={(theme) => ({
                      input: {
                        "&:focus-within": {
                          borderColor: theme.colors.pink[6],
                        },
                      },
                    })}
                    {...form.getInputProps("giuong")}
                  />

                  <NumberInput
                    label="Phòng tắm"
                    mt="md"
                    size="md"
                    styles={(theme) => ({
                      input: {
                        "&:focus-within": {
                          borderColor: theme.colors.pink[6],
                        },
                      },
                    })}
                    {...form.getInputProps("phongTam")}
                  />
                </div>

                <div className={styles.chip}>
                  <Chip
                    defaultChecked={phong.mayGiat}
                    color="pink"
                    size="sm"
                    mb={10}
                    mt={18}
                    {...form.getInputProps("mayGiat")}
                  >
                    Máy giặt
                  </Chip>
                  <Chip
                    defaultChecked={phong.banLa}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("banLa")}
                  >
                    Bàn là
                  </Chip>
                  <Chip
                    defaultChecked={phong.tivi}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("tivi")}
                  >
                    Tivi
                  </Chip>
                  <Chip
                    defaultChecked={phong.dieuHoa}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("dieuHoa")}
                  >
                    Điều hòa
                  </Chip>
                  <Chip
                    defaultChecked={phong.wifi}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("wifi")}
                  >
                    Wifi
                  </Chip>
                  <Chip
                    defaultChecked={phong.bep}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("bep")}
                  >
                    Bếp
                  </Chip>
                  <Chip
                    defaultChecked={phong.doXe}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("doXe")}
                  >
                    Đỗ xe
                  </Chip>
                  <Chip
                    defaultChecked={phong.hoBoi}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("hoBoi")}
                  >
                    Hồ bơi
                  </Chip>
                  <Chip
                    defaultChecked={phong.banUi}
                    color="pink"
                    size="sm"
                    {...form.getInputProps("banUi")}
                  >
                    Bàn ủi
                  </Chip>
                </div>
              </Flex>

              <Select
                label="Mã vị trí"
                placeholder="Chọn vị trí của phòng"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                })}
                data={data}
                {...form.getInputProps("maViTri")}
              />

              <TextInput
                label="Mô tả"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                })}
                {...form.getInputProps("moTa")}
              />

              <TextInput
                label="Giá tiền"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                })}
                {...form.getInputProps("giaTien")}
              />

              <TextInput
                label="Hình ảnh"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                })}
                {...form.getInputProps("hinhAnh")}
              />

              <Button mt="xl" size="md" type="submit" color="pink">
                Cập nhật
              </Button>
              {updateError && <Text color="red">{updateError}</Text>}
              <LoadingOverlay visible={loading} overlayBlur={2} />
            </form>
          </ScrollArea>
        </Paper>
      </Drawer>

      {/* Modal */}
      <Modal opened={openModal} withCloseButton={false}>
        <Text m={12} fw={700} fz={32} className="text-center">
          Bạn có muốn cập nhật vị trí này!
        </Text>
        <Flex
          gap="xl"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button
            onClick={() => handleUpdate()}
            w={100}
            color="pink"
            variant="outline"
          >
            Có
          </Button>
          <Button onClick={() => setOpenModal(false)} w={100} color="pink">
            Không
          </Button>
        </Flex>
      </Modal>

      <Modal opened={openSuccess} withCloseButton={false} size="auto">
        <TickSuccessIcon />

        <Text m={12} fw={700} fz={32} className="text-center">
          Cập nhật thành công
        </Text>
      </Modal>
    </>
  );
};

export default SuaPhong;
