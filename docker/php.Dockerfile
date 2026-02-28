FROM php:8.3-fpm-alpine

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy and install PHPMailer
COPY api/composer.json api/composer.lock* ./api/
RUN cd /app/api && composer install --no-dev --no-interaction --optimize-autoloader

CMD ["php-fpm"]
