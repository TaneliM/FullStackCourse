This is a simple MEAN stack web application. Done as a part for a Full stack course.

sources:
the code was mostly written following this tutorial by Traversy Media:
https://www.youtube.com/watch?v=uONz0lEWft0&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ.

The code also borrows some elements from angular "Tour of heroes" tutorial

In addition to the above I had help for figuring out resizing a text area dynamically to fit content:
https://stackoverflow.com/questions/2803880/is-there-a-way-to-get-a-textarea-to-stretch-to-fit-its-content-without-using-php

All other code is taken from my old existing code or written by referencing documentation.

The project uses Node v12 and angular-cli (not @angular/cli)
The project can be built by first running "npm i" or "npm install" in the project root directory and then running "ng build" in the "angular-src" (If angular has problems building the app, read the text below)
Using either "npm run start" or "npm run dev" will run the project after building.

Because following a 4 to 5 year old tutorial about building a MEAN application there are some problems with the project. Notably angular can fail to build the project because of problems mixing older and newer node packages. I could get angular to build the project by commenting out the first reference in “angular-src/node_modules/@types/node/index.d.ts” which is not a permanent change since the file is in the node_modules folder. I didn't have time to find a more permanent fix because the course was ending.

Link to a video of the project running:
https://www.youtube.com/watch?v=UKgkEclA7GU