import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import phongAPI from "../services/phongAPI";

const initialState = {
  roomLists: null,
  page: null,
  loading: false,
  error: null,
  isUpdate: false,
  updateError: null,
  isDelete: false,
  isAdd: false,
  addError: null,
  isUpload: false,
  uploadError: null,
  count: 0,
};

//get room list by pageIndex action
export const roomByPageIndex = createAsyncThunk(
  "phong-thue/listbypage",
  async (values) => {
    try {
      const data = await phongAPI.getDanhSachPhongPhanTrang(
        values[0],
        values[1]
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

//put update room
export const updateRoom = createAsyncThunk(
  "phong-thue/update",
  async (values) => {
    try {
      await phongAPI.putChinhSuaPhong(values[0], values[1]);
    } catch (error) {
      throw error;
    }
  }
);

//delete room
export const deleteRoom = createAsyncThunk("phong-thue/delete", async (id) => {
  try {
    await phongAPI.deletePhong(id);
  } catch (error) {
    throw error;
  }
});

//add room
export const addRoom = createAsyncThunk("phong-thue/add", async (values) => {
  try {
    await phongAPI.postThemPhong(values);
  } catch (error) {
    throw error;
  }
});

//Upload image
export const uploadImage = createAsyncThunk(
  "phong-thue/upload",
  async (values) => {
    try {
      await phongAPI.postUploadHinhPhong(values[0], values[1]);
    } catch (error) {
      throw error;
    }
  }
);

const phongSlice = createSlice({
  name: "phong",
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      return { ...state, count: state.count + 1 };
    },

    resetIsUpdate: (state, action) => {
      return { ...state, isUpdate: false };
    },

    resetIsDelete: (state, action) => {
      return { ...state, isDelete: false };
    },

    resetIsAdd: (state, action) => {
      return { ...state, isAdd: false };
    },

    resetIsUpload: (state, action) => {
      return { ...state, isUpload: false };
    },
  },
  extraReducers: (builder) => {
    //Get Room By Page Index
    builder.addCase(roomByPageIndex.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(roomByPageIndex.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        roomLists: action.payload.data,
        page: Math.ceil(action.payload.totalRow / 6),
      };
    });

    builder.addCase(roomByPageIndex.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Put Update Room
    builder.addCase(updateRoom.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(updateRoom.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    });

    builder.addCase(updateRoom.rejected, (state, action) => {
      return { ...state, loading: false, updateError: action.error.message };
    });

    //Delete Room
    builder.addCase(deleteRoom.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDelete: true,
      };
    });

    builder.addCase(deleteRoom.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Add Room
    builder.addCase(addRoom.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(addRoom.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAdd: true,
      };
    });

    builder.addCase(addRoom.rejected, (state, action) => {
      return { ...state, loading: false, addError: action.error.message };
    });

    //Upload Image
    builder.addCase(uploadImage.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(uploadImage.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isUpload: true,
      };
    });

    builder.addCase(uploadImage.rejected, (state, action) => {
      return { ...state, loading: false, uploadError: action.error.message };
    });
  },
});

export const {
  increaseCount,
  resetIsUpdate,
  resetIsDelete,
  resetIsAdd,
  resetIsUpload,
} = phongSlice.actions;

export default phongSlice.reducer;
