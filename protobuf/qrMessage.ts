export default {
  nested: {
    qrpackage: {
      nested: {
        VenueType: {
          values: {
            OTHER: 0,
            RESTAURANT: 1
          }
        },
        QRCodeContent: {
          fields: {
            version: {
              rule: "required",
              type: "int32",
              id: 1
            },
            publicKey: {
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
            },
            venueType: {
              rule: "required",
              type: "VenueType",
              id: 6
            },
            notificationKey: {
              rule: "required",
              type: "bytes",
              id: 7
            }
          }
        },
        QRCodeWrapper: {
          fields: {
            version: {
              rule: "required",
              type: "int32",
              id: 1
            },
            content: {
              rule: "required",
              type: "QRCodeContent",
              id: 2
            },
            signature: {
              rule: "required",
              type: "bytes",
              id: 3
            }
          }
        }
      }
    }
  }
};
