# CrowdNotifier - Decentralized Privacy-Preserving Presence Tracing

This repository puts forward a proposal for a secure, decentralized,
privacy-preserving presence tracing system. Our proposal aims to simplify and
accelerate the process of notifying individuals that shared a semi-public
location with a SARS-CoV-2-positive person for a prolonged time without
introducing new risks for users and locations. Existing proximity tracing
systems (apps for contact tracing such as SwissCovid, Corona Warn App, and
Immuni) notify only a subset of these people: those that were close enough for
long enough. Current events have shown the need to notify _all_ people that
shared a space with a SARS-CoV-2-positive person. The proposed system aims to
provide an alternative to increasing use of apps with similar intentions based
on invasive collection or that are prone to abuse by authorities. Our
preliminary design aims to minimize privacy and security risks for individuals
and communities, while guaranteeing the highest level of data protection and
good usability and deployability.

With this proposal, we seek feedback from a broad audience on the high-level
design, its security and privacy properties, and the functionality it offers, so
that the merits of the design can be discussed, and protection mechanisms can be
added to correct weaknesses. We feel it is essential that designs be made public
so the community as a whole can discuss the proposal and verify the claimed
privacy guarantees before applications are deployed.

## Repositories

The following repositories hold further information about the project:

* Android SDK: [crowdnotifier-sdk-android](https://github.com/CrowdNotifier/crowdnotifier-sdk-android)
* iOS SDK: [crowdnotifier-sdk-ios](https://github.com/CrowdNotifier/crowdnotifier-sdk-ios)
* TypeScript Reference Implementation: [crowdnotifier-ts](https://github.com/CrowdNotifier/crowdnotifier-ts)
* Android Demo App: [notifyme-app-android](https://github.com/notifyme-app/notifyme-app-android)
* iOS Demo App: [notifyme-app-ios](https://github.com/notifyme-app/notifyme-app-ios)
* Backend SDK: [notifyme-sdk-backend](https://github.com/notifyme-app/notifyme-sdk-backend)
* QR Generator Web App: [notifyme-qrgenerator-web](https://github.com/notifyme-app/notifyme-qrgenerator-web)
* QR Landing Page Web App: [notifyme-qrlandingpage-web](https://github.com/notifyme-app/notifyme-qrlandingpage-web)
* QR Trace Upload Web App: [notifyme-upload-web](https://github.com/notifyme-app/notifyme-upload-web)

## Work in Progress

The CrowdNotifier protocol is undergoing changes to improve its security and privacy properties. See 
[CrowdNotifier](https://github.com/CrowdNotifier/documents) for updates on the design. This reference implementation
will be updated to reflect these changes.

# CrowdNotifier Reference Implementation

In order to show the different parts of CrowdNotifier from a programming point of view, this demo implements the full
 chain of the CrowdNotifier project as different classes.
If you want to see how it works, go to https://stackblitz.io/edit/crowdnotifier?file=index.ts
As the current repo is private, stackblitz cannot reference it directly.
This reference implementation has been made possible by the [C4DT](https://c4dt.org).

The following figures show the different components of the system:

![Overview of system](elements-overview.png)

This figure shows the steps to publish a trace location:

![Publish Trace Location](trace-location.png) 

## Goal of the demo

- Reference implementation of the description in the white paper
- Being able to print intermediate results for test data
- Insert test data from the main
- Test with different versions of the QRCode

## Directories

- lib - types of mcl and sodium libraries
- [v1](v1/README.md) - first crypto implementation early November 2020
- [v1_1](V1_1/README.md) - improved crypto implementation without switching ed25519/curve25519,
according to the white paper from the 26th of November 2020
- [v2](v2/README.md) - latest changes in crowdNotifier - section7
- app - DEFUNCT - the previous app all in one

## Starting the tests

To start the tests, run the following commands:

```
npm ci
npm start
```

[Section7 README](v2/README.md)

## Next Steps

This reference implementation is just to show how the pieces fit together from a programmers' perspective.
The following steps are in the pipeline:

- separate the crypto in its own package - done
- implement latest changes in CrowdNotifier white paper - done
- use it as a web-app

# Contributing

Everyone interacting on the CrowdNotifier projects codebases, issue trackers, etc. is expected to follow the [code
  of conduct](CODE_OF_CONDUCT.txt).

# License

This project is licensed under the terms of the MPL 2 license. See the [LICENSE](LICENSE) file.
