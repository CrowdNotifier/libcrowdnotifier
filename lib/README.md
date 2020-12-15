# LibCrowdNotifier

This is the library implementing the cryptographic primitives for the CrowdNotifier system.
The white paper explains how a privacy-preserving presence tracking system can be set up without the need of a
 central authority that keeps all identities stored.
Similar to DP3T, all critical, personally identifiable information is stored on the phone of the user.
The central server only stores encrypted data about locations that were visited by a person tested positive to CoVid19.

As there were several versions of the white paper, this library allows the use of any of them.
The versions are:
- v1 - first version where the information of the location needed to be updated after every notification
- v1_1 - like v1, but with some cryptographic cleanups: no signature anymore, thus only use of `curve25519`
- v2 - using identity based encryption with a pairing based crypto system. This removes the need to re-create the
 information of the locations after every notification
 
The app available under https://notify-me.ch as of December 15th 2020 uses v1 of the protocol.
Work is under way to update the app to version v2, and we hope that it will be available early January 2021.

A simple implementation of the app can be found in [../app].
This shows how the different parts of the scheme work together.

## V2 - Latest Version

This directory holds the reference implementation of the latest version of the white paper:
- ibe_primitives.ts implements the identity based encryption according to [Security and Anonymity of Identity-Based
Encryption with Multiple Trusted Authorities by Kenneth G. Paterson and Sriramkrishnan
Srinivasan](http://www.isg.rhul.ac.uk/~prai175/PatersonS08.pdf)
- crowd_notifier_primitives.ts implements the latest version of the crowd-notifier white paper
- messages.proto defines the messages stored in the QRcodes

## Use the library

In order to use the library, first install it in your package:

```
npm i -S libcrowdnotifier
```

Then you can use it as shown in `../app/v2/system.ts`.
All methods in libcrowdnotifier are as close as possible to the methods in the white paper.
This allows easy verification of the scheme.

## Run the tests

To run the tests, type the following:

```
npm ci
npm start
```

This will run the tests for the IBE primitives and the CrowdNotifier primitives.
To run the benchmarks, type the following:

```
npm run benchmarks
```

# Older versions

For reference, the older versions are also available:

## v1

This directory holds the reference implementation of version 1 from early November 2020. 
It is based on libsodium and uses ed25519 and curve25519 for the signature and encryption. 
- crowdnotifier.ts implements the primitives of the scheme

### v1_1

With regard to v1, this removes the signature using ed25519 and replaces it with a simple hash scheme.
- crowdnotifier.ts implements the primitives of the scheme

# Authors

This code has been written by Linus Gasser for the https://C4DT.org
It is based on a white paper written by Wouter Lueks*, Seda Gürses, Michael Veale, Edouard Bugnion, Marcel Salathé, 
Kenneth G.Paterson, and Carmela Troncoso.

# License

The code is licensed under MPLv2.
