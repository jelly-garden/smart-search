#!bin/bash

docker build --platform linux/amd64 -t innodep.azurecr.io/tms-knp-demo:latest .
docker push innodep.azurecr.io/tms-knp-demo:latest
