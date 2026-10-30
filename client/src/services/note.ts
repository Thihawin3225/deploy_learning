import type { note } from "../types/note";

let VITE_API_URL = "";

if (import.meta.env.VITE_ENV === "development") {
  VITE_API_URL = import.meta.env.VITE_API_LOCAL_URL;
}

if (import.meta.env.VITE_ENV === "production") {
  VITE_API_URL = import.meta.env.VITE_API_URL;
}
// VITE_API_URL = "https://deploy-learning-aazv.onrender.com";
console.log(VITE_API_URL);

export const createNote = async (title: string) => {
  await fetch(`${VITE_API_URL}/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

export const fetchNote = async (): Promise<note[]> => {
  const response = await fetch(`${VITE_API_URL}/read`);
  const data = await response.json();
  return data.note;
};

export const updateData = async (title: string, id: string) => {
  await fetch(`${VITE_API_URL}/update/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

export const deleteNote = async (id: string) => {
  console.log(`${VITE_API_URL}/delete/${id}`);
  try {
    await fetch(`${VITE_API_URL}/delete/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error("Fail to fetch Delete data");
  }
};
