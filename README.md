# Kanban Board

### Overview
This repository contains code needed to run a Kanban board with three standard columns "To-do," "In Progress," and "Done."
You can add new tasks by pressing the "+ New" button and input the name of your task. You can also move the tasks among columns just by dragging them, and, finally, you can delete each task by pressing the delete button on the right of each task object. 

### Instalation
To run the app on your computer:

- clone this repo to your local machine using `git clone <repo-url>`
- navigate to the cloned repo by `cd <repo name>`
- set up virtual environment using `python3 -m venv venv`
- activate the virtual environment using
    `source venv/bin/activate` for macOS
    `venv\Scripts\activate.bat` for Windows
- install all required packages using `pip3 install -r requirements.txt`
- run a simple HTTP server in Python by running `python -m http.server`
- go to your http://localhost:8000/ and enter board.html

Or just follow this [link](https://ivka1303.github.io/Kanban-Board/) to interact with the board.

### Testing 

To run the pre-written unit test just run `python3 -m unittest discover` from the repository. 

### Video Walkthrough

To see a video walkthrough using the app, please, follow this [link](https://www.loom.com/share/86463464949d42828f6f61da0c77a46c)
