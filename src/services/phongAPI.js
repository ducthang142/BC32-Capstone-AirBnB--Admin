import fetcher from "./fetcher";

const phongAPI = {
  getDanhSachPhongPhanTrang: (page, search) => {
    return fetcher.get("phong-thue/phan-trang-tim-kiem", {
      params: {
        pageIndex: page,
        pageSize: 6,
        keyword: search,
      },
    });
  },

  putChinhSuaPhong: (id, values) => {
    return fetcher.put(`phong-thue/${id}`, values);
  },

  deletePhong: (id) => {
    return fetcher.delete(`phong-thue/${id}`);
  },

  postThemPhong: (values) => {
    return fetcher.post("phong-thue", values);
  },

  postUploadHinhPhong: (values, id) => {
    return fetcher.post("phong-thue/upload-hinh-phong", values, {
      params: {
        maPhong: id,
      },
    });
  },

  getPhongTheoId: (id) => {
    return fetcher.get(`phong-thue/${id}`);
  },
};

export default phongAPI;
