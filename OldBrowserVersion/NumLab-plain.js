
     signSt = false;


    rezult = 0n;
    vel = 0;
    velPoz = 0
    IXmax = 0
    x = 0n
    isZero = false
    bsN = 0
    acc = []// = new bigInt64Array
    sign = false
    bs1 = []// new BigInt64Array()

    multiplier = 0n

  function  defBS(n, v) {

        if (v % BigInt(2)) {
            //v = Math.floor(v / BigInt(2))
            v = v / BigInt(2)
        } else {
            v /= BigInt(-2)
        }


        //    multiplier = 1n;
        bsN = n;

        if (v > 0) {
            vel = v
            velPoz = vel
            x = BigInt(1) + vel * BigInt(2)
            ///x = 1 + vel * 2
        } else if (v < 0) {
            vel = -v
            velPoz = vel - BigInt(1)
            x = BigInt(vel * BigInt(2))
        } else {

            //exception

        }

        IXmax = 0

        acc = []// new Array(bsN+1)// BigInt64Array(bsN + 1)
        for (let i = 0; i <= n; i++) {
            acc.push(0n)
        }
    }

function defLvl(v) {

        if (v % BigInt(2)) {
            v = (v / BigInt(2))
        } else {
            v /= BigInt(-2)
        }


        //    multiplier = 1n;
        //bsN = n;

        if (v > 0) {
            vel = v
            velPoz = vel
            x = BigInt(1) + vel * BigInt(2)
            ///x = 1 + vel * 2
        } else if (v < 0) {
            vel = -v
            velPoz = vel - BigInt(1)
            x = vel * BigInt(2)
        } else {

            //exception

        }

        IXmax = 0


    }




function PorazdeliVBs() {

        multiplier = 1n
        //   var r = 0n
        rezult = 0n
        currIX = 0
        isZero = false


        while (!isZero) {
            isZero = true
            Porazdeli()

            currIX += bsN

        }

        IXmax = currIX
        //return r


    }


function Porazdeli() {

        var ost
        var aix = 0
        var u = currIX + bsN - 1;

        for (let i = currIX; i <= u; i++) {
            ost = acc[aix] % x
            //ost =BigInt( acc[aix] % x);
            acc[aix] /= x



            if (ost > velPoz) {

                rezult += (ost - x) * multiplier
                acc[aix]++
            } else if (ost < -vel) {
                rezult += (ost + x) * multiplier
                acc[aix]--
            } else {
                rezult += ost * multiplier


            }

            if (acc[aix]) {
                acc[aix + 1] += acc[aix]
                isZero = false

            }

            multiplier *= x
            aix++
        }
    }

function countDwords() {
        var n = 0
        var nr = rezult
        if (nr < 0) {
            nr = -nr
        }
        while (nr > 0) {
            n++
            nr >>= 32n

        }
        return n
    }

function cel2bs() {

        //var bsBuffSize = (Number(Math.log(rezult) / (Math.log(x))))
        //var bsBuffSize = 4 * bsN

        var lenn = countDwords()
        var bsBuffSize = (8 * bsN) + Math.floor((32 * lenn * Math.log(2)) / (Math.log(Number(x))))

        //var bsBuffSize = Math.round((Math.log(Number(rezult)) / (Math.log(Number(x)))))
        //   var bsBuffSize = 15 + ((64 *  Math.log(2)) / (bsN * Math.log(Number(x))))

        bs1 = new BigInt64Array(bsBuffSize + 1)

        var nr = rezult

        var tmp = 1n
        var baseX = 0n
        var i = 0

        while (tmp < 0xffffffffffffffffn) {
            //while (tmp & 0x0000000000000000 == 0) {

            baseX = tmp & 0xffffffffffffffffn
            tmp *= x
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

                ost = ostX % x
                ostX /= x
                if (ost > velPoz) {
                    //bs1.push(BigInt(ost - x))
                    bs1[ix] = ost - x

                    if (n1 === xb) {
                        nr++

                    } else {
                        ostX++
                    }
                } else if (ost < -vel) {
                    //bs1.push(BigInt(ost + x))
                    bs1[ix] = ost + x

                    if (n1 === xb) {
                        nr--

                    } else {
                        ostX--
                    }
                } else {
                    //                bs1.push(BigInt(ost))
                    bs1[ix] = ost
                }
                ix += 1
                if (ix >= bsBuffSize) {

                    bsBuffSize += 4 * bsN
                    enlargeBuff(bsBuffSize)
                }
            }
            nr += ostX

        }
        IXmax = ix + bsN - (ix % bsN)

    }

function enlargeBuff(buffSz) {

        // var tmp = new Array(buffSz + 1)
        var tmp = new BigInt64Array(buffSz + 1)
        tmp.set(bs1, 0)
        bs1 = tmp
        //    return 
    }

