import styles from "./Admin.module.scss";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Avatar,
  Center,
  Modal,
  LoadingOverlay,
  Group,
  FileButton,
  Button,
  Image,
  Skeleton,
} from "@mantine/core";
import { IconUpload, IconMail, IconCalendar, IconPhone } from "@tabler/icons";
import nguoidungAPI from "../../services/nguoidungAPI";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import ChinhSuaHoSo from "./ChinhSuaHoSo";
import {
  updateAvatar,
  resetIsAvatar,
  increaseCount,
} from "../../slices/authSlice";
import { useLocation } from "react-router-dom";
import TickSuccessIcon from "../../components/TickSuccessIcon";

const Admin = () => {
  const [nguoiDung, setNguoiDung] = useState({});
  const { user, loading, isAvatarFulfilled, count, avatarError } = useSelector(
    (state) => state.auth
  );
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [openSuccess, setOpenSuccess] = useState(false);

  //Call API để lấy thông tin avatar của người dùng lưu xuống local storage
  useEffect(() => {
    (async () => {
      try {
        const data = await nguoidungAPI.getThongTinNguoiDungTheoId(
          user.user.id
        );
        setNguoiDung(data);
        localStorage.setItem("avatar", JSON.stringify(data.avatar));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [count]);

  //Form
  const form = useForm({
    initialValues: {
      avatar: "",
    },
  });

  //image preview
  const [imgPreview, setImgPreview] = useState(null);

  const handleChangeImage = (file) => {
    if (!file) return;

    // set value cho file hình ảnh
    form.setFieldValue("avatar", file);

    //Xử lý hiển thị hình ảnh preview cho user thấy
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  };

  //Dispatch upload avatar
  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("formFile", values.avatar);
    dispatch(updateAvatar(formData));
  };

  //Thông báo thành công
  useEffect(() => {
    if (isAvatarFulfilled) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      dispatch(increaseCount());
      dispatch(resetIsAvatar());
      form.reset();
      setImgPreview(null);
    }
  }, [isAvatarFulfilled]);

  return (
    <div className={styles.home}>
      <Group
        position="center"
        h="100vh"
        hidden={location.pathname !== "/admin" ? true : false}
      >
        <Card withBorder p="none" radius="md" shadow="xl">
          <Skeleton visible={!nguoiDung.name}>
            <Card.Section>
              <Image
                src="./image/avatar-background.jpg"
                width={350}
                height={200}
              />
            </Card.Section>

            <Avatar
              src={nguoiDung.avatar}
              size={120}
              radius={120}
              mx="auto"
              mt={-50}
              style={{ border: "3px solid #fff" }}
            />
            <Center>
              <p onClick={() => setOpened(true)} className={styles.avatar}>
                Cập nhật ảnh
              </p>
            </Center>

            <Text align="center" size="lg" weight={500} mt="sm">
              {nguoiDung.name}
            </Text>

            <Text align="center" size="sm" color="dimmed">
              <IconMail />: {nguoiDung.email}
            </Text>

            <Text align="center" size="sm" color="dimmed">
              <IconCalendar />: {nguoiDung.birthday?.slice(0, 2)}/
              {nguoiDung.birthday?.slice(3, 5)}/
              {nguoiDung.birthday?.slice(6, 10)}
            </Text>

            <Text align="center" size="sm" color="dimmed">
              <IconPhone />: {nguoiDung.phone}
            </Text>

            <Text align="center" mt={20}>
              <ChinhSuaHoSo nguoiDung={nguoiDung} />
            </Text>
          </Skeleton>
        </Card>
      </Group>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Cập nhật ảnh avatar"
        size={imgPreview ? "auto" : "sm"}
      >
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          style={{ position: "relative" }}
        >
          <Group position="center">
            <FileButton onChange={handleChangeImage}>
              {(props) => (
                <Button {...props} color="pink" variant="light">
                  <IconUpload /> Upload Ảnh
                </Button>
              )}
            </FileButton>
          </Group>
          {imgPreview && (
            <Image src={imgPreview} alt="preview" height={250} width="auto" />
          )}

          <button className={styles.button}>Cập nhật</button>
          {avatarError && <Text color="red">{avatarError}</Text>}
          <LoadingOverlay
            visible={loading}
            overlayBlur={2}
            loaderProps={{ size: "sm", color: "pink", variant: "bars" }}
          />
        </form>
      </Modal>

      <Modal opened={openSuccess} withCloseButton={false} size="auto">
        <TickSuccessIcon />

        <Text m={12} fw={700} fz={32} className="text-center">
          Upload ảnh thành công
        </Text>
      </Modal>

      <Outlet />
    </div>
  );
};

export default Admin;
