import useMutation from "../../api/useMutation";
import { useTheme } from "../ThemeContext";

/**
 * AddForumTopic provides a form to add a new forum topic.
 * Submits the topic title and content using a mutation hook.
 */
export default function AddForumTopic() {
  const { theme, oppositeTheme } = useTheme();
  // Mutation hook for adding a topic
  const {
    mutate: addTopic,
    error,
    loading,
  } = useMutation("POST", "/forum", ["forumTopics"]);
  if (loading) return <p>Submitting topic...</p>;
  if (error) return <p>Error submitting topic: {error}</p>;

  /**
   * Handles form submission for a new topic.
   */
  const addNewTopic = (formData) => {
    const title = formData.get("title");
    const content = formData.get("content");
    addTopic({ title, content });
  };

  return (
    <div className="add-forum-topic">
      <h4>Add New Topic</h4>
      <form action={addNewTopic} className="new-topic-form">
        <div className="form-group">
          {/* Topic title textarea */}
          <textarea
            name="title"
            className="form-control"
            placeholder="Enter title"
            data-bs-theme={theme}
            required
          />
        </div>
        <div className="form-group">
          {/* Topic content textarea */}
          <textarea
            name="content"
            className="form-control"
            placeholder="Enter content"
            data-bs-theme={theme}
            required
          />
        </div>
        <button className={`btn btn-${oppositeTheme}`}>Add Forum Topic</button>
        {error && <output>{error}</output>}
      </form>
    </div>
  );
}
