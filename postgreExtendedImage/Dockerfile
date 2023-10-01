FROM postgres:16

RUN apt-get update && apt-get install -y postgresql-16-wal2json
COPY enable_wal2json.sql /docker-entrypoint-initdb.d
