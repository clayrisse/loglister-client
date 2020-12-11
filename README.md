# LOGLister

![](C:\Users\Claudia Layrisse\Desktop\loglister.dwg.png)

## Description

This is an lister / logger app that manages a variety of list types. The app is meant to be shared and follow by others as well as coedited by selected people.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

- **Signup:** As an anon I can sign up in the app so that I can start planning and listing

- **Login:** As a user I can login to the platform so that I can list log and share instructions

- **Logout:** As a user I can logout from the platform so no one else can use my account. 

- **Edit profile:** As a user I can add my picture and change my account information.

  

- **Dashboard**: As a User I can see the listing of my lists, and special items I haven't marked as done or that are due for the day.

- **Search:** we can do it by a key word in the item title or the list name. 

  

- **Add Lists** As a user I can add theme lists/logs

- **Edit Lists** As a user I can edit list , change their privacy, add co-editors, change background through an API, and **delete** them.

- **Add Editors:** As list owners we could invite other users to collaborate or share a list.

- **Co-Editors:** we could add, edit and delete any item in the list we share. Also we could stop subscribing to the list.

  

- **Add Items:** As a user I can add items  an mark them as checked.

- **Edit Items** As a user  can edit item and add notes, due dates and **delete** anything that is ours

  

  

- **See Public Listing:** As a user I can can see other public profiles and  and public lists

- **Follow:** As users we can follow as many people and specific lists as we want.

- **Public Search** As a user I can see the ranks

  

## Backlog



- See Public Listing
- Follow
- Public Search 



## Backlog



![](C:\Users\Claudia Layrisse\Desktop\LOGLister.jpg)



# Client / Frontend

## React Router Routes (React App)



| Path                  | Component         | Permissions                | Behavior                                                     |
| --------------------- | ----------------- | -------------------------- | ------------------------------------------------------------ |
| `/signup`             | SignupPage        | anon only `<AnonRoute>`    | Signup form, link to login, navigate to *>HomePage* after signup |
| `/login`              | LoginPage         | anon only `<AnonRoute>`    | Login form, link to signup, navigate to *>HomePage* after login |
| `/public`             | PublicBoardPage   | public `<Route>`           | Lists all followed users and lists. Also has search tools to find them |
| `/public/profile/:id` | PublicProfilePage | public `<Route>`           | Shows public profile to follow                               |
| `/public/list/:id`    | PublicListPage    | public `<Route>`           | Shows public list to follow or copy                          |
| `/`                   | HomePage          | user only `<PrivateRoute>` | Shows private lists and to do items from all lists           |
| `/user/edit`          | UserEditPage      | user only `<PrivateRoute>` | Edits user profile and privacy                               |
| `/list/add`           | ListAddPage       | user only `<PrivateRoute>` | Creates and sets up a new list                               |
| `/list/:id`           | ListDetailPage    | user only `<PrivateRoute>` | Shows all the list and its items                             |
| `/list/:id/edit`      | ListEditPage      | user only `<PrivateRoute>` | Edits list setups and can delete list                        |
| `/search`             | SearchPage        | user only `<PrivateRoute>` | Shows search by list and item title.                         |

## Components

- LoginPage
- SignupPage
- HomePage
- PublicBoardPage
- PublicProfilePage
- PublicListPage
- UserEditPage
- ListAddPage
- ListDetailPage
- ListEditPage
- SearchPage
- Navbar
- ListCard
- Item
- ItemTools
- SearchItem
- ListListing
- BackButton

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Tournament Service
  - tournament.list()
  - tournament.detail(id)
  - tournament.add(id)
  - tournament.delete(id)
- Player Service
  - player.detail(id)
  - player.add(id)
  - player.delete(id)
- Game Service
  - Game.put(id)



# Server / Backend



## Models

User model

