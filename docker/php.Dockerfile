FROM php:8.3-fpm-alpine

# Install msmtp, a simple sendmail replacement that forwards to SMTP
RUN apk add --no-cache msmtp

# Tell PHP to use msmtp for the mail() function
RUN echo "sendmail_path = '/usr/bin/msmtp -t'" > /usr/local/etc/php/conf.d/mail.ini

# Add dynamic SMTP entrypoint script
COPY docker/php-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/php-entrypoint.sh

WORKDIR /app

ENTRYPOINT ["php-entrypoint.sh"]
