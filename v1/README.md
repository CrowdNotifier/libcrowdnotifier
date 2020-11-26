# Version 1 implementation

This directory holds the reference implementation of version 1 from early November 2020:
- crypto.ts is an adapted version similar to the version 1_1 of 26th of November

On a little higher level, there is a system implementation that uses protobuf to encode/decode the messages, and
 creates QRCodes as strings:
- system.ts - the three classes `HealthAuthority`, `Location`, and `Visit` that only output base64-encoded strings
 with protobuf-messages
- system.spec.ts - showing all the methods work together

For the `system.ts` implementation, protobuf are used, and the messages can be found in [messages.proto].
