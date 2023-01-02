import { useState, useEffect } from "react";
import {
  Drawer,
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  Modal,
  LoadingOverlay,
  NumberInput,
  Chip,
  Select,
  Flex,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import TickSuccessIcon from "../../../components/TickSuccessIcon";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, increaseCount, resetIsAdd } from "../../../slices/phongSlice";
import styles from "./ThemPhong.module.scss";

const ThemPhong = ({ viTri }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { addError, loading, isAdd } = useSelector((state) => state.phong);

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
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
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

  const handleSubmit = (values) => {
    dispatch(addRoom(values));
  };

  useEffect(() => {
    if (isAdd) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      dispatch(increaseCount());
      dispatch(resetIsAdd());
      form.reset();
    }
  }, [isAdd]);

  //data cho select input của maViTri
  const data = viTri.map((item) => ({
    value: item.id,
    label: `${item.tenViTri}/${item.tinhThanh}/${item.quocGia}`,
  }));

  return (
    <>
      <Button mb={16} color="pink" w={170} onClick={() => setOpened(true)}>
        Thêm phòng thuê
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
                    defaultChecked={false}
                    color="pink"
                    size="sm"
                    mb={10}
                    mt={18}
                    {...form.getInputProps("mayGiat")}
                  >
                    Máy giặt
                  </Chip>
                  <Chip
                    defaultChecked={false}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("banLa")}
                  >
                    Bàn là
                  </Chip>
                  <Chip
                    defaultChecked={false}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("tivi")}
                  >
                    Tivi
                  </Chip>
                  <Chip
                    defaultChecked={false}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("dieuHoa")}
                  >
                    Điều hòa
                  </Chip>
                  <Chip
                    defaultChecked={false}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("wifi")}
                  >
                    Wifi
                  </Chip>
                  <Chip
                    defaultChecked={false}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("bep")}
                  >
                    Bếp
                  </Chip>
                  <Chip
                    defaultChecked={false}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("doXe")}
                  >
                    Đỗ xe
                  </Chip>
                  <Chip
                    defaultChecked={false}
                    color="pink"
                    size="sm"
                    mb={10}
                    {...form.getInputProps("hoBoi")}
                  >
                    Hồ bơi
                  </Chip>
                  <Chip
                    defaultChecked={false}
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
                Thêm
              </Button>
              {addError && <Text color="red">{addError}</Text>}
              <LoadingOverlay visible={loading} overlayBlur={2} />
            </form>
          </ScrollArea>
        </Paper>
      </Drawer>

      {/* Modal */}
      <Modal opened={openSuccess} withCloseButton={false} size="auto">
        <TickSuccessIcon />

        <Text m={12} fw={700} fz={32} className="text-center">
          Thêm thành công
        </Text>
      </Modal>
    </>
  );
};

export default ThemPhong;
