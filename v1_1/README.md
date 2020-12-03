# Version 1.1 implementation

This directory holds the reference implementation of version 1.1 from 26th of November:
- crypto.ts follows the implementation as described in the chapter 4 of the white paper

On a little higher level, there is a system implementation that uses protobuf to encode/decode the messages, and
 creates QRCodes as strings:
- system.ts - the three classes `HealthAuthority`, `Location`, and `Visit` that only output base64-encoded strings
 with protobuf-messages
- system.spec.ts - showing all the methods work together

For the `system.ts` implementation, protobuf are used, and the messages can be found in [messages.proto].
