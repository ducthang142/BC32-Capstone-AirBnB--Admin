import { useState, useEffect } from "react";
import {
  Drawer,
  Paper,
  NumberInput,
  Button,
  Title,
  Text,
  Modal,
  LoadingOverlay,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import TickSuccessIcon from "../../../components/TickSuccessIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addBooking,
  increaseCount,
  resetIsAdd,
} from "../../../slices/datphongSlice";

const DatPhong = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { addError, loading, isAdd } = useSelector((state) => state.datphong);
  const [value, setValue] = useState([null, null]);

  //form
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      maPhong: "",
      maNguoiDung: "",
      soLuongKhach: "",
    },
  });

  //Call API để thêm đặt phòng
  const handleSubmit = (values) => {
    const newValues = {
      ...values,
      ngayDen: new Date(value[0].getTime() + 28800000).toISOString(),
      ngayDi: new Date(value[1].getTime() + 28800000).toISOString(),
    };
    dispatch(addBooking(newValues));
  };

  //Thông báo thành công
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
        Thêm đặt phòng
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
              Sửa Thông Tin Đặt Phòng
            </Title>

            <NumberInput
              label="Mã người dùng"
              mt="md"
              size="md"
              min={1}
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("maNguoiDung")}
            />

            <NumberInput
              label="Mã phòng"
              mt="md"
              size="md"
              min={1}
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("maPhong")}
            />

            <NumberInput
              label="Số lượng khách"
              mt="md"
              size="md"
              min={1}
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("soLuongKhach")}
            />

            <DateRangePicker
              label="Chọn ngày đến và ngày đi"
              placeholder="Ngày đến - Ngày đi"
              value={value}
              onChange={setValue}
              amountOfMonths={2}
              inputFormat="DD/MM/YYYY"
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
            />

            <Button mt="xl" size="md" type="submit" color="pink">
              Thêm
            </Button>
            {addError && <Text color="red">{addError}</Text>}
            <LoadingOverlay visible={loading} overlayBlur={2} />
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

export default DatPhong;
