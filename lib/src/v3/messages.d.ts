import * as $protobuf from "protobufjs";
/** Namespace crowdnotifier_v3. */
export namespace crowdnotifier_v3 {

    /** Properties of a QRCodeTrace. */
    interface IQRCodeTrace {

        /** QRCodeTrace version */
        version?: (number|null);

        /** QRCodeTrace qrCodePayload */
        qrCodePayload?: (Uint8Array|null);

        /** QRCodeTrace masterSecretKeyLocation */
        masterSecretKeyLocation?: (Uint8Array|null);

        /** QRCodeTrace cipherTextHealthAuthority */
        cipherTextHealthAuthority?: (Uint8Array|null);
    }

    /** Represents a QRCodeTrace. */
    class QRCodeTrace implements IQRCodeTrace {

        /**
         * Constructs a new QRCodeTrace.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.IQRCodeTrace);

        /** QRCodeTrace version. */
        public version: number;

        /** QRCodeTrace qrCodePayload. */
        public qrCodePayload: Uint8Array;

        /** QRCodeTrace masterSecretKeyLocation. */
        public masterSecretKeyLocation: Uint8Array;

        /** QRCodeTrace cipherTextHealthAuthority. */
        public cipherTextHealthAuthority: Uint8Array;

        /**
         * Creates a new QRCodeTrace instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QRCodeTrace instance
         */
        public static create(properties?: crowdnotifier_v3.IQRCodeTrace): crowdnotifier_v3.QRCodeTrace;

        /**
         * Encodes the specified QRCodeTrace message. Does not implicitly {@link crowdnotifier_v3.QRCodeTrace.verify|verify} messages.
         * @param message QRCodeTrace message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.IQRCodeTrace, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QRCodeTrace message, length delimited. Does not implicitly {@link crowdnotifier_v3.QRCodeTrace.verify|verify} messages.
         * @param message QRCodeTrace message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.IQRCodeTrace, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QRCodeTrace message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QRCodeTrace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.QRCodeTrace;

        /**
         * Decodes a QRCodeTrace message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QRCodeTrace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.QRCodeTrace;

        /**
         * Verifies a QRCodeTrace message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QRCodeTrace message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QRCodeTrace
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.QRCodeTrace;

        /**
         * Creates a plain object from a QRCodeTrace message. Also converts values to other types if specified.
         * @param message QRCodeTrace
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.QRCodeTrace, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QRCodeTrace to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PreTrace. */
    interface IPreTrace {

        /** PreTrace identity */
        identity?: (Uint8Array|null);

        /** PreTrace partialSecretKeyForIdentityOfLocation */
        partialSecretKeyForIdentityOfLocation?: (Uint8Array|null);

        /** PreTrace cipherTextHealthAuthority */
        cipherTextHealthAuthority?: (Uint8Array|null);

        /** PreTrace notificationKey */
        notificationKey?: (Uint8Array|null);
    }

    /** Represents a PreTrace. */
    class PreTrace implements IPreTrace {

        /**
         * Constructs a new PreTrace.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.IPreTrace);

        /** PreTrace identity. */
        public identity: Uint8Array;

        /** PreTrace partialSecretKeyForIdentityOfLocation. */
        public partialSecretKeyForIdentityOfLocation: Uint8Array;

        /** PreTrace cipherTextHealthAuthority. */
        public cipherTextHealthAuthority: Uint8Array;

        /** PreTrace notificationKey. */
        public notificationKey: Uint8Array;

        /**
         * Creates a new PreTrace instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PreTrace instance
         */
        public static create(properties?: crowdnotifier_v3.IPreTrace): crowdnotifier_v3.PreTrace;

        /**
         * Encodes the specified PreTrace message. Does not implicitly {@link crowdnotifier_v3.PreTrace.verify|verify} messages.
         * @param message PreTrace message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.IPreTrace, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PreTrace message, length delimited. Does not implicitly {@link crowdnotifier_v3.PreTrace.verify|verify} messages.
         * @param message PreTrace message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.IPreTrace, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PreTrace message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PreTrace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.PreTrace;

        /**
         * Decodes a PreTrace message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PreTrace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.PreTrace;

        /**
         * Verifies a PreTrace message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PreTrace message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PreTrace
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.PreTrace;

        /**
         * Creates a plain object from a PreTrace message. Also converts values to other types if specified.
         * @param message PreTrace
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.PreTrace, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PreTrace to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TraceProof. */
    interface ITraceProof {

