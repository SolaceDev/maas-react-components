#react-components
rm -rf dist
npm run build:dev &

# wait for the dist files to be regenerated before starting storybook
while [ ! -f dist/index.js ]; do
    sleep 2 # or less like 0.2
done

# storybook
cd storybook
npm run start
