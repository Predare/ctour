RESULT_MEILI_SEARCH_KEY=$(python3 py_utils/gen_meili_keys.py --address http://meilisearch:7700 --actions search --indexes \*)
RESULT_MEILI_ADMIN_KEY=$(python3 py_utils/gen_meili_keys.py --address http://meilisearch:7700 --actions \* --indexes \*)
echo "export MEILI_SEARCH_KEY=$RESULT_MEILI_SEARCH_KEY" >> ~/.bashrc
echo "export MEILI_ADMIN_KEY=$RESULT_MEILI_ADMIN_KEY" >> ~/.bashrc
source ~/.bashrc