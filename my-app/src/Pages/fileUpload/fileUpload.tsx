import React, { useState } from "react";
import styles from "./fileUpload.module.css";
import { uploadImage } from "../../Services/uploadFile";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile || selectedFile.type !== "image/png") return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      await uploadImage(file);
    //   alert("Upload successful");
    } catch {
    //   alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className={styles.fileUploadContainer}>
      <h2>File Upload</h2>

      <input
        className={styles.fileUploadInput}
        type="file"
        accept="image/png"
        onChange={handleFileChange}
      />

      {preview && (
        <div className={styles.previewContainer}>
          <img src={preview} alt="Preview" className={styles.previewImage} />
        </div>
      )}

      <div className={styles["upload-btn-cnt"]}>
        <button
          className={styles["upload-btn"]}
          type="button"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};


export default FileUpload;
