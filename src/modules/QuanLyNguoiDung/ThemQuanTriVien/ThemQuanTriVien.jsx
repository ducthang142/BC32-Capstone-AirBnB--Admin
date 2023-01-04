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
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import TickSuccessIcon from "../../../components/TickSuccessIcon";
import { useDispatch, useSelector } from "react-redux";
import formatDateUpAPI from "../../../utils/formatDateUpAPI";
import { addAdmin, increaseCount, resetIsAdd } from "../../../slices/authSlice";
import useWindowSize from "../../../utils/useWindowSize";

const ThemQuanTriVien = () => {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [opened, setOpened] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { addError, loading, isAdd } = useSelector((state) => state.auth);

  //Form
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
    },

    validate: {
      name: (value) =>
        value.length < 6
          ? "Tên phải có ít nhất 6 kí tự"
          : value.length > 12
          ? "Tên không vượt quá 12 kí tự"
          : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      phone: (value) =>
        value.length < 10 ? "Số điện thoại phải có ít nhất 10 kí tự" : null,
    },
  });

  //call API thêm user 
  const handleSubmit = (values) => {
    const newValues = {
      ...values,
      birthday: formatDateUpAPI(values.birthday),
    };
    dispatch(addAdmin(newValues));
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
      <Button mb={16} color="pink" onClick={() => setOpened(true)} w={170}>
        Thêm quản trị viên
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
              Thêm quản trị viên
            </Title>

            <ScrollArea h={size.height < 740 ? 400 : "auto"}>
              <TextInput
                label="Họ Tên"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                })}
                {...form.getInputProps("name")}
              />

              <TextInput
                label="Email"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                })}
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Số Điện Thoại"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                })}
                {...form.getInputProps("phone")}
              />

              <DatePicker
                placeholder="Chọn ngày"
                label="Ngày Sinh"
                mt="md"
                size="md"
                inputFormat="DD/MM/YYYY"
                labelFormat="MM/YYYY"
                dropdownType="modal"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },

                  calendarHeaderLevel: {
                    backgroundColor: theme.colors.pink[6],
                    "&:hover": {
                      backgroundColor: theme.colors.pink[6],
                    },
                  },

                  monthPickerControlActive: {
                    backgroundColor: theme.colors.pink[6],
                    "&:hover": {
                      backgroundColor: theme.colors.pink[6],
                    },
                  },

                  yearPickerControlActive: {
                    backgroundColor: theme.colors.pink[6],
                    "&:hover": {
                      backgroundColor: theme.colors.pink[6],
                    },
                  },

                  day: {
                    "&[data-selected]": {
                      backgroundColor: theme.colors.pink[6],
                    },
                  },
                })}
                {...form.getInputProps("birthday")}
              />

              <Select
                label="Loại người dùng"
                placeholder="USER hay ADMIN"
                mt="md"
                size="md"
                styles={(theme) => ({
                  input: {
                    "&:focus-within": {
                      borderColor: theme.colors.pink[6],
                    },
                  },
                  item: {
                    "&[data-selected]": {
                      "&, &:hover": {
                        backgroundColor: theme.colors.pink[6],
                      },
                    },
                  },
                })}
                data={[
                  { value: "USER", label: "USER" },
                  { value: "ADMIN", label: "ADMIN" },
                ]}
                {...form.getInputProps("role")}
              />

              <Button mt="xl" size="md" type="submit" color="pink">
                Thêm
              </Button>
              {addError && <Text color="red">{addError}</Text>}
              <LoadingOverlay
                visible={loading}
                overlayBlur={2}
                loaderProps={{ size: "sm", color: "pink", variant: "bars" }}
              />
            </ScrollArea>
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

export default ThemQuanTriVien;
