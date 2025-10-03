import useMutation from "../../api/useMutation";
import { useTheme } from "../ThemeContext";

/**
 * AddForumPost provides a form to add a new post to a forum topic.
 * Submits the post content using a mutation hook.
 */
export default function AddForumPost({ topicId }) {
  const { theme, oppositeTheme } = useTheme();

  // Mutation hook for adding a post
  const {
    mutate: addPost,
    error,
    loading,
  } = useMutation("POST", `/forum/${topicId}`, ["forumTopicDetails"]);
  if (loading) return <p>Submitting post...</p>;
  if (error) return <p>Error submitting post: {error}</p>;

  /**
   * Handles form submission for a new post.
   */
  const addNewPost = (formData) => {
    const content = formData.get("content");
    addPost({ content });
  };

  return (
    <div className="add-forum-post">
      <h4>Add a New Post</h4>
      <form action={addNewPost}>
        <div className="form-group">
          {/* Post content textarea */}
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
