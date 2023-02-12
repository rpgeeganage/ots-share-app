# OTS-Share (One-Time Secret Share)

A self-hosting app to share secrets only one-time.

### Content
* [ **Features** ](#features)
* [ **How to execute** ](#how-to-execute)
* [ **How to use** ](#how-to-use)
  - [ **Create shareable secret** ](#create-shareable-secret)
  - [ **View secret content in the shared link** ](#view-secret-content-in-the-shared-link)
  - [ **Errors** ](#errors)
* [ **Change configurations** ](#change-configurations)
  - [ **Change Mongo server** ](#change-mongo-server)
  - [ **Change the default server port** ](#change-the-default-server-port)
  - [ **Change the purge process interval** ](#change-the-purge-process-interval)
* [ **Tech stack** ](#tech-stack)
* [ **Format of the generated URL** ](#format-of-the-generated-url)
* [ **Todo** ](#todo)
## Features

- Creates shareable links which valid for a maximum of **24 hours**.
- The contents are encrypted with `AES` in `CBC` mode, with a `256-bit` key.
  (Using [Crypto-js](https://cryptojs.gitbook.io/docs/#the-cipher-algorithms))
- Passwords are **NOT** sent to the backend server.
- The app periodically deletes encrypted content after it expires, and the encrypted content gets deleted once the web UI fetches it.

## How to execute

This application is entirely run in Docker and comes with `Mongo 4.2` image. (view the `docker-compose.yml` for further reference.)

To execute this app, simply run following command.

```bash
  make start
```

After that, the application is accessible via [http://localhost:8282](http://localhost:8282)

## How to use

# (Please don't lose the generated URL. There is no way to retrieve the content or regenerate the URL !!!)

### Create shareable secret

1. Add your secret content to the `Secret content` text box.

![Screenshot (1)](https://user-images.githubusercontent.com/10336353/218278169-776db645-b7a4-4068-bf0a-9c33ee1f3157.png)

2. Click the `Create` Button.
3. Copy the `URL` in the text box. (Click the `Copy Icon`).
   ![Screenshot (2)](https://user-images.githubusercontent.com/10336353/218278298-2ded1d50-82e0-4cbf-978f-79f9d637876f.png)
* (Please don't lose the generated URL. There is no way to retrieve the content or regenerate the URL !!!)
4. Send the copied URL to the other party via a secure channel.

### View secret content in the shared link.

1. Visit the shared link using a browser.
2. You will see the following screen.
![Screenshot (3)](https://user-images.githubusercontent.com/10336353/218278430-8dfc4b41-1f75-4a67-a3e0-a2966b3d57fa.png) 
3. Click `Fetch Content`. 
4. You'll see the following screen.
![Screenshot (4)](https://user-images.githubusercontent.com/10336353/218278478-15c40978-116b-4f73-868b-8deaf4eb1b86.png) 

5. Click the `Click there to view the content`. 

6. You will see the content as follows.
![Screenshot (5)](https://user-images.githubusercontent.com/10336353/218278542-0979fda7-afa0-4425-99c2-a283bcc3e3d1.png)

### Errors.

In case of an error, the following screen will appear.![Screenshot (6)](https://user-images.githubusercontent.com/10336353/218278571-9af87297-0e2c-44dd-b172-c5ddbe28a7f3.png)

## Change configurations

### All the configurations are mentioned in the `docker-compose.yml` under `ots-share-run` service.

- Change default port to access the application are available in `docker-compose.yml` under `ots-share-run` service.
- You can modify the `mongo-local` service in `docker-compose.yml` to keep the data persistent.

#### Change Mongo server.

- Please change the `MONGO_URL` variable the `docker-compose.yml` under `ots-share-run` service.

#### Change the default server port.

- Please change `SERVER_PORT` variable in the in `docker-compose.yml` under `ots-share-run` service.

#### Change the purge process interval.
- Default value is 1 minute.
- Please set `PURGE_TRIGGER_INTERVAL` variable in the in `docker-compose.yml` under `ots-share-run` service.
- The `PURGE_TRIGGER_INTERVAL` value must be in `milliseconds`.

## Tech stack

**UI:** React, Material UI

**Server:** Typescript, Node, Express

**DB:** MongoDB

## Format of the generated URL

The URL format, which required sending to the other party, is as follows. The `id` received from the backend API gets concatenated with the password. After that, the contaminated string gets encoded into `Base 58`.

The format is as follows.

- `<hosted-domain>/r/Base58Encoded(id-from-api : password)`

- It supports `Base 64` encoding now.

## Todo
- Add tests. (Current tests are just fake once) :facepalm:.
- Learn more ReactJs. :smile:
- Fix any bugs. :smile: