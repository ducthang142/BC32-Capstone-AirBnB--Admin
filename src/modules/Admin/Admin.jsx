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
  Title,
  Group,
  FileButton,
  Button,
  Image,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";
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

    // set value cho file hình ảnh của react-hook-form
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
      <Card shadow="sm" p="xl" w={350} hidden={location.pathname !== "/admin"}>
        <Card.Section align="center">
          <Center>
            <Avatar
              radius={160}
              size={160}
              color="pink"
              src={nguoiDung.avatar}
            />
          </Center>
          <p onClick={() => setOpened(true)} className={styles.avatar}>
            Cập nhật ảnh
          </p>
        </Card.Section>

        <Text weight={500} size="lg" mt="md" align="center">
          {nguoiDung.name}
        </Text>

        <Text mt="xs" color="dimmed" size="sm" align="center">
          {nguoiDung.email}
        </Text>

        <Text mt="xs" color="dimmed" size="sm" align="center">
          {nguoiDung.birthday?.slice(0, 2)}/{nguoiDung.birthday?.slice(3, 5)}/
          {nguoiDung.birthday?.slice(6, 10)}
        </Text>

        <Text mt="xs" color="dimmed" size="sm" align="center">
          {nguoiDung.phone}
        </Text>
        <Text mt="xs" size="sm" align="center">
          <ChinhSuaHoSo nguoiDung={nguoiDung} />
        </Text>
      </Card>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Cập nhật ảnh avatar"
        size={imgPreview?"auto":"sm"}
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
          <LoadingOverlay visible={loading} overlayBlur={2} />
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
