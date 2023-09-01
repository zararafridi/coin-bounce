import { useState } from "react";
import { submitBlog } from "../../api/internal";
import { useSelector } from "react-redux";
import styles from "./SubmitBlog.module.css";
import TextInput from "../../components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";

const SubmitBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const author = useSelector((state) => state.user._id);

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhoto(reader.result);
    };
  };

  const submitHandler = async () => {
    const data = {
      title,
      author,
      content,
      photo,
    };
    const response = await submitBlog(data);
    if (response.status === 201) {
      navigate("/");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Create a blog</div>
      <TextInput
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%" }}
      />
      <textarea
        className={styles.content}
        placeholder="your content goes here..."
        maxLength={400}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <div className={styles.photoPrompt}>
        <p>Choose a photo</p>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpg, img/jpeg, img/png"
          onChange={getPhoto}
        />
        {photo !== "" ? (
          <img alt="" src={photo} width={150} height={150} />
        ) : (
          photo === ""
        )}
      </div>
      <button
        disabled={title === "" || content === "" || photo === ""}
        className={styles.submit}
        onClick={submitHandler}
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitBlog;