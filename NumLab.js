/*!
 * Copyright (c) 2026 Izidor Zupančič. All rights reserved.
 *
 * This source code is licensed under a proprietary licence.
 * You may use and distribute this file in accordance  with the terms of the license, meaning, among other requirements:
 * When redistributing this file, an app has to be provided to the end user hich is the equivalent 64-bit Windows version of your app or library that uses the freely available JavaScript library.
 *
 * For details, see: https://github.com/SilverfoxSystems/Uncrunchable/blob/main/LICENCE.MD
 */

export class NumLab {
    static #signSt = false;

    rezult = 0n;
    #vel = 0;
    #velPoz = 0
    #IXmax = 0
    #x = 0n
    #isZero = false
    #bsN = 0
    #acc = []// = new bigInt64Array
    #sign = false
    #bs1 = []// new BigInt64Array()

    #multiplier = 0n

    #defBS(n, v) {

        if (v % BigInt(2)) {
            //v = Math.floor(v / BigInt(2))
            v = v / BigInt(2)
        } else {
            v /= BigInt(-2)
        }


        //    multiplier = 1n;
        this.bsN = n;

        if (v > 0) {
            this.vel = v
            this.velPoz = this.vel
            this.x = BigInt(1) + this.vel * BigInt(2)
            ///x = 1 + vel * 2
        } else if (v < 0) {
            this.vel = -v
            this.velPoz = this.vel - BigInt(1)
            this.x = BigInt(this.vel * BigInt(2))
        } else {

            //exception

        }

        this.IXmax = 0

