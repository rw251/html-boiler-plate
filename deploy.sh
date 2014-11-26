#!/bin/bash
lftp -e "mirror -R /home/ubuntu/workspace/dist / && exit" -u USER,PASSWORD URL