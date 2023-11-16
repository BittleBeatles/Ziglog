# 1. 빌드 및 배포

## 개발 환경

### 형상관리 & IDE

- GitLab
- Jenkins (CI/CD)
- Visual Studio
- IntelliJ Ultimate
- MobaXterm
- DBeaver

### Communication

- Notion
- Discord
- MatterMost
- Jira

### App Server & Infra

- FE
    - TypeScript
    - React
    - Next.js

- BE
    - Java
    - Spring boot
    - Spring Data Jpa

- Infra
    - Docker
    - Jenkins
    - Kubernetes

## 서버 환경

  MSA, Kubernetes 구성을 목적으로 여러 VM을 활용하여 분산 환경을 구축하였으나, 개발 기간의 한계와 구축 과정 중 보안 및 안정성 이슈로 정식 배포된 서버는 Monolith Architecture이다. 따라서 한 개의 VM을 통해 서비스를 운용할 수 있다. 

### Spec

- Ubuntu 20.04 LTS
- VM (CPU, Memory, Storage)
    - AWS EC2 Instance :  t2.xlarge - 4vCPU 16GiB  320GB
    - AWS EC2 Instance :  t2.xlarge - 4vCPU 16GiB  100GB
    - AWS EC2 Instance :  t2.xlarge - 4vCPU 16GiB  100GB
    - AWS EC2 Instance :  t2.xlarge - 4vCPU 16GiB  100GB
    - Oracle Cloud Instance : VM Standard A1.Flex - 2OCP 12GB 100GB
    - Oracle Cloud Instance : VM Standard A1.Flex - 2OCP 12GB 100GB

### SSH 설정

- ssh pem키 (a407_materials)에 대한 pub키를 각 서버의 ~/.ssh/authorized_keys에 등록.
- /etc/hosts

```bash
3.39.223.90     aws1
15.164.90.72    aws2
43.201.125.239  aws3
3.36.208.239    aws4
158.179.193.72  oracle1
158.179.170.93  oracle2

127.0.0.1 localhost

# The following lines are desirable for IPv6 capable hosts
::1 ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
```

- ~/.ssh/config

```bash
Host aws1
	HostName 3.39.223.90
	User ubuntu
	IdentityFile ~/identity/a407_materials.pem

Host aws2 
	HostName 15.164.90.72 
	User ubuntu 
	IdentityFile ~/identity/a407_materials.pem	 

Host aws3 
	HostName 43.201.125.198 
	User ubuntu 
	IdentityFile ~/identity/a407_materials.pem 
 
Host aws4 
	HostName 3.36.208.239 
	User ubuntu 
	IdentityFile ~/identity/a407_materials.pem 

Host oracle1
	HostName 158.179.193.72
	User ubuntu
	IdentityFile ~/identity/a407_materials.pem

Host oracle2
	HostName 158.179.170.93
	User ubuntu
	IdentityFile ~/identity/a407_materials.pem
```

### Architecture

![123.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/6656440a-e876-4d33-999f-9f94216fef15/e270ab8c-b2a5-43ef-928c-f5f2af20ea2e/123.png)

### 의존성 설치

  FE server, BE server, Jenkins, Mysql DB, Redis 등 다수의 Application및 의존성은 Docker Hub에서 이미지를 받아 컨테이너를 통해 사용하기 때문에, 컨테이너 관리 툴과 리소스 모니터링, 네트워크 관련 툴만 설치하면 된다. 

- SSH 및 모니터링 툴 설치.

```bash
sudo apt-get update
sudo apt-get install openssh-* net-tools iftop curl scp git -y
```

- Docker 설치

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 도커

FE와 BE는 소스파일에 포함되어있다. 

- Mysql
    - docker-compose.yml
    
    ```bash
    ## docker-compose.yml for MySQL
    
    volumes:
      data-release:
        external: true
        name: data-release
    
    networks:
      net-release:
        external: true
    
    services:
      mysql-release:
        image: mysql:latest
        container_name: mysql-release
        ports:
          - 3366:3306
        volumes:
          - data-release:/var/lib/mysql
        environment:
          MYSQL_ROOT_PASSWORD: rootpwd
          MYSQL_USER : user
          MYSQL_PASSWORD: pwd
          MYSQL_ROOT_HOST: '%'
          MYSQL_DATABASE: ziglogdb
          TZ: Asia/Seoul
        command:
          - --character-set-server=utf8mb4
          - --collation-server=utf8mb4_unicode_ci
        networks:
          - net-release
    ```
    