        this.acc = []// new Array(bsN+1)// BigInt64Array(bsN + 1)
        for (let i = 0; i <= n; i++) {
            this.acc.push(0n)
        }
    }

    #defLvl(v) {

        if (v % BigInt(2)) {
            v = (v / BigInt(2))
        } else {
            v /= BigInt(-2)
        }


        //    multiplier = 1n;
        //this.bsN = n;

        if (v > 0) {
            this.vel = v
            this.velPoz = this.vel
            this.x = BigInt(1) + this.vel * BigInt(2)
            ///x = 1 + vel * 2
        } else if (v < 0) {
            this.vel = -v
            this.velPoz = this.vel - BigInt(1)
            this.x = this.vel * BigInt(2)
        } else {

            //exception

        }

        this.IXmax = 0


    }




    #PorazdeliVBs() {

        this.multiplier = 1n
        //   var r = 0n
        this.rezult = 0n
        this.currIX = 0
        this.isZero = false


        while (!this.isZero) {
            this.isZero = true
            this.#Porazdeli()

            this.currIX += this.bsN

        }

        this.IXmax = this.currIX
        //return r


    }


    #Porazdeli() {

        var ost
        var aix = 0
        var u = this.currIX + this.bsN - 1;

        for (let i = this.currIX; i <= u; i++) {
            ost =  this.acc[aix] % this.x
            //ost =BigInt( acc[aix] % x);
            this.acc[aix] /= this.x



            if (ost > this.velPoz) {

                this.rezult += (ost - this.x) * this.multiplier
                this.acc[aix]++
            } else if (ost < -this.vel) {
                this.rezult += (ost + this.x) * this.multiplier
                this.acc[aix]--
            } else {
                this.rezult += ost * this.multiplier


            }

            if (this.acc[aix]) {
                this.acc[aix + 1] += this.acc[aix]
                this.isZero = false

            }

            this.multiplier *= this.x
            aix++
        }
    }

    #countDwords() {
        var n = 0
        var nr = this.rezult
        if (nr < 0) {
            nr = -nr
        }
        while (nr > 0) {
            n++
            nr >>= 32n

        }
        return n
    }

    #cel2bs() {

        //var bsBuffSize = (Number(Math.log(rezult) / (Math.log(x))))
        //var bsBuffSize = 4 * bsN

        var lenn = this.#countDwords()
        var bsBuffSize = (8 * this.bsN) + Math.floor((32 * lenn * Math.log(2)) / (Math.log(Number(this.x))))

        //var bsBuffSize = Math.round((Math.log(Number(rezult)) / (Math.log(Number(x)))))
        //   var bsBuffSize = 15 + ((64 *  Math.log(2)) / (bsN * Math.log(Number(x))))

        this.bs1 = new BigInt64Array(bsBuffSize + 1)

        var nr = this.rezult

        var tmp = 1n
        var baseX = 0n
        var i = 0

        while (tmp < 0xffffffffffffffffn) {
            //while (tmp & 0x0000000000000000 == 0) {

            baseX = tmp & 0xffffffffffffffffn
            tmp *= this.x
            i += 1
        }
        var xb = i - 2
        var ost = 0n
        var ix = 0
        var ostX

        while (nr) {

            ostX = nr % baseX
            nr /= baseX

            for (let n1 = 0; n1 <= xb; n1++) {

                ost = ostX % this.x
                ostX /= this.x
                if (ost > this.velPoz) {
                    //bs1.push(BigInt(ost - x))
                    this.bs1[ix] = ost - this.x

                    if (n1 === xb) {
                        nr++

                    } else {
                        ostX++
                    }
                } else if (ost < -this.vel) {
                    //bs1.push(BigInt(ost + x))
                    this.bs1[ix] = ost + this.x

                    if (n1 === xb) {
                        nr--

                    } else {
                        ostX--
                    }
                } else {
                    //                bs1.push(BigInt(ost))
                    this.bs1[ix] = ost
                }
                ix += 1
                if (ix >= bsBuffSize) {

                    bsBuffSize += 4 * this.bsN
                    this.#enlargeBuff(bsBuffSize)
                }
            }
            nr += ostX

        }
        this.IXmax = ix + this.bsN - (ix % this.bsN)

    }

    #enlargeBuff(buffSz) {

        // var tmp = new Array(buffSz + 1)
        var tmp = new BigInt64Array(buffSz + 1)
        tmp.set(this.bs1, 0)
        this.bs1 = tmp
        //    return 
    }

    #vkupiVaN() {

        this.acc = []// new Array(bsN + 1)
        for (let i = 0; i <= this.bsN; i++) {
            this.acc.push(0n)
        }
        var z = this.IXmax + this.bsN - 1

        for (this.currIX = z; this.currIX >= this.bsN - 1; this.currIX -= this.bsN) {

            this.#vkupiN()
        }


        this.currIX = 0
        this.multiplier = 1n

        this.#Porazdeli()

    }

    #vkupiN() {

        var ost1 = -1n// BigInt.asIntN(64, -1n)
        var aix = this.bsN - 1

        const l = this.bs1.length
        if (this.currIX >= l) {
            this.#enlargeBuff(this.currIX)
        }


        for (var i = this.currIX; i >= this.currIX - this.bsN + 1; i--) {

            this.acc[aix] += BigInt(this.bs1[i])
            ost1 = this.acc[aix]
            this.acc[aix] *= this.x
            this.acc[aix + 1] -= ost1

            aix--
        }
    }



    static #unSgn2bal(ints) {

        //document.getElementById("Text11").innerHTML += " " + qwords[i].toString(16)
        var ost = 0

        for (var i = 0; i < ints.length; i += 2) {

            if (ost) {
                if (ints[i] == 0xffffffff) {
                    ost = 1
                    ints[i] = 0

                } else {
                    ost = 0
                    ints[i]++
                }
            } else {

            }
            if (NumLab.#signSt) ints[i] ^= 0xffffffff
            //   ost = 0n
            if (ost) {
                if (ints[i + 1] == 0x7fffffff) {
                    ost = 1
                    ints[i + 1] = 0x80000000

                } else if (ints[i + 1] == 0xffffffff) {
                    ints[i + 1] = 0

                } else {
                    ints[i + 1]++

                    if (ints[i + 1] & 0x80000000) {
                        ost = 1

                    } else {
                        ost = 0
                    }
                }

            } else {
                if (ints[i + 1] & 0x80000000) {
                    ost = 1

                    //} else {
                    //       ost=0
                }

            }

            if (NumLab.#signSt) ints[i + 1] ^= 0xffffffff



        }


    }



    static #bal2unSgn(ints) {
        var ost

        var l = ints.length
        if (l & 1) {
            NumLab.#signSt = false
        } else {

            if (ints[l - 1] & 0x80000000) {
                NumLab.#signSt = true

            } else {
                NumLab.#signSt = false

            }

        }

        for (var i = 0; i < l; i += 2) {



            if (NumLab.#signSt) {
                ints[i] ^= 0xffffffff
                ints[i + 1] ^= 0xffffffff
            }

            if (ost) {
                if (ints[i] == 0x00000000) {
                    ost = 1
                    ints[i] = 0xffffffff

                } else {
                    ost = 0
                    ints[i]--
                }
            } else {

            }

            //   ost = 0n
            if (ost) {
                if (ints[i + 1] == 0x80000000) {
                    ost = 1
                    ints[i + 1] = 0x7fffffff

                } else {
                    ints[i + 1]--

                    //if (ints[i + 1] & 0x80000000) {
                    ost = (ints[i + 1] & 0x80000000)


                }

            } else {
                if (ints[i + 1] & 0x80000000) {
                    ost = 1

                } else {
                    //                ost=0
                }




            }





        }


    }

    #enlargeArray(ar, buffSz) {

        // var tmp = new Array(buffSz + 1)
        var tmp = new Uint32Array(buffSz)// + 1)
        //var tmp = new Int32Array(buffSz + 1)
        tmp.set(ar, 0)
        ar = tmp
        //    return 
    }

    static #shrinkArray(ar, buffSz) {

        // var tmp = new Array(buffSz + 1)
        var tmp = new Uint32Array(buffSz)
        //var tmp = new Int32Array(buffSz + 1)
        tmp.set(ar.subarray(0, buffSz), 0)
        //ar =
        return tmp
    }

    #array32toN(dwords) {
        this.rezult = 0n
        const l = dwords.length
        //for (var i = 0; i < l; i++) {
        for (var i = l - 1; i >= 0; i--) {
            //this.rezult = (this.rezult << 32n) + dwords[i]
            this.rezult <<= 32n
            this.rezult += BigInt(dwords[i])
            // rezult += BigInt(dwords[i])

        }

        if (NumLab.#signSt) this.rezult = -this.rezult
    }


    #n2array32() {

        //rezult = -0x700000000000000011111111111111111111122222222222222222222222222888888888888888888888888888888888888888n

        //    var bytes = []// Uint8Array// = Number(rezult & 0xffn);
        var lenn = this.#countDwords()

        // var dwords = new Int32Array(lenn)
        var dwords = new Uint32Array(lenn)

        //var dwords = []
        //for (let i = bsN - 2; i >= 0; i--) {
        var i = 0
        // document.getElementById("Text11").innerHTML += "<br /> "
        NumLab.#signSt = false

        var ost = 0
        var nmbr

        //            rezult = -0x7000000000000000n

        if (this.rezult < 0) {

            this.rezult = -this.rezult
            NumLab.#signSt = true
        }

        //rezult= BigInt.asUintN(64 * 8, rezult)
        //qwords.push(Number(BigInt.asUintN(32, rezult)))

        while (this.rezult) {

            //if (sign) {
            // dwords.push(!Number(rezult & 0xffffffffn));

            // } else {

            dwords[i] = (Number(this.rezult & 0xffffffffn));

            //--dwords.push(Number(this.rezult & 0xffffffffn));


            //if ((dwords[i] & 0x80000000) & (i>0)) dwords[i-1]++
            //if ((dwords[i]<0) & (i>0)) dwords[i-1]++

            //dwords.push(Number(BigInt.asUintN(32 , rezult)))
            //rezult = unsignedRightShift64(rezult,64)
            //                rezult = BigInt.asUintN(64 * 8, rezult) >> 32n
            this.rezult >>= 32n
            //                    document.getElementById("Text11").innerHTML += " " + dwords[i].toString(16)
            i++
            if (i > dwords.length) { this.#enlargeArray(dwords, dwords.length + 8) }
            //   }
        }

        //dwords.reverse()

        return dwords

    }


    //var q = new DataView(rezult, 8)

    //document.getElementById("Text11").innerHTML += "<br>" + qwords

    #saveData(ints) {
        ints = new Uint32Array(n2array32())
        unSgn2bal(ints)

    }

    #loadData(ints) {


        bal2unSgn(ints)
        array32toN(ints)

    }


    toPointND(nDims, Lvl) {
        this.#defBS(nDims, Lvl)
        this.#resolve()
        return this.acc

    }

    toNumber(Lvl) {
        this.#defLvl(BigInt(Lvl))
        this.#PorazdeliVBs()
        return this.rezult
    }

    #unify() {
        //defBS(nItems, base)
        //for (var i = 0; i < BigIntegerArray.count; i++) {

        // acc[i] = BigIntegerArray[i]



        this.#PorazdeliVBs()

    }
    // 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890

    #resolve() {


        this.#cel2bs();
        this.#vkupiVaN();
    }


    DirectConvert(nd, EntryLvl, OutputLvl) {

        if (EntryLvl == OutputLvl) {
            throw new Error("Entry and output levels must not match.")
        };

        if ((EntryLvl < 3)) {
            throw new Error("Entry level cannot be less than three.")
        }
        if ((OutputLvl < 3)) {
            throw new Error("Output level cannot be less than three.")
        }

        //rezult=h
        //this.#defBS()
        this.#defBS(nd, EntryLvl)
        this.#resolve()
        // this.x = OutputLvl
        this.#defLvl(OutputLvl)
        this.#unify()
        return this.rezult
    }


    assignNumberFromString(s) {

        try {
            var s1 = s.trim()
            if (s1.startsWith("-")) {


                this.rezult = -BigInt(s1.slice(1))


            } else {
                this.rezult = BigInt(s)
            }
            return ""
        } catch (er) {
            // document.getElementById("Text11").innerText += " Error: " + er.name + " - " + er.message
            return er.message
        }

    }


    assignNumArrayFromString(s) {

        try {

            var ss = s.split(",")//  document.getElementById("Text1").value.split(",")
            // var l = document.getElementById("lvl").value

            if (ss.length < 1) throw new Error("Empty string.") // return false;

            this.#defBS(ss.length, BigInt(2));
            //document.getElementById("Text11").innerText += "\n"

            let i = this.bsN - 1;

            let s1 = ss[0].trim()
            this.acc[i] = BigInt(s1)
            //document.getElementById("Text11").innerText += acc[i]

            for (i = this.bsN - 2; i >= 0; i--) {

                //            acc[bsn - i - 1] = BigInt(ss[i].trim(" "))
                this.acc[i] = BigInt(ss[this.bsN - i - 1].trim())
                //document.getElementById("Text11").innerText += ", " + acc[i]
                //        document.getElementById("Text11").innerText += ", " + acc[bsN-i-1]



            }

            return ""// true
            // document.getElementById("Text11").innerText +=  acc
        } catch (er) {
            //document.getElementById("Text11").innerText += " Error: " + er.name + " - " + er.message
            return er.message

        }
    }

    DirectConvertArray32(ar, nd, EntryLvl, OutputLvl) {

        NumLab.#bal2unSgn(ar)

        this.#array32toN(ar)

        this.DirectConvert(nd, BigInt(EntryLvl), BigInt(OutputLvl))
        //this.DirectConvert(nd, BigInt(OutputLvl), BigInt(EntryLvl))

        ar = this.#n2array32()
        NumLab.#unSgn2bal(ar)

        return ar

    }

    countLeading0s(b) {
        let u = b.byteLength
        //let vi = new DataView(b)
        let b0 = new Uint8Array(b)
        var i = 0
        for (i = u - 1; i >= 0; i--) {

            //if (vi.getUint8[i]) break
            if (b0[i]) break
        }
        return u - i - 1
    }

    int32arr2bytes(ui32, leading0s) {
        var uiCnt = ui32.length
        var bCnt = uiCnt << 2
        var tester = 255 << 24
        var i = 0
        var tested = ui32[ui32.length - 1]
        for (i = 3; i >= 0; i--) {
            if (tested & tester) break
            tester >>= 8
        }
        var offset = 3 - i

        //var arB = ui32.buffer
        var arB = new ArrayBuffer(bCnt, { maxByteLength: bCnt + 0xffff })// - offset + leading0s)
        var vi = new DataView(arB)

        for (i = 0; i < uiCnt; i++) {
            //j = i << 2
            vi.setUint32(i << 2, ui32[i], true)
            //vi.get
        }
        //var bbbbbbbbb = new Uint8Array(arB)
        // bbbbbbbbb.set(ui32,0)



        var dif = leading0s - offset

        if (dif) {

            NumLab.#resizeBuff(arB, bCnt, - offset + leading0s)
        }

        return arB

    }

    static #resizeBuff(arB, currSize, dif) {

        var vi;
        const oldData = new Uint8Array(arB)

        //arB.resize(currSize + dif)
        var arb1 = new ArrayBuffer(currSize+dif)
        

        vi = new Uint8Array(arb1)
        if (dif < 0) {
            vi.set(oldData.subarray(0, vi.length))

        } else if (dif > 0) {
            vi.set(oldData)
        }

        arB=arb1

    }

    bytes2int32arr(b) {


        const bCnt = b.byteLength
        var ost = bCnt & 3
        //bCnt += 4 - ost
        if (ost) {
            NumLab.#resizeBuff(b, bCnt, +4 - ost + 1)
        }

        var uiCnt = 1 + Math.floor(bCnt / 4)

        var ui32 = new Uint32Array(uiCnt)
        var j = 0
        var o = new DataView(b)
        if (ost == 0) { uiCnt -= 1 }
        //for (var i = uiCnt-1; i >= 0; i--) {
        for (var i = 0; i < uiCnt; i++) {
            //  j = i << 2
            //ui32[i] = (o.getUint8(j + 3) << 24) + (o.getUint8(j + 1) << 8) + (o.getUint8(j + 2) << 16) + o.getUint8(j)
            ui32[i] = o.getUint32(j, true)
            j += 4

        }

        return ui32

    }

    #cutZeroes(ar32) {

        var i = 0
        var l = ar32.length
        for (i = l - 1; i >= 0; i--) {
            if (ar32[i]) break
        }

        if (i < l - 1) {
            //            ar32 =
            return NumLab.#shrinkArray(ar32, i + 1)

        }
        return ar32


    }

    DirectConvertArray8(b, nd, EntryLvl, OutputLvl) {


        var l0s = this.countLeading0s(b)
        //if (l0s) {            b = NumLab.#resizeBuff(b, b.byteLength,-l0s)        }

        var ar = this.bytes2int32arr(b)

        NumLab.#bal2unSgn(ar);
        ar = this.#cutZeroes(ar)
        this.#array32toN(ar)
        this.DirectConvert(nd, BigInt(EntryLvl), BigInt(OutputLvl))
        //this.DirectConvert(nd, BigInt(OutputLvl), BigInt(EntryLvl))

        ar = this.#n2array32()
        NumLab.#unSgn2bal(ar)

        ar = this.#cutZeroes(ar)

        return this.int32arr2bytes(ar, l0s)



    }


    balanced64ArrayToN(arr) {

        this.rezult = 0n
        for (let i = 0; i < arr.length; i++) {
            let d = arr[i];

            if (d === -0x8000000000000000n) {
                d = 0x8000000000000000n;
            }

            this.rezult += d << (64n * BigInt(i));

        }





    }



    bigIntToBalanced64Array() {
            const digits = [];

            const BASE = 1n << 64n;
            const LIMB_MASK = BASE - 1n;
            const POS_2_63 = 1n << 63n;
            const NEG_2_63 = -POS_2_63;



        while (this.rezult) {
            // extract 64-bit digit
            let d = this.rezult & LIMB_MASK;

                // convert to signed range [-2^63, +2^63]
                if (d >= POS_2_63) {
                    d -= BASE; // map to negative range
                }

                // map +2^63 → -2^63 for BigInt64Array storage
                if (d === POS_2_63) {
                    d = NEG_2_63;
                }

                digits.push(d);

            this.rezult = this.rezult >= 0n ? this.rezult >> 64n : (this.rezult + BASE) >> 64n;
            //this.rezult >>= 64n;
            }

            return new BigInt64Array(digits);
        }






    #bigIntToBalanced64Array() {
        const BASE = 1n << 64n;
        const LIMB_MASK = BASE - 1n;
        const POS_2_63 = 1n << 63n;
        const NEG_2_63 = -POS_2_63;

        //let x = this.rezult;
        const limbs = [];

        while (this.rezult) {
            // extract raw 64-bit chunk
            let d = this.rezult & LIMB_MASK;

            // convert to balanced range [-2^63, +2^63]
            if (d >= POS_2_63) {
                d -= BASE;
            }

            // balanced digit +2^63 must be stored as -2^63
            if (d === POS_2_63) {
                d = NEG_2_63;
            }

            limbs.push(d);
            //this.rezult >>= 64n;

            this.rezult = this.rezult >= 0n ? this.rezult >> 64n : (this.rezult + BASE) >> 64n
        }
        //        x = x >= 0n ? x >> 64n : (x + BASE) >> 64n
        return new BigInt64Array(limbs);
    }



    ByteArrayBufferToN(buf) {

    var len = buf.byteLength;
        var ost = len & 7
        //len += 4 - ost
        if (ost) {
            NumLab.#resizeBuff(buf, len, +8 - ost + 1)
        }
        len = buf.byteLength;

        const view = new DataView(buf);

    const NEG_2_63 = -0x8000000000000000n;  // -2^63
    const POS_2_63 = 0x8000000000000000n;  // +2^63
    const BASE = 0x10000000000000000n; // 2^64

        this.rezult = 0n;
    let factor = 1n; // BASE^0, BASE^1, ...

    for (let offset = 0; offset < len-8; offset += 8) {
        const lo = BigInt(view.getUint32(offset, true));
        const hi = BigInt(view.getInt32(offset + 4, true)); // signed high half

        let d = (hi << 32n) | lo;

        if (d === NEG_2_63) {
            d = POS_2_63;
        }

        this.rezult += d * factor;
        factor *= BASE;
    }

}



