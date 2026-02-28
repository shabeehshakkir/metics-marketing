FROM php:8.3-fpm-alpine

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Install PHPMailer independently into /app/vendor (outside the volume mount)
COPY api/composer.json /app/composer.json
RUN composer install --no-dev --no-interaction --optimize-autoloader --working-dir=/app

CMD ["php-fpm"]
