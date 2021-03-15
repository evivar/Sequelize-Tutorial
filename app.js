const express = require('express');
const { sequelize, User, Post } = require('./models');

const app = express();

app.use(express.json());

app.post('/users', async(req, res) => {
    const { name, email, role } = req.body;
    try {
        const user = await User.create({ name, email, role });
        return res.json({ status: 200, user: user });
    } catch (err) {
        return res.json({ status: 500, error: err });
    }
});

app.get('/users', async(req, res) => {
    const uuid = req.query.uuid;
    try {
        const user = await User.findOne({
            where: { uuid },
            include: Post
        });
        return res.json({ status: 200, user: user });
    } catch (err) {
        return res.json({ status: 500, error: err });
    }
});

app.delete('/users', async(req, res) => {
    const uuid = req.query.uuid;
    try {
        const user = await User.findOne({
            where: { uuid }
        });
        await user.destroy();
        return res.json({ status: 200, msg: 'User deleted' });
    } catch (err) {
        return res.json({ status: 500, error: err });
    }
});

app.put('/users', async(req, res) => {
    const uuid = req.query.uuid;
    const name = req.body.name;
    try {
        const user = await User.findOne({
            where: { uuid }
        });
        user.name = name;
        await user.save
        return res.json({ status: 200, user: user });
    } catch (err) {
        return res.json({ status: 500, error: err });
    }
});

app.post('/posts', async(req, res) => {
    const { userUuid, body } = req.body;
    try {
        const user = await User.findOne({ where: { uuid: userUuid } });
        const post = await Post.create({ body, userId: user.id });
        return res.json({ status: 200, post: post });
    } catch (err) {
        return res.json({ status: 500, error: err });
    }
});

app.get('/posts', async(req, res) => {
    try {
        const posts = await Post.findAll({ include: User });
        return res.json({ status: 200, post: posts });
    } catch (err) {
        return res.json({ status: 500, error: err });
    }
});

app.listen({ port: 5000 }, async() => {
    console.log('Server started on http://localhost:5000');
    await sequelize.authenticate();
    //await sequelize.sync({ force: true });
    console.log('Database Connected');
});