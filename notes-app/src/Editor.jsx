import { useState } from "react";

export default function Editor({ initial, onSave, onCancel, label }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [body, setBody] = useState(initial?.body || "");
  const canSave = title.trim() || body.trim();

  const submit = (e) => {
    e.preventDefault();
    if (!canSave) return;
    onSave({ title: title.trim(), body: body.trim() });
    if (!initial) {
      setTitle("");
      setBody("");
    }
  };

  return (
    <form className={initial ? "editing" : ""} onSubmit={submit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Title"
      />
      <textarea
        placeholder="Write something…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        aria-label="Note"
      />
      <div className="row">
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="primary" disabled={!canSave}>
          {label}
        </button>
      </div>
    </form>
  );
}
