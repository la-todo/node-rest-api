# la-todo REST-api

## Запуск
Clone repo
```bash
git clone https://github.com/la-todo/node-rest-api.git
```

Установка зависимостей
```bash
npm install
```

Запуск сервера
> Обычный запуск на `3000` порту
```bash
npm start
```

> Запуск на заданном порту
```bash
PORT=9999 npm start
```

> Версия api на heroku
```link
https://la-todo.herokuapp.com/
```

## Исользование API
> Аутентификация HTTP запросов осуществляется при помощи jwt-токенов (Bearer Token)

Данная версия предназначено для тестирования и отработки api

Все данные в БД могут быть утеряны в любой момент

> В БД нет четких схем хранения данных

Только для регистрации/аутентификации пользователя обязательны поля `email` и `password`

Для, например, записи `goal` можно указать любые поля:
```json
{
  "title": "TITLE",
  "priority": 2,
  "deadline": -1
}
```

### Пример использования
#### User
> Создание нового пользователя
```
POST /users
Content-Type: application/json

{
	"displayName": "tom",
	"email": "tom@mail.com",
	"password": "111111"
}
```
 *Response*

id - если нет переданного `email` в базе
```json
{ 
  "id": "Hyrir2ARf"
}
```
`email` уже есть в базе
```json
400 Bad Request

{
    "message": "Email already registered!"
}
```

> Аутентификация пользователя (получить токен)
```
POST /login
Content-Type: application/json

{
	"email": "tom@mail.com",
	"password": "111111"
}
```
 *Response*

Корректные данные
```json
{
    "email": "tom@mail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikhrdk1MR0MwRyIsImVtYWlsIjoia2lyaWxsQG1haWwucnUiLCJpYXQiOjE1MjY4MDYzMjR9.IWRXt-t2Zi9HJJcv76UYzu358F4GcdhatuC_HJt77QQ"
}
```

Некорректные данные
```
401 Unauthorized
```

#### Goals

> Добавить цель
```
POST /goals
Authorization: Bearer --token--
Content-Type: application/json

{
  "title": "New GOAL"
}
```
 *Response (id)*
```json
{ 
  "id": "HJkTqXCRM"
}
```

> Получить все цели
```
GET /goals
Authorization: Bearer --token--
Content-Type: application/json

```
 *Response*
```json
{
    "goals": [
        {
            "id": "HJkTqXCRM",
            "userId": "HJkTqXCRM",
            "title": "New GOAL 1"
        },
        {
            "id": "Hy-aqQCAf",
            "userId": "HJkTqXCRM",
            "title": "New GOAL 2"
        }
    ]
}
```
> Обновить цель
```
POST /goals/:id
Authorization: Bearer --token--
Content-Type: application/json

{
  "title": "Changed GOAL"
}
```
 *Response*
```json
{
  "title": "Changed GOAL"
}
```

> Удалить цель
```
DELETE /goals/:id
Authorization: Bearer --token--
```
 *Response (id)*
```json
{ 
  "id": ":id"
}
```
