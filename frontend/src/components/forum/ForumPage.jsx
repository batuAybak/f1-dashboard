import useQuery from "../../api/useQuery";
import { Link } from "react-router";
import AddForumTopic from "./AddForumTopic";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../../auth/AuthContext"; // or your context path
import useMutation from "../../api/useMutation";

export default function ForumPage() {
  const { theme } = useTheme();
  const { userId } = useAuth();

  const {
    data: topics,
    loadingTopics,
    errorTopics,
  } = useQuery("/forum", "forumTopics");

  const { mutate: deleteTopic } = useMutation("DELETE", `/forum`, [
    "forumTopics",
  ]);

  if (loadingTopics || !topics) return <p>Loading...</p>;
  if (errorTopics) return <p>Error! {errorTopics}</p>;

  // const currentUserId = 3;

  return (
    <div className="forum-page">
      <h2 className="forum-header">Forum</h2>
      <div className="forum-topics">
        <h4>Forum Topics</h4>
        <ul className="list-group" data-bs-theme={theme}>
          {topics.map((topic) => (
            <>
              <Link
                className="list-group-item list-group-item-action"
                to={`/forum/${topic.id}`}
                key={topic.id}
              >
                <h5 className="forum-topic-title">{topic.title}</h5>
                <p className="forum-topic-content">{topic.content}</p>
                <p className="forum-topic-user">
                  <strong>Created by:</strong> {topic.first_name}{" "}
                  {topic.last_name}
                  {", "}
                  <strong>Created at:</strong>{" "}
                  {new Date(topic.created_at).toLocaleString()}
                </p>
                {userId == topic.user_id && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteTopic({ topicId: topic.id })}
                  >
                    Delete
                  </button>
                )}
              </Link>
            </>
          ))}
        </ul>
      </div>
      <AddForumTopic />
    </div>
  );
}
