# CrowdNotifier example app

This is a very simple, high-level implementation of the steps needed to use the CrowdNotifier scheme.
For all three versions, the following files are present:
- system.ts implements the `HealthAuthority`, `Location`, and a `Visit`
- system.spec.ts tests the different parts against each other

It is based upon the CrowdNotifier [../lib].

For the `v2` version only, an enhanced functionality for a managed room registration
is available in the `managed.ts` file. It implements the v2.1 definition of the room
setup.

## Running it

To run the code, type the following:

```
npm ci
npm start
```

This will run all three versions of the system and output the logs of each step.

## Using it

To use it, do

```
npm i -S @c4dt/libcrowdnotifier
```

and then follow the example of `system.spec.ts` to get up and running.
There are two modes:
- single, where each location owner only has one room
- managed, where one organizer can create many rooms

### Caveats

The same caveats for usage as in the [libcrowdnotifier](../libcrowdnotifier/README.md)
apply:

- use `await waitReady` before calling any of the libraries
- use of `mcl` and `sodium` only through this package
- include `'process.browser' = true` in your `webpack.js` for correct compilation 

# Authors

This code has been written by Linus Gasser for the https://C4DT.org
It is based on a white paper written by Wouter Lueks*, Seda Gürses, Michael Veale, Edouard Bugnion, Marcel Salathé, 
Kenneth G.Paterson, and Carmela Troncoso.

# License

The code is licensed under MPLv2.

