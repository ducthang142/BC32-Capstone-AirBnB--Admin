import { useState } from "react";
import { Group, TextInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useDispatch } from "react-redux";
import { userListByPageIndex } from "../../../slices/authSlice";

const TimKiemNguoiDung = ({ setKeyword }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(userListByPageIndex([1, value]));
    setKeyword(value);
  };

  return (
    <>
      <Group mb={16}>
        <TextInput
          placeholder="Nhập vào tên người dùng"
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
      </Group>
    </>
  );
};

export default TimKiemNguoiDung;
