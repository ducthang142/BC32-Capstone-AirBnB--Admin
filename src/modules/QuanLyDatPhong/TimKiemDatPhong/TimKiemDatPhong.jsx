import { useState } from "react";
import { Group, NumberInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../../../slices/datphongSlice";

const TimKiemDatPhong = ({ setActivePage, setKeyword }) => {
  const [value, setValue] = useState("");
  const { bookingLists } = useSelector((state) => state.datphong);
  const dispatch = useDispatch();

  const handleSearch = () => {
    const lists = bookingLists.filter((item) => item.maNguoiDung === value);
    setKeyword(value);
    setActivePage(1);
    dispatch(search(lists));
  };
  return (
    <>
      <Group mb={16}>
        <NumberInput
          placeholder="Nhập vào mã người dùng"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={value}
          onChange={(e) => setValue(e)}
          w={300}
          styles={(theme) => ({
            input: {
              "&:focus-within": {
                borderColor: theme.colors.pink[6],
              },
            },
          })}
        />
        <Button
          color="pink"
          variant="outline"
          size="sm"
          w={100}
          onClick={() => handleSearch()}
          mr={10}
        >
          Tìm kiếm
        </Button>
      </Group>
    </>
  );
};

export default TimKiemDatPhong;
