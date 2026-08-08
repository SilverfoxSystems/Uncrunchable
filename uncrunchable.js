
import { NumLab } from "./NumLab.js"

export class uncrunchable {

    static #bufferTypes = [
        Int8Array, Uint8Array, Uint8ClampedArray,
        Int16Array, Uint16Array,
        Int32Array, 
        Float32Array, Float64Array,
        BigInt64Array, BigUint64Array,
        DataView
    ];

static #hasBuffer(value) {
    return bufferTypes.some(type => value instanceof type);
}



    /**
     * Encrypts an ArrayBuffer or an Uint32Array. .
     * @param {any} data - An Uint32Array(fastest), an ArrayBuffer (or any other type which supports exposing the ArrayBuffer) to encrypt.    The last element in the Uint32Array must be non-zero, zeroes on the end will be ignored.   ArrayBuffer and other types of arrays have no limitations, other than it must not end with approximately 16000 zero-bytes.
      * @param {number} nd - Recommended values: 1 to 300
     * @param {BigInteger} key1 - 64-bit key
     * @param {BigInteger} key2 - 64-bit key
     */
    static Encrypt(data, nd, key1, key2) {
        const cl = new NumLab

        

        if (data  instanceof Uint32Array) {
            //if (typeof data == Uint32Array) {


            return cl.DirectConvertArray32(UInt32array, nd, key1, key2)
        //} else if (typeof data == ArrayBuffer) {
        } else if (data instanceof ArrayBuffer) {

            return cl.DirectConvertByteArrayBuff(data, nd, key1, key2)

       // return cl.DirectConvertArray8(data, nd, key1, key2)
        } else if (this.#hasBuffer( data) ) {

            //return cl.DirectConvertByteArrayBuff(data, nd, key1, key2)

            return cl.DirectConvertArray8(data.buffer, nd, key1, key2)

        } else {
        //    throw new Error("Only Uint32Array and ArrayBuffer are supported by this operation")
            throw new Error("Provided data does not expose an ArrayBuffer. Please see the definition for the first argument.")
        }


    }


    static Decrypt(data, nd, key1, key2) {

//        return cl.DirectConvertArray32(UInt32array, nd, key2, key1)

        //UInt32array


        const cl = new NumLab
        if (data instanceof Uint32Array) {

        //if (typeof data == Uint32Array) {


            return cl.DirectConvertArray32(UInt32array, nd, key2, key1)
        //} else if (typeof data == ArrayBuffer) {
        } else if (data instanceof ArrayBuffer) {


            //return cl.DirectConvertByteArrayBuff(data, nd, key2, key1)
            return cl.DirectConvertArray8(data, nd, key2, key1)

        } else if (this.#hasBuffer(data)) {
            return cl.DirectConvertArray8(data.buffer, nd, key2, key1)



        } else {
//            throw new Error("Only Uint32Array and ArrayBuffer are supported by this operation")
            throw new Error("Provided data does not expose an ArrayBuffer. Please see the definition for the first argument.")
        }

    }





    

}
