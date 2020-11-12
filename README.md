# CrowdNotifier TypeScript Demo

In order to show the different parts of CrowdNotifier from a programming point of view, this demo implements the full
 chain of the CrowdNotifier project as different classes.
If you want to see how it works, go to https://stackblitz.io/edit/crowdnotifier?file=index.ts
As the current repo is private, stackblitz cannot reference it directly.

## Goal of the demo

- Being able to print intermediate results for test data
- Insert test data from the main
- Test with different versions of the QRCode

# Format of the demo

Each element of the CrowdNotifier system is represented as a class.
An additional class called `Internet` shows interaction over the internet.
All other interactions are user interactions like entering a code or scanning a QRCode.
