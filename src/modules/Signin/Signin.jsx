import { useForm } from "@mantine/form";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  LoadingOverlay,
  Group,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { signin } from "../../slices/authSlice";
import styles from "./Signin.module.scss";
import useWindowSize from "../../utils/useWindowSize";

const Signin = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const size = useWindowSize();

  //form
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : "Mật khẩu phải có ít nhất 8 kí tự gồm cả chữ và số",
    },
  });

  const handleSubmit = (values) => {
    dispatch(signin(values));
  };

  if (user) {
    const redirectUrl = searchParams.get("redirectUrl");
    // Có thông tin user => đã đăng nhập => redirect về redirectUrl hoặc Home
    return <Navigate to={redirectUrl || "/admin"} replace />;
  }

  return (
    <div className={styles.container}>
      <Group position="center" h="100vh">
        <Paper
          radius={15}
          p={30}
          shadow="xl"
          w={size.width > 900 ? 500 : size.width > 600 ? 400 : 300}
        >
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            style={{ position: "relative" }}
          >
            <Title order={2} align="center" mt="md" mb={50}>
              Đăng Nhập
            </Title>

            <TextInput
              label="Email"
              size="md"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Mật Khẩu"
              mt="md"
              size="md"
              {...form.getInputProps("password")}
            />

            <Button mt="xl" size="md" type="submit" color="pink">
              Đăng Nhập
            </Button>
            <LoadingOverlay visible={loading} overlayBlur={2} />

            {error && <Text color="red">{error}</Text>}
          </form>
        </Paper>
      </Group>
    </div>
  );
};

export default Signin;