- Nginx
    - Dockerfile
    
    ```bash
    FROM nginx
    
    RUN apt-get update
    RUN apt-get install -y vim
    ```
    
    - docker-compose.yml
    
    ```bash
    # nginx docker-compose.yml
    
    networks:
      net-release:
        external: true
    
    services:
      nginx:
        build: .
        restart: unless-stopped
        ports:
          - 80:80
          - 443:443
        volumes:
          - ./nginx/conf.d:/etc/nginx/conf.d
          - ./certbot/conf:/etc/letsencrypt
          - ./certbot/www:/var/www/certbot
        command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
        networks:
          - net-release
    
      certbot:
        image: certbot/certbot
        restart: unless-stopped
        volumes:
          - ./certbot/conf:/etc/letsencrypt
          - ./certbot/www:/var/www/certbot
        entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
        networks:
          - net-release
    ```
    

- Kafka
    - docker-compose.yml
    
    ```bash
    services:
      zookeeper:
        image: wurstmeister/zookeeper
        container_name: zookeeper
        ports:
          - 2181:2181
    
      kafka:
        image: wurstmeister/kafka
        container_name: kafka
        ports:
          - 9092:9092
        environment:
          KAFKA_ADVERTISED_HOST_NAME: ziglog.site
          KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
    ```
    

### Nginx 설정

  본 프로젝트에서는 가비아에서 도메인을 구매해서 사용하였다. 소유한 도메인에 알맞게 수정해야한다. 

- nginx/conf.d/default.conf

```bash
upstream frontend {
  server frontend:3000;
}

upstream backend {
  server backend:8080;
}

server {
  listen 80;
  server_name ziglog.site;

  location /{
    return 301 https://$host$request_uri;
  }

  location /.well-known/acme-challenge/ {
    allow all;
    root /var/www/certbot;
  }
}

server {
  listen 443 ssl;
  server_name ziglog.site;

  ssl_certificate /etc/letsencrypt/live/ziglog.site/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/ziglog.site/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  location /api {
    proxy_pass http://backend/api;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_name backend;
    proxy_ssl_server_name on;
    proxy_redirect off;
  }

  location /{
    proxy_pass http://frontend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_name frontend;
    proxy_ssl_server_name on;
    proxy_redirect off;
  }
}
```

### Certbot 설정

 자동으로 인증서를 갱신해야 되기 때문에 권한을 미리 부여한다. 

```bash
chmod +x init-letsencrypt.sh
```

도메인 수정이 필요하다.

- init-letsencrypt.sh

```bash
#!/bin/bash

domains=(ziglog.site)
rsa_key_size=4096
data_path="./certbot"
email="pj0642@gmail.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

echo "### Starting nginx ..."
docker compose up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate for $domains ..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
echo

echo "### Requesting Let's Encrypt certificate for $domains ..."
#Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx ..."
docker compose exec nginx nginx -s reload
```

## 배포 및 ENV 파일

  준비된 서버에 Gitlab/master 를 clone하고, 각 backend, frontend 폴더에 환경변수가 담긴 env 파일을 작성한다.  이후 docker compose 파일들을 실행시켜 컨테이너를 띄운다. 

### Frontend ENV

- .env

```bash
NEXT_PUBLIC_API_URL=https://ziglog.site/api
NEXT_PUBLIC_BASE_URL=https://ziglog.site
NEXT_PUBLIC_AWS_ACCESS_KEY=*
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=*
NEXT_PUBLIC_AWS_S3_BUCKET=ziglog
NEXT_PUBLIC_AWS_REGION=ap-northeast-2
NEXT_PUBLIC_AWS_FOLDER_NAME=profile
NEXT_PUBLIC_GA_ID=*
```

### Backend ENV

- application.yml

```bash
# cat application.yml
spring:
  profiles:
    default:
      - local

kafka:
  topic:
    name: sse
    partition-count: 2
    replicas: 1

  consumer:
    group:
      send: sendNotification
      save: saveInRdb

logging:
  level:
    org:
      hibernate:
        type:
          descriptor:
            sql: trace

# Jwt Configuration => 분리 필요
jwt:
  secret-key: *
  access:
    expiration: 3600000
    header: Authorization
  refresh:
    expiration: 1209600
    header: Set-Cookieroot@0b917708d71c:/var/jenkins_home/workspace/A407_release_be/backend/src/main/resources
```

- application-release.yml

