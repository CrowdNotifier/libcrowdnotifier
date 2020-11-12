export default {
  nested: {
    seedpackage: {
      nested: {
        SeedMessage: {
          fields: {
            salt: {
              rule: "required",
              type: "bytes",
              id: 1
            },
            notificationKey: {
              rule: "required",
              type: "bytes",
              id: 2
            },
            name: {
              rule: "required",
              type: "string",
              id: 3
            },
            location: {
              rule: "required",
              type: "string",
              id: 4
            },
            room: {
              rule: "required",
              type: "string",
              id: 5
            }
          }
        }
      }
    }
  }
};
