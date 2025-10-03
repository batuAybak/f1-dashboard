
import { getAllForumTopics, getForumTopicById, getPostsByTopicId, addPostToTopic, addForumTopic, deleteForumTopic, deleteForumPost } from '#db/queries/forum'
import requireUser from '#middleware/requireUser'
import express from 'express'
const forumRouter = express.Router()
export default forumRouter

/**
 * Forum API router for forum topic and post endpoints.
 * All routes require authentication.
 */


// All forum routes require user to be logged in
forumRouter.use(requireUser)


// GET /forum - List all forum topics
// POST /forum - Add a new forum topic
// DELETE /forum - Delete a forum topic (only by creator)
forumRouter.route('/')
    .get(async (req, res) => {
        const allForumTopics = await getAllForumTopics()
        res.send(allForumTopics)
    })
    .post(async (req, res) => {
        const { title, content } = req.body
        if (!title || !content) return res.status(400).send("Title and content are required")
        const newTopic = await addForumTopic(title, content, req.user.id)
        res.status(201).send(newTopic)
    })
    .delete(async (req, res) => {
        // Delete a forum topic. The topicId should be provided in the request body.
        // Only the user who created the topic can delete it.
        const { topicId } = req.body;
        const deleted = await deleteForumTopic(topicId, req.user.id);
        if (!deleted) return res.status(403).send("You are not allowed to delete this topic");
        res.status(204).send();
    });


// Param middleware: fetch forum topic by id
forumRouter.param("id", async (req, res, next, id) => {
    //Parameter validation
    const topic = await getForumTopicById(id);
    if (!topic) res.status(404).send("No forum topic found");
    req.topic = topic;
    next();
});


// GET /forum/:id - Get topic and its posts
// POST /forum/:id - Add a post to a topic
// DELETE /forum/:id - Delete a post from a topic (only by creator)
forumRouter.route('/:id')
    .get(async (req, res) => {
        const posts = await getPostsByTopicId(req.topic.id);
        res.send({ topic: req.topic, posts }); //Send both the forum topic and its posts
    })
    .post(async (req, res) => {
        const { content } = req.body;
        if (!content) return res.status(400).send("Content is required");
        const newPost = await addPostToTopic(req.topic.id, content, req.user.id);
        res.status(201).send(newPost);
    })
    .delete(async (req, res) => {
        // Delete a post from a topic. The postId should be provided in the request body.
        // Only the user who created the post can delete it.
        const { postId } = req.body;
        const deleted = await deleteForumPost(postId, req.topic.id, req.user.id);
        if (!deleted) return res.status(403).send("You are not allowed to delete this post");
        res.status(204).send();
    });


forumRouter.use(async (err, req, res, next) => {
    console.log(err); //Log error on console
    res.status(400).send(`Error on forumRouter: ${err}`); // log error on response
});
