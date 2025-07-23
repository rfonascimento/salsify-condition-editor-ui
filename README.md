# Salsify - Coding challenge - Ricardo Nascimento

This project is a coding exercise for Salsify recruitment process.

## Assumptions

- Do not edit datastore.js, just include it and retrieve it via window object
- Use the same data interface currently present in products, properties and operators, assuming:
    - "No other Operators or data types will be introduced; they are static."
    - "Properties and Products vary from customer to customer, you cannot depend on having the same properties or
      products available each time this application loads"
    - This assumes that values can change, names of fields can change, but the data interface will remain!
- Assuming the role is for a React position, the project will be developed with React
- Avoid using too much external libraries, keep it simple and demonstrate JS+React+Typescript skills

## Development process

At first, my idea was to follow a more "standard" development process, starting with an overall understanding of the goal, requirements and them move on to the actual UI/UX that I envisioned.
After that, go to the drawing board, see which components need to be created, what will be their interfaces, etc., build the components, tests, and at the end assemble all together.
But has time went by, because I don't have too much time to focus on the entire process, I've decided to change this initial plan.
Now the plan is to go step-by-step, delivering value and functionality in each change. Start simple and build on top of it.
This means, that the UI/UX concept and designs, tests will be considered only later in the process. 
The end goal should not change, but in the case that I'll not make it through the end, still I've something to showcase!
Let's see how that goes, fingers crossed, and let's goooo!!!

### The Plan

- [x] Read the docs and understand the exercise - ~20m
- [x] Check datastore.js file - ~10m
- [x] Setup initial React project - ~20m
- [x] Import datastore.js and create typings file ~20m
- [x] Display data table - ~10m
- [x] Create generic table component to showcase table data. Main purpose is to separate concerns and don't bloat main application file - ~40m
- [ ] Build "Filter bar" component - a bit do generic, most likely it will have more steps
- [ ] Add unit tests and test the overall application
- [ ] Support UI/UX concept
- [ ] TBD