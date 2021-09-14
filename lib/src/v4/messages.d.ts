import * as $protobuf from 'protobufjs';
/** Namespace crowdnotifier_v4. */
export namespace crowdnotifier_v4 {

    /** Properties of a QRCodePayload. */
    interface IQRCodePayload {

        /** QRCodePayload version */
        version?: (number|null);

        /** QRCodePayload locationData */
        locationData?: (crowdnotifier_v4.ITraceLocation|null);

        /** QRCodePayload crowdNotifierData */
        crowdNotifierData?: (crowdnotifier_v4.ICrowdNotifierData|null);

        /** QRCodePayload countryData */
        countryData?: (Uint8Array|null);
    }

    /** Represents a QRCodePayload. */
    class QRCodePayload implements IQRCodePayload {
      /**
         * Constructs a new QRCodePayload.
         * @param [properties] Properties to set
         */
      constructor(properties?: crowdnotifier_v4.IQRCodePayload);

        /** QRCodePayload version. */
        public version: number;

        /** QRCodePayload locationData. */
        public locationData?: (crowdnotifier_v4.ITraceLocation|null);

        /** QRCodePayload crowdNotifierData. */
        public crowdNotifierData?: (crowdnotifier_v4.ICrowdNotifierData|null);

        /** QRCodePayload countryData. */
        public countryData: Uint8Array;

        /**
         * Creates a new QRCodePayload instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QRCodePayload instance
         */
        public static create(properties?: crowdnotifier_v4.IQRCodePayload): crowdnotifier_v4.QRCodePayload;

        /**
         * Encodes the specified QRCodePayload message. Does not implicitly {@link crowdnotifier_v4.QRCodePayload.verify|verify} messages.
         * @param message QRCodePayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v4.IQRCodePayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QRCodePayload message, length delimited. Does not implicitly {@link crowdnotifier_v4.QRCodePayload.verify|verify} messages.
         * @param message QRCodePayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v4.IQRCodePayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QRCodePayload message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QRCodePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v4.QRCodePayload;

        /**
         * Decodes a QRCodePayload message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QRCodePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v4.QRCodePayload;

        /**
         * Verifies a QRCodePayload message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QRCodePayload message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QRCodePayload
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v4.QRCodePayload;

        /**
         * Creates a plain object from a QRCodePayload message. Also converts values to other types if specified.
         * @param message QRCodePayload
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v4.QRCodePayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QRCodePayload to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TraceLocation. */
    interface ITraceLocation {

        /** TraceLocation version */
        version?: (number|null);

        /** TraceLocation description */
        description?: (string|null);

        /** TraceLocation address */
        address?: (string|null);

        /** TraceLocation startTimestamp */
        startTimestamp?: (number|Long|null);

        /** TraceLocation endTimestamp */
        endTimestamp?: (number|Long|null);
    }

    /** Represents a TraceLocation. */
    class TraceLocation implements ITraceLocation {
      /**
         * Constructs a new TraceLocation.
         * @param [properties] Properties to set
         */
      constructor(properties?: crowdnotifier_v4.ITraceLocation);

        /** TraceLocation version. */
        public version: number;

        /** TraceLocation description. */
        public description: string;

        /** TraceLocation address. */
        public address: string;

        /** TraceLocation startTimestamp. */
        public startTimestamp: (number|Long);

        /** TraceLocation endTimestamp. */
        public endTimestamp: (number|Long);

        /**
         * Creates a new TraceLocation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TraceLocation instance
         */
        public static create(properties?: crowdnotifier_v4.ITraceLocation): crowdnotifier_v4.TraceLocation;

        /**
         * Encodes the specified TraceLocation message. Does not implicitly {@link crowdnotifier_v4.TraceLocation.verify|verify} messages.
         * @param message TraceLocation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v4.ITraceLocation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TraceLocation message, length delimited. Does not implicitly {@link crowdnotifier_v4.TraceLocation.verify|verify} messages.
         * @param message TraceLocation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v4.ITraceLocation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TraceLocation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TraceLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v4.TraceLocation;

        /**
         * Decodes a TraceLocation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TraceLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v4.TraceLocation;

        /**
         * Verifies a TraceLocation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TraceLocation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TraceLocation
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v4.TraceLocation;

        /**
         * Creates a plain object from a TraceLocation message. Also converts values to other types if specified.
         * @param message TraceLocation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v4.TraceLocation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TraceLocation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CrowdNotifierData. */
    interface ICrowdNotifierData {

        /** CrowdNotifierData version */
        version?: (number|null);

        /** CrowdNotifierData publicKey */
        publicKey?: (Uint8Array|null);

        /** CrowdNotifierData cryptographicSeed */
        cryptographicSeed?: (Uint8Array|null);

        /** CrowdNotifierData type */
        type?: (number|null);
    }

