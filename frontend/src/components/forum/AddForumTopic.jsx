import useMutation from "../../api/useMutation";
import { useTheme } from "../ThemeContext";

export default function AddForumTopic() {
  const { theme, oppositeTheme } = useTheme();
  const {
    mutate: addTopic,
    error,
    loading,
  } = useMutation("POST", "/forum", ["forumTopics"]);
  if (loading) return <p>Submitting topic...</p>;
  if (error) return <p>Error submitting topic: {error}</p>;

  const addNewTopic = (formData) => {
    const title = formData.get("title"); //Get the title from form submission
    const content = formData.get("content"); //Get the content from form submission
    addTopic({ title, content }); // Pass title and content as obj
  };

  return (
    <div className="add-forum-topic">
      <h4>Add New Topic</h4>
      <form action={addNewTopic} className="new-topic-form">
        <div className="form-group">
          <textarea
            name="title"
            className="form-control"
            placeholder="Enter title"
            data-bs-theme={theme}
            required
          />
        </div>
        <div className="form-group">
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
