import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";
import nguoidungAPI from "../services/nguoidungAPI";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  avatar: JSON.parse(localStorage.getItem("avatar")) || null,
  userLists: null,
  page: null,
  loading: false,
  error: null,
  updateError: null,
  isUpdateFulfilled: false,
  avatarError: null,
  isAvatarFulfilled: false,
  isDelete: false,
  isAdd: false,
  addError: null,
  count: 0,
};

// signin action
export const signin = createAsyncThunk("auth/signin", async (values) => {
  try {
    const data = await authAPI.signin(values);
    if (data.user.role === "ADMIN") {
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } else {
      alert("Không có thẩm quyền");
    }
  } catch (error) {
    throw error;
  }
});

// update avatar action
export const updateAvatar = createAsyncThunk("users/avatar", async (values) => {
  try {
    await nguoidungAPI.postDoiAvatar(values);
  } catch (error) {
    throw error;
  }
});

// update info action
export const update = createAsyncThunk("users", async (values) => {
  try {
    await nguoidungAPI.putChinhSuaThongTin(values.id, values);
  } catch (error) {
    throw error;
  }
});

//get user list by pageIndex action
export const userListByPageIndex = createAsyncThunk(
  "users/listbypage",
  async (values) => {
    try {
      const data = await nguoidungAPI.getDanhSachNguoiDungPhanTrang(
        values[0],
        values[1]
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// delete user action
export const deleteUser = createAsyncThunk("users/delete", async (value) => {
  try {
    await nguoidungAPI.deleteNguoiDung(value);
  } catch (error) {
    throw error;
  }
});

// add admin action
export const addAdmin = createAsyncThunk("users/add", async (values) => {
  try {
    await nguoidungAPI.postThemAdmin(values);
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user");
      return { ...state, user: null };
    },

    resetIsUpdate: (state, action) => {
      return { ...state, isUpdateFulfilled: false };
    },

    resetIsAvatar: (state, action) => {
      return { ...state, isAvatarFulfilled: false };
    },

    resetIsDelete: (state, action) => {
      return { ...state, isDelete: false };
    },

    resetIsAdd: (state, action) => {
      return { ...state, isAdd: false };
    },

    increaseCount: (state, action) => {
      return { ...state, count: state.count + 1 };
    },
  },
  extraReducers: (builder) => {
    //Signin
    builder.addCase(signin.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(signin.fulfilled, (state, action) => {
      return { ...state, loading: false, user: action.payload };
    });

    builder.addCase(signin.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });

    //Update
    builder.addCase(update.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(update.fulfilled, (state, action) => {
      return { ...state, loading: false, isUpdateFulfilled: true };
    });

    builder.addCase(update.rejected, (state, action) => {
      return { ...state, loading: false, updateError: action.error.message };
    });

    //Update avatar
    builder.addCase(updateAvatar.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      return { ...state, loading: false, isAvatarFulfilled: true };
    });

    builder.addCase(updateAvatar.rejected, (state, action) => {
      return { ...state, loading: false, avatarError: action.error.message };
    });

    //Delete user
    builder.addCase(deleteUser.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      return { ...state, loading: false, isDelete: true };
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Get User List By Page Index
    builder.addCase(userListByPageIndex.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(userListByPageIndex.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        userLists: action.payload.data,
        page: Math.ceil(action.payload.totalRow / 8),
      };
    });

    builder.addCase(userListByPageIndex.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Add admin
    builder.addCase(addAdmin.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(addAdmin.fulfilled, (state, action) => {
      return { ...state, loading: false, isAdd: true };
    });

    builder.addCase(addAdmin.rejected, (state, action) => {
      return { ...state, loading: false, addError: action.error.message };
    });
  },
});

export const {
  logout,
  resetIsAvatar,
  resetIsUpdate,
  increaseCount,
  resetIsDelete,
  resetIsAdd,
} = authSlice.actions;

export default authSlice.reducer;
