
# Recipe App

##### Authors: Melisa Brown, Yijia Hao, Soham Sankhe, Chuhan Zhang
#  
#  
  
### Who was on your team?
Melisa Brown, Yijia Hao, Soham Sankhe, Chuhan Zhang

### What’s the URL of your deployed app?
http://recipe.yijiahao94.com/

### What’s the URL of your github repository with the code for your deployed app?
https://github.com/brownmelisa/recipe_app.git

### Is your app deployed and working?
Yes

### For each team member, what work did that person do on the project?
#### Melisa Brown:
Melisa implemented the client-side meal plan functionality. This encompasses the meal plan, daily plan, grocery list and recipe carousel components as well as their related function components and redux structures. The meal plan functionality allows users to create/delete a meal plan, create/delete a daily plan belonging to a meal plan and view information about the meal including nutritional information and grocery lists.

#### Yijia Hao:
Yijia implemented the user signup, login and recipe comments features on both the client and server sides. She created login and signup links in the navigation bar where new users can register for an account and returning users can login with their email address and password. 
For the comments feature, she created the “comments”, ”forms.new_comments”, “session” and “users” structures in the redux state. She also implemented Ajax calls to fetch data from the backend database and to insert new comments into our app’s Comments table. 

#### Soham Sankhe:
Soham implemented the server-side design for most of our app. He configured the meal plans, daily plans and recipes resources to suit our requirements. This includes creating the database schema, implementing the server-to-server API calls with Spoonacular, parsing the response data into usable data structures, and exposing the parsed data to our app’s client side as json views. Parsing response data required significant server-side logic since data from the API needed to be merged, cleaned, and transformed to suit our app’s needs. The grocery list functionality is unique to our app, so it needed to be calculated from multiple API calls. He implemented a caching feature which significantly decreases the load time for recipe information.
#### Chuhan Zhang:
Chuhan implemented the client-side functionality for the home page and recipe details page. On the home page, users can search for recipes by keyword, cuisine, or meal type. The advanced search functionality allows users to search by ingredients or nutritional constraints using more detailed Spoonacular API calls. He used Ajax calls to shuttle information between the client and server and stored the response in the redux store. He used React and React-Bootstrap to render the client view of search results and recipe details. The nutritional value of recipes is displayed using the Victory chart JavaScript library.

### What does your project 2 app do?
Our project allows users to easily search for recipes and create customized meal plans that suit their nutritional or budgetary needs. All meal plans come with nutritional information and an estimated cost for groceries, enabling users to easily keep track of their caloric intake or food budgets. Users can perform a quick keyword search or conduct more advanced searches based on the ingredients they already have at home, cuisine type, or nutritional criteria. Through the Spoonacular API users have access to over 360,000 recipes with easy to understand cooking instructions, ingredients, nutritional breakdown and an estimated cook time. Additionally we have implemented a recipe comments section and automatic grocery list generator.

### How do users interact with your application? What can they accomplish by doing so? 
1. Signup and login
Only logged in users can access our app. Users can login or sign up for an account by simply clicking the “login” or “signup” link on the navigation bar. The signup panel consists of user name, user email, password, and password confirmation fields. The signup panel will return with an error message if the user’s password is not the same as password confirmation. The username, email, and password will be inserted to user table, but password and password confirmation will not be sent back to the frontend. Once they successfully sign up, users will be able to login with their email and password.

2. Comments
The recipe comments allows to see comments from other users as well as input their own comments for a recipe. A recipe’s comments section lists the commenter’s username and comments for that specific recipe. Users could write and submit their own comments by simply click “submit” button below the comment input box. Clicking the “submit” button will save the comment to our app’s database.

3. Search recipe on Home page and when creating new meal plan 
Users can conduct a simple search by keyword, cuisine, or meal type. The keyword field is required. Additionally users can select the advanced search dropdown to search by multiple ingredients, max calories, max fat, or max carbohydrates. After search button is clicked, the top 9 recipes of the query would be returned and shown as cards. Clicking on the picture contained in the card will redirect to the recipe details page.

4. Access recipe detail page after search
The recipes detail page lists general recipe information (such as content, calories and serving size) instructions, ingredients, and comments.

5. Create meal plans with recipe information.
Users can create their own meal plans with recipes pulled from the Spoonacular API. A meal plan includes a single or multiple days of recipes that are selected via a recipe pop-up on the meal plan create page. Once a meal plan has been created, details are displayed in the “My Meal Plans” tab. 

6. View meal plan details and generate grocery lists. 
The “My Meal Plans” tab displays all the user’s meal plans with details such as calories, protein, fat, and carbohydrates. From this page, the user can view the grocery list for a selected meal plan.

