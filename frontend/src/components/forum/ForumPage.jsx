import useQuery from "../../api/useQuery";
import { Link } from "react-router";
import AddForumTopic from "./AddForumTopic";

export default function ForumPage() {
  const {
    data: topics,
    loadingTopics,
    errorTopics,
  } = useQuery("/forum", "forumTopics");

  if (loadingTopics || !topics) return <p>Loading...</p>;
  if (errorTopics) return <p>Error! {errorTopics}</p>;

  return (
    <>
      <div className="forum-page">
        <h2 className="forum-header">ForumPage</h2>
        <ul className="forum-topics">
          {topics.map((topic) => (
            <Link to={`/forum/${topic.id}`} key={topic.id}>
              <li className="forum-topic">
                <h5 className="forum-topic-title">{topic.title}</h5>
                <p className="forum-topic-content">{topic.content}</p>
                <p className="forum-topic-user">
                  Posted by: {topic.first_name} {topic.last_name}
                </p>
                <p className="forum-topic-date">
                  Created at: {new Date(topic.created_at).toLocaleString()}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <AddForumTopic />
    </>
  );
}
