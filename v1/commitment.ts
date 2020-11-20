export default {
  nested: {
    commitment: {
      nested: {
        CommitmentMessage: {
          fields: {
            info: {
              rule: "required",
              type: "string",
              id: 1
            },
            nonce: {
              rule: "required",
              type: "bytes",
              id: 2
            },
            counter: {
              rule: "required",
              type: "uint32",
              id: 3
            }
          }
        }
      }
    }
  }
};
