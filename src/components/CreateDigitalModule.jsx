import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

const CreateDigitalModule = ({ value, onChange }) => {
  return (
    <div>
      <RichTextEditor value={value} onChange={onChange} />
    </div>
  );
};

export default CreateDigitalModule;