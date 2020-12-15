# CrowdNotifier example app

This is a very simple, high-level implementation of the steps needed to use the CrowdNotifier scheme.
For all three versions, the following files are present:
- system.ts implements the `HealthAuthority`, `Location`, and a `Visit`
- system.spec.ts tests the different parts against each other

It is based upon the CrowdNotifier [../lib].

## Running it

To run the code, type the following:

```
npm ci
npm start
```

This will run all three versions of the system and output the logs of each step.

# Authors

This code has been written by Linus Gasser for the https://C4DT.org
It is based on a white paper written by Wouter Lueks*, Seda Gürses, Michael Veale, Edouard Bugnion, Marcel Salathé, 
Kenneth G.Paterson, and Carmela Troncoso.

# License

The code is licensed under MPLv2.
