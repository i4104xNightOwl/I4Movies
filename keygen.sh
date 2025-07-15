#!bin/bash
mkdir keys
mkdir node-server/packages/backend/resources
mkdir node-server/packages/frontend/resources

cd keys

openssl ecparam -name prime256v1 -genkey -noout -out private_key.pem
openssl ec -in private_key.pem -pubout -out public_key.pem

# Copy key vào sso server
cp private_key.pem ../sso/src/resources/

# Copy key vào sso client và backend
cp public_key.pem ../node-server/packages/backend/resources/
cp public_key.pem ../node-server/packages/frontend/resources/
