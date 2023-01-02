import fetcher from "./fetcher";

const nguoidungAPI = {
  getThongTinNguoiDungTheoId: (id) => {
    return fetcher.get(`users/${id}`);
  },

  putChinhSuaThongTin: (id, values) => {
    return fetcher.put(`users/${id}`, values);
  },

  postThemAdmin: (values) => {
    return fetcher.post("users", values);
  },

  deleteNguoiDung: (value) => {
    return fetcher.delete("users", {
      params: {
        id: value,
      },
    });
  },

  postDoiAvatar: (formData) => {
    return fetcher.post("users/upload-avatar", formData);
  },

  getDanhSachNguoiDung: () => {
    return fetcher.get("users");
  },

  getDanhSachNguoiDungPhanTrang: (page, search) => {
    return fetcher.get("users/phan-trang-tim-kiem", {
      params: {
        pageIndex: page,
        pageSize: 8,
        keyword: search,
      },
    });
  },
};

export default nguoidungAPI;