function vkupiVaN() {

        acc = []// new Array(bsN + 1)
        for (let i = 0; i <= bsN; i++) {
            acc.push(0n)
        }
        var z = IXmax + bsN - 1

        for (currIX = z; currIX >= bsN - 1; currIX -= bsN) {

            vkupiN()
        }


        currIX = 0
        multiplier = 1n

        Porazdeli()

    }

function vkupiN() {

        var ost1 = -1n// BigInt.asIntN(64, -1n)
        var aix = bsN - 1

        const l = bs1.length
        if (currIX >= l) {
            enlargeBuff(currIX)
        }


        for (var i = currIX; i >= currIX - bsN + 1; i--) {

            acc[aix] += BigInt(bs1[i])
            ost1 = acc[aix]
            acc[aix] *= x
            acc[aix + 1] -= ost1

            aix--
        }
    }



 function unSgn2bal(ints) {

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
            if (signSt) ints[i] ^= 0xffffffff
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

            if (signSt) ints[i + 1] ^= 0xffffffff



        }


    }



 function bal2unSgn(ints) {
        var ost

        var l = ints.length
        if (l & 1) {
            signSt = false
        } else {

            if (ints[l - 1] & 0x80000000) {
                signSt = true

            } else {
                signSt = false

            }

        }

        for (var i = 0; i < l; i += 2) {



            if (signSt) {
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

function enlargeArray(ar, buffSz) {

        // var tmp = new Array(buffSz + 1)
        var tmp = new Uint32Array(buffSz)// + 1)
        //var tmp = new Int32Array(buffSz + 1)
        tmp.set(ar, 0)
        ar = tmp
        //    return 
    }

 function shrinkArray(ar, buffSz) {

        // var tmp = new Array(buffSz + 1)
        var tmp = new Uint32Array(buffSz)
        //var tmp = new Int32Array(buffSz + 1)
        tmp.set(ar.subarray(0, buffSz), 0)
        //ar =
        return tmp
    }

function array32toN(dwords) {
        rezult = 0n
        const l = dwords.length
        //for (var i = 0; i < l; i++) {
        for (var i = l - 1; i >= 0; i--) {
            //rezult = (rezult << 32n) + dwords[i]
            rezult <<= 32n
            rezult += BigInt(dwords[i])
            // rezult += BigInt(dwords[i])

        }

        if (signSt) rezult = -rezult
    }


function n2array32() {

        //rezult = -0x700000000000000011111111111111111111122222222222222222222222222888888888888888888888888888888888888888n

        //    var bytes = []// Uint8Array// = Number(rezult & 0xffn);
        var lenn = countDwords()

        // var dwords = new Int32Array(lenn)
        var dwords = new Uint32Array(lenn)

        //var dwords = []
        //for (let i = bsN - 2; i >= 0; i--) {
        var i = 0
        // document.getElementById("Text11").innerHTML += "<br /> "
        signSt = false

        var ost = 0
        var nmbr

        //            rezult = -0x7000000000000000n

        if (rezult < 0) {

            rezult = -rezult
            signSt = true
        }

        //rezult= BigInt.asUintN(64 * 8, rezult)
        //qwords.push(Number(BigInt.asUintN(32, rezult)))

        while (rezult) {

            //if (sign) {
            // dwords.push(!Number(rezult & 0xffffffffn));

            // } else {

            dwords[i] = (Number(rezult & 0xffffffffn));

            //--dwords.push(Number(rezult & 0xffffffffn));


            //if ((dwords[i] & 0x80000000) & (i>0)) dwords[i-1]++
            //if ((dwords[i]<0) & (i>0)) dwords[i-1]++

            //dwords.push(Number(BigInt.asUintN(32 , rezult)))
            //rezult = unsignedRightShift64(rezult,64)
            //                rezult = BigInt.asUintN(64 * 8, rezult) >> 32n
            rezult >>= 32n
            //                    document.getElementById("Text11").innerHTML += " " + dwords[i].toString(16)
            i++
            if (i > dwords.length) { enlargeArray(dwords, dwords.length + 8) }
            //   }
        }

        //dwords.reverse()

        return dwords

    }


    //var q = new DataView(rezult, 8)

    //document.getElementById("Text11").innerHTML += "<br>" + qwords

    
function toPointND(nDims, Lvl) {
        defBS(nDims, Lvl)
        resolve()
        return acc

    }

function toNumber(Lvl) {
        defLvl(BigInt(Lvl))
        PorazdeliVBs()
        return rezult
    }

//function unify() {
   //        PorazdeliVBs()

    
    // 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890

//function resolve() {


   //     cel2bs();
      //  vkupiVaN();
    


function DirectConvert(nd, EntryLvl, OutputLvl) {

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
        //defBS()
        defBS(nd, EntryLvl)
        resolve()
        // x = OutputLvl
        defLvl(OutputLvl)
        unify()
        return rezult
    }


function assignNumberFromString(s) {

        try {
            var s1 = s.trim()
            if (s1.startsWith("-")) {


                rezult = -BigInt(s1.slice(1))


            } else {
                rezult = BigInt(s)
            }
            return ""
        } catch (er) {
            // document.getElementById("Text11").innerText += " Error: " + er.name + " - " + er.message
            return er.message
        }

    }


function assignNumArrayFromString(s) {

        try {

            var ss = s.split(",")//  document.getElementById("Text1").value.split(",")
            // var l = document.getElementById("lvl").value

            if (ss.length < 1) throw new Error("Empty string.") // return false;

            defBS(ss.length, BigInt(2));
            //document.getElementById("Text11").innerText += "\n"

            let i = bsN - 1;

            let s1 = ss[0].trim()
            acc[i] = BigInt(s1)
            //document.getElementById("Text11").innerText += acc[i]

            for (i = bsN - 2; i >= 0; i--) {

                //            acc[bsn - i - 1] = BigInt(ss[i].trim(" "))
                acc[i] = BigInt(ss[bsN - i - 1].trim())
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

function DirectConvertArray32(ar, nd, EntryLvl, OutputLvl) {

        bal2unSgn(ar)

        array32toN(ar)

        DirectConvert(nd, BigInt(EntryLvl), BigInt(OutputLvl))
        //DirectConvert(nd, BigInt(OutputLvl), BigInt(EntryLvl))

        ar = n2array32()
        unSgn2bal(ar)

        return ar

    }

function countLeading0s(b) {
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

function int32arr2bytes(ui32, leading0s) {
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

            resizeBuff(arB, bCnt, - offset + leading0s)
        }

        return arB

    }

function resizeBuff(arB, currSize, dif) {

        var vi;
        const oldData = new Uint8Array(arB)

        //arB.resize(currSize + dif)
        var arb1 = new ArrayBuffer(currSize + dif)


        vi = new Uint8Array(arb1)
        if (dif < 0) {
            vi.set(oldData.subarray(0, vi.length))

        } else if (dif > 0) {
            vi.set(oldData)
        }

        arB = arb1

    }

function bytes2int32arr(b) {


        const bCnt = b.byteLength
        var ost = bCnt & 3
        //bCnt += 4 - ost
        if (ost) {
            resizeBuff(b, bCnt, +4 - ost + 1)
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

function cutZeroes(ar32) {

        var i = 0
        var l = ar32.length
        for (i = l - 1; i >= 0; i--) {
            if (ar32[i]) break
        }

        if (i < l - 1) {
            //            ar32 =
            return shrinkArray(ar32, i + 1)

        }
        return ar32


    }

function DirectConvertArray8(b, nd, EntryLvl, OutputLvl) {


        var l0s = countLeading0s(b)
        //if (l0s) {            b = resizeBuff(b, b.byteLength,-l0s)        }

        var ar = bytes2int32arr(b)

        bal2unSgn(ar);
        ar = cutZeroes(ar)
        array32toN(ar)
        DirectConvert(nd, BigInt(EntryLvl), BigInt(OutputLvl))
        //DirectConvert(nd, BigInt(OutputLvl), BigInt(EntryLvl))

        ar = n2array32()
        unSgn2bal(ar)

        ar = cutZeroes(ar)

        return int32arr2bytes(ar, l0s)



    }


function balanced64ArrayToN(arr) {

        rezult = 0n
        for (let i = 0; i < arr.length; i++) {
            let d = arr[i];

            if (d === -0x8000000000000000n) {
                d = 0x8000000000000000n;
            }

            rezult += d << (64n * BigInt(i));

        }

    }



function bigIntToBalanced64Array() {
        const digits = [];

        const BASE = 1n << 64n;
        const LIMB_MASK = BASE - 1n;
        const POS_2_63 = 1n << 63n;
        const NEG_2_63 = -POS_2_63;



        while (rezult) {
            // extract 64-bit digit
            let d = rezult & LIMB_MASK;

            // convert to signed range [-2^63, +2^63]
            if (d >= POS_2_63) {
                d -= BASE; // map to negative range
            }

            // map +2^63 → -2^63 for BigInt64Array storage
            if (d === POS_2_63) {
                d = NEG_2_63;
            }

            digits.push(d);

            rezult = rezult >= 0n ? rezult >> 64n : (rezult + BASE) >> 64n;
            //rezult >>= 64n;
        }

        return new BigInt64Array(digits);
    }






function bigIntToBalanced64Array() {
        const BASE = 1n << 64n;
        const LIMB_MASK = BASE - 1n;
        const POS_2_63 = 1n << 63n;
        const NEG_2_63 = -POS_2_63;

        //let x = rezult;
        const limbs = [];

        while (rezult) {
            // extract raw 64-bit chunk
            let d = rezult & LIMB_MASK;

            // convert to balanced range [-2^63, +2^63]
            if (d >= POS_2_63) {
                d -= BASE;
            }

            // balanced digit +2^63 must be stored as -2^63
            if (d === POS_2_63) {
                d = NEG_2_63;
            }

            limbs.push(d);
            //rezult >>= 64n;

            rezult = rezult >= 0n ? rezult >> 64n : (rezult + BASE) >> 64n
        }
        //        x = x >= 0n ? x >> 64n : (x + BASE) >> 64n
        return new BigInt64Array(limbs);
    }



function ByteArrayBufferToN(buf) {

        var len = buf.byteLength;
        var ost = len & 7
        //len += 4 - ost
        if (ost) {
            resizeBuff(buf, len, +8 - ost + 1)
        }
        len = buf.byteLength;

        const view = new DataView(buf);

        const NEG_2_63 = -0x8000000000000000n;  // -2^63
        const POS_2_63 = 0x8000000000000000n;  // +2^63
        const BASE = 0x10000000000000000n; // 2^64

        rezult = 0n;
        let factor = 1n; // BASE^0, BASE^1, ...

        for (let offset = 0; offset < len - 8; offset += 8) {
            const lo = BigInt(view.getUint32(offset, true));
            const hi = BigInt(view.getInt32(offset + 4, true)); // signed high half

            let d = (hi << 32n) | lo;

            if (d === NEG_2_63) {
                d = POS_2_63;
            }

            rezult += d * factor;
            factor *= BASE;
        }

    }



function ByteArrayBufferToNold2(buf) {
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


    


function bigIntToBalancedArrayBuffer(l0s) {
        const BASE = 0x80000000// 1n << 64n;
        const LIMB_MASK = 0x7fffffff// BASE - 1n;
        const POS_2_63 = 1n << 63n;
        const NEG_2_63 = -POS_2_63;

        //let x = N;
        const limbs = [];



        while (rezult) {
            // extract 64-bit limb
            let d = rezult & LIMB_MASK;

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
        const buf = new ArrayBuffer(l0s + limbs.length * 8);
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



function DirectConvertArray64(ar, nd, EntryLvl, OutputLvl) {


        balanced64ArrayToN(ar)
        //        array32toN(ar)
        DirectConvert(nd, BigInt(EntryLvl), BigInt(OutputLvl))

        return bigIntToBalanced64Array() //int32arr2bytes(ar, l0s)



    }

function array64toBytesArrayBuff(ar, l0s) {


        //var tester = 255 << 56
        //var i = 0
        //var tested = ar[ar.length - 1]
        //for (i = 3; i >= 0; i--) {
        // if (tested & tester) break
        //tester >>= 8
        // }
        var l = ar.length
        var offset = countLeading0s64(ar[l - 1]) //8-i


        var dif = l0s - offset
        var le = l * 8 + dif

        var arB = new ArrayBuffer(le, { maxByteLength: le + 0xffff })
        var vi = new DataView(arB)
        var j = 0
        var i = 0
        if (dif < 0) {

            for (i = 0; i < l - 1; i++) {
                vi.setUint32(j, Number(ar[i] & 0xffffffffn), true)
                vi.setUint32(j + 4, Number((ar[i] >> 32n) & 0xffffffffn), true)
                j += 8

            }


            let a = ar[i]

            for (i = 0; i < 8 + dif; i++) {

                vi.setUint8(j, Number(a & 0xffn), true)
                a >>= 8n
                j++
            }


            //    while (a) {
            // resizeBuff(arB, bCnt, - offset + leading0s)
        } else {
            //if (dif>0) {

            for (i = 0; i < l; i++) {
                vi.setUint32(j, Number(ar[i] & 0xffffffffn), true)
                vi.setUint32(j + 4, Number((ar[i] >> 32n) & 0xffffffffn), true)
                j += 8

            }

        }

        return arB

    }

function countLeading0s64(a) {
        var count = 0

        let hi32 = Number((BigInt(a) >> 32n) & 0xFFFFFFFFn);
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


function DirectConvertByteArrayBuff(arb, nd, EntryLvl, OutputLvl) {


        var l0s = countLeading0s(arb)


        ByteArrayBufferToN(arb)

        DirectConvert(nd, BigInt(EntryLvl), BigInt(OutputLvl))

        var i64 = bigIntToBalanced64Array()//.bigIntToBalancedArrayBuffer(l0s)



        return array64toBytesArrayBuff(i64, l0s)

    }