```bash
# cat application-release.yml
# 로컬 프론트 & 배포 백엔드
spring:
  config:
    activate:
      on-profile: release

  # DB & JPA Configuration
  datasource:
    url: jdbc:mysql://mysql-release:3306/ziglogdb
    username: *
    password: *
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    properties:
      hibernate:
        dialect : org.hibernate.dialect.MySQLDialect
        show-sql: true
    hibernate:
      ddl-auto: none

  #OAuth2 Configuration
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: *
            client-secret: *
            scope:
              - profile
              - email
            redirect-uri: ${base-url.backend}/api/login/oauth2/code/google

          kakao:
            client-id: *
            client-secret: *
            redirect-uri: ${base-url.backend}/api/login/oauth2/code/kakao
            authorization-grant-type: authorization_code
            client-authentication-method: client_secret_post
            client-name: Kakao
            scope:
              - profile_image
              - account_email

        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id

  # Redis Configuration
  data:
    redis:
      host: redis-release
      password: *
      port: 6379

server:
  port: 8080
  servlet:
    context-path: /api

kafka:
  bootstrap: ziglog.site:9092 #single

base-url:
  frontend: https://ziglog.site
  backend: https://ziglog.site
```

### 배포

- Nginx, Kafka, Mysql, Backend, Frontend에서 각각 `docker compose up -d` 를 통해 컨테이너를 가동하여 서비스를 배포 할 수 있다.
- 개발 환경에서는 Jenkins를 활용하여 FE, BE 서버를 CI/CD 하였기 때문에 현재 환경에 디렉토리로 구성되어 있지는 않다.

```bash
ubuntu@aws1:~$ tree
.
├── ReadMe.md
├── backup
│   └── backup.tar
├── identity
│   └── a407_materials.pem
├── jenkins
│   ├── Dockerfile
│   └── docker-compose.yml
├── **kafka**
│   ├── ReadMe.md
│   └── docker-compose.yml
├── kube-fe
│   └── docker-compose.yml
├── **mysql**
│   ├── docker-compose-release.yml
│   └── docker-compose.yml
├── **nginx**
│   ├── Dockerfile
│   ├── certbot
│   │   ├── conf
│   │   │   ├── accounts [error opening dir]
│   │   │   ├── archive [error opening dir]
│   │   │   ├── live
│   │   │   │   ├── README
│   │   │   │   └── ziglog.site
│   │   │   │       ├── README
│   │   │   │       ├── cert.pem -> ../../archive/ziglog.site/cert1.pem
│   │   │   │       ├── chain.pem -> ../../archive/ziglog.site/chain1.pem
│   │   │   │       ├── fullchain.pem -> ../../archive/ziglog.site/fullchain1.pem
│   │   │   │       └── privkey.pem -> ../../archive/ziglog.site/privkey1.pem
│   │   │   ├── options-ssl-nginx.conf
│   │   │   ├── renewal
│   │   │   │   └── ziglog.site.conf
│   │   │   ├── renewal-hooks
│   │   │   │   ├── deploy
│   │   │   │   ├── post
│   │   │   │   └── pre
│   │   │   └── ssl-dhparams.pem
│   │   └── www
│   ├── docker-compose.yml
│   ├── init-letsencrypt.sh
│   └── nginx
│       └── conf.d
│           └── default.conf
└── sonarqube
    └── docker-compose.yml

22 directories, 24 files
```

# 2. 외부 서비스:  S3, 소셜 로그인

## S3

- IAM 계정 생성.
    - 직접연결 권한으로 S3FullAccess 만을 준 계정 생성.
    - 토큰을 저장해두고, Frontend Env에 기재.
- 버킷 생성
- 버킷 설정
    - 퍼블릿 엑세스 허용
- 버킷 정책 JSON

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::ziglog/*"
        }
    ]
}
```

## OAuth2 소셜로그인

### a) 구글

- https://console.cloud.google.com/apis/dashboard
- 로그인 후 사용자 인증 정보 – Oauth2.0 클라이언트 ID에 추가
- 앱 이름 등록
- 승인된 자바스크립트 원본 추가
- 승인된 리디렉션 URI추가

### b) 카카오

- https://developers.kakao.com/product/kakaoLogin
- 로그인 후 애플리케이션 추가
- 앱 설정-앱 키-REST API키를 application-secure.properties의 spring.security.oauth2.client.registration.kakao.client-id에 추가
- 제품 설정-카카오 로그인-보안-Client Secret-코드를 spring.security.oauth2.client.registration.kakao.client-secret에 추가
- 제품 설정-카카오 로그인-동의 항목에서 필요한 정보들을 체크
- 제품 설정-카카오 로그인에서 Redirect URI를 지정



## 시연 시나리오

https://www.youtube.com/watch?v=VuCEGz8ChjA



