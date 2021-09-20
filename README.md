# Hoot

Hoot is a software front-end for lotide that provides a clean, modern, and user-friendly interface. Hoot provides a [Nuxt.js](https://nuxtjs.org/) app, that can be built to use either Server Side Rendering(SSR) or for static file hosting 

# Prerequisites

1. A working [lotide](https://git.sr.ht/~vpzom/lotide) server.
2. Node/NPM

# Building

## SSR Build
install dependencies:
```
npm ci
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
npm run build
```

Start the app

```
npm run start
```

## Static Build

install dependencies:
```
npm ci
```
Set your Environment Variables in a .env file or your hosting provider's environment settings
```.env
LOTIDE=https://your-lotide-instance.app/api
STATIC=true
# if you're using the Static Build, proxy won't be applied anyway so just set it to false or true it won't matter
PROXY=false
```

Build the app

```
npm run build
npm run generate
```
After the build is completed, the results are output to the dist/ directory. Copy those files to your web root and Hoot should now be accessible.

 or you can serve the app with a simple node server with

```
npm run start
```


