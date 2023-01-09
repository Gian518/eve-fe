# Lyn Theme

This React frontend is made as an alternative to the classic WordPress PHP theme. The goal of this project is to rebuild every WordPress theme concept by reproducing it with JavaScript. This is a WIP project, so don't expect to have a complete and working frontend, but every contribution is accepted :)

## Usage

Note that the theme uses some custom APIs, which I need to exctract from my backend and publish in a new project in order to use them.<br>
Run `yarn` to install dependencies. Go to **src > Config** and rename (or duplicate and rename) the file **env-example.tsx** with **env.tsx**. Read the notes in this file before using it. These values are used by the theme when you call APIs or they represent some static information (like the name of the website). **Note that the env.tsx file is not synced with git**

## What Lyn can actually do

✅ Connect to WordPress by using custom APIs<br>
✅ Download user data from the backoffice (pages, posts, custom posts, templates...)<br>
✅ Detect final user's color scheme (light/dark theme) using CSS properties and custom hooks<br>
✅ Automatically adjust menu items and default pages<br>
✅ Route every address to the right page or post, with error handling

## What Lyn cannot do (to do list)

🔎 It can't render WordPress editor styles. WP has no static assets for CSSs, since it renders them real time<br>
🔎 Render WordPress plugins that have a frontend interface<br>
🔎 Access to every WordPress developer function. It's not a best practice to rebuild every function, so we need something which can recall a function by connecting to our backend<br>
🔎 A complete documentation. Since this is a WIP project, it could lack of documentation here and there<br>
🔎 Complete or refactor some components, which can do better

## Credits

- Written with [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org)
- Graphic elements by [Ant Design](https://ant.design)

## License

[MIT](https://choosealicense.com/licenses/mit/)
