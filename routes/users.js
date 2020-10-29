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
    var name_search = req.query.name.toLowerCase();
    var filter = req.query.filter;
    console.log(filter);
    //search name
    const search_db = [];
    for (let user of USERS_DB) {
        let k = await user.name.toLowerCase();
        if (k.indexOf(name_search) !== -1) {
            search_db.push(user);
        }
    }

    const filterArr = (search_db) => {
        if (filter === 'sortname') {
            const USERS_DB_SORTNAME = search_db.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1
                }
                return 0;
            });
            return USERS_DB_SORTNAME;
        } else if (filter === 'sortscore') {
            const USERS_DB_SORTSCORE = search_db.sort((a, b) => a.score - b.score);
            return USERS_DB_SORTSCORE;
        } else {
            return search_db;
        }
    }
    console.log(filterArr(search_db));
    res.json(filterArr(search_db));
})
module.exports = router;
