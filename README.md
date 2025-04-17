# corobooru

`corobooru` is a web app for creating personal imageboards.

As of April 2025, it is _still in active development_ and is not being hosted at a public domain.

## Features
- Register with a valid email address and get your own imageboard
- Intuitively create dynamic collections from your images by selecting tags
- Share any collection of images from your personal board by simply copying the URL
- Viewers are not required to register; anyone with the URL can view your board
- No unnecessary feature-bloat means no social media features or integration

## Concept
I began working on `corobooru` to fulfill a specific personal use case:

- A simple web platform for storing and sharing collections of images

Having long been dissatisfied with platforms such as Reddit, Instagram, or Pinterest, which can serve the basic function but obfuscate that functionality with "social" features which are unappealing to me, I wanted to create a platform for which images are actually the sole purpose.

While other more traditional imageboards such as the _-chan_ or _-booru_ websites do not suffer from the same feature bloat, they are notorious for being poorly moderated and for incorporating anonymizing social features which incentivize a poor quality of both user and content.

The aim of `corobooru` is the synthesize the design principles of the aforementioned platforms which are most appealing to me (primarily the uploading, organizing, and sharing of collections of images), while foregoing the "bloat" (social media integration or otherwise social features).

## Tech stack
- `corobooru` is a full-stack web application built with the MERN stack
- An Express.js API on the back-end receives requests from a React front-end
- The back-end (Node.js/Express) communicates with a MongoDB database hosted on an AWS server
