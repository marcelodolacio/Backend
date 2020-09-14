const express = require("express");
const app = express();
app.use(express.json());


const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken'); 
const SEGREDO = 'euvoupracasa';

let tasks = [];
            

         

   //EXERCICIO 1 
   app.get('/', (request, response) => { 
                
        response.send({ message: 'ok' })
        
        console.log(tasks);
    });

    //EXERCICIO 2  e 3 
    app.post('/login', (request, response) => { 
   
    if(request.body.username !== 'usuario' || request.body.password !== "123456"){
        console.log("DEU MERDA");
        response.status(401).send({message: 'Error in username or password'});
    }else{
        var token = jwt.sign({ username: 'usuario', role: 'admin' }, SEGREDO, { expiresIn: '1h'});
        response.status(200).send({ token:  token });
    }
    });

    //EXERCICIO 4  e 5
    app.post('/tasks', (request, response) => { 
        const body = request.body;
        const task = {
                    id: uuid(),
                    title: body.title,
                    description: body.description,
                    isDone:body.isDone,
                    isPriority:body.isPriority
                    
            };
        tasks.push(task); 
        response.status(201); 
        response.send(task);
        });

    //EXERCICIO 6     
    app.get('/tasks', (request, response) => { 
        console.log(tasks); 
        response.status(201); 
        response.send(tasks);
    });

    //EXERCICIO 7 
    app.put('/tasks/:id', (request, response) => { 
        const body = request.body;
        const id = request.params.id;
        console.log("id: "+id)
        const task = tasks.find(t => t.id == request.params.id);
        console.log(task)
        if (task) {
            task.title = body.title; 
            task.description = body.description;
            task.isDone = body.isDone; 
            task.isPriority = body.isPriority; 
            response.status(404).send(task);
            } else { 
                response.status(404); response.send();
            }
        });

    //EXERCICIO 8     
    app.get('/tasks/:id', (request, response) => { 
        console.log("ENTREEEEEEI");
        const id = request.params.id;
        console.log("id: "+id)
        const task = tasks.find(t => t.id == request.params.id);
        console.log("ENTREEEEEEI");
        console.log(task)
        if (task) { 
            response.status(404).send(task);
            } else { 
                response.status(404); response.send();
            }
    });  

    //EXERCICIO 9 e 10
    app.delete('/tasks/:id', (request, response) => { 
        var task = tasks.find(t => t.id == request.params.id); 
        if (task) {
            tasks = tasks.filter(t => t.id != request.params.id);
            response.status(200).send(task) } 
        else {
            response.status(404).send() 
        }
    });

app.listen(3000);