### For each project requirement above, how does your app meet that requirement?
* Our app is significantly more ambitious than any previous assignment in the number of features it supports. The project required a lot more man-hours of work per person than the previous project. 
* The user interface is attractive and easy to use with small page load times.
* Though, our requirements mandate deeply nested objects/data structures, the server side elixir code handles it efficiently in a modular and reusable way. The server side code is written in a well-commented easy to read manner. 
* As the server-server APIs are the crux of our app's functions, a significant amount of code goes towards integration and handling of the external API.
* Our app has user accounts that supports local password authentication.
* Besides user data, we store meal plans, the day plans in the meal plans and user comments for recipes in our postgres database.
* API: As the spoonacular API documentation states that we may not scrape their data, we are limited to just storing the recipe and ingredient IDs in our database while caching the other data for performance. Our app authenticates itself to the spoonacular API through an API key. No external API calls are made by the client side.
* Additional Features:
The latency and slowness due to the API calls is offset by using a cache to make the app more responsive. Our app is designed as a single page application using React/Redux and React-Router. More Details Below.


### What’s the complex part of your app? How did you design that component and why?
We found that designing meal plans and their supporting CRUD actions was particularly complex. A user should be able to create a meal plan and add multiple day plans to the created meal plan. Each day plan should contain the user's choice of recipes for breakfast, lunch, dinner and snacks. Furthermore, each recipe inside the day plan should contain the recipe ingredients list, instructions list and the nutritional information along with some other data fields. Each meal plan has a grocery list that gets updated when the meal gets updated. Handling this tightly coupled data on the Phoenix framework that we are now getting used to require a lot of time and attention to detail. In addition to this, the third party Spoonacular API does not allow us to store the data fetched using their APIs. This meant we had to make a lot of API calls which would impact performance.

Approach: 
Since the meal plan entity dynamically updates as daily plans are added to it, we kept the data in the meal plan table minimal. It only contains the meal plan id and the user id. We created a separate day plan table that contains all other information. The meal plan table and the day plan table have a cardinality of one to many. The day plan needs to have multiple recipes in it, but since we are not allowed to store recipe data locally, the day plan table only contains the IDs for recipes selected by the users for breakfast, lunch, dinner and breakfast. We have generated Phoenix resources for recipes, despite not being able to save anything in the recipe table, because we needed the controllers, context and views to maintain structure and introduce modularity to the code. This has allowed us to write maintainable code that does not break every time a change is made to one data object. The recipe controller does not interact with the recipe table. Instead, all the fetch actions are diverted to API calls. To resolve the performance issue caused by having to make multiple API calls, we implemented a cache that stores parsed recipes. 

### What additional features did you implement?
#### SPA:
We have built our app as a Single Page Application using Redux and React-Router. As a result, our page load times after the first page load are very short. Progressively, they even get shorter as most of the data the user needs gets pulled from the cache. Our first page load time is also quick as we are not loading unnecessary resources. One other advantage of developing our app as a SPA was that we were able to greatly minimize the development dependencies
between the front end and the backend. This helped us to divide our work more efficiently and be able to work in parallel.
 
#### Caching:
Since the Spoonacular API strictly forbids local storage of data, we had to frequently call the external API to fetch recipe information, which caused a noticeable delay in dynamic page loads at the front end. Wherever possible, we used the bulk fetch API option provided by the Spoonacular API by batching together get_recipe requests. This somewhat improved the responsiveness of the app.  To further improve performance we used the Cachex elixir library to cache recipe data (which the Spoonacular API does allow). This allows us to completely offset the latency due to the API calls. To prevent the users from getting served with stale data, we have put a time to live of 6 hours for cache entries.

### What interesting stuff does your app include beyond the project requirements?
Visualize nutritional information in chart. In the recipe details page, users can view a pie chart which breaks down the percentage of protein, fat, and carbohydrates for that recipe. This feature is implemented using Victory chart Javascript by Formidable Lab. It has a set of chart components to select from, but only pie chart component is used in our implementation.

Generate grocery list for meal plan. We wrote the server side logic to parse information from recipes ingredients and generate a grocery list per meal plan. This is not included in the Spoonacular API and we believe it provides a useful functionality. 

### What was the most significant challenge you encountered and how did you solve it?
React

One of the challenges is to design SPA user interface. We started designing project by drawing mock user interface on whiteboard and discussed major user interactions and their impact on render component. Whiteboard drawings of mock application page helped us to visualize tab layout and decide on components and functionalities each tab should have.

Another is to figure out the ajax calls for user interactions and have global state for all browser data. As we added more features to our application, the root state grows significantly. In response, we categorized our root state on redux according to the functionalities such forms submission, create/get recipes, create/get mealplans. We used redux to hold the state tree of our application and to dispatch action to trigger state change. But we stored some local states in component e.g. redirect path and error display switch because they don’t need to be passed to other components. 