        /** TraceProof masterPublicKey */
        masterPublicKey?: (Uint8Array|null);

        /** TraceProof nonce1 */
        nonce1?: (Uint8Array|null);

        /** TraceProof nonce2 */
        nonce2?: (Uint8Array|null);
    }

    /** Represents a TraceProof. */
    class TraceProof implements ITraceProof {

        /**
         * Constructs a new TraceProof.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.ITraceProof);

        /** TraceProof masterPublicKey. */
        public masterPublicKey: Uint8Array;

        /** TraceProof nonce1. */
        public nonce1: Uint8Array;

        /** TraceProof nonce2. */
        public nonce2: Uint8Array;

        /**
         * Creates a new TraceProof instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TraceProof instance
         */
        public static create(properties?: crowdnotifier_v3.ITraceProof): crowdnotifier_v3.TraceProof;

        /**
         * Encodes the specified TraceProof message. Does not implicitly {@link crowdnotifier_v3.TraceProof.verify|verify} messages.
         * @param message TraceProof message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.ITraceProof, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TraceProof message, length delimited. Does not implicitly {@link crowdnotifier_v3.TraceProof.verify|verify} messages.
         * @param message TraceProof message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.ITraceProof, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TraceProof message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TraceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.TraceProof;

        /**
         * Decodes a TraceProof message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TraceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.TraceProof;

        /**
         * Verifies a TraceProof message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TraceProof message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TraceProof
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.TraceProof;

        /**
         * Creates a plain object from a TraceProof message. Also converts values to other types if specified.
         * @param message TraceProof
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.TraceProof, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TraceProof to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PreTraceWithProof. */
    interface IPreTraceWithProof {

        /** PreTraceWithProof preTrace */
        preTrace?: (crowdnotifier_v3.IPreTrace|null);

        /** PreTraceWithProof proof */
        proof?: (crowdnotifier_v3.ITraceProof|null);

        /** PreTraceWithProof qrCodePayload */
        qrCodePayload?: (Uint8Array|null);

        /** PreTraceWithProof startTime */
        startTime?: (number|Long|null);

        /** PreTraceWithProof endTime */
        endTime?: (number|Long|null);

        /** PreTraceWithProof startOfInterval */
        startOfInterval?: (number|Long|null);
    }

    /** Represents a PreTraceWithProof. */
    class PreTraceWithProof implements IPreTraceWithProof {

        /**
         * Constructs a new PreTraceWithProof.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.IPreTraceWithProof);

        /** PreTraceWithProof preTrace. */
        public preTrace?: (crowdnotifier_v3.IPreTrace|null);

        /** PreTraceWithProof proof. */
        public proof?: (crowdnotifier_v3.ITraceProof|null);

        /** PreTraceWithProof qrCodePayload. */
        public qrCodePayload: Uint8Array;

        /** PreTraceWithProof startTime. */
        public startTime: (number|Long);

        /** PreTraceWithProof endTime. */
        public endTime: (number|Long);

        /** PreTraceWithProof startOfInterval. */
        public startOfInterval: (number|Long);

        /**
         * Creates a new PreTraceWithProof instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PreTraceWithProof instance
         */
        public static create(properties?: crowdnotifier_v3.IPreTraceWithProof): crowdnotifier_v3.PreTraceWithProof;

        /**
         * Encodes the specified PreTraceWithProof message. Does not implicitly {@link crowdnotifier_v3.PreTraceWithProof.verify|verify} messages.
         * @param message PreTraceWithProof message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.IPreTraceWithProof, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PreTraceWithProof message, length delimited. Does not implicitly {@link crowdnotifier_v3.PreTraceWithProof.verify|verify} messages.
         * @param message PreTraceWithProof message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.IPreTraceWithProof, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PreTraceWithProof message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PreTraceWithProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.PreTraceWithProof;

        /**
         * Decodes a PreTraceWithProof message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PreTraceWithProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.PreTraceWithProof;

        /**
         * Verifies a PreTraceWithProof message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PreTraceWithProof message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PreTraceWithProof
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.PreTraceWithProof;

        /**
         * Creates a plain object from a PreTraceWithProof message. Also converts values to other types if specified.
         * @param message PreTraceWithProof
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.PreTraceWithProof, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PreTraceWithProof to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Trace. */
    interface ITrace {

