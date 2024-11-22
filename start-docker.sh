docker container run -it --name pwa-sample1 --mount type=bind,source="$(pwd)"/src/,target=/mnt  -p 5000:5000 --rm python:3.10.8-slim-bullseye bash
