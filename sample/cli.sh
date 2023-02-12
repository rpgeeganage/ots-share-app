#!/bin/bash

# Configs
PASSWORD="pass-key"
OTS_SHARE_DOMIN="http://host.docker.internal:8282"

OTS_SHARE_API="$OTS_SHARE_DOMIN/api/record"

OPENSSL_PARAMETERS_PASSWORD="-pass pass:$PASSWORD"
OPENSSL_PARAMETERS_ALGORITHM="-base64 -aes-256-cbc -pbkdf2"

text_to_encrypt="test string to encrypt"

################
## Encryption ##
################
echo "================================"
echo "Encryption:"
echo "********************************"

# Record expiration value. A numerical value
RECORD_EXPIRATION_VALUE=10
# Record expiration unit. It can be "minutes" or "hours"
RECORD_EXPIRATION_UNIT="minutes"

# 1. Generate encrypted string
encrypted_content=$(echo $text_to_encrypt | openssl enc -e $OPENSSL_PARAMETERS_ALGORITHM $OPENSSL_PARAMETERS_PASSWORD)

# 2. Make API call OTS-Share and retrieve the Id
# We need this id for encryption
record_id=$(\
curl -s "$OTS_SHARE_API" \
-H 'Content-Type: application/json' \
--data-raw \
'{ "content" : "'$encrypted_content'", "expireIn": { "value": '$RECORD_EXPIRATION_VALUE', "unit": "'$RECORD_EXPIRATION_UNIT'" }}' \
--compressed \
| jq '.id' \
| tr -d '"' \
)

#### Encryption results
echo "!!! Keep these safe !!!"
echo "-----------------------------------"
echo "Record id: $record_id"
echo "Password: $PASSWORD"
echo "-----------------------------------"
echo "(This record will expires in: $RECORD_EXPIRATION_VALUE $RECORD_EXPIRATION_UNIT)" 
printf "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n\n"

################
## DECRYPTION ##
################
echo "================================"
echo "Decryption:"
echo "********************************"

# 1. Fetch content
content=$(\
curl "$OTS_SHARE_API/$record_id" \
-s -H 'Content-Type: application/json' \
--compressed \
| jq '.content' \
| tr -d '"' \
)

# 2. Decrypt
decrypted_content=$(echo $content | openssl enc -d $OPENSSL_PARAMETERS_ALGORITHM $OPENSSL_PARAMETERS_PASSWORD)

echo "-----------------------------------"
echo "Content: $decrypted_content"
echo "-----------------------------------"
printf "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n\n"
