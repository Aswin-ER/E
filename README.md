## Local Development

To run the project locally, follow these steps:

### Frontend (Next.js)

1. Clone the repository:

   ```   
   git clone https://github.com/Aswin-ER/E-commerce.git
   ```

   
3. Change directory to Frontend folder:
   
    ```
   cd Frontend
    ```



5. Install Dependencies:

   ```   
   npm i
   ```


7. Build project:

   ```   
   npm run Build
   ```


9. Run Development Project:

   ```   
   npm run dev
   ```


11. Run the production build:

    ```   
    npm start
    ```

### Environment variables (Frontend)

   Rename .env.example file to .env for all the environment variables required for the Frontend.

   

### Backend (Node.js)

1. Change directory to Backend folder:

   ```   
   cd Backend
   ```


3. Install Dependencies:

   ```   
   npm i
   ```


5. Run Project:

   ```   
   npm start
   ```

### Environment variables (Backend)

   Rename .env.example file to .env for all the environment variables required for the Backend.


## Add Product(Postman)
   URL: 
   ``` 
   http://localhost:3001/api/addProduct 
   ```
   Method: POST
   Headers:

    Key: authorization
    Value:<your-access-token> //Give accessToken that get's from response after Successfull Login.

   Body (form-data):

    Key: title, Value: Product Title, Type: Text
    Key: price, Value: 19.99, Type: Text
    Key: description, Value: Product Description, Type: Text
    Key: category, Value: Category Name, Type: Text
    Key: featured, Value: true, Type: Text
    Key: image, Value: Select file, Type: File