        /** Trace identity */
        identity?: (Uint8Array|null);

        /** Trace secretKeyForIdentity */
        secretKeyForIdentity?: (Uint8Array|null);

        /** Trace startTime */
        startTime?: (number|Long|null);

        /** Trace endTime */
        endTime?: (number|Long|null);

        /** Trace nonce */
        nonce?: (Uint8Array|null);

        /** Trace encryptedAssociatedData */
        encryptedAssociatedData?: (Uint8Array|null);
    }

    /** Represents a Trace. */
    class Trace implements ITrace {

        /**
         * Constructs a new Trace.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.ITrace);

        /** Trace identity. */
        public identity: Uint8Array;

        /** Trace secretKeyForIdentity. */
        public secretKeyForIdentity: Uint8Array;

        /** Trace startTime. */
        public startTime: (number|Long);

        /** Trace endTime. */
        public endTime: (number|Long);

        /** Trace nonce. */
        public nonce: Uint8Array;

        /** Trace encryptedAssociatedData. */
        public encryptedAssociatedData: Uint8Array;

        /**
         * Creates a new Trace instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Trace instance
         */
        public static create(properties?: crowdnotifier_v3.ITrace): crowdnotifier_v3.Trace;

        /**
         * Encodes the specified Trace message. Does not implicitly {@link crowdnotifier_v3.Trace.verify|verify} messages.
         * @param message Trace message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.ITrace, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Trace message, length delimited. Does not implicitly {@link crowdnotifier_v3.Trace.verify|verify} messages.
         * @param message Trace message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.ITrace, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Trace message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Trace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.Trace;

        /**
         * Decodes a Trace message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Trace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.Trace;

        /**
         * Verifies a Trace message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Trace message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Trace
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.Trace;

        /**
         * Creates a plain object from a Trace message. Also converts values to other types if specified.
         * @param message Trace
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.Trace, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Trace to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a QRCodePayload. */
    interface IQRCodePayload {

        /** QRCodePayload version */
        version?: (number|null);

        /** QRCodePayload locationData */
        locationData?: (crowdnotifier_v3.ITraceLocation|null);

        /** QRCodePayload crowdNotifierData */
        crowdNotifierData?: (crowdnotifier_v3.ICrowdNotifierData|null);

        /** QRCodePayload countryData */
        countryData?: (Uint8Array|null);
    }

    /** Represents a QRCodePayload. */
    class QRCodePayload implements IQRCodePayload {

        /**
         * Constructs a new QRCodePayload.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.IQRCodePayload);

        /** QRCodePayload version. */
        public version: number;

        /** QRCodePayload locationData. */
        public locationData?: (crowdnotifier_v3.ITraceLocation|null);

        /** QRCodePayload crowdNotifierData. */
        public crowdNotifierData?: (crowdnotifier_v3.ICrowdNotifierData|null);

        /** QRCodePayload countryData. */
        public countryData: Uint8Array;

        /**
         * Creates a new QRCodePayload instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QRCodePayload instance
         */
        public static create(properties?: crowdnotifier_v3.IQRCodePayload): crowdnotifier_v3.QRCodePayload;

