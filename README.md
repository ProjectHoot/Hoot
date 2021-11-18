# Hoot

How come you can self-host an e-mail server but can't self-host a subreddit? Well, now you can. I hear you saying, "But I could always just throw PHPbb on a lamp stack in the corner, there's a REASON I don't do that! People aren't going to make a brand new account and remember to start going to my website every day!"

Well now they don't have to! Using the omni-present and terrifyingly powerful magic contained on the Fediverse, you can not only self-host your own internet community, but do it in a decentralized way that allows ANYONE, from ANYWHERE, to make an account on almost ANY server! With that, they can communicate with people on TOTALLY DIFFERENT servers, without having to mess about with web URLs, and without having to create an account on EVERY server they interact with! You don't bother making a gmail account just to talk to your friend Sally who happens to have a gmail account. You can send Sally a lengthy diatribe on the tactics of couch-surfing from your AOL address. Why should your INTERNET WEB FORUM behave any differently? 

The answer is it doesn't have to! Just use Hoot and you'll be able to:

 - Create an account (fluffy2001@somedomain.example)!
 - Create a community (flufflovers@somedomain.example)!
 - Communicate on the community with people on TOTALLY DIFFERENT servers run by TOTALLY DIFFERENT people (jd@goldandblack.xyz)!
 - Upvote stuff you like!
 - Ban people you don't!
 - Argue over minutae without all the tedious mucking about on centralized platforms!

All this and more can be YOURS if you run a Hoot node today!

#OK but what is hoot?

Hoot is a software front-end for lotide that provides a clean, modern, and user-friendly interface. Hoot provides a [Nuxt.js](https://nuxtjs.org/) app, that can be built to use either Server Side Rendering(SSR) or for static file hosting 

#FAQ

Q: Do I *need* to self-host in order for me to use hoot? I can't afford computers.

A: You can just create an account on someone else's Hoot server!

Q: Does it have a mobile app?

A: Abso-doodly-utely it has a mobile app! 

Q: What else do I need to run Hoot?

A: You need a server running lotide. Hoot is a frontend for lotide, lotide is a backend that handles all the complicated bits and database stuff. 

Q: It's great but I want a NEW FEATURE. Do you guys accept pull requests?

A: We would ADORE it if you sent us a pull request. 

# Prerequisites

1. A working [lotide](https://git.sr.ht/~vpzom/lotide) server.
2. Node
3. Yarn 
   1. Yarn doesn't have to be installed globally, you can use NPX to run yarn commands: `npx yarn` `npx yarn dev` etc.

# Building

## Docker
The docker image only does the SSR build, and PROXY is `true` by default

this will start the container and map it to port 3000 on your machine:
```bash
docker run --name hoot -p 3000:3000 -e LOTIDE=https://lotide-instance.com/api hoot
```

## SSR Build
install dependencies:
```
yarn
```
Set your Environment Variables in a .env file or your hosting provider's environment settings
```.env
LOTIDE=https://your-lotide-instance.app/api
STATIC=false
# if you're using SSR, proxy should probably be set to `true`
PROXY=true
```

Build the app

```
yarn build
```

Start the app

```
yarn start
```

## Static Build

install dependencies:
```
yarn
```
Set your Environment Variables in a .env file or your hosting provider's environment settings
```.env
LOTIDE=https://your-lotide-instance.app/api
STATIC=true
# if you're using the Static Build, proxy won't be applied and doesn't have to be set
PROXY=false
```

Build the app

```
yarn build
yarn generate
```
After the build is completed, the results are output to the dist/ directory. Copy those files to your web root and Hoot should now be accessible.

 or you can serve the app with a simple node server with

```
yarn start
```
For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

# Development

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
