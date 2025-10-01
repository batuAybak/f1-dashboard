import { useParams } from "react-router";
import useQuery from "../../api/useQuery";
import AddForumPost from "./AddForumPost";
import { useTheme } from "../ThemeContext";

export default function ForumTopicDetails() {
  const { id } = useParams(); // id will be the topic.id from the URL
  const { theme, oppositeTheme } = useTheme();
  const {
    data: topicData,
    loadingTopic,
    errorTopic,
  } = useQuery(`/forum/${id}`, "forumTopicDetails");

  if (loadingTopic || !topicData) return <p>Loading...</p>;
  if (errorTopic) return <p>Error! {errorTopic}</p>;

  const { topic, posts } = topicData;

  //TODO add an option to delete a post if it's the user's own post

  return (
    <>
      <button
        className={`btn btn-${oppositeTheme} back-button`}
        onClick={() => window.history.back()}
      >
        Back to Topics
      </button>

      {/* Forum Topic Details */}
      <div className="forum-topic">
        <h4>Forum Topic</h4>
        <ul className="list-group" data-bs-theme={theme}>
          <li className="list-group-item">
            <h4>{topic.title}</h4>
            <p>{topic.content}</p>
            <strong>Created by:</strong> {topic.first_name} {topic.last_name}
            {", "}
            <strong>Created at:</strong>{" "}
            {new Date(topic.created_at).toLocaleString()}
          </li>
        </ul>
      </div>

      {/* Posts in the Topic */}
      <div className="forum-posts">
        <h4>Posts</h4>
        <ul className="list-group posts-list" data-bs-theme={theme}>
          {posts.map((post) => (
            <li key={post.id} className="list-group-item post-list-item">
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
      </div>

      <AddForumPost topicId={id} />
    </>
  );
}
