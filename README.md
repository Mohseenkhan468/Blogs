# Blog Platform - Backend
### Description
This is the backend for a blog platform with the following features:
- User authentication (Sign Up, Login)
- Blog CRUD functionality (Create, Read, Update, Delete)
- Commenting system with the ability to reply to comments
- MongoDB as the database for storing user, blog, and comment data
### Features
#### 1. Sign Up Page:
- Form with email, password, and profile image upload.
- Validation and storing user details in MongoDB.
- Returns a JWT token upon successful sign-up.

#### 2. Login Page:

- Login form to verify user credentials (email and password).
- If valid, generate a JWT token and provide user profile details.
#### 3. Blog CRUD:

- **Create Blog**: Create a new blog post with title, image, and description.
- **Read Blog**: Retrieve and display a list of blogs.
- **Update Blog**: Edit blog post details (title, image, description).
- **Delete Blog**: Delete a blog post.

#### 4. Comment System:

- **Create Comment**: Allow users to post comments on blogs.

- **Reply to Comment**: Users can reply to existing comments.

- **Delete Comment**: Users can delete their own comments.


## Technology Stack
- **Node.js** (Backend)
- **MongoDB** (Database)
- **JWT (JSON Web Token)** for user authentication
- **bcryptjs** for password hashing
- **Multer** for file (image) upload handling
## Set Up
1. Clone the repository:
```bash
git clone <repository_url>
```
2. Install dependencies:
```bash
cd <project_directory>
npm install
```
3. Create a .env file in the root directory and add your environment variables:
```bash
PORT=3000
DB_URL=<your_mongo_db_connection_string>
JWT_SECRET_KEY=<your_jwt_secret_key> 
```
4. Start the server
```bash 
npm start
```





## Api Endpoints
### Authentication
- **POST /auth/signup**
This endpoint allows a user to register by providing their email, password, and profile image.

**FormData**

Request Body
  ```bash
  - email: string (required)
  - password: string (required, minimum length 8 characters)
  - profile: file (required, image file)
  ```
Response
```bash
{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "email": "user@example.com",
    "profile_url": "http://localhost:3000/uploads/profile.jpg"
  }
}
```
- **POST /auth/login**
This endpoint allows an existing user to log in using their email and password.

Request Body
  ```bash
  {
  "email": "user@example.com",
  "password": "yourpassword"
}

  ```
Response
```bash
{
  "success": true,
  "message": "Login successfully.",
  "token": "JWT_TOKEN",
  "data": {
    "email": "user@example.com",
    "profile_url": "http://localhost:3000/uploads/profile.jpg"
  }
}

```
### Blog CRUD
- **POST /blog/add**
This endpoint allows a user to register by providing their email, password, and profile image.

**FormData**

Request Body
  ```bash
  FormData
  - title: string (required)
  - description: string (required)
  - image: file (required, image file)
  ```
Response
```bash
{
    "success": true,
    "message": "Blog created successfully.",
    "data": {
        "title": "t1",
        "image_path": "/uploads/1743491199717.jpg",
        "description": "d1",
        "user_id": "67eb8845673c702ccb95fcf1",
        "_id": "67eb907f676418a780c3e20d",
        "__v": 0,
        "image_url": "http://localhost:3000/uploads/1743491199717.jpg"
    }
}
```
- **GET /blog/list**
This endpoint retrieves the list of all blog posts, including the user details and comments.

