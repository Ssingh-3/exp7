import { useState, useEffect } from "react";
import Editor from "./Editor.jsx";

const KEY = "minimal-notes";

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(data)) return data;
  } catch (e) {}
  return [
    {
      id: 1,
      title: "Welcome",
      body: "Add a note above. Click Edit to change it, or Delete to remove it.",
      updated: Date.now(),
    },
  ];
}

const fmt = (t) =>
  new Date(t).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function App() {
  const [notes, setNotes] = useState(load);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(notes));
    } catch (e) {}
  }, [notes]);

  const add = (n) =>
    setNotes([{ id: Date.now(), ...n, updated: Date.now() }, ...notes]);

  const update = (id, n) => {
    setNotes(notes.map((x) => (x.id === id ? { ...x, ...n, updated: Date.now() } : x)));
    setEditId(null);
  };

  const remove = (id) => setNotes(notes.filter((x) => x.id !== id));

  return (
    <div className="wrap">
      <header>
        <h1>Notes</h1>
        <span className="count">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </header>

      <Editor onSave={add} label="Add note" />

      {notes.length === 0 && (
        <div className="empty">No notes yet. Write your first one above.</div>
      )}

      {notes.map((n) => (
        <div className="note" key={n.id}>
          {editId === n.id ? (
            <Editor
              initial={n}
              label="Save changes"
              onSave={(d) => update(n.id, d)}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <>
              {n.title && <h2>{n.title}</h2>}
              {n.body && <p>{n.body}</p>}
              <div className="meta">
                <span>{fmt(n.updated)}</span>
                <span className="sp" />
                <button className="link" onClick={() => setEditId(n.id)}>
                  Edit
                </button>
                <button className="link del" onClick={() => remove(n.id)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
