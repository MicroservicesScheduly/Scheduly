# Scheduly

> :calendar: Scheduly - застосунок, який допоможе організувати розклад для Вашого навчального закладу.
- Заповніть базу даних із викладачами, факультетами, дисциплінами та спеціальностями.
- Складіть розклад для навчальних груп. 
- Поділіться розкладом закладу із усіма студентами та викладачами.

## Матеріали лабораторної роботи №1

### Образи на Dockerhub 
- https://hub.docker.com/repository/docker/hurmaze/disciplines
- https://hub.docker.com/repository/docker/hurmaze/teachers
- https://hub.docker.com/repository/docker/hurmaze/specialties
- https://hub.docker.com/repository/docker/hurmaze/client
- https://hub.docker.com/repository/docker/hurmaze/faculties

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

#### Результати: Додано сервіси для основних сутностей застосунку.
------
## Матеріали лабораторної роботи №2

### Основні команди
```
kubectl apply -f k8s/postgres/disciplines-postgres
```

#### Результати: Міграції запускаються автоматично при піднятті контейнеру за допомогою фреймворку Entity Framework для .NET. Додано основні CRUD операції для сутностей - роботу перевірено через Postgres.
------
## Матеріали лабораторної роботи №3

### Основні команди
```
helm dep build v1/charts/teachers-service
```

```
helm dep build v1
```

```
 helm install local v1
```

#### Результати: Процес деплою в k8s відбувається за допомогою менеджеру helm, де параметри винесено в змінні, створено шаблони, які винесені в бібліотеку.
------
## Матеріали лабораторної роботи №4

#### Результати: Додано синхронну комунікацію між деякими мікросервісами для більш зручного отримання даних (викладачі та дисципліни факультету) за допомогою HttpClient. Налаштовано retry/timeout/circuit breaker за допомогою фреймворку Polly мови програмування C#.
------
## Матеріали лабораторної роботи №5

### Основні команди
```
kubectl apply -f k8s/rabbitmq
```

#### Результати: Додано асинхронну комунікацію між деякими мікросервісами для відправки електронної пошти за допомогою брокера RabbitMQ. Consumers/producer налаштовані за допомогою фреймворку MassTransit мови програмування C#, електронна пошта відправляється з інтеграцією MailKit.Net.