        /**
         * Encodes the specified QRCodePayload message. Does not implicitly {@link crowdnotifier_v3.QRCodePayload.verify|verify} messages.
         * @param message QRCodePayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.IQRCodePayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QRCodePayload message, length delimited. Does not implicitly {@link crowdnotifier_v3.QRCodePayload.verify|verify} messages.
         * @param message QRCodePayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.IQRCodePayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QRCodePayload message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QRCodePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.QRCodePayload;

        /**
         * Decodes a QRCodePayload message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QRCodePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.QRCodePayload;

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
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.QRCodePayload;

        /**
         * Creates a plain object from a QRCodePayload message. Also converts values to other types if specified.
         * @param message QRCodePayload
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.QRCodePayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: crowdnotifier_v3.ITraceLocation);

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
        public static create(properties?: crowdnotifier_v3.ITraceLocation): crowdnotifier_v3.TraceLocation;

        /**
         * Encodes the specified TraceLocation message. Does not implicitly {@link crowdnotifier_v3.TraceLocation.verify|verify} messages.
         * @param message TraceLocation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.ITraceLocation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TraceLocation message, length delimited. Does not implicitly {@link crowdnotifier_v3.TraceLocation.verify|verify} messages.
         * @param message TraceLocation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.ITraceLocation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TraceLocation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TraceLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.TraceLocation;

        /**
         * Decodes a TraceLocation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TraceLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.TraceLocation;

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
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.TraceLocation;

        /**
         * Creates a plain object from a TraceLocation message. Also converts values to other types if specified.
         * @param message TraceLocation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.TraceLocation, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: crowdnotifier_v3.ICrowdNotifierData);

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
        public static create(properties?: crowdnotifier_v3.ICrowdNotifierData): crowdnotifier_v3.CrowdNotifierData;

        /**
         * Encodes the specified CrowdNotifierData message. Does not implicitly {@link crowdnotifier_v3.CrowdNotifierData.verify|verify} messages.
         * @param message CrowdNotifierData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.ICrowdNotifierData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CrowdNotifierData message, length delimited. Does not implicitly {@link crowdnotifier_v3.CrowdNotifierData.verify|verify} messages.
         * @param message CrowdNotifierData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.ICrowdNotifierData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrowdNotifierData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CrowdNotifierData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.CrowdNotifierData;

        /**
         * Decodes a CrowdNotifierData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CrowdNotifierData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.CrowdNotifierData;

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
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.CrowdNotifierData;

        /**
         * Creates a plain object from a CrowdNotifierData message. Also converts values to other types if specified.
         * @param message CrowdNotifierData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.CrowdNotifierData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CrowdNotifierData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NotifyMeLocationData. */
    interface INotifyMeLocationData {

        /** NotifyMeLocationData version */
        version?: (number|null);

        /** NotifyMeLocationData type */
        type?: (crowdnotifier_v3.VenueType|null);

        /** NotifyMeLocationData room */
        room?: (string|null);
    }

    /** Represents a NotifyMeLocationData. */
    class NotifyMeLocationData implements INotifyMeLocationData {

        /**
         * Constructs a new NotifyMeLocationData.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.INotifyMeLocationData);

        /** NotifyMeLocationData version. */
        public version: number;

        /** NotifyMeLocationData type. */
        public type: crowdnotifier_v3.VenueType;

        /** NotifyMeLocationData room. */
        public room: string;

        /**
         * Creates a new NotifyMeLocationData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NotifyMeLocationData instance
         */
        public static create(properties?: crowdnotifier_v3.INotifyMeLocationData): crowdnotifier_v3.NotifyMeLocationData;

        /**
         * Encodes the specified NotifyMeLocationData message. Does not implicitly {@link crowdnotifier_v3.NotifyMeLocationData.verify|verify} messages.
         * @param message NotifyMeLocationData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.INotifyMeLocationData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NotifyMeLocationData message, length delimited. Does not implicitly {@link crowdnotifier_v3.NotifyMeLocationData.verify|verify} messages.
         * @param message NotifyMeLocationData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.INotifyMeLocationData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NotifyMeLocationData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NotifyMeLocationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.NotifyMeLocationData;

        /**
         * Decodes a NotifyMeLocationData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NotifyMeLocationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.NotifyMeLocationData;

        /**
         * Verifies a NotifyMeLocationData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NotifyMeLocationData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NotifyMeLocationData
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.NotifyMeLocationData;

        /**
         * Creates a plain object from a NotifyMeLocationData message. Also converts values to other types if specified.
         * @param message NotifyMeLocationData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.NotifyMeLocationData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NotifyMeLocationData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** VenueType enum. */
    enum VenueType {
        OTHER = 0,
        MEETING_ROOM = 1,
        CAFETERIA = 2,
        PRIVATE_EVENT = 3,
        CANTEEN = 4,
        LIBRARY = 5,
        LECTURE_ROOM = 6,
        SHOP = 7,
        GYM = 8,
        KITCHEN_AREA = 9,
        OFFICE_SPACE = 10
    }

