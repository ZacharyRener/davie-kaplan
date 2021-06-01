**Quick setup:**
Search and replace theme-name with the name of your theme's directory

    composer create-project roots/sage theme-name && cd theme-name && yarn && yarn build && rm -rf app && rm -rf resources && rm .gitignore && rm README.md && rm package-lock.json && git init && git remote add origin https://github.com/ZacharyRener/hpf-sage && git pull origin master && cd resources/assets && npm install && ./node_modules/.bin/webpack --watch

**Fresh install Sage theme**

    composer create-project roots/sage theme-name
    cd theme-name
    yarn && yarn build

**Install ACF**

**Delete app/, resources/, .gitignore, .README.md**

    rm -rf app && rm -rf resources && rm .gitignore && rm README.md && rm package-lock.json

**Pull this git repo**

    git init
    git remote add origin https://github.com/ZacharyRener/hpf-sage
    git pull origin master

**Install Webpack and compile**

    cd resources/assets
    npm install
    ./node_modules/.bin/webpack --watch