ByteArrayBufferToNold2(buf) {
    const view = new DataView(buf);
    const len = buf.byteLength;

     rezult = 0n;
    let shift = 0n;

    const NEG_2_63 = -0x8000000000000000n;
    const POS_2_63 = 0x8000000000000000n;
    const BASE = 0x10000000000000000n; // 2^64

    for (let offset = 0; offset < len; offset += 8) {
        const lo = BigInt(view.getUint32(offset, true));
        const hi = BigInt(view.getInt32(offset + 4, true)); // signed

        // signed 64-bit limb
        let d = (hi << 32n) | lo;

        // fix stored +2^63 (encoded as -2^63)
        if (d === NEG_2_63) {
            d = POS_2_63;
        }

        // accumulate in balanced base 2^64
        rezult += d * (BASE ** (offset / 8));
    }

    return result;
}


ByteArrayBufferToNold(buf) {
    const view = new DataView(buf);
    const len = buf.byteLength;



     rezult = 0n;
    let shift = 0n;


    var ost =len & 7
    //bCnt += 4 - ost
   // if (ost) {
      //  NumLab.#resizeBuff(arb, arb.length, +8 - ost + 1)
   // }/

    for (let offset = 0; offset < len; offset += 8) {
        // read as unsigned 64-bit little-endian
        const lo = BigInt(view.getUint32(offset, true));
        const hi = BigInt(view.getUint32(offset + 4, true));

        const limb = (hi << 32n) | lo;

        rezult += limb << shift;
        shift += 64n;
    }

   // let i = offset

//    if (ost) {

   //     for (offset = 0; offset < ost; offset ++) {

    //}
   // return result;
}

    //0x80000000
    //0x7fffffff



