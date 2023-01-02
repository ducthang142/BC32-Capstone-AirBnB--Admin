import fetcher from "./fetcher";

const authAPI = {
  signin: (values) => {
    return fetcher.post("auth/signin", values);
  },
};

export default authAPI;