import useMutation from "../../api/useMutation";

export default function AddForumTopic() {
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
    <form action={addNewTopic}>
      <h3>Add New Topic</h3>
      <input type="text" name="title" placeholder="Title" required />
      <br />
      <textarea name="content" placeholder="Content" required />
      <br />
      <button type="submit">Add Topic</button>
    </form>
  );
}
