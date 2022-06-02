"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
//Projektabgabe Teil 3 erstellt von *** *** und *** ***
const fs = fs_1.default.promises;
const app = express_1.default();
app.set('port', 3000);
app.use(express_1.default.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(express_1.default.static('public'));
app.listen(app.get('port'));
//Load JSON
async function getJson() {
    try {
        const data = await fs.readFile('data/database.json');
        const jObj = JSON.parse(data.toString());
        return Promise.resolve(jObj);
    }
    catch (e) {
        return Promise.reject('Error');
    }
}
//Save JSON
async function writeJson(todoObj) {
    try {
        await fs.writeFile('data/database.json', JSON.stringify(todoObj, null, 2));
        return Promise.resolve('Successfull');
    }
    catch (e) {
        return Promise.reject('Error');
    }
}
//Get the maximum List ID
async function getMaxListid() {
    try {
        let maxlistid = 0;
        const jObj = await getJson();
        for (const list of jObj[0].lists) {
            if (maxlistid < list.listID) {
                maxlistid = list.listID;
            }
        }
        return Promise.resolve(maxlistid);
    }
    catch (e) {
        return Promise.reject('Error');
    }
}
//Get the maximum Task ID
async function getMaxTaskid() {
    try {
        let maxtaskid = 0;
        const jObj = await getJson();
        for (const list of jObj[0].lists) {
            for (const task of list.items)
                if (maxtaskid < task.taskID) {
                    maxtaskid = task.taskID;
                }
        }
        return Promise.resolve(maxtaskid);
    }
    catch (e) {
        return Promise.reject('Error');
    }
}
//all Users
app.get('/api/users', async (req, resp) => {
    getJson().then((val) => {
        const userids = [];
        for (const user of val) {
            userids.push(user.userID);
        }
        resp.type('application/json').status(200).send(userids);
    });
});
//++
app.get('/api/users/:userid', async (req, resp) => {
    getJson().then((val) => {
        try {
            const userObj = val.find(e => e.userID.toString() === req.params.userid);
            const retuser = {
                user: userObj.user,
                userID: userObj.userID,
            };
            resp.type('application/json').status(200).send(JSON.stringify(retuser));
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ 'error': 'UserID was not found!' })).end();
        }
    });
});
//get lists for specific user
app.get('/api/users/:userid/lists', async (req, resp) => {
    getJson().then((val) => {
        try {
            const userObj = val.find(e => e.userID.toString() === req.params.userid);
            const listids = [];
            for (const list of userObj.lists) {
                listids.push(list.listID);
            }
            resp.type('application/json').status(200).send(listids);
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ error: 'UserID was not found!' }));
        }
    });
});
//posts a new (empty) list 
app.post('/api/users/:userid/lists', async (req, resp) => {
    const max = await getMaxListid();
    const postetList = { name: '', listID: max + 1, items: [] };
    try {
        if (typeof req.body.name === 'string') {
            postetList.name = req.body.name;
        }
        else {
            throw new Error('Name must be of type String!');
        }
        getJson().then((val) => {
            try {
                const userObj = val.find(e => e.userID.toString() === req.params.userid);
                if (userObj) {
                    userObj.lists.push(postetList);
                    writeJson(val).then(() => {
                        resp.type('application/json').status(201).send(JSON.stringify(postetList));
                    });
                }
                else {
                    throw new Error();
                }
            }
            catch (e) {
                resp.type('application/json').status(404).send(JSON.stringify({ error: 'Wrong UserID!' }));
            }
        });
    }
    catch (e) {
        resp.type('application/json').status(400).send(JSON.stringify({ error: e.message }));
    }
});
//get a Specific list for specific user
app.get('/api/users/:userid/lists/:listid', async (req, resp) => {
    getJson().then((val) => {
        try {
            const userObj = val.find(e => e.userID.toString() === req.params.userid);
            const listObj = userObj.lists.find(e => e.listID.toString() === req.params.listid);
            resp.type('application/json').status(200).send(JSON.stringify({ name: listObj.name, listID: listObj.listID }));
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ error: 'UserID/ListID was not found!' }));
        }
    });
});
//change the name of a existing list
app.patch('/api/users/:userid/lists/:listid', async (req, resp) => {
    getJson().then((val) => {
        try {
            const userObj = val.find(e => e.userID.toString() === req.params.userid);
            const listObj = userObj.lists.find(e => e.listID.toString() === req.params.listid);
            if (typeof req.body.name === 'string') {
                listObj.name = req.body.name;
                writeJson(val).then(() => {
                    resp.type('application/json').status(200).send(JSON.stringify({ Success: 'Succesfully changed list-name' }));
                });
            }
            else {
                resp.type('application/json').status(400).send(JSON.stringify({ error: 'Name must be of type String!' }));
            }
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ error: 'UserID/ListID not found or input format wrong!' }));
        }
    });
});
//delete a list called by its ID
app.delete('/api/users/:userid/lists/:listid', async (req, resp) => {
    getJson().then((val) => {
        try {
            const userObj = val.find(e => e.userID.toString() === req.params.userid);
            const listObjInd = userObj.lists.findIndex((e) => e.listID.toString() === req.params.listid);
            if (listObjInd >= 0) {
                userObj.lists.splice(listObjInd, 1);
                writeJson(val).then(() => {
                    resp.type('application/json').status(200).send(JSON.stringify({ Success: 'Succesfully deleted list!' }));
                });
            }
            else {
                throw new Error();
            }
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ error: 'ListID not found!' }));
        }
    });
});
//Get tasks for specific user and specific list
app.get('/api/users/:userid/lists/:listid/tasks', async (req, resp) => {
    getJson().then((val) => {
        try {
            const userObj = val.find(e => e.userID.toString() === req.params.userid);
            const listObj = userObj.lists.find(e => e.listID.toString() === req.params.listid);
            const taskids = [];
            for (const task of listObj.items) {
                taskids.push(task.taskID);
            }
            resp.type('application/json').status(200).send(JSON.stringify(taskids));
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ error: 'UserID/ListID could not be found!' }));
        }
    });
});
//post a new (empty) task, requieres a name, optionaly a deadline and will get a continuos unique ID
app.post('/api/users/:userid/lists/:listid/tasks', async (req, resp) => {
    const max = await getMaxTaskid();
    const postetTask = { name: '', taskID: max + 1, done: false, deadline: '' };
    try {
        if (typeof req.body.name === 'string') {
            postetTask.name = req.body.name;
        }
        else {
            throw new Error('Name must be of type String!');
        }
        if (req.body.deadline) {
            postetTask.deadline = req.body.deadline;
        }
        getJson().then((val) => {
            try {
                const userObj = val.find(e => e.userID.toString() === req.params.userid);
                const listObj = userObj.lists.find(e => e.listID.toString() === req.params.listid);
                listObj.items.push(postetTask);
                writeJson(val).then(() => {
                    resp.type('application/json').status(201).send(postetTask);
                });
            }
            catch (e) {
                resp.type('application/json').status(404).send(JSON.stringify({ error: 'UserID/ListID could not be found!' }));
            }
        });
    }
    catch (e) {
        resp.type('application/json').status(400).send(JSON.stringify({ error: e.message }));
    }
});
//Get specific task for specific list for specific user
app.get('/api/users/:userid/lists/:listid/tasks/:taskid', async (req, resp) => {
    getJson().then((val) => {
        try {
            const userObj = val.find(e => e.userID.toString() === req.params.userid);
            const listObj = userObj.lists.find(e => e.listID.toString() === req.params.listid);
            const itemObj = listObj.items.find(e => e.taskID.toString() === req.params.taskid);
            if (itemObj) {
                resp.type('application/json').status(200).send(itemObj);
            }
            else {
                throw new Error();
            }
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ error: 'UserID/ListID/TaskID could not be found!' }));
        }
    });
});
//change the name of a existing task (for a specific list for specific user)
app.patch('/api/users/:userid/lists/:listid/tasks/:taskid', async (req, resp) => {
    getJson().then((val) => {
        try {
            const userObj = val.find(e => e.userID.toString() === req.params.userid);
            const listObj = userObj.lists.find(e => e.listID.toString() === req.params.listid);
            const taskObj = listObj.items.find(e => e.taskID.toString() === req.params.taskid);
            if (req.body.name) {
                if (typeof req.body.name === 'string') {
                    taskObj.name = req.body.name;
                }
                else {
                    resp.type('application/json').status(400).send(JSON.stringify({ error: 'Name must be of type String!' }));
                    return;
                }
            }
            if (req.body.done) {
                if (typeof req.body.done === 'boolean') {
                    taskObj.done = req.body.done;
                }
                else {
                    resp.type('application/json').status(400).send(JSON.stringify({ error: 'Done must be of type boolean!' }));
                    return;
                }
            }
            if (req.body.deadline) {
                if (typeof req.body.deadline === 'string') {
                    taskObj.deadline = req.body.deadline;
                }
                else {
                    resp.type('application/json').status(400).send(JSON.stringify({ error: 'Deadline must be of type String!' }));
                    return;
                }
            }
            writeJson(val).then(() => {
                resp.type('application/json').status(200).send(JSON.stringify({ Success: 'Succesfully changed task-name' }));
            });
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ error: 'UserID/ListID/TaskID not found or input format wrong!' }));
        }
    });
});
//delete a existing task (for a specific list for specific user)
app.delete('/api/users/:userid/lists/:listid/tasks/:taskid', async (req, resp) => {
    getJson().then((val) => {
        try {
            const listObj = val.find(e => e.userID.toString() === req.params.userid)?.lists.find(e => e.listID.toString() === req.params.listid);
            listObj.items = listObj.items.filter(e => e.taskID.toString() !== req.params.taskid);
            writeJson(val).then(() => {
                resp.type('application/json').status(200).send(JSON.stringify({ Success: 'Succesfully deleted task!' }));
            });
        }
        catch (e) {
            resp.type('application/json').status(404).send(JSON.stringify({ error: 'UserID/ListID/TaskID not found or input format wrong!' }));
        }
    });
});
//additional Stuff
//Check for multiuser
app.get('/api/multiuser', async (req, resp) => {
    const multi = { multiuser: false };
    resp.type('application/json').status(200).send(multi);
});
app.get('/api/max_ids', async (req, resp) => {
    const maxlist = await getMaxListid();
    const maxtask = await getMaxTaskid();
    const maxids = { listID: maxlist, taskID: maxtask, userID: 0 };
    resp.type('application/json').status(200).send(maxids);
});
