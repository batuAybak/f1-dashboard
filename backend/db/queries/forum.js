
import db from "#db/client";

/**
 * Get all forum topics, including the creator's first and last name.
 */
export async function getAllForumTopics() {
    const SQL = `
    SELECT forum_topics.*, users.first_name, users.last_name
    FROM forum_topics
    JOIN users ON forum_topics.user_id = users.id
    `
    const { rows } = await db.query(SQL)
    return rows
}

/**
 * Get a single forum topic by id, including the creator's name.
 */
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

/**
 * Get all posts for a given topic, including each poster's name.
 */
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

/**
 * Add a new forum topic.
 */
export async function addForumTopic(title, content, userId) {
    const SQL = `
    INSERT INTO forum_topics (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    const { rows } = await db.query(SQL, [title, content, userId])
    return rows[0]
}

/**
 * Add a new post to a forum topic.
 */
export async function addPostToTopic(topicId, content, userId) {
    const SQL = `
    INSERT INTO forum_posts (topic_id, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    const { rows } = await db.query(SQL, [topicId, content, userId])
    return rows[0]
}

/**
 * Delete a forum topic.
 */
export async function deleteForumTopic(topicId, userId) {
    // Only allow deletion if the topic belongs to the user
    const SQL = `
    DELETE FROM forum_topics
    WHERE id = $1 AND user_id = $2
    RETURNING *
    `
    const { rows } = await db.query(SQL, [topicId, userId])
    return rows.length > 0 // Return true if a row was deleted, false otherwise
}

/**
 * Delete a post from a forum topic.
 */
export async function deleteForumPost(postId, topicId, userId) {
    // Only allow deletion if the post belongs to the user
    const SQL = `
    DELETE FROM forum_posts
    WHERE id = $1 AND topic_id = $2 AND user_id = $3
    RETURNING *
    `
    const { rows } = await db.query(SQL, [postId, topicId, userId])
    return rows.length > 0 // Return true if a row was deleted, false otherwise
}
