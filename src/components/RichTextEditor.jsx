import React, { useRef, useState } from "react";
import {
  FiBold,
  FiItalic,
  FiList,
  FiAlignLeft,
} from "react-icons/fi";

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [active, setActive] = useState({});

  const exec = (command) => {
    editorRef.current.focus();
    document.execCommand(command, false, null);
    handleActive();
  };

  const handleActive = () => {
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      ul: document.queryCommandState("insertUnorderedList"),
    });
  };

  const handleInput = () => {
    onChange && onChange(editorRef.current.innerHTML);
    handleActive();
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white border-[#E5E7EB]">
      {/* ===== Toolbar ===== */}
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-[#F9FAFB] border-[#E5E7EB]">
        <button
          onClick={() => exec("bold")}
          className={`p-2 rounded text-[#4A5565] ${
            active.bold ? "bg-[#E5E7EB]" : ""
          }`}
        >
          <FiBold />
        </button>

        <button
          onClick={() => exec("italic")}
          className={`p-2 rounded text-[#4A5565] ${
            active.italic ? "bg-[#E5E7EB]" : ""
          }`}
        >
          <FiItalic />
        </button>

        <button
          onClick={() => exec("insertUnorderedList")}
          className={`p-2 rounded text-[#4A5565] ${
            active.ul ? "bg-[#E5E7EB]" : ""
          }`}
        >
          <FiList />
        </button>

        <button
          onClick={() => exec("justifyLeft")}
          className="p-2 rounded text-[#4A5565]"
        >
          <FiAlignLeft />
        </button>
      </div>

      {/* ===== Editor ===== */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={handleActive}
        className="min-h-[220px] p-4 outline-none text-[#374151] bg-[#F3F3F5]"
        placeholder="Enter module details, instructions, and procedures here..."
        suppressContentEditableWarning
      />

      {/* ===== Helper text ===== */}
      
    </div>
  );
};

export default RichTextEditor;