    /** Properties of an AssociatedData. */
    interface IAssociatedData {

        /** AssociatedData version */
        version?: (number|null);

        /** AssociatedData message */
        message?: (string|null);

        /** AssociatedData countryData */
        countryData?: (Uint8Array|null);
    }

    /** Represents an AssociatedData. */
    class AssociatedData implements IAssociatedData {

        /**
         * Constructs a new AssociatedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.IAssociatedData);

        /** AssociatedData version. */
        public version: number;

        /** AssociatedData message. */
        public message: string;

        /** AssociatedData countryData. */
        public countryData: Uint8Array;

        /**
         * Creates a new AssociatedData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AssociatedData instance
         */
        public static create(properties?: crowdnotifier_v3.IAssociatedData): crowdnotifier_v3.AssociatedData;

        /**
         * Encodes the specified AssociatedData message. Does not implicitly {@link crowdnotifier_v3.AssociatedData.verify|verify} messages.
         * @param message AssociatedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.IAssociatedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AssociatedData message, length delimited. Does not implicitly {@link crowdnotifier_v3.AssociatedData.verify|verify} messages.
         * @param message AssociatedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.IAssociatedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AssociatedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AssociatedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.AssociatedData;

        /**
         * Decodes an AssociatedData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AssociatedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.AssociatedData;

        /**
         * Verifies an AssociatedData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AssociatedData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AssociatedData
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.AssociatedData;

        /**
         * Creates a plain object from an AssociatedData message. Also converts values to other types if specified.
         * @param message AssociatedData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.AssociatedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AssociatedData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NotifyMeAssociatedData. */
    interface INotifyMeAssociatedData {

        /** NotifyMeAssociatedData version */
        version?: (number|null);

        /** NotifyMeAssociatedData criticality */
        criticality?: (crowdnotifier_v3.EventCriticality|null);
    }

    /** Represents a NotifyMeAssociatedData. */
    class NotifyMeAssociatedData implements INotifyMeAssociatedData {

        /**
         * Constructs a new NotifyMeAssociatedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: crowdnotifier_v3.INotifyMeAssociatedData);

        /** NotifyMeAssociatedData version. */
        public version: number;

        /** NotifyMeAssociatedData criticality. */
        public criticality: crowdnotifier_v3.EventCriticality;

        /**
         * Creates a new NotifyMeAssociatedData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NotifyMeAssociatedData instance
         */
        public static create(properties?: crowdnotifier_v3.INotifyMeAssociatedData): crowdnotifier_v3.NotifyMeAssociatedData;

        /**
         * Encodes the specified NotifyMeAssociatedData message. Does not implicitly {@link crowdnotifier_v3.NotifyMeAssociatedData.verify|verify} messages.
         * @param message NotifyMeAssociatedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: crowdnotifier_v3.INotifyMeAssociatedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NotifyMeAssociatedData message, length delimited. Does not implicitly {@link crowdnotifier_v3.NotifyMeAssociatedData.verify|verify} messages.
         * @param message NotifyMeAssociatedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: crowdnotifier_v3.INotifyMeAssociatedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NotifyMeAssociatedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NotifyMeAssociatedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): crowdnotifier_v3.NotifyMeAssociatedData;

        /**
         * Decodes a NotifyMeAssociatedData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NotifyMeAssociatedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): crowdnotifier_v3.NotifyMeAssociatedData;

        /**
         * Verifies a NotifyMeAssociatedData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NotifyMeAssociatedData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NotifyMeAssociatedData
         */
        public static fromObject(object: { [k: string]: any }): crowdnotifier_v3.NotifyMeAssociatedData;

        /**
         * Creates a plain object from a NotifyMeAssociatedData message. Also converts values to other types if specified.
         * @param message NotifyMeAssociatedData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: crowdnotifier_v3.NotifyMeAssociatedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NotifyMeAssociatedData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** EventCriticality enum. */
    enum EventCriticality {
        LOW = 0,
        HIGH = 1
    }
}
