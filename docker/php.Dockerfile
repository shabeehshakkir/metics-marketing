FROM php:8.3-fpm-alpine

# Install msmtp, a simple sendmail replacement that forwards to SMTP
RUN apk add --no-cache msmtp

# Configure msmtp to forward all emails to the 'mailpit' container on port 1025
RUN echo -e "defaults\nauth off\ntls off\nlogfile /var/log/msmtp.log\n\naccount default\nhost mailpit\nport 1025\nfrom noreply@metics.io\n" > /etc/msmtprc

# Tell PHP to use msmtp for the mail() function
RUN echo "sendmail_path = '/usr/bin/msmtp -t'" > /usr/local/etc/php/conf.d/mail.ini

WORKDIR /app
