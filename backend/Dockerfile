FROM php:fpm-alpine
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
WORKDIR /usr/share/nginx/api
RUN composer require firebase/php-jwt