```javascript
{
  username: { type: String, required: true, unique: true  },
  image: { type: String, required: true, unique: true  },
  password: { type: String, minlength: 2, required: true }, //change to 6 at the end
  isPrivate: { type: Boolean, default: "true"},
  listsId: [{ type: Schema.Types.ObjectId, ref: "List" }],
  itemsId: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  followedListsId: [{ type: Schema.Types.ObjectId, ref: "List" }],
  followedUsersId: [{ type: Schema.Types.ObjectId, ref: "List" }],
  coeditorsListsId: [{ type: Schema.Types.ObjectId, ref: "List" }],
}
```

List model

```javascript
 {
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  followersId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  editorsId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  background: { type: String },
  name: { type: String, default: "New List" },
  isPrivate: { type: Boolean, default: "true"},
  type: { type: String, enum: [ "list", "cyclelist", "log", "instructions", "todo"], default: "Favor Created"},
  listedItemsId: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  categories: [{type: String}]//needs to add specitif routes for implement this
}

```

Item model

```javascript
{
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  editorsId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  listId: { type: Schema.Types.ObjectId, ref: "List" },
  title: { type: String, maxlength: 50, default: "+ add" },
  notes: { type: String, maxlength: 200 },
  isDone: { type: Boolean, default: false},
  status: { type: String, enum: [ "todo", "done", "item", "category"], default: "todo"},
  categoryTitle: {type: String},//needs to add specitif routes for implement this
  doDate: { 
    hasDate: {type: Boolean, default: false},
    date: Date,
   },

}
```





## API Endpoints (backend routes)

| HTTP Method | URL                      | Request Body                                   | Suc stat | Err stat | Description                                                  |
| ----------- | ------------------------ | ---------------------------------------------- | -------- | -------- | ------------------------------------------------------------ |
| GET         | `/auth/me`               | `Saved session`                                | 200      | 404      | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`           | {name, email, password}                        | 201      | 404      | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`            | {username, password}                           | 200      | 401      | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`           | ()                                             | 204      | 400      | Logs out the user                                            |
|             |                          |                                                |          |          |                                                              |
| GET         | `/api/user`              |                                                |          | 400      | List private lists and to do items for the day               |
| GET         | `/api/user/edit`         | {id}   {username, password, image, isPrivate}  | 201      | 400      | Gets user profile and adds profile picture                   |
| POST        | `/api/user/edit/`        | {username, password, image, isPrivate}         |          |          | Edits user profile and adds profile picture                  |
| DELETE      | `/api/user/`             | {id}                                           | 204      | 400      | Delete user                                                  |
|             |                          |                                                |          |          |                                                              |
| POST        | `/api/list/add`          | {background, name, isPrivate, type, editorsId} |          |          | Sends new list setups                                        |
| GET         | `/api/list/:id`          | {id}                                           |          |          | Show specific list info and ITEMS                            |
| GET         | `/api/list/edit/:id`     | {background,name, isPrivate, type, editorsId}  |          |          | Gets list setups for edit                                    |
| PUT         | `/api/list/edit/:id`     | {background, name, isPrivate, type, editorsId} | 201      | 400      | Edits setup                                                  |
| DELETE      | ``/api/list/delete/:id`` | {}                                             | 204      | 400      | Delete list                                                  |
|             |                          |                                                |          |          |                                                              |
| POST        | `/api/item/add`          | {title}                                        |          |          | Creates and adds new item to list                            |
| GET         | `/api/item`              |                                                |          |          | List all items                                               |
| GET         | `/api/item/:id`          | {title, notes, status, isDone, doDate}         |          |          | Gets item info to edit                                       |
| PUT         | `/api/item/:id`          | {title, notes, status, isDone, doDate}         | 201      | 400      | Edit item                                                    |
| DELETE      | `/api/item/:id`          |                                                | 204      | 400      | Delete item                                                  |



## Links

### Trello

[Link to trello board](https://trello.com/b/6bi26Gol/loglister) for time management

### Miro

[Link to miro board](https://miro.com/app/board/o9J_ldWG7cE=/) for wireframes

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1rXfVPiVmDlm8IhXH744KVb63MYmj01q9En1pYDUYFkY/edit?usp=sharing)
