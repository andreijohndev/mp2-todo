FROM php:fpm-alpine
RUN apk add gmp-dev
RUN docker-php-ext-install mysqli gmp && docker-php-ext-enable mysqli gmp

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
WORKDIR /usr/share/nginx/api
RUN composer require sop/jwx
RUN openssl genrsa -out rsa_private_key.pem && openssl pkey -in rsa_private_key.pem -out private_key.pem
RUN openssl rsa -in private_key.pem -RSAPublicKey_out -out rsa_public_key.pem && openssl rsa -in private_key.pem -pubout -out public_key.pem
# Hack-y way to make php read private key
RUN chmod 644 rsa_private_key.pem
RUN chmod 644 private_key.pem