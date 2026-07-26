export class NumLab {
    static #signSt = false

    #rezult = 0n
    #vel = 0
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
            ost = this.acc[aix] % this.x
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
                if (ints[i + 1] == 0xffffffff) {
                    ost = 1
                    ints[i + 1] = 0

                } else {
                    ints[i + 1]++

                    if (ints[i + 1] & 0x80000000) {
                        ost = 1

                    }
                }

            } else {
                if (ints[i + 1] & 0x80000000) {
                    ost = 1

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
                if (ints[i] == 0xa0000000) {
                    ost = 1
                    ints[i] = 0x7fffffff

                } else {
                    ost = 0
                    ints[i]--
                }
            } else {

            }

            //   ost = 0n
            if (ost) {
                if (ints[i + 1] == 0xa0000000) {
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

                }




            }





        }


    }

    #enlargeArray(ar, buffSz) {

        // var tmp = new Array(buffSz + 1)
        var tmp = new Uint32Array(buffSz + 1)
        //var tmp = new Int32Array(buffSz + 1)
        tmp.set(ar, 0)
        ar = tmp
        //    return 
    }

    #array32toN(dwords) {
        this.rezult = 0n
        const l = dwords.length
        for (var i = 0; i < l; i++) {
            this.rezult = (this.rezult << 32n) + BigInt(dwords[i])
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

        dwords.reverse()

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

        if ((EntryLvl == 0) || (EntryLvl == 1)) {
            throw new Error("Entry level cannot be less than two.")
        }
        if ((OutputLvl == 0) || (OutputLvl == 1)) {
            throw new Error("Output level cannot be less than two.")
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

}

