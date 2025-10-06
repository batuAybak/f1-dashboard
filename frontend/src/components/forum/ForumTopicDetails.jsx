import { useNavigate, useParams } from "react-router";
import useQuery from "../../api/useQuery";
import AddForumPost from "./AddForumPost";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../../auth/AuthContext";
import useMutation from "../../api/useMutation";

/**
 * ForumTopicDetails displays a single forum topic and its posts.
 * Allows users to delete their own posts and add new posts.
 */
export default function ForumTopicDetails() {
  const { id } = useParams(); // id will be the topic.id from the URL
  const { userId } = useAuth(); // Get the current user's ID
  const { theme, oppositeTheme } = useTheme();
  const navigate = useNavigate();

  // Fetch topic and posts for this topic
  const {
    data: topicData,
    loadingTopic,
    errorTopic,
  } = useQuery(`/forum/${id}`, "forumTopicDetails");

  // Mutation hook for deleting a post within the topic using topic id
  const { mutate: deletePost } = useMutation("DELETE", `/forum/${id}`, [
    "forumTopicDetails",
  ]);

  // Mutation hook for deleting a topic
  const { mutate: deleteTopic } = useMutation("DELETE", `/forum`, [
    "forumTopics",
  ]);

  if (loadingTopic || !topicData) return <p>Loading...</p>;
  if (errorTopic) return <p>Error! {errorTopic}</p>;

  const { topic, posts } = topicData;

  return (
    <>
      {/* Back button to forum topics list */}
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
          {userId == topic.user_id && (
            <button
              className="btn btn-outline-danger"
              onClick={(e) => {
                e.preventDefault();
                deleteTopic({ topicId: topic.id });
                navigate("/forum");
              }}
            >
              Delete Topic
            </button>
          )}
        </ul>
      </div>

      {/* Posts in the Topic */}
      <div className="forum-posts">
        <h4>Posts</h4>
        <ul className="list-group posts-list" data-bs-theme={theme}>
          {/* List all posts for this topic */}
          {posts.length === 0 ? (
            <p>There are no posts yet. Be the first to comment!</p>
          ) : (
            posts.map((post) => (
              <li key={post.id} className="list-group-item post-list-item">
                <p>
                  <strong>
                    {post.first_name} {post.last_name}
                  </strong>
                  : {post.content}
                </p>
                <p>({new Date(post.created_at).toLocaleString()})</p>
                {/* Show delete button if user owns the post */}
                {userId == post.user_id && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      deletePost({ postId: post.id });
                    }}
                  >
                    Delete Post
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Form to add a new post to this topic */}
      <AddForumPost topicId={id} />
    </>
  );
}
