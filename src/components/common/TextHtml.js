import React from "react";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextHtml = ({ value, onTextChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onInit={editor => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={onTextChange}
      // onChange={(event, editor) => {
      //   const data = editor.getData();
      //   console.log({ event, editor, data });
      // }}
      onBlur={editor => {
        console.log("Blur.", editor);
      }}
      onFocus={editor => {
        console.log("Focus.", editor);
      }}
    />
  );
};

TextHtml.propTypes = {
  onTextChange: PropTypes.func.isRequired
};

export default TextHtml;
