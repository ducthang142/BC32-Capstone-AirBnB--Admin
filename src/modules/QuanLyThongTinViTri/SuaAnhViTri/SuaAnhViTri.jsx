import { useState, useEffect } from "react";
import {
  Text,
  Modal,
  LoadingOverlay,
  Button,
  FileButton,
  Group,
  Image,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { IconUpload } from "@tabler/icons";
import {
  uploadImage,
  increaseCount,
  resetIsUpload,
} from "../../../slices/vitriSlice";
import TickSuccessIcon from "../../../components/TickSuccessIcon";
import styles from "./SuaAnhViTri.module.scss";

const SuaAnhViTri = ({ id }) => {
  const { loading, isUpload, uploadError } = useSelector(
    (state) => state.vitri
  );
  const [opened, setOpened] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const dispatch = useDispatch();

  //Form
  const form = useForm({
    initialValues: {
      hinhAnh: "",
    },
  });

  //image preview
  const [imgPreview, setImgPreview] = useState(null);

  //Dispatch upload image
  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("formFile", values.hinhAnh);
    dispatch(uploadImage([formData, id]));
  };

  //Hiển thị ảnh preview trước khi upload
  const handleChangeImage = (file) => {
    if (!file) return;

    //Set value cho form
    form.setFieldValue("hinhAnh", file);

    //Xử lý hiển thị hình ảnh preview cho user thấy

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  };

  //Thông báo thành công
  useEffect(() => {
    if (isUpload) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      dispatch(increaseCount());
      dispatch(resetIsUpload());
      form.reset();
      setImgPreview(null);
    }
  }, [isUpload]);

  return (
    <>
      <Button compact color="pink" size="md" onClick={() => setOpened(true)}>
        Sửa ảnh
      </Button>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Cập nhật ảnh phòng"
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
          {imgPreview && <Image src={imgPreview} alt="preview" />}

          <button className={styles.button}>Cập nhật</button>
          {uploadError && <Text color="red">{uploadError}</Text>}
          <LoadingOverlay visible={loading} overlayBlur={2} loaderProps={{ size: "sm", color: "pink", variant: "bars" }}/>
        </form>
      </Modal>

      <Modal opened={openSuccess} withCloseButton={false} size="auto">
        <TickSuccessIcon />

        <Text m={12} fw={700} fz={32} className="text-center">
          Upload ảnh thành công
        </Text>
      </Modal>
    </>
  );
};

export default SuaAnhViTri;
