const Joi = require('joi');  
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

// We create a course object

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'},
    {id: 5, name: 'course5'},
];


app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Getting a single id

app.get('/api/courses/:id', (req, res) =>{
      const course = courses.find(c => c.id === parseInt(req.params.id));
      if(!course) return res.status(404).send('The course with the given ID was not found.');
      res.send(course);
});

//Creating our post route

app.post('/api/courses', (req, res) =>{
    const { error } = validateCourse(req.body); 
    if(error)
        return res.status(404).send(result.error.details[0].message);
      
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) =>{
    //search if the course exit and if not, send error message
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found'); 

    //Validate the request body
    const { error } = validateCourse(req.body); 
    if(error)
        return res.status(404).send(result.error.details[0].message);

    //Update the property
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) =>{
    //Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found'); 


    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //Return the same course
    res.send(course)
})


function validateCourse(course){
    const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

