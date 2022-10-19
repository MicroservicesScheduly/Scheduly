# Scheduly

> Scheduly - застосунок, який допоможе організувати розклад для Вашого навчального закладу.
- Заповність базу даних із викладачами, факультетами, дисциплінами та спеціальностями.
- Складіть розклад для навчальних груп. 
- Поділіться розкладом закладу із усіма студентами та викладачами.

## Матеріали лабораторної роботи №1

### Образи на Dockerhub 
https://hub.docker.com/repository/docker/hurmaze/disciplines
https://hub.docker.com/repository/docker/hurmaze/teachers
https://hub.docker.com/repository/docker/hurmaze/specialties
https://hub.docker.com/repository/docker/hurmaze/client
https://hub.docker.com/repository/docker/hurmaze/faculties

### Основні команди
```
minikube start
```

```
docker build -t disciplines:01 -f Dockerfile .
```

```
kubectl apply -f k8s/disciplines
```
