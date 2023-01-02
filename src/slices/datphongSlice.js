import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import datphongAPI from "../services/datphongAPI";
import phongAPI from "../services/phongAPI";


const initialState = {
  bookingLists: null,
  searchLists: null,
  maxGuest: null,
  loading: false,
  isGetList: false,
  error: null,
  isUpdate: false,
  updateError: null,
  isDelete: false,
  isAdd: false,
  addError: null,
  count: 0,
};

//get booking list action
export const bookingList = createAsyncThunk("dat-phong/list", async () => {
  try {
    const data = await datphongAPI.getDanhSachDatPhong();
    return data;
  } catch (error) {
    throw error;
  }
});

//put update room
export const updateBooking = createAsyncThunk(
  "dat-phong/update",
  async (values) => {
    try {
      await datphongAPI.putChinhSuaDatPhong(values[0], values[1]);
    } catch (error) {
      throw error;
    }
  }
);

//get info room by id
export const getRoom = createAsyncThunk("phong-thue/info-id", async (id) => {
  try {
    const data = await phongAPI.getPhongTheoId(id);
    return data;
  } catch (error) {
    throw error;
  }
});

//delete booking
export const deleteBooking = createAsyncThunk(
  "dat-phong/delete",
  async (id) => {
    try {
      await datphongAPI.deleteDatPhong(id);
    } catch (error) {
      throw error;
    }
  }
);

//add booking
export const addBooking = createAsyncThunk("dat-phong/ad", async (values) => {
  try {
    await datphongAPI.postDatPhong(values);
  } catch (error) {
    throw error;
  }
});

const datphongSlice = createSlice({
  name: "datphong",
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      return { ...state, count: state.count + 1 };
    },

    search: (state, action) => {
      return { ...state, searchLists: action.payload };
    },

    resetSearch: (state, action) => {
      return { ...state, searchLists: null };
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

    resetIsGetList: (state, action) => {
      return { ...state, isGetList: false };
    },
  },
  extraReducers: (builder) => {
    //Get Booking List
    builder.addCase(bookingList.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(bookingList.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        bookingLists: action.payload,
        isGetList: true,
      };
    });

    builder.addCase(bookingList.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Put Update Booking
    builder.addCase(updateBooking.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(updateBooking.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    });

    builder.addCase(updateBooking.rejected, (state, action) => {
      return { ...state, loading: false, updateError: action.error.message };
    });

    //Get Room by Id
    builder.addCase(getRoom.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(getRoom.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        maxGuest: action.payload.khach,
      };
    });

    builder.addCase(getRoom.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Delete Booking
    builder.addCase(deleteBooking.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDelete: true,
      };
    });

    builder.addCase(deleteBooking.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Add Booking
    builder.addCase(addBooking.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(addBooking.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAdd: true,
      };
    });

    builder.addCase(addBooking.rejected, (state, action) => {
      return { ...state, loading: false, addError: action.error.message };
    });
  },
});

export const {
  increaseCount,
  resetIsUpdate,
  resetIsDelete,
  resetIsAdd,
  search,
  resetSearch,
  resetIsGetList,
} = datphongSlice.actions;

export default datphongSlice.reducer;
