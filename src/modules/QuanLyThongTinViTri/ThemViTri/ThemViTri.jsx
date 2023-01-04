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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import TickSuccessIcon from "../../../components/TickSuccessIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addLocation,
  increaseCount,
  resetIsAdd,
} from "../../../slices/vitriSlice";

const ThemViTri = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { addError, loading, isAdd } = useSelector((state) => state.vitri);

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
      hinhAnh: (value) =>
        value.length === 0 ? "Vui lòng nhập vào link hình ảnh" : null,
    },
  });

  //Call API thêm vị trí
  const handleSubmit = (values) => {
    dispatch(addLocation(values));
  };

  //Hiện thông báo thành công
  useEffect(() => {
    if (isAdd) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      dispatch(increaseCount());
      dispatch(resetIsAdd());
      form.reset();
    }
  }, [isAdd]);

  return (
    <>
      <Button mb={16} color="pink" w={170} onClick={() => setOpened(true)}>
        Thêm vị trí
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
              Thêm quản vị trí
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
              Thêm
            </Button>
            {addError && <Text color="red">{addError}</Text>}
            <LoadingOverlay visible={loading} overlayBlur={2} loaderProps={{ size: "sm", color: "pink", variant: "bars" }} />
          </form>
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

export default ThemViTri;
