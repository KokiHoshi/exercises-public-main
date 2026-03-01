## Kubernetes / Amazon ECS の Graceful Shutdown で送られるシグナル

SIGTERM → SIGKILL

### Kubernetes

Pod終了時、kubelet がまず SIGTERM（TERM）を送り、猶予期間後に残っていれば SIGKILL を送る

### Amazon ECS

Linuxコンテナは（イメージの STOPSIGNAL があればそれ、無ければデフォルトで）まず SIGTERM、その後 StopTimeout 待って SIGKILLを送る

### Dockerの停止動作(参考)

まず SIGTERM、猶予期間後に SIGKILL

→基本の流れは同様
