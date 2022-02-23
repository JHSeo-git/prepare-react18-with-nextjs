```bash
docker exec -it redis_boot /bin/sh
```

## redis conf

> https://dejavuqa.tistory.com/154

```
# Redis password
requirepass foobar

# 외부 접속 허용을 위해 bind 수정 필요
# bind 127.0.0.1 -> bind 0.0.0.0
bind 0.0.0.0
```

## redis command

> https://redis.io/commands

```bash
# HSET: Sets field in the hash stored at key to value. If key does not exist, a new key holding a hash is created. If field already exists in the hash, it is overwritten.
# Integer reply: The number of fields that were added.
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HGET myhash field1
"Hello"
```

```bash
# HGET: Returns the value associated with field in the hash stored at key.
# Bulk reply: the value associated with field, or nil when field is not present in the hash or key does not exist.
redis> HSET myhash field1 "foo"
(integer) 1
redis> HGET myhash field1
"foo"
redis> HGET myhash field2
(nil)
```

```bash
# HVALS: Returns all values in the hash stored at key.
# Array reply: list of values in the hash, or an empty list when key does not exist.
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HVALS myhash
1) "Hello"
2) "World"
```

```bash
# HLEN: Returns the number of fields contained in the hash stored at key.
# Integer reply: number of fields in the hash, or 0 when key does not exist.

redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HLEN myhash
(integer) 2
```

```bash
# HKEYS: Returns all field names in the hash stored at key.
# Array reply: list of fields in the hash, or an empty list when key does not exist.
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HKEYS myhash
1) "field1"
2) "field2"
```
