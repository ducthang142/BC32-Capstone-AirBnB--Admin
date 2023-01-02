import fetcher from "./fetcher";

const vitriAPI = {
  getDanhSachViTri: () => {
    return fetcher.get("vi-tri");
  },

  getDanhSachViTriPhanTrang: (page, search) => {
    return fetcher.get("vi-tri/phan-trang-tim-kiem", {
      params: {
        pageIndex: page,
        pageSize: 3,
        keyword: search,
      },
    });
  },

  putChinhSuaViTri: (id, values) => {
    return fetcher.put(`vi-tri/${id}`, values);
  },

  deleteViTri: (id) => {
    return fetcher.delete(`vi-tri/${id}`);
  },

  postThemViTri: (values) => {
    return fetcher.post("vi-tri", values);
  },
};

export default vitriAPI;
