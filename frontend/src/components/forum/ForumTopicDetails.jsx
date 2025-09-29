import { useParams } from "react-router";
import useQuery from "../../api/useQuery";
import AddForumPost from "./AddForumPost";

export default function ForumTopicDetails() {
  const { id } = useParams(); // id will be the topic.id from the URL
  const {
    data: topicData,
    loadingTopic,
    errorTopic,
  } = useQuery(`/forum/${id}`, "forumTopicDetails");

  if (loadingTopic || !topicData) return <p>Loading...</p>;
  if (errorTopic) return <p>Error! {errorTopic}</p>;

  const { topic, posts } = topicData;

  return (
    <>
      <br />
      <button onClick={() => window.history.back()}>Back</button>

      {/* Forum Topic Details */}
      <section className="forum-topic">
        <h2>{topic.title}</h2>
        <p>{topic.content}</p>
        <p>
          <strong>Created by:</strong> {topic.first_name} {topic.last_name}
        </p>
        <p>
          <strong>Created at:</strong>{" "}
          {new Date(topic.created_at).toLocaleString()}
        </p>
      </section>

      {/* Posts in the Topic */}
      <section className="forum-posts">
        <h3>Posts:</h3>
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-list-item">
              <p>
                <strong>
                  {post.first_name} {post.last_name}
                </strong>
                : {post.content}
              </p>
              <p>({new Date(post.created_at).toLocaleString()})</p>
            </li>
          ))}
        </ul>
      </section>

      <AddForumPost topicId={id} />
    </>
  );
}
