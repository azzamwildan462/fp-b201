#!/bin/bash
while getopts "hsSckC" arg; do
  case $arg in
    h)
        echo "There is a simple bash script to control docker"
        echo "[-s] Start with docker services " 
        echo "[-S] Stop docker services " 
        echo "[-c] Check all port that will be used by application, if there is an app that use port then go kill there with [-k]" 
        echo "[-C] Stop and clear all docker services (contain docker containers and images) " 
        echo "[-k] Kill all services that used application port " 
        echo "[-h] See this helps " 
        exit
        ;;
    s)
        sudo docker-compose -f compose-all.yml up -d
        exit
        ;;
    S)
        sudo docker stop nginx_container api_container mongodb_container
        exit
        ;;
    c)
        sudo netstat -tulpn | grep ::80 | awk '{print $7}'
        sudo netstat -tulpn | grep ::969 | awk '{print $7}'
        sudo netstat -tulpn | grep ::4321 | awk '{print $7}'
        exit
        ;;
    k)
        sudo kill -9 $(sudo netstat -tulpn | grep ::80 | awk '{print $7}' | awk -F/ '{print $1}')
        sudo kill -9 $(sudo netstat -tulpn | grep ::4321 | awk '{print $7}' | awk -F/ '{print $1}')
        sudo kill -9 $(sudo netstat -tulpn | grep ::969 | awk '{print $7}' | awk -F/ '{print $1}')
        exit
        ;;
    C)
        sudo docker stop nginx_container api_container mongodb_container
        sudo docker image rm -f fp_nginx fp_mongodb fp_api
        exit
        ;;
    *)
        echo "[-s] Start with docker services " 
        echo "[-S] Stop docker services " 
        echo "[-c] Check all port that will be used by application, if there is an app that use port then go kill there with [-k]" 
        echo "[-C] Stop and clear all docker services (contain docker containers and images) " 
        echo "[-k] Kill all services that used application port " 
        exit
        ;;
  esac
done
