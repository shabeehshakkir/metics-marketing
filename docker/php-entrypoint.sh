#!/bin/sh
set -e

# Support environment variables for SMTP configuration
SMTP_HOST=${SMTP_HOST:-smtp.example.com}
SMTP_PORT=${SMTP_PORT:-587}
SMTP_FROM=${SMTP_FROM:-noreply@metics.io}
SMTP_AUTH=${SMTP_AUTH:-off}
SMTP_TLS=${SMTP_TLS:-off}
SMTP_STARTTLS=${SMTP_STARTTLS:-off}

# Generate msmtprc config file
cat <<EOF > /etc/msmtprc
defaults
auth $SMTP_AUTH
tls $SMTP_TLS
tls_starttls $SMTP_STARTTLS
logfile /var/log/msmtp.log

account default
host $SMTP_HOST
port $SMTP_PORT
from $SMTP_FROM
EOF

# Add credentials if provided
if [ -n "$SMTP_USER" ] && [ -n "$SMTP_PASSWORD" ]; then
    echo "user $SMTP_USER" >> /etc/msmtprc
    echo "password $SMTP_PASSWORD" >> /etc/msmtprc
fi

# msmtp requires strict permissions
chmod 600 /etc/msmtprc

# Hand off to the standard php-fpm entrypoint/CMD
exec docker-php-entrypoint "$@"
