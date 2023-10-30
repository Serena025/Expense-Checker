# MSP3
Milestone 3

# Name of App
 Budget buddie

# Group Members 
Eshita Islam, Adrian Mitre, David Aguirre, Serena Ally, Marisol Valenzuela

# Description of project
We decided to work on expense checker which motivated by various reasons.One of the primary reasons for coding an expense checker is to gain better control over personal or business finances. By developing a tool to track and monitor expenses, you can get a clearer picture of where your money is going, which is crucial for budgeting, saving, and making informed financial decisions.

Coding an expense checker is an excellent project for learning or improving your coding skills. It offers hands-on experience in web development, mobile app development, or data analysis.

# How to use the app
When a user first accesses the app, they usually need to create an account or log in. Once they set up profile user can start adding expenses or income to the app. You can categorize expenses example food, utilies, etc. There is also pie chart you can instantly grasp which expense categories are the largest or smallest. This provides a clear summary of your spending habits. You can also keep track of the income being received. 

# SETUP
First, you'll need a Postgres database to connect to. Follow instructions here to setup the database and save credentials for the next step.

Next create a .env file inside of backend. It will need to contain the following environment variables (change the values for the database to match what you defined in the previous step)

PORT=3001
JWT_SECRET=PASSWORD

Next create a .env file inside of frontend. It will need to contain the following environment variables (change the values for the database to match what you defined in the previous step)

PORT=3000
REACT_APP_BACKEND_PROTOCOL=http
REACT_APP_BACKEND_HOST=localhost
REACT_APP_BACKEND_PORT=3001

Next cd into backend and run npm install to install dependencies for the API.

Next, cd into frontend, and run npm install to install dependencies for the React app.

Finally, in separate terminals, run npm start for the frontend and nodemon for the backend in each folder so that the API and React app are running at the same time.

# API(http://localhost:3001)

 |Method | Path | Purpose |
| -------- | ------- | ------- |
| GET | / | Gets all the categories/list all expenses/List of income|
| GET | :Id | Gets the list of all expenses/income for a user
| GET | /:Id | Gets an individual expense for a user/gets individual category |
| POST| / | Post an expense/income for a user/Adds a new category |
| PUT | /:Id | Update an existing expense/category/income|
| DELETE | /:Id | Delete an expense from the table/Delete category/Delete income |
| GET| /:category_id/subcategories| Gets all the subcategories for a given category |
| GET | /:category_id/subcategories/:id | Gets an individual subcategory by id |
| PUT | /:category_id/subcategories/:id | Update an individual subcategory by id |
| POST | /:category_id/subcategories |  Add a new subcategory|
| DELETE| /:category_id/subcategories/:id | Delete a subcategory |


# APP(http://localhost:3000)
 |Path| Components | Purpose |
| -------- | ------- | ------- |
| /| Home.jsx| Home Page |
| /login| components/LoginForm.jsx | to login |
| /signup | components/Signup.jsx | from to create new user |
| /dashboard | components/Dashboard.jsx| view pie chart|
| /expenses| components/Expenses.jsx| track expenses |
| /income | components/Income.jsx| track income |


