# AI - Project 1 - Maze
Logical maze visualization for Artificial Intelligence

###Description
A visualization for three ASP generated mazes.
Uses Javascript, HTML and CSS to visualize the maze and event handlers to let the user try and solve the levels.

### Group Members
Makaila - Coordinator
Matt - Implementor
Natalie - Documentor

### Logic and how to run ASP
To run the .lp files in this project you will need clingo on your computer.
Once you have clingo, save the .lp files in the clingo folder (should have a names similar to "clingo-3.0.5-win64").
In an MS-DOS command prompt, cd to the folder that has clingo and your .lp files.
Once there, run the files by entering "clingo (insert file name.lp here) --rand-freq=1".
This will give you a long stream of ouput which can be used with our javascript files.

Note: The easy and hard levels can also be ran by just entering "clingo (insert file name.lp here)" without specifying the random frequency.  The medium level, however, must be ran with the random frequency specified.


### Running the project
The project is a web based visualization.
You can clone the project and open the index file to view.
To add generated mazes to the site you need to take the output and create a new variable in the parser.js file. Then create a button to call the new level in the index.html file.
