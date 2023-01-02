import { useState, useEffect } from "react";
import { Button, Modal, Text, Flex } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  resetIsDelete,
  increaseCount,
} from "../../../slices/authSlice";
import TickSuccessIcon from "../../../components/TickSuccessIcon";

const XoaNguoiDung = ({ id }) => {
  const dispatch = useDispatch();
  const { isDelete } = useSelector((state) => state.auth);
  const [opened, setOpened] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleConfirm = () => {
    setOpened(true);
  };

  const handleDelete = () => {
    dispatch(deleteUser(id));
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
        size = "md"
      >
        Xóa
      </Button>

      {/* Modal */}
      <Modal opened={opened} withCloseButton={false}>
        <Text m={12} fw={700} fz={32} className="text-center">
          Bạn có muốn xóa người dùng này!
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

export default XoaNguoiDung;
