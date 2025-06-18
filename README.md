# CVfolio

**Welcome to CVfolio!**. CVfolio is an minimalistic and aesthetic Astro template for developers and designers to showcase their professional journey, portfolio, and expertise in a modern, fast-loading website inspired by Read.CV.

The source code is still being worked on, so **it's important to share it** with you so we can get feedback and constantly improve it.

Over time, we've managed to add features and improve the design. There are still some things left to do, but the most important thing is that there's an opportunity for this project to be **community-driven**.

- Telegram group: **[Cvfolio »](https://t.me/+5xVGgQ9aQOk1ZmNh)**
- Follow us on X at **[@coderdiaz »](https://x.com/coderdiaz)**
- Wish to contribute? Here is how:

## How to contribute

Cvfolio is built on top of Astro and uses TailwindCSS for generate the website. If you are familiar with Astro, you should feel right at home.

In terms of local development, you can use the following requirements:

- Node.js - v18.17.1 or v20.3.0, v22.0.0 or higher.

If you have these requirements, you can start by cloning the repository and installing the dependencies:

```sh
git clone https://github.com/coderdiaz-studio/cvfolio.git

cd cvfolio

git checkout -b feat/your-feature # or fix/your-fix
```

> Don't push directly to the main branch. Instead, create a new branch and push it to your branch.

Next, install the dependencies using Bun or NPM:

```sh
bun install

# npm
npm install
```

Finally, start the development server:

```sh
bun dev
```

If everything is OK, push your branch and create a pull request:

```sh
git commit -am "Your commit message"

git push
```

Visit [github.com/coderdiaz-studio/cvfolio/pulls](https://github.com/coderdiaz-studio/cvfolio/pulls) and create a pull request.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md`, `.mdx` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Documentation
List of documentation [Here](/docs/docs.md)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `bun install`         | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build).
