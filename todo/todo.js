const { log } = require('console');
const fs = require('fs')

const filePath = "./todo/tasks.json";

const getTasks = () => {

    try {
    const tasksBuffer = fs.readFileSync(filePath);
    const tasksJSON = tasksBuffer.toString();
    const tasks = JSON.parse(tasksJSON);
    return tasks;

    }
    catch (error){
        return [];
    }
    
}

const saveTasks = (tasks) =>{
    const tasksJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, tasksJSON);
}
const addTask = (task) => {
    const tasks = getTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log(`Task added: ${task}`);
}

const listTasks = () =>{
    const tasks = getTasks();
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.task}`);
    });
}
// const deleteTask = (index) => {
//     let tasks = getTasks();
//     tasks = tasks.filter((_, i) => i !== index - 1); // Compare with the array index (i)
//     saveTasks(tasks);
//     console.log('Task deleted');
// }

const deleteTask = (index) =>{
    const tasks = getTasks();

    //it removes or replace existing element in array 
    // syntax - splice(start, deleteCount, item1)
    tasks.splice(index - 1, 1);
    saveTasks(tasks);
    console.log('Task deleted');
}
const command = process.argv[2]

const argument = process.argv[3]

// console.log(process.argv);


if (command === 'add'){
    addTask(argument)
}else if (command === 'list'){
        listTasks()

}else if (command === 'delete'){
    deleteTask(parseInt(argument))}
else {
    console.log('Command not recognized');
    
}
