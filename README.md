# 1. API-Document: Swagger API for Encrypting Data Using AES and RSA Algorithms

This API, built using the NestJS framework, provides endpoints for encrypting data using AES and RSA algorithms. The public and private keys used for RSA encryption were generated using the RSA key generator at [CryptoTools](https://cryptotools.net/rsagen).

## Setup

To set up and run the project, follow these steps:

```sh
$ cd API-document
$ nest start
```

Then open your browser and navigate to http://localhost:1014/api-docs to access the Swagger API documentation.

## Environment Variables

.env file contains the following RSA keys:

```sh
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your-private-key-here>\n-----END PRIVATE KEY-----"

PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n<your-public-key-here>\n-----END PUBLIC KEY-----" with the actual keys generated from CryptoTools.
```

## API Endpoints

# Encrypt Data
- Endpoint: POST /get-encrypt-data
- Description: Encrypts a string in the payload using AES encryption and an RSA-encrypted AES key.

Steps:
1. Create AES key by Generate random string
2. For data2, encrypt payload with AES key from step1.
3. For data1, encrypt key from step2 with private key.

Payload Example:
```
{
  "payload": "your-string-to-encrypt"
}
```

# Decrypt Data 
- Endpoint: POST /get-decrypt-data
- Description: Decrypts the encrypted payload using the AES and RSA algorithms.

Steps:
1. Get AES Key, Decrypt data1 with public key
2. Get Payload, Decrypt data2 with AES key from step1

## 2.Unit testing: testing merge function.

For implementing function with this interface
    merge (int[] collection_1, int[] collection_2, int[] collection_3) : int []

given
     collection_1 already sorted from max to min
     collection_2, collection_3 already sorted from min(0) to max

# Run test
```sh 
npm test 
```