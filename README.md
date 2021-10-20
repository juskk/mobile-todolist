# CGS Test project

> For This project use [MERN stask](https://www.mongodb.com/languages/mern-stack-tutorial)
## Required features

1. **Todo list - CRUD operations on backend**;

- _Each `PUT` `POST` rout should has validation of `req.body` and throw `400` error in case of failed validation_  
- _Separate your logic from routes. You should perform all interactions with `DB` inside your `services/<filename>.service.ts` file and import it to `controllers/<filename>.controller.ts`. After that you can call your controllers in routes_

2. **Todo list - Connect your CRUD operations with mobile**;

- _You should split your code on logical components ( `<TodoContainer />`, `<TodoElement/>` etc);_  
- _For Edit/Add you should use forms written with [Formik](https://formik.org/docs/overview);_  
- _Put logic related to server interactions inside `service/http.ts` file (check [Our Documentation](https://github.com/CodeGeneration-2020/code-generation-code-style/blob/main/docs/javascript.md#server-interactions-))_
- _For data fetching you can use [React Query](https://react-query.tanstack.com/), it also help you to globally store your data_
- _Use `<FlatList />` for render dynamic list (reed RN docs: https://reactnative.dev/docs/flatlist)_
- _Use React Native EXPO in order to install RN for both iOS & Android (https://docs.expo.dev/index.html)_

3. **Authorization (login/signup) backend;**

- _Use jwt [authorization](https://nodejsdev.ru/doc/jwt/) and [Passport](http://www.passportjs.org/) for that_
- _Logic related to token processing should be stored in `middlewares/auth.middleware.ts`_

4. **Authorization (login/signup) frontend;**

- _Should store token in localStorage_
- _Use Formik for handling validation and submit func_

5. **Filters for todo list by title and statuses (private and completed);**

- _You should pass filter params through `req.params`(`localhost:3000/todo?search=test&status=completed`)_

6. **Button pagination;**

- _All pagination should be handled by backend_

## Advanced features

> This features will be available only after successful finished of required features.

### Graph QL implementation  

1. **Attach express-graphql to backend**  

- _Take existent controllers in your backend and create another `/graphql` route with all this controllers_
- _Use axios for querying a controllers_  
- _Graphql api should work in parallel with existing REST api_  

### NOTES  

> Backend should have stored in `server` dir, mobile should be stored in `mobile` dir.  
> Use technologies from `Useful links and technologies`. You should create separate pr for each task.

Design: [drive.google](https://drive.google.com/file/d/1uSkWwYC7yrvgDFJznxNlKPqQl_SahGzZ/view)  

7. **React Native details;**
- _Front-end should ONLY be launched with React Native EXPO, not (CLI)_
- _For navigation between screens use React Native Navigation (https://reactnavigation.org/docs/getting-started/)_
- _Try to play around with bottom stack navigation, while working with navigation (https://reactnavigation.org/docs/bottom-tab-navigator)_
- _Use `useRoute` + `useNavigation`_

8. **ESlint**

- _ESlint should be configured for all the files in the app_

## PR convention

1. Each intern will be attached to a branch (`<username>/main`);
2. When you are working on a feature you should create a separate branch from `<username>/main` with the following name:
`feature/<username>/<feature-name>` or `bug/<username>/<feature-name>`. Once you are done with a subtask you should create a PR into `<username>/main` and ping `Danyyl Kuchkov & Oleksii Samoilenko` for review;
3. Title of ypur PR's should be `feat: <name of your feature>` or `bug-fix: <name of your bugfix>`. Description field should contain short info about feature/bug;

> If you will face with some issues with git. Ask `Danyyl Kuchkov` via slack;

## Useful links and technologies

[Corporate Codestyle](https://github.com/CodeGeneration-2020/code-generation-code-style)  
[Formik](https://formik.org/docs/overview)  
[Mongoose](https://mongoosejs.com/)  
[Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
[Passport](http://www.passportjs.org/)
[Expo](https://docs.expo.io/)
[React Query](https://react-query.tanstack.com/)
