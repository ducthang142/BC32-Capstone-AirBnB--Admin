import { useState, useEffect } from "react";
import { Button, Modal, Text, Flex } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooking,
  resetIsDelete,
  increaseCount,
} from "../../../slices/datphongSlice";
import TickSuccessIcon from "../../../components/TickSuccessIcon";

const XoaDatPhong = ({ id }) => {
  const dispatch = useDispatch();
  const { isDelete, bookingLists } = useSelector((state) => state.datphong);
  const [opened, setOpened] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleConfirm = () => {
    setOpened(true);
  };

  const handleDelete = () => {
    dispatch(deleteBooking(id));
  };

  useEffect(() => {
    if (isDelete) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      dispatch(increaseCount());
      dispatch(resetIsDelete());
    }
  }, [isDelete]);

  return (
    <>
      <Button
        compact
        color="pink"
        variant="outline"
        onClick={() => handleConfirm()}
        size="md"
        ml={10}
      >
        Xóa
      </Button>

      {/* Modal */}
      <Modal opened={opened} withCloseButton={false}>
        <Text m={12} fw={700} fz={32} className="text-center">
          Bạn có muốn xóa đặt phòng này!
        </Text>
        <Flex
          gap="xl"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button
            onClick={() => {
              setOpened(false);
              handleDelete();
            }}
            w={100}
            color="pink"
            variant="outline"
          >
            Có
          </Button>
          <Button onClick={() => setOpened(false)} w={100} color="pink">
            Không
          </Button>
        </Flex>
      </Modal>

      <Modal opened={openSuccess} withCloseButton={false} size="auto">
        <TickSuccessIcon />

        <Text m={12} fw={700} fz={32} className="text-center">
          Xóa thành công
        </Text>
      </Modal>
    </>
  );
};

export default XoaDatPhong;
