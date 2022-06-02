/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

//Projektabgabe Teil 3 erstellt von *** *** und *** ***

const baseUrl = 'http://127.0.0.1:3000/api/';


//API get user
export async function getUsers() {
    const res = await fetch(baseUrl + 'users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if(!res.ok) {
        throw new Error('test');
    }

    const json = await res.json();
    return json;
}

//API get lists for a given user
export async function getLists(userID) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

//Get a specific List for a user
export async function getConcreteLists(userID, listid) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists/' + listid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

//API get tasks for a specific user and a specific list
export async function getTasks(userID, listID) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists/' + listID + '/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

export async function getConcreteTasks(userID, listID, taskid) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists/' + listID + '/tasks/' + taskid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}


//Create a new list with a new name for a given user 
export async function createList(userID, listname) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: listname})
    });
    
    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

//Patch List for a user with a new name = listname
export async function patchList(userID, listid, listname) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists/' + listid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: listname})
    });
    
    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

//delete a list for a user
export async function deleteList(userID, listid) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists/' + listid, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

//Create a new task with a new name for a given user and given list
export async function createTask(userID, listID, listname, deadline) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists/' + listID +'/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:   JSON.stringify({name: listname, deadline: deadline || ''})
    });

    const json = await res.json();

    if(!res.ok && res.status >= 400) {
        throw new Error(json.error);
    }

    return json;
}


//Patch the name of a Task for a user with a new name = taskname
export async function patchTask(userID, listid, taskid, taskname) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists/' + listid + '/tasks/' + taskid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: taskname})
    });
    
    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

//delete a task for a list from one user
export async function deleteTask(userID, listid, taskid) {
    const res = await fetch(baseUrl + 'users/' + userID + '/lists/' + listid + '/tasks/' + taskid, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

//Get all max ids (user, list, task)
export async function getmax_ids() {
    const res = await fetch(baseUrl + 'max_ids', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

//get boolean for multiuser
export async function getMultiuser() {
    const res = await fetch(baseUrl + 'multiuser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const json = await res.json();

    if(!res.ok) {
        throw new Error(json.error);
    }

    return json;
}