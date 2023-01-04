import { useState } from "react";
import { Group, TextInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useDispatch } from "react-redux";
import { roomByPageIndex, increaseCount } from "../../../slices/phongSlice";

const TimKiemPhong = ({ setKeyword }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  //Lấy value từ input để call API tìm kiếm phòng
  const handleSearch = () => {
    dispatch(roomByPageIndex([1, value]));
    setKeyword(value);
  };

  return (
    <>
      <Group mb={16}>
        <TextInput
          placeholder="Nhập vào tên phòng"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
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
        >
          Tìm kiếm
        </Button>
        <Button
          color="pink"
          w={100}
          onClick={() => {
            setValue("");
            setKeyword("");
            dispatch(increaseCount());
          }}
        >
          Refresh
        </Button>
      </Group>
    </>
  );
};

export default TimKiemPhong;