    /** Represents a CrowdNotifierData. */
    class CrowdNotifierData implements ICrowdNotifierData {
      /**
         * Constructs a new CrowdNotifierData.
         * @param [properties] Properties to set
         */
      constructor(properties?: crowdnotifier_v4.ICrowdNotifierData);

        /** CrowdNotifierData version. */
        public version: number;

        /** CrowdNotifierData publicKey. */
        public publicKey: Uint8Array;

        /** CrowdNotifierData cryptographicSeed. */
        public cryptographicSeed: Uint8Array;

        /** CrowdNotifierData type. */
        public type: number;

        /**
         * Creates a new CrowdNotifierData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CrowdNotifierData instance
         */
        public static create(properties?: crowdnotifier_v4.ICrowdNotifierData): crowdnotifier_v4.CrowdNotifierData;

        /**
         * Encodes the specified CrowdNotifierData message. Does not implicitly {@link crowdnotifier_v4.CrowdNotifierData.verify|verify} messages.
         * @param message CrowdNotifierData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v4.ICrowdNotifierData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CrowdNotifierData message, length delimited. Does not implicitly {@link crowdnotifier_v4.CrowdNotifierData.verify|verify} messages.
         * @param message CrowdNotifierData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v4.ICrowdNotifierData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrowdNotifierData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CrowdNotifierData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v4.CrowdNotifierData;

        /**
         * Decodes a CrowdNotifierData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CrowdNotifierData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v4.CrowdNotifierData;

        /**
         * Verifies a CrowdNotifierData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CrowdNotifierData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CrowdNotifierData
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v4.CrowdNotifierData;

        /**
         * Creates a plain object from a CrowdNotifierData message. Also converts values to other types if specified.
         * @param message CrowdNotifierData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v4.CrowdNotifierData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CrowdNotifierData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SwissCovidLocationData. */
    interface ISwissCovidLocationData {

        /** SwissCovidLocationData version */
        version?: (number|null);

        /** SwissCovidLocationData type */
        type?: (crowdnotifier_v4.VenueType|null);

        /** SwissCovidLocationData room */
        room?: (string|null);

        /** SwissCovidLocationData checkoutWarningDelayMs */
        checkoutWarningDelayMs?: (number|Long|null);

        /** SwissCovidLocationData automaticCheckoutDelaylMs */
        automaticCheckoutDelaylMs?: (number|Long|null);

        /** SwissCovidLocationData reminderDelayOptionsMs */
        reminderDelayOptionsMs?: ((number|Long)[]|null);
    }

    /** Represents a SwissCovidLocationData. */
    class SwissCovidLocationData implements ISwissCovidLocationData {
      /**
         * Constructs a new SwissCovidLocationData.
         * @param [properties] Properties to set
         */
      constructor(properties?: crowdnotifier_v4.ISwissCovidLocationData);

        /** SwissCovidLocationData version. */
        public version: number;

        /** SwissCovidLocationData type. */
        public type: crowdnotifier_v4.VenueType;

        /** SwissCovidLocationData room. */
        public room: string;

        /** SwissCovidLocationData checkoutWarningDelayMs. */
        public checkoutWarningDelayMs: (number|Long);

        /** SwissCovidLocationData automaticCheckoutDelaylMs. */
        public automaticCheckoutDelaylMs: (number|Long);

        /** SwissCovidLocationData reminderDelayOptionsMs. */
        public reminderDelayOptionsMs: (number|Long)[];

        /**
         * Creates a new SwissCovidLocationData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SwissCovidLocationData instance
         */
        public static create(properties?: crowdnotifier_v4.ISwissCovidLocationData): crowdnotifier_v4.SwissCovidLocationData;

        /**
         * Encodes the specified SwissCovidLocationData message. Does not implicitly {@link crowdnotifier_v4.SwissCovidLocationData.verify|verify} messages.
         * @param message SwissCovidLocationData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v4.ISwissCovidLocationData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SwissCovidLocationData message, length delimited. Does not implicitly {@link crowdnotifier_v4.SwissCovidLocationData.verify|verify} messages.
         * @param message SwissCovidLocationData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v4.ISwissCovidLocationData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SwissCovidLocationData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SwissCovidLocationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v4.SwissCovidLocationData;

        /**
         * Decodes a SwissCovidLocationData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SwissCovidLocationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v4.SwissCovidLocationData;

        /**
         * Verifies a SwissCovidLocationData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SwissCovidLocationData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SwissCovidLocationData
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v4.SwissCovidLocationData;

        /**
         * Creates a plain object from a SwissCovidLocationData message. Also converts values to other types if specified.
         * @param message SwissCovidLocationData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v4.SwissCovidLocationData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SwissCovidLocationData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** VenueType enum. */
    enum VenueType {
        USER_QR_CODE = 0,
        CONTACT_TRACING_QR_CODE = 1
    }
}
