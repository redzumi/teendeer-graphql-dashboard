import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../tools/store";
import { createNoteOnServer } from "./notesApi";

export type Note = {
  _id: string;
  title: string;
  body: string;
};

export interface NotesState {
  list: Note[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: NotesState = {
  list: [],
  status: 'idle'
}

export const createNote = createAsyncThunk('notes/createNote', async (note: Note) => {
  const response = await createNoteOnServer(note);
  return response.data;
});

const isRejectedAction = (action: AnyAction) => {
  return action.type.endsWith("/rejected");
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    add: (state: NotesState, action: PayloadAction<Note>) => {
      state.list.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list.push(action.payload);
      })
      // looks like middleware?
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
      })
  }
});

export const { add } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.list;
export const selectNotesStatus = (state: RootState) => state.notes.status;

export const createNoteAndAdd = (note: Note): AppThunk => async (dispatch, getState) => {
  const { payload } = await dispatch(createNote(note));
  console.log(`Created note: ${JSON.stringify(payload)}`);
  dispatch(add(payload as Note));
}

export default notesSlice.reducer;