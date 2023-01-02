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
  Flex,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  updateBooking,
  increaseCount,
  resetIsUpdate,
  getRoom,
} from "../../../slices/datphongSlice";
import { useDispatch, useSelector } from "react-redux";
import TickSuccessIcon from "../../../components/TickSuccessIcon";

const SuaDatPhong = ({ datPhong }) => {
  const [opened, setOpened] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [datPhongInfo, setDatPhongInfo] = useState({});
  const [value, setValue] = useState([null, null]);
  const dispatch = useDispatch();
  const { loading, updateError, isUpdate, maxGuest } = useSelector(
    (state) => state.datphong
  );

  //Form
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      maPhong: "",
      maNguoiDung: "",
      soLuongKhach: "",
    },
  });

  //fill thông tin lên input
  useEffect(() => {
    form.setValues({
      maPhong: datPhong.maPhong,
      maNguoiDung: datPhong.maNguoiDung,
      soLuongKhach: datPhong.soLuongKhach,
    });
    setValue([new Date(datPhong.ngayDen), new Date(datPhong.ngayDi)]);

    //Lấy thông tin số khách tối đa của phòng
    dispatch(getRoom(datPhong.maPhong));
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

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
      ngayDen: new Date(value[0].getTime() + 28800000).toISOString(),
      ngayDi: new Date(value[1].getTime() + 28800000).toISOString(),
    };
    setDatPhongInfo(newValues);
    setOpenModal(true);
  };

  const handleUpdate = () => {
    const values = [datPhong.id, datPhongInfo];
    dispatch(updateBooking(values));
    console.log(values);
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
              Sửa Thông Tin Đặt Phòng
            </Title>

            <NumberInput
              label="Số lượng khách"
              mt="md"
              size="md"
              min={1}
              max={maxGuest}
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
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
            />

            <Button mt="xl" size="md" type="submit" color="pink">
              Cập Nhật
            </Button>
            {updateError && <Text color="red">{updateError}</Text>}
            <LoadingOverlay visible={loading} overlayBlur={2} />
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

export default SuaDatPhong;