Response
```bash
{
    "success": true,
    "data": [
        {
            "_id": "67eb907f676418a780c3e20d",
            "title": "t1",
            "image_path": "/uploads/1743491199717.jpg",
            "description": "d1",
            "user_id": "67eb8845673c702ccb95fcf1",
            "__v": 0,
            "image_url": "http://localhost:3000/uploads/1743491199717.jpg",
            "user": {
                "_id": "67eb8845673c702ccb95fcf1",
                "email": "mohsin1@yopmail.com",
                "profile_url": "http://localhost:3000/uploads/1743489093666.jpg"
            },
            "comments": [
                {
                    "_id": "67eba677a2012fff1706e1cd",
                    "title": "this is comment",
                    "user_id": "67eb8845673c702ccb95fcf1",
                    "comment_id": null,
                    "blog_id": "67eb907f676418a780c3e20d",
                    "createdAt": "2025-04-01T08:40:23.509Z",
                    "updatedAt": "2025-04-01T08:40:23.509Z",
                    "__v": 0,
                    "replies": [
                        {
                            "_id": "67eba6bc85d129c03ff75726",
                            "title": "abcd",
                            "user_id": "67eb8845673c702ccb95fcf1",
                            "comment_id": "67eba677a2012fff1706e1cd",
                            "blog_id": "67eb907f676418a780c3e20d",
                            "createdAt": "2025-04-01T08:41:32.122Z",
                            "updatedAt": "2025-04-01T08:41:32.122Z",
                            "__v": 0
                        }
                    ]
                }
            ]
        }
    ]
}
```
- **PATCH /blog/:blog_id**
This endpoint allows an authenticated user to update a blog post by its ID.

Request Body
  ```bash
  FormData
  - title: string (required)
  - description: string (required)
  - image: file (required, image file)
  ```
Response
```bash
{
    "success": true,
    "message": "Blog edited successfully.",
    "data": {
        "_id": "67eb907f676418a780c3e20d",
        "title": "t1",
        "image_path": "/uploads/1743502824821.jpg",
        "description": "d1",
        "user_id": "67eb8845673c702ccb95fcf1",
        "__v": 0,
        "updatedAt": "2025-04-01T10:20:24.859Z",
        "image_url": "http://localhost:3000/uploads/1743502824821.jpg"
    }
}
```
- **DELETE /blog/:blog_id**
This endpoint allows an authenticated user to delete a blog post by its ID.

Response
```bash
{
  "success": true,
  "message": "Blog deleted successfully."
}
```
### Comment System
- **POST /comment/:blog_id**
This endpoint allows an authenticated user to post a comment on a specific blog post.


Request Body
  ```bash
  {
  "title": "Comment text"
}
  ```
Response
```bash
{
    "success": true,
    "message": "Comment made successfully.",
    "data": {
        "title": "this is comment",
        "user_id": "67eb8845673c702ccb95fcf1",
        "comment_id": null,
        "blog_id": "67eb907f676418a780c3e20d",
        "_id": "67eba677a2012fff1706e1cd",
        "createdAt": "2025-04-01T08:40:23.509Z",
        "updatedAt": "2025-04-01T08:40:23.509Z",
        "__v": 0
    }
}

```
- **POST /comment/reply/:comment_id**
This endpoint allows an authenticated user to reply to a specific comment.

Request Body
  ```bash
  {
  "title": "Reply text"
}
  ```
Response
```bash
{
    "success": true,
    "message": "Reply made successfully.",
    "data": {
        "title": "abce",
        "user_id": "67eb8845673c702ccb95fcf1",
        "comment_id": "67eba677a2012fff1706e1cd",
        "blog_id": "67eb907f676418a780c3e20d",
        "_id": "67eba6d185d129c03ff7572a",
        "createdAt": "2025-04-01T08:41:53.278Z",
        "updatedAt": "2025-04-01T08:41:53.278Z",
        "__v": 0
    }
}
```
- **DELETE /comment/:comment_id**
This endpoint allows an authenticated user to delete a comment by its ID.

Response
```bash
{
  "success": true,
  "message": "Comment deleted successfully."
}

```
### User Profile
- **GET /user/profile**
This endpoint retrieves the authenticated user's profile.

Response
```bash
{
    "success": true,
    "data": {
        "_id": "67eb8845673c702ccb95fcf1",
        "email": "mohsin1@yopmail.com",
        "profile_path": "/uploads/1743489093666.jpg",
        "__v": 0,
        "profile_url": "http://localhost:3000/uploads/1743489093666.jpg"
    }
}

```
## Notes
- Frontend has not been implemented yet.
- This backend uses JWT tokens for user authentication and requires authentication on most endpoints.
## License

[MIT](https://choosealicense.com/licenses/mit/)

