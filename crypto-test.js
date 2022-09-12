const crypto = require('crypto-js')
const bcrypt = require('bcrypt')

// encryption is a two way process - data is encryped using an algorithm and a key
// you must know the key to decrypt the data

// const mySecret = 'i ate icecream and chips'

// //encrypt
// const myEncryption = crypto.AES.encrypt(mySecret, 'myEncKey')
// console.log(myEncryption.toString())

// //decrypt using key
// const myDecrypt = crypto.AES.decrypt(myEncryption.toString(), 'myEncKey')
// console.log(myDecrypt.toString(crypto.enc.Utf8)) // select character encoding

//hashing -- one way process

//1. hash functions always return the same size hash regardless of input
//2. has function return the same value for the same input
// all passwords will be hashed in the database

const myPassword = 'random123'
const hashedPw = bcrypt.hashSync(myPassword, 12) //second number is the salt
console.log(hashedPw)

// we can only compare strings to a hash to see if they match
console.log(bcrypt.compareSync('random12322', hashedPw))