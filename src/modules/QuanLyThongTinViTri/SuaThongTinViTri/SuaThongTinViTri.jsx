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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  updateLocation,
  increaseCount,
  resetIsUpdate,
} from "../../../slices/vitriSlice";
import { useDispatch, useSelector } from "react-redux";
import TickSuccessIcon from "../../../components/TickSuccessIcon";

const SuaThongTinViTri = ({ viTri }) => {
  const [opened, setOpened] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [locationInfo, setLocationInfo] = useState({});
  const dispatch = useDispatch();
  const { loading, updateError, isUpdate } = useSelector(
    (state) => state.vitri
  );

  //Form
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },

    validate: {
      tenViTri: (value) =>
        value.length < 6
          ? "Tên phải có ít nhất 6 kí tự"
          : value.length > 24
          ? "Tên không vượt quá 12 kí tự"
          : null,
      tinhThanh: (value) =>
        value.length < 6
          ? "Tên phải có ít nhất 6 kí tự"
          : value.length > 24
          ? "Tên không vượt quá 12 kí tự"
          : null,
      quocGia: (value) =>
        value.length < 6
          ? "Tên phải có ít nhất 6 kí tự"
          : value.length > 24
          ? "Tên không vượt quá 12 kí tự"
          : null,
    },
  });

  //fill thông tin lên input
  useEffect(() => {
    form.setValues({
      tenViTri: viTri.tenViTri,
      tinhThanh: viTri.tinhThanh,
      quocGia: viTri.quocGia,
      hinhAnh: viTri.hinhAnh,
    });
  }, [opened]);

  //Thông báo thành công
  useEffect(() => {
    if (isUpdate) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      dispatch(increaseCount());
      dispatch(resetIsUpdate());
    }
  }, [isUpdate]);

  //hiện cảnh báo để confirm
  const handleSubmit = (values) => {
    setLocationInfo(values);
    setOpenModal(true);
  };

  //call API update thông tin vị trí
  const handleUpdate = () => {
    const values = [viTri.id, locationInfo ];
    dispatch(updateLocation(values));
    setOpenModal(false);
  };

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
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            style={{ position: "relative" }}
          >
            <Title order={2} align="center" mt="md" mb={50}>
              Sửa Thông Tin Vị Trí
            </Title>

            <TextInput
              label="Tên vị trí"
              mt="md"
              size="md"
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("tenViTri")}
            />

            <TextInput
              label="Tỉnh thành"
              mt="md"
              size="md"
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("tinhThanh")}
            />

            <TextInput
              label="Quốc gia"
              mt="md"
              size="md"
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("quocGia")}
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
              Cập Nhật
            </Button>
            {updateError && <Text color="red">{updateError}</Text>}
            <LoadingOverlay visible={loading} overlayBlur={2} loaderProps={{ size: "sm", color: "pink", variant: "bars" }}/>
          </form>
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

export default SuaThongTinViTri;