bigIntToBalancedArrayBuffer(l0s) {
    const BASE =  0x80000000// 1n << 64n;
    const LIMB_MASK = 0x7fffffff// BASE - 1n;
    const POS_2_63 = 1n << 63n;
    const NEG_2_63 = -POS_2_63;

    //let x = N;
    const limbs = [];


    
    while (this.rezult) {
        // extract 64-bit limb
        let d = this.rezult & LIMB_MASK;

        // convert to balanced range [-2^63, +2^63]
        if (d >= POS_2_63) {
            d -= BASE;
        }

        // map +2^63 → -2^63 for storage (BigInt64Array/DataView)
        if (d === POS_2_63) {
            d = NEG_2_63;
        }

        limbs.push(d);
        rezult >>= 64n;
    }

    // allocate buffer
    const buf = new ArrayBuffer(l0s+limbs.length * 8);
    const view = new DataView(buf);

    // write limbs little-endian
    for (let i = 0; i < limbs.length; i++) {
        const d = limbs[i];

        // split into hi/lo halves
        const lo = Number(d & 0xFFFFFFFFn);
        const hi = Number((d >> 32n) & 0xFFFFFFFFn);

        view.setUint32(i * 8, lo, true);
        view.setInt32(i * 8 + 4, hi, true); // signed high half
    }

    return buf;
}



    DirectConvertArray64(ar, nd, EntryLvl, OutputLvl) {


        this.balanced64ArrayToN(ar)
//        this.#array32toN(ar)
        this.DirectConvert(nd, BigInt(EntryLvl), BigInt(OutputLvl))
        
        return this.bigIntToBalanced64Array() //this.int32arr2bytes(ar, l0s)



    }

    array64toBytesArrayBuff(ar, l0s) {


        //var tester = 255 << 56
        //var i = 0
        //var tested = ar[ar.length - 1]
        //for (i = 3; i >= 0; i--) {
           // if (tested & tester) break
            //tester >>= 8
        // }
        var l = ar.length
        var offset = this.countLeading0s64(ar[l-1]) //8-i


        var dif = l0s - offset
        var le = l * 8 + dif

        var arB = new ArrayBuffer(le, { maxByteLength: le + 0xffff })
        var vi = new DataView(arB)
        var j=0
        var i=0
        if (dif < 0) {

            for (i = 0; i < l - 1; i++) {
                vi.setUint32(j, Number(ar[i] & 0xffffffffn), true)
                vi.setUint32(j + 4, Number((ar[i] >> 32n) & 0xffffffffn), true)
                j += 8

            }


            let a = ar[i]

            for (i = 0; i < 8 + dif; i++) {

                vi.setUint8(j, Number(a & 0xffn),true)
                a >>= 8n
           j++
            }


        //    while (a) {
            // NumLab.#resizeBuff(arB, bCnt, - offset + leading0s)
        } else {
            //if (dif>0) {

            for (i = 0; i < l; i++) {
                vi.setUint32(j, Number(ar[i] & 0xffffffffn),true)
                vi.setUint32(j + 4, Number((ar[i] >> 32n) & 0xffffffffn),true)
                j += 8

            }

        }

        return arB

    }

    countLeading0s64(a) {
        var count = 0

        let hi32 = Number((BigInt( a) >> 32n) & 0xFFFFFFFFn);
        if (hi32 === 0) {
            count += 4;
        } else {
            if ((hi32 & 0xFF000000) === 0) count++;
            if ((hi32 & 0x00FF0000) === 0) count++;
            if ((hi32 & 0x0000FF00) === 0) count++;
            if ((hi32 & 0x000000FF) === 0) count++;
            //return count;
        }

        // then low 32 bits
        let lo32 = Number(a & 0xFFFFFFFFn);
        if (lo32 === 0) {
            count += 4;
            // return count;
        } else {
            if ((lo32 & 0xFF000000) === 0) count++;
            if ((lo32 & 0x00FF0000) === 0) count++;
            if ((lo32 & 0x0000FF00) === 0) count++;
            if ((lo32 & 0x000000FF) === 0) count++;
        }
              return count;


    }


    DirectConvertByteArrayBuff(arb, nd, EntryLvl, OutputLvl) {


        var l0s = this.countLeading0s(arb)

        
        this.ByteArrayBufferToN(arb)

        this.DirectConvert(nd, BigInt(EntryLvl), BigInt(OutputLvl))

var i64=  this.bigIntToBalanced64Array()//.bigIntToBalancedArrayBuffer(l0s)



        return this.array64toBytesArrayBuff(i64,l0s)

    }

}

            
