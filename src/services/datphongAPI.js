import fetcher from "./fetcher";

const datphongAPI = {
  getDanhSachDatPhong: () => {
    return fetcher.get("dat-phong");
  },

  putChinhSuaDatPhong: (id, values) => {
    return fetcher.put(`dat-phong/${id}`, values);
  },

  deleteDatPhong: (id) => {
    return fetcher.delete(`dat-phong/${id}`);
  },

  postDatPhong: (values) => {
    return fetcher.post("dat-phong", values);
  },
};

export default datphongAPI;
