import { getAllForumTopics, getForumTopicById, getPostsByTopicId, addPostToTopic, addForumTopic } from '#db/queries/forum'
import requireUser from '#middleware/requireUser'
import express from 'express'
const forumRouter = express.Router()
export default forumRouter

forumRouter.use(requireUser) //All forum routes require user to be logged in

forumRouter.route('/') //Forum page: list of topics
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

forumRouter.param("id", async (req, res, next, id) => {
    //Parameter validation
    const topic = await getForumTopicById(id);
    if (!topic) res.status(404).send("No forum topic found");
    req.topic = topic;
    next();
});

forumRouter.route('/:id') //Single forum topic page: list of posts in the topic
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


forumRouter.use(async (err, req, res, next) => {
    console.log(err); //Log error on console
    res.status(400).send(`Error on forumRouter: ${err}`); // log error on response
});
