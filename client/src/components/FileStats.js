import React from "react";

export default function FileStats({
  name,
  size,
  type,
  onUploadAnother = f => f
}) {
  return (
    <div>
      <p>
        <b>name</b>: {name}
      </p>
      <p>
        <b>type</b>: {type}
      </p>
      <p>
        <b>size</b>: {size} bytes
      </p>
      <button onClick={onUploadAnother}>Upload Another File</button>
    </div>
  );
}
