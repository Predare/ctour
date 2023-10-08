from meilisearch_api_key_gen.keygen import key_gen
import os
import click

@click.command()
@click.option('--actions', help="actions accessed by api key")
@click.option('--indexes', help="index accessed by api key")
@click.option('--address', default="http://localhost:7700", help="address to meilisearch service")

def main(address, actions: str, indexes: str):
    actionsList = actions.split(',')
    indexesList = indexes.split(',')
    masterKey = os.environ['MEILI_MASTER_KEY']
    key = key_gen(masterKey, address, actions=actionsList, indexes=indexesList)
    print(key)

if __name__ == "__main__":
    main()