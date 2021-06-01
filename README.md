**Fresh install Sage theme**

    composer create-project roots/sage theme-name
    cd theme-name
    yarn && yarn build

**Delete app/, resources/, .gitignore, .README.md**
**Download this git repo**
**Drag all files into the fresh sage theme install**
**Setup a new git repo for this theme and connect it to the project**

    git init
    git remote add origin origin-url
    git add .
    git commit -m "initial files"
    git push origin main
