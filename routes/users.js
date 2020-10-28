const express = require('express');
const faker = require('faker');

const router = express.Router();

const AVATAR_URL = 'https://rickandmortyapi.com/api/character/avatar/';

const USERS_DB = [...Array(100)].map(() => {
    return {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        birthday: faker.date.past(15, new Date(1995, 1, 1)),
        score: faker.random.number(),
        avatar: AVATAR_URL + faker.random.number(max = 100) + '.jpeg'
    };
});

router.get('/', function (req, res, next) {
    res.json(USERS_DB);
});

router.get('/filter', async (req, res) => {
    // queries params 
    const name_search = req.query.name.toLowerCase();
    const limit = req.query.limit;
    const filter = req.query.filter;

    //search name
    const search_db = [];
    for (let user of USERS_DB) {
        let k = await user.name.toLowerCase();
        if (k.indexOf(name_search) !== -1) {
            search_db.push(user);
        }
    }

    //filter sort name 
    const USERS_DB_SORTNAME = await search_db.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        } else if (a.name < b.name) {
            return -1
        }
        return 0;
    });

    // filter sort score
    const USERS_DB_SORTSCORE = await search_db.sort((a, b) => a.score - b.score);

    //pagination
    const limit_result = USERS_DB_SORTNAME.slice(0, limit)
    //array to front
    res.json(limit_result);
})

module.exports = router;
