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
        <h1 className="forum-header">ForumPage</h1>
        <ul className="forum-topics">
          {topics.map((topic) => (
            <Link to={`/forum/${topic.id}`} key={topic.id}>
              <li className="forum-topic">
                <h3 className="forum-topic-title">{topic.title}</h3>
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
