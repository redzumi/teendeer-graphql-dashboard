import { Note } from "./notesSlice";

export function createNoteOnServer(note: Note) {
  return new Promise<{ data: Note }>((resolve, reject) =>
    setTimeout(() => resolve({ data: note }), 1000)
    // setTimeout(() => reject({ data: note }), 1000)
  );
}
