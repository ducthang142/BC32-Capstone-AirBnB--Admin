import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vitriAPI from "../services/vitriAPI";

const initialState = {
  locationLists: null,
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

//get user list by pageIndex action
export const locationByPageIndex = createAsyncThunk(
  "vi-tri/listbypage",
  async (values) => {
    try {
      const data = await vitriAPI.getDanhSachViTriPhanTrang(
        values[0],
        values[1]
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

//put update location
export const updateLocation = createAsyncThunk(
  "vi-tri/update",
  async (values) => {
    try {
      await vitriAPI.putChinhSuaViTri(values[0], values[1]);
    } catch (error) {
      throw error;
    }
  }
);

//delete location
export const deleteLocation = createAsyncThunk("vi-tri/delete", async (id) => {
  try {
    await vitriAPI.deleteViTri(id);
  } catch (error) {
    throw error;
  }
});

//add location
export const addLocation = createAsyncThunk("vi-tri/add", async (values) => {
  try {
    await vitriAPI.postThemViTri(values);
  } catch (error) {
    throw error;
  }
});

//Upload image
export const uploadImage = createAsyncThunk("vi-tri/upload", async (values) => {
  try {
    await vitriAPI.postSuaAnhViTri(values[0], values[1]);
  } catch (error) {
    throw error;
  }
});

const vitriSlice = createSlice({
  name: "vitri",
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
    //Get Location By Page Index
    builder.addCase(locationByPageIndex.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(locationByPageIndex.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        locationLists: action.payload.data,
        page: Math.ceil(action.payload.totalRow / 3),
      };
    });

    builder.addCase(locationByPageIndex.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Put Update Location
    builder.addCase(updateLocation.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(updateLocation.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    });

    builder.addCase(updateLocation.rejected, (state, action) => {
      return { ...state, loading: false, updateError: action.error.message };
    });

    //Delete Location
    builder.addCase(deleteLocation.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(deleteLocation.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDelete: true,
      };
    });

    builder.addCase(deleteLocation.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Add Location
    builder.addCase(addLocation.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(addLocation.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAdd: true,
      };
    });

    builder.addCase(addLocation.rejected, (state, action) => {
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

export const { increaseCount, resetIsUpdate, resetIsDelete, resetIsAdd, resetIsUpload } =
  vitriSlice.actions;

export default vitriSlice.reducer;
