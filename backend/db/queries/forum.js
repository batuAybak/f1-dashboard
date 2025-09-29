import db from "#db/client";

export async function getAllForumTopics() {
    const SQL = `
    SELECT forum_topics.*, users.first_name, users.last_name
    FROM forum_topics
    JOIN users ON forum_topics.user_id = users.id
    `
    const { rows } = await db.query(SQL)
    return rows
}

export async function getForumTopicById(id) {
    const SQL = `
    SELECT forum_topics.*, users.first_name, users.last_name
    FROM forum_topics
    JOIN users ON forum_topics.user_id = users.id
    WHERE forum_topics.id = $1
    ORDER BY created_at ASC
    `
    const { rows } = await db.query(SQL, [id])
    return rows[0]
}

export async function getPostsByTopicId(id) {
    const SQL = `
    SELECT forum_posts.*, users.first_name, users.last_name
    FROM forum_posts
    JOIN users ON forum_posts.user_id = users.id
    WHERE forum_posts.topic_id = $1
    ORDER BY created_at ASC
    `
    const { rows } = await db.query(SQL, [id])
    return rows
}

export async function addForumTopic(title, content, userId) {
    const SQL = `
    INSERT INTO forum_topics (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    const { rows } = await db.query(SQL, [title, content, userId])
    return rows[0]
}

export async function addPostToTopic(topicId, content, userId) {
    const SQL = `
    INSERT INTO forum_posts (topic_id, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    const { rows } = await db.query(SQL, [topicId, content, userId])
    return rows[0]
}
