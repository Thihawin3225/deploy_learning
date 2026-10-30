import { useEffect, useState } from "react";
import type { note } from "../types/note";
import {
  createNote,
  deleteNote,
  fetchNote,
  updateData,
} from "../services/note";

const Note = () => {
  const [notes, setNote] = useState<note[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [refresh, setRefresh] = useState(true);
  const [editState, setEditState] = useState(false);
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    const getDataFromApi = async () => {
      const data = await fetchNote();
      setNote(data);
    };
    getDataFromApi();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setRefresh(!refresh);
    } catch {
      throw new Error("Error is comming Now in Delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (msg.trim() === "") {
        return;
      }
      if (!editState) {
        await createNote(msg);
      } else {
        await updateData(msg, updateId);
      }
      setEditState(false);
      setRefresh(!refresh);
      setMsg("");
    } catch (error) {
      throw new Error("Fail to fetch create Data");
    }
  };
  return (
    <div>
      <div>
        {notes.map((note, index) => {
          return (
            <div key={index++}>
              <p>{note.title}</p>
              <button
                type="button"
                onClick={() => {
                  setUpdateId(note._id);
                  setMsg(note.title);
                  setEditState(true);
                }}
              >
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(note._id)}>
                delete
              </button>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          placeholder="Enter your note"
        />
        <button type="submit">{editState ? "update" : "create"}</button>
      </form>
    </div>
  );
};

export default Note;
