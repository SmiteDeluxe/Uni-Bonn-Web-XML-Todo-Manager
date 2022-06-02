/* eslint-disable no-undef */

//Projektabgabe Teil 3 erstellt von *** *** und *** ***

import * as api from './api.js';

const output = document.getElementById('output');

async function runTest() {
  log('Starting Test');
  
  //Get all users
  const users = await api.getUsers();
  log('All users, valid: \n' + users);
  
  //get all list for a specific user
  let lists = await api.getLists(12334);
  log('All list ids (User 12334), valid: \n' + lists);

  try {
    lists = await api.getLists(1234);
  } catch(e) {
    log('All list ids (Userid wrong), invalid: \n' + e);
  }

  //Concrete list
  let concreteLists = await api.getConcreteLists(12334, 1);
  log('Concrete list (User 12334, List 1), valid: \n' + JSON.stringify(concreteLists));

  try {
    concreteLists = await api.getConcreteLists(12334,23);
  } catch(e) {
    log('Concrete list (Listid wrong), invalid: \n' + e);
  }
  
//get tasks for user and list
  let tasks = await api.getTasks(12334, 1);
  log('All task ids (User 12334, List 1), valid: \n' + tasks);

  try {
    tasks = await api.getTasks(12334, 1248);
  } catch(e) {
    log('All task ids (Listid wrong), invalid: \n' + e);
  }

  let task = await api.getConcreteTasks(12334, 1, 21);
  log('Concrete task (User 12334, List 1, Task 21), valid: \n' + JSON.stringify(task));

  try {
    task = await api.getConcreteTasks(12334, 1, 234);
  } catch(e) {
    log('Concrete task (Taskid wrong), invalid: \n' + e);
  }

  let max_ids = await api.getmax_ids();
  log('Max_ids, valid: \n' + JSON.stringify(max_ids));

  let multipass = await api.getMultiuser();
  log('Multiuser, valid: \n' + JSON.stringify(multipass));

  //Create a new List for user
  await api.createList(12334, 'New List');
  max_ids = await api.getmax_ids();
  concreteLists = await api.getConcreteLists(12334, max_ids.listID);
  log('Newly created list, valid: \n' + JSON.stringify(concreteLists));

  try {
    await api.createList('123345', 'New List');
    max_ids = await api.getmax_ids();
    concreteLists = await api.getConcreteLists(12334, max_ids.listID);
  } catch(e) {
    log('No new list created , invalid: \n' + e);
  }
  
  //Rename list for user and list
  await api.patchList(12334, max_ids.listID, 'newname');
  max_ids = await api.getmax_ids();
  concreteLists = await api.getConcreteLists(12334, max_ids.listID);
  log('Edit last list, valid: \n' + JSON.stringify(concreteLists));

  try {
    await api.patchList(12334, max_ids.listID, 345); //number type
    max_ids = await api.getmax_ids();
    concreteLists = await api.getConcreteLists(12334, max_ids.listID);
  } catch(e) {
    log('Edit List wrong ListID: \n' + e);
  }

  //Delete last list (for example)
  await api.deleteList(12334, max_ids.listID);
  max_ids = await api.getmax_ids();
  concreteLists = await api.getConcreteLists(12334, max_ids.listID);
  log('Delete last added list, valid: \n' + JSON.stringify(concreteLists));

  try{
    await api.deleteList(12334, max_ids.listID + 1);
    max_ids = await api.getmax_ids();
    concreteLists = await api.getConcreteLists(12334, max_ids.listID);
  }catch(e){
    log('there is no such list to delete , invalid: \n' + e);
  }

  //Create a new Task in a List, once without optional deadline and once with
  await api.createTask(12334, 42 , 'Neuer Task n' );
  max_ids = await api.getmax_ids();  
  task = await api.getConcreteTasks(12334, 42, max_ids.taskID);
  log('Created a new task, valid: \n' + JSON.stringify(task));
  
  await api.createTask(12334, 42 , 'Neuer Task n+1', '2200-08-12' );
  max_ids = await api.getmax_ids();  
  task = await api.getConcreteTasks(12334, 42, max_ids.taskID);
  log('Created a new task, valid: \n' + JSON.stringify(task));

  try{
    await api.createTask(12334666, 42 , 'Neuer Task n' ); //wrong user id
    max_ids = await api.getmax_ids();  
    task = await api.getConcreteTasks(12334, 42, max_ids.taskID);
    log('Created a new task, valid: \n' + JSON.stringify(task));
    
  } catch (e){
    log('could not create Task (Userid wrong), invalid: \n' + e);
  }

  try{
    await api.createTask(12334, 1234567 , 'Neuer Task n' );  //wrong list id
    max_ids = await api.getmax_ids();  
    task = await api.getConcreteTasks(12334, 42, max_ids.taskID);
    log('Created a new task, valid: \n' + JSON.stringify(task));
  } catch (e){
    log('could not create Task (listid wrong), invalid: \n' + e);
  }

  //patch tasks
  await api.patchTask(12334, 42, max_ids.taskID, 'Erneuerter Name');
  max_ids = await api.getmax_ids();  
  task = await api.getConcreteTasks(12334, 42, max_ids.taskID);
  log('Changed a task, valid: \n' + JSON.stringify(task));
  
  try{
    await api.patchTask(12334, 42, max_ids.taskID , [78,7]); //wrong taskid
    max_ids = await api.getmax_ids();  
    task = await api.getConcreteTasks(12334, 42, max_ids.taskID);
    log('Changed a task, valid: \n' + JSON.stringify(task));
  } catch (e){
    log('Could not change Task (taskid wrong), invalid: \n' + e);
  }

  //delete tasks
  await api.deleteTask(12334, 42, max_ids.taskID);
  max_ids = await api.getmax_ids();  
  task = await api.getConcreteTasks(12334, 42, max_ids.taskID);
  log('Delete a task, valid: \n' + JSON.stringify(task));
 
  try{
    await api.deleteTask(12334, 12323232323, max_ids.taskID);
    max_ids = await api.getmax_ids();  
    task = await api.getConcreteTasks(12334, 42, max_ids.taskID);
  } catch (e){
    log('Could not delete Task (listid wrong), invalid: \n' + e);
  }

  log('End of test');
}
    
function log(text) {
  let p = document.createElement('li');
  p.innerText = text;
  output.appendChild(p);
}

runTest();
