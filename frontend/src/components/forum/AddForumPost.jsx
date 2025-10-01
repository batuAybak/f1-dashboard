import useMutation from "../../api/useMutation";
import { useTheme } from "../ThemeContext";

export default function AddForumPost({ topicId }) {
  const { theme, oppositeTheme } = useTheme();

  const {
    mutate: addPost,
    error,
    loading,
  } = useMutation("POST", `/forum/${topicId}`, ["forumTopicDetails"]);
  if (loading) return <p>Submitting post...</p>;
  if (error) return <p>Error submitting post: {error}</p>;

  const addNewPost = (formData) => {
    const content = formData.get("content"); //Get the content from form submission
    addPost({ content }); // Pass content as obj
  };

  return (
    <div className="add-forum-post">
      <h4>Add a New Post</h4>
      <form action={addNewPost}>
        <div className="form-group">
          <textarea
            name="content"
            className="form-control"
            placeholder="Write your post here..."
            data-bs-theme={theme}
            required
          />
        </div>
        <br />
        <button className={`btn btn-${oppositeTheme}`}>Submit</button>
      </form>
    </div>
  );
}
