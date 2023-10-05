#!/bin/bash

while getopts ":k" opt; do
    case $opt in
    k)
        MASTER_KEY=$2
        ;;
    \?)
        echo "Unknown option: -$opt"
        exit 1
        ;;
    esac
done

#Generate search key
output=$(curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $MASTER_KEY" \
  --data-binary '{
    "description": "Search film records key",
    "actions": ["search"],
    "indexes": ["film"],
    "expiresAt": null
  }')
search_film_key=$(echo "$output" | jq -r '.key')

#Generate admin key
output=$(curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $MASTER_KEY" \
  --data-binary '{
    "description": "Admin key",
    "actions": ["*"],
    "indexes": ["*"],
    "expiresAt": null
  }')
admin_key=$(echo "$output" | jq -r '.key')

#Generate search genre and actor key
output=$(curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $MASTER_KEY" \
  --data-binary '{
    "description": "Search genres and actors key",
    "actions": ["*"],
    "indexes": ["*"],
    "expiresAt": null
  }')
search_genre_actor_key=$(echo "$output" | jq -r '.key')

printf "\nfilm_search_key: %s\n" "$search_film_key"
printf "\nadmin_key: %s\n" "$admin_key"
printf "\nsearch_genre_actor_key: %s\n" "$search_genre_actor_key"