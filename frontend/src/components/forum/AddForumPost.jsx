import useMutation from "../../api/useMutation";

export default function AddForumPost({ topicId }) {
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
    <>
      <h3>Add a New Post</h3>
      <form action={addNewPost}>
        <textarea
          name="content"
          placeholder="Write your post here..."
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
