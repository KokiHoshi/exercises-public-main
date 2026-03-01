# 大きな `file.txt` に対するメモリ使用量

## 調査方法

## 結果

### `fs.createReadStream`

```
node uploadStream.cjs
$ node uploadStream.cjs
== upload_stream ==
status: 201
response: Uploaded
rss diff (MB): 21.4
peak rss (MB): 68.7
```

- 一定サイズのバッファで順次送るので、ファイルが巨大でも メモリ増加は小さい

### `fs.read`

```
node uploadRead.cjs
$ node uploadRead.cjs
== upload_read ==
status: 201
response: Uploaded
rss diff (MB): 1040.1
peak rss (MB): 2097.4
```

- ファイルサイズに比例して メモリが増える
