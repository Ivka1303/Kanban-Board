import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time 


class TestKanbanBoard(unittest.TestCase):
    
    #Testing presence of all the needed files
    def test_board_html_file_exists(self):
        self.assertTrue(os.path.isfile("board.html"), "board.html file not found")
    
    def test_board_css_file_exists(self):
        self.assertTrue(os.path.isfile("board.css"), "board.css file not found")
    
    def test_board_js_file_exists(self):
        self.assertTrue(os.path.isfile("board.js"), "board.js file not found")

    #Configuring the Chrome web driver for testing the app
    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging']) #removing redundant warnings 
        ## the warnings come from a chromedriver issue. More on that here: https://stackoverflow.com/questions/64927909/failed-to-read-descriptor-from-node-connection-a-device-attached-to-the-system
        self.driver = webdriver.Chrome(options=options)

    #Testing if the task is properly added
    def test_add_task(self):
        driver = self.driver
        driver.get("http://localhost:8000/board.html")
        time.sleep(2)
        
        # Find the "Add Task" button and click it
        todo_column = driver.find_element(By.CSS_SELECTOR, ".board_column:nth-of-type(1)")
        add_button = todo_column.find_element(By.CLASS_NAME, "add_button")
        add_button.click()
        time.sleep(2)
        
        # Fill out the form to add a new task
        task_form = driver.find_element(By.CLASS_NAME, "task_form")
        task_name = task_form.find_element(By.NAME, "task_name")
        task_name.send_keys("New Task")
        time.sleep(2)
        task_name.send_keys(Keys.ENTER)
        time.sleep(2)

        # Verify that the new task is added to the "To Do" list
        todo_list = todo_column.find_element(By.CLASS_NAME, "column_items")
        task_names = [task.text.split("\n")[0] for task in todo_list.find_elements(By.CLASS_NAME, "item")]
        time.sleep(3)
        self.assertIn("New Task", task_names)

    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    unittest.main()