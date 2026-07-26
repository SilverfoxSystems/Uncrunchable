
This serves only as a proof that I invented this algorithm, in case anyone claims that he came up with a number vectorizer/unifier.
The code for it is in **NumLab.js**, from which stems the crypting mechanism called from **uncrunchable.js**. It converts a Uint32 array into a number of arbitrary-length, performs encryption, then converts the number back to a _UInt32_ array
NumLab was first published to GitHub on _July 24th 2026_.

NumLab can be tested [on this webpage](http://1zz.online/NumLab/index.html)

Read discussion on forum: https://masm32.com/board/index.php?topic=13322.0


You may not reproduce, redistribute or recompile this code, but you are allowed to use the crypting mechanism from an external source. Please see **TestEncryptData.html** for an example on how to do that. This is still under development, it wasn't thoroughly tested.
You may also use functions in _NumLab.js_, which can be reffered to via script import from "http://1zz.online/NumLab/NumLab.js". See the examples in **index.html** on this Git repository.

As a note, I also have a way of "unifying"/"vectorizing" floating point arbitrary precision numbers.

Any questions, suggestions or comments are welcome in the _Discussions_ section
