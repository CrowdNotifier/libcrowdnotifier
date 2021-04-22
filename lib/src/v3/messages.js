/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.crowdnotifier_v3 = (function() {

    /**
     * Namespace crowdnotifier_v3.
     * @exports crowdnotifier_v3
     * @namespace
     */
    var crowdnotifier_v3 = {};

    crowdnotifier_v3.QRCodeTrace = (function() {

        /**
         * Properties of a QRCodeTrace.
         * @memberof crowdnotifier_v3
         * @interface IQRCodeTrace
         * @property {number|null} [version] QRCodeTrace version
         * @property {Uint8Array|null} [qrCodePayload] QRCodeTrace qrCodePayload
         * @property {Uint8Array|null} [masterSecretKeyLocation] QRCodeTrace masterSecretKeyLocation
         * @property {Uint8Array|null} [cipherTextHealthAuthority] QRCodeTrace cipherTextHealthAuthority
         */

        /**
         * Constructs a new QRCodeTrace.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a QRCodeTrace.
         * @implements IQRCodeTrace
         * @constructor
         * @param {crowdnotifier_v3.IQRCodeTrace=} [properties] Properties to set
         */
        function QRCodeTrace(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QRCodeTrace version.
         * @member {number} version
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @instance
         */
        QRCodeTrace.prototype.version = 0;

        /**
         * QRCodeTrace qrCodePayload.
         * @member {Uint8Array} qrCodePayload
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @instance
         */
        QRCodeTrace.prototype.qrCodePayload = $util.newBuffer([]);

        /**
         * QRCodeTrace masterSecretKeyLocation.
         * @member {Uint8Array} masterSecretKeyLocation
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @instance
         */
        QRCodeTrace.prototype.masterSecretKeyLocation = $util.newBuffer([]);

        /**
         * QRCodeTrace cipherTextHealthAuthority.
         * @member {Uint8Array} cipherTextHealthAuthority
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @instance
         */
        QRCodeTrace.prototype.cipherTextHealthAuthority = $util.newBuffer([]);

        /**
         * Creates a new QRCodeTrace instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @static
         * @param {crowdnotifier_v3.IQRCodeTrace=} [properties] Properties to set
         * @returns {crowdnotifier_v3.QRCodeTrace} QRCodeTrace instance
         */
        QRCodeTrace.create = function create(properties) {
            return new QRCodeTrace(properties);
        };

        /**
         * Encodes the specified QRCodeTrace message. Does not implicitly {@link crowdnotifier_v3.QRCodeTrace.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @static
         * @param {crowdnotifier_v3.IQRCodeTrace} message QRCodeTrace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QRCodeTrace.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.qrCodePayload != null && Object.hasOwnProperty.call(message, "qrCodePayload"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.qrCodePayload);
            if (message.masterSecretKeyLocation != null && Object.hasOwnProperty.call(message, "masterSecretKeyLocation"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.masterSecretKeyLocation);
            if (message.cipherTextHealthAuthority != null && Object.hasOwnProperty.call(message, "cipherTextHealthAuthority"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.cipherTextHealthAuthority);
            return writer;
        };

        /**
         * Encodes the specified QRCodeTrace message, length delimited. Does not implicitly {@link crowdnotifier_v3.QRCodeTrace.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @static
         * @param {crowdnotifier_v3.IQRCodeTrace} message QRCodeTrace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QRCodeTrace.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QRCodeTrace message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.QRCodeTrace} QRCodeTrace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QRCodeTrace.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.QRCodeTrace();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.uint32();
                    break;
                case 2:
                    message.qrCodePayload = reader.bytes();
                    break;
                case 3:
                    message.masterSecretKeyLocation = reader.bytes();
                    break;
                case 4:
                    message.cipherTextHealthAuthority = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a QRCodeTrace message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.QRCodeTrace} QRCodeTrace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QRCodeTrace.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QRCodeTrace message.
         * @function verify
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QRCodeTrace.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.qrCodePayload != null && message.hasOwnProperty("qrCodePayload"))
                if (!(message.qrCodePayload && typeof message.qrCodePayload.length === "number" || $util.isString(message.qrCodePayload)))
                    return "qrCodePayload: buffer expected";
            if (message.masterSecretKeyLocation != null && message.hasOwnProperty("masterSecretKeyLocation"))
                if (!(message.masterSecretKeyLocation && typeof message.masterSecretKeyLocation.length === "number" || $util.isString(message.masterSecretKeyLocation)))
                    return "masterSecretKeyLocation: buffer expected";
            if (message.cipherTextHealthAuthority != null && message.hasOwnProperty("cipherTextHealthAuthority"))
                if (!(message.cipherTextHealthAuthority && typeof message.cipherTextHealthAuthority.length === "number" || $util.isString(message.cipherTextHealthAuthority)))
                    return "cipherTextHealthAuthority: buffer expected";
            return null;
        };

        /**
         * Creates a QRCodeTrace message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.QRCodeTrace} QRCodeTrace
         */
        QRCodeTrace.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.QRCodeTrace)
                return object;
            var message = new $root.crowdnotifier_v3.QRCodeTrace();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.qrCodePayload != null)
                if (typeof object.qrCodePayload === "string")
                    $util.base64.decode(object.qrCodePayload, message.qrCodePayload = $util.newBuffer($util.base64.length(object.qrCodePayload)), 0);
                else if (object.qrCodePayload.length)
                    message.qrCodePayload = object.qrCodePayload;
            if (object.masterSecretKeyLocation != null)
                if (typeof object.masterSecretKeyLocation === "string")
                    $util.base64.decode(object.masterSecretKeyLocation, message.masterSecretKeyLocation = $util.newBuffer($util.base64.length(object.masterSecretKeyLocation)), 0);
                else if (object.masterSecretKeyLocation.length)
                    message.masterSecretKeyLocation = object.masterSecretKeyLocation;
            if (object.cipherTextHealthAuthority != null)
                if (typeof object.cipherTextHealthAuthority === "string")
                    $util.base64.decode(object.cipherTextHealthAuthority, message.cipherTextHealthAuthority = $util.newBuffer($util.base64.length(object.cipherTextHealthAuthority)), 0);
                else if (object.cipherTextHealthAuthority.length)
                    message.cipherTextHealthAuthority = object.cipherTextHealthAuthority;
            return message;
        };

        /**
         * Creates a plain object from a QRCodeTrace message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @static
         * @param {crowdnotifier_v3.QRCodeTrace} message QRCodeTrace
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QRCodeTrace.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = 0;
                if (options.bytes === String)
                    object.qrCodePayload = "";
                else {
                    object.qrCodePayload = [];
                    if (options.bytes !== Array)
                        object.qrCodePayload = $util.newBuffer(object.qrCodePayload);
                }
                if (options.bytes === String)
                    object.masterSecretKeyLocation = "";
                else {
                    object.masterSecretKeyLocation = [];
                    if (options.bytes !== Array)
                        object.masterSecretKeyLocation = $util.newBuffer(object.masterSecretKeyLocation);
                }
                if (options.bytes === String)
                    object.cipherTextHealthAuthority = "";
                else {
                    object.cipherTextHealthAuthority = [];
                    if (options.bytes !== Array)
                        object.cipherTextHealthAuthority = $util.newBuffer(object.cipherTextHealthAuthority);
                }
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.qrCodePayload != null && message.hasOwnProperty("qrCodePayload"))
                object.qrCodePayload = options.bytes === String ? $util.base64.encode(message.qrCodePayload, 0, message.qrCodePayload.length) : options.bytes === Array ? Array.prototype.slice.call(message.qrCodePayload) : message.qrCodePayload;
            if (message.masterSecretKeyLocation != null && message.hasOwnProperty("masterSecretKeyLocation"))
                object.masterSecretKeyLocation = options.bytes === String ? $util.base64.encode(message.masterSecretKeyLocation, 0, message.masterSecretKeyLocation.length) : options.bytes === Array ? Array.prototype.slice.call(message.masterSecretKeyLocation) : message.masterSecretKeyLocation;
            if (message.cipherTextHealthAuthority != null && message.hasOwnProperty("cipherTextHealthAuthority"))
                object.cipherTextHealthAuthority = options.bytes === String ? $util.base64.encode(message.cipherTextHealthAuthority, 0, message.cipherTextHealthAuthority.length) : options.bytes === Array ? Array.prototype.slice.call(message.cipherTextHealthAuthority) : message.cipherTextHealthAuthority;
            return object;
        };

        /**
         * Converts this QRCodeTrace to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.QRCodeTrace
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QRCodeTrace.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QRCodeTrace;
    })();

    crowdnotifier_v3.PreTrace = (function() {

        /**
         * Properties of a PreTrace.
         * @memberof crowdnotifier_v3
         * @interface IPreTrace
         * @property {Uint8Array|null} [identity] PreTrace identity
         * @property {Uint8Array|null} [partialSecretKeyForIdentityOfLocation] PreTrace partialSecretKeyForIdentityOfLocation
         * @property {Uint8Array|null} [cipherTextHealthAuthority] PreTrace cipherTextHealthAuthority
         * @property {Uint8Array|null} [notificationKey] PreTrace notificationKey
         */

        /**
         * Constructs a new PreTrace.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a PreTrace.
         * @implements IPreTrace
         * @constructor
         * @param {crowdnotifier_v3.IPreTrace=} [properties] Properties to set
         */
        function PreTrace(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PreTrace identity.
         * @member {Uint8Array} identity
         * @memberof crowdnotifier_v3.PreTrace
         * @instance
         */
        PreTrace.prototype.identity = $util.newBuffer([]);

        /**
         * PreTrace partialSecretKeyForIdentityOfLocation.
         * @member {Uint8Array} partialSecretKeyForIdentityOfLocation
         * @memberof crowdnotifier_v3.PreTrace
         * @instance
         */
        PreTrace.prototype.partialSecretKeyForIdentityOfLocation = $util.newBuffer([]);

        /**
         * PreTrace cipherTextHealthAuthority.
         * @member {Uint8Array} cipherTextHealthAuthority
         * @memberof crowdnotifier_v3.PreTrace
         * @instance
         */
        PreTrace.prototype.cipherTextHealthAuthority = $util.newBuffer([]);

        /**
         * PreTrace notificationKey.
         * @member {Uint8Array} notificationKey
         * @memberof crowdnotifier_v3.PreTrace
         * @instance
         */
        PreTrace.prototype.notificationKey = $util.newBuffer([]);

        /**
         * Creates a new PreTrace instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.PreTrace
         * @static
         * @param {crowdnotifier_v3.IPreTrace=} [properties] Properties to set
         * @returns {crowdnotifier_v3.PreTrace} PreTrace instance
         */
        PreTrace.create = function create(properties) {
            return new PreTrace(properties);
        };

        /**
         * Encodes the specified PreTrace message. Does not implicitly {@link crowdnotifier_v3.PreTrace.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.PreTrace
         * @static
         * @param {crowdnotifier_v3.IPreTrace} message PreTrace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PreTrace.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.identity != null && Object.hasOwnProperty.call(message, "identity"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.identity);
            if (message.partialSecretKeyForIdentityOfLocation != null && Object.hasOwnProperty.call(message, "partialSecretKeyForIdentityOfLocation"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.partialSecretKeyForIdentityOfLocation);
            if (message.cipherTextHealthAuthority != null && Object.hasOwnProperty.call(message, "cipherTextHealthAuthority"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.cipherTextHealthAuthority);
            if (message.notificationKey != null && Object.hasOwnProperty.call(message, "notificationKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.notificationKey);
            return writer;
        };

        /**
         * Encodes the specified PreTrace message, length delimited. Does not implicitly {@link crowdnotifier_v3.PreTrace.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.PreTrace
         * @static
         * @param {crowdnotifier_v3.IPreTrace} message PreTrace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PreTrace.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PreTrace message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.PreTrace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.PreTrace} PreTrace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PreTrace.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.PreTrace();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.identity = reader.bytes();
                    break;
                case 2:
                    message.partialSecretKeyForIdentityOfLocation = reader.bytes();
                    break;
                case 3:
                    message.cipherTextHealthAuthority = reader.bytes();
                    break;
                case 5:
                    message.notificationKey = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PreTrace message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.PreTrace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.PreTrace} PreTrace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PreTrace.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PreTrace message.
         * @function verify
         * @memberof crowdnotifier_v3.PreTrace
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PreTrace.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.identity != null && message.hasOwnProperty("identity"))
                if (!(message.identity && typeof message.identity.length === "number" || $util.isString(message.identity)))
                    return "identity: buffer expected";
            if (message.partialSecretKeyForIdentityOfLocation != null && message.hasOwnProperty("partialSecretKeyForIdentityOfLocation"))
                if (!(message.partialSecretKeyForIdentityOfLocation && typeof message.partialSecretKeyForIdentityOfLocation.length === "number" || $util.isString(message.partialSecretKeyForIdentityOfLocation)))
                    return "partialSecretKeyForIdentityOfLocation: buffer expected";
            if (message.cipherTextHealthAuthority != null && message.hasOwnProperty("cipherTextHealthAuthority"))
                if (!(message.cipherTextHealthAuthority && typeof message.cipherTextHealthAuthority.length === "number" || $util.isString(message.cipherTextHealthAuthority)))
                    return "cipherTextHealthAuthority: buffer expected";
            if (message.notificationKey != null && message.hasOwnProperty("notificationKey"))
                if (!(message.notificationKey && typeof message.notificationKey.length === "number" || $util.isString(message.notificationKey)))
                    return "notificationKey: buffer expected";
            return null;
        };

        /**
         * Creates a PreTrace message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.PreTrace
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.PreTrace} PreTrace
         */
        PreTrace.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.PreTrace)
                return object;
            var message = new $root.crowdnotifier_v3.PreTrace();
            if (object.identity != null)
                if (typeof object.identity === "string")
                    $util.base64.decode(object.identity, message.identity = $util.newBuffer($util.base64.length(object.identity)), 0);
                else if (object.identity.length)
                    message.identity = object.identity;
            if (object.partialSecretKeyForIdentityOfLocation != null)
                if (typeof object.partialSecretKeyForIdentityOfLocation === "string")
                    $util.base64.decode(object.partialSecretKeyForIdentityOfLocation, message.partialSecretKeyForIdentityOfLocation = $util.newBuffer($util.base64.length(object.partialSecretKeyForIdentityOfLocation)), 0);
                else if (object.partialSecretKeyForIdentityOfLocation.length)
                    message.partialSecretKeyForIdentityOfLocation = object.partialSecretKeyForIdentityOfLocation;
            if (object.cipherTextHealthAuthority != null)
                if (typeof object.cipherTextHealthAuthority === "string")
                    $util.base64.decode(object.cipherTextHealthAuthority, message.cipherTextHealthAuthority = $util.newBuffer($util.base64.length(object.cipherTextHealthAuthority)), 0);
                else if (object.cipherTextHealthAuthority.length)
                    message.cipherTextHealthAuthority = object.cipherTextHealthAuthority;
            if (object.notificationKey != null)
                if (typeof object.notificationKey === "string")
                    $util.base64.decode(object.notificationKey, message.notificationKey = $util.newBuffer($util.base64.length(object.notificationKey)), 0);
                else if (object.notificationKey.length)
                    message.notificationKey = object.notificationKey;
            return message;
        };

        /**
         * Creates a plain object from a PreTrace message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.PreTrace
         * @static
         * @param {crowdnotifier_v3.PreTrace} message PreTrace
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PreTrace.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.identity = "";
                else {
                    object.identity = [];
                    if (options.bytes !== Array)
                        object.identity = $util.newBuffer(object.identity);
                }
                if (options.bytes === String)
                    object.partialSecretKeyForIdentityOfLocation = "";
                else {
                    object.partialSecretKeyForIdentityOfLocation = [];
                    if (options.bytes !== Array)
                        object.partialSecretKeyForIdentityOfLocation = $util.newBuffer(object.partialSecretKeyForIdentityOfLocation);
                }
                if (options.bytes === String)
                    object.cipherTextHealthAuthority = "";
                else {
                    object.cipherTextHealthAuthority = [];
                    if (options.bytes !== Array)
                        object.cipherTextHealthAuthority = $util.newBuffer(object.cipherTextHealthAuthority);
                }
                if (options.bytes === String)
                    object.notificationKey = "";
                else {
                    object.notificationKey = [];
                    if (options.bytes !== Array)
                        object.notificationKey = $util.newBuffer(object.notificationKey);
                }
            }
            if (message.identity != null && message.hasOwnProperty("identity"))
                object.identity = options.bytes === String ? $util.base64.encode(message.identity, 0, message.identity.length) : options.bytes === Array ? Array.prototype.slice.call(message.identity) : message.identity;
            if (message.partialSecretKeyForIdentityOfLocation != null && message.hasOwnProperty("partialSecretKeyForIdentityOfLocation"))
                object.partialSecretKeyForIdentityOfLocation = options.bytes === String ? $util.base64.encode(message.partialSecretKeyForIdentityOfLocation, 0, message.partialSecretKeyForIdentityOfLocation.length) : options.bytes === Array ? Array.prototype.slice.call(message.partialSecretKeyForIdentityOfLocation) : message.partialSecretKeyForIdentityOfLocation;
            if (message.cipherTextHealthAuthority != null && message.hasOwnProperty("cipherTextHealthAuthority"))
                object.cipherTextHealthAuthority = options.bytes === String ? $util.base64.encode(message.cipherTextHealthAuthority, 0, message.cipherTextHealthAuthority.length) : options.bytes === Array ? Array.prototype.slice.call(message.cipherTextHealthAuthority) : message.cipherTextHealthAuthority;
            if (message.notificationKey != null && message.hasOwnProperty("notificationKey"))
                object.notificationKey = options.bytes === String ? $util.base64.encode(message.notificationKey, 0, message.notificationKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.notificationKey) : message.notificationKey;
            return object;
        };

        /**
         * Converts this PreTrace to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.PreTrace
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PreTrace.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PreTrace;
    })();

    crowdnotifier_v3.TraceProof = (function() {

        /**
         * Properties of a TraceProof.
         * @memberof crowdnotifier_v3
         * @interface ITraceProof
         * @property {Uint8Array|null} [masterPublicKey] TraceProof masterPublicKey
         * @property {Uint8Array|null} [nonce1] TraceProof nonce1
         * @property {Uint8Array|null} [nonce2] TraceProof nonce2
         */

        /**
         * Constructs a new TraceProof.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a TraceProof.
         * @implements ITraceProof
         * @constructor
         * @param {crowdnotifier_v3.ITraceProof=} [properties] Properties to set
         */
        function TraceProof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TraceProof masterPublicKey.
         * @member {Uint8Array} masterPublicKey
         * @memberof crowdnotifier_v3.TraceProof
         * @instance
         */
        TraceProof.prototype.masterPublicKey = $util.newBuffer([]);

        /**
         * TraceProof nonce1.
         * @member {Uint8Array} nonce1
         * @memberof crowdnotifier_v3.TraceProof
         * @instance
         */
        TraceProof.prototype.nonce1 = $util.newBuffer([]);

        /**
         * TraceProof nonce2.
         * @member {Uint8Array} nonce2
         * @memberof crowdnotifier_v3.TraceProof
         * @instance
         */
        TraceProof.prototype.nonce2 = $util.newBuffer([]);

        /**
         * Creates a new TraceProof instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.TraceProof
         * @static
         * @param {crowdnotifier_v3.ITraceProof=} [properties] Properties to set
         * @returns {crowdnotifier_v3.TraceProof} TraceProof instance
         */
        TraceProof.create = function create(properties) {
            return new TraceProof(properties);
        };

        /**
         * Encodes the specified TraceProof message. Does not implicitly {@link crowdnotifier_v3.TraceProof.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.TraceProof
         * @static
         * @param {crowdnotifier_v3.ITraceProof} message TraceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TraceProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.masterPublicKey != null && Object.hasOwnProperty.call(message, "masterPublicKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.masterPublicKey);
            if (message.nonce1 != null && Object.hasOwnProperty.call(message, "nonce1"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.nonce1);
            if (message.nonce2 != null && Object.hasOwnProperty.call(message, "nonce2"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.nonce2);
            return writer;
        };

        /**
         * Encodes the specified TraceProof message, length delimited. Does not implicitly {@link crowdnotifier_v3.TraceProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.TraceProof
         * @static
         * @param {crowdnotifier_v3.ITraceProof} message TraceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TraceProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TraceProof message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.TraceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.TraceProof} TraceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TraceProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.TraceProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.masterPublicKey = reader.bytes();
                    break;
                case 2:
                    message.nonce1 = reader.bytes();
                    break;
                case 3:
                    message.nonce2 = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TraceProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.TraceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.TraceProof} TraceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TraceProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TraceProof message.
         * @function verify
         * @memberof crowdnotifier_v3.TraceProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TraceProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.masterPublicKey != null && message.hasOwnProperty("masterPublicKey"))
                if (!(message.masterPublicKey && typeof message.masterPublicKey.length === "number" || $util.isString(message.masterPublicKey)))
                    return "masterPublicKey: buffer expected";
            if (message.nonce1 != null && message.hasOwnProperty("nonce1"))
                if (!(message.nonce1 && typeof message.nonce1.length === "number" || $util.isString(message.nonce1)))
                    return "nonce1: buffer expected";
            if (message.nonce2 != null && message.hasOwnProperty("nonce2"))
                if (!(message.nonce2 && typeof message.nonce2.length === "number" || $util.isString(message.nonce2)))
                    return "nonce2: buffer expected";
            return null;
        };

        /**
         * Creates a TraceProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.TraceProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.TraceProof} TraceProof
         */
        TraceProof.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.TraceProof)
                return object;
            var message = new $root.crowdnotifier_v3.TraceProof();
            if (object.masterPublicKey != null)
                if (typeof object.masterPublicKey === "string")
                    $util.base64.decode(object.masterPublicKey, message.masterPublicKey = $util.newBuffer($util.base64.length(object.masterPublicKey)), 0);
                else if (object.masterPublicKey.length)
                    message.masterPublicKey = object.masterPublicKey;
            if (object.nonce1 != null)
                if (typeof object.nonce1 === "string")
                    $util.base64.decode(object.nonce1, message.nonce1 = $util.newBuffer($util.base64.length(object.nonce1)), 0);
                else if (object.nonce1.length)
                    message.nonce1 = object.nonce1;
            if (object.nonce2 != null)
                if (typeof object.nonce2 === "string")
                    $util.base64.decode(object.nonce2, message.nonce2 = $util.newBuffer($util.base64.length(object.nonce2)), 0);
                else if (object.nonce2.length)
                    message.nonce2 = object.nonce2;
            return message;
        };

        /**
         * Creates a plain object from a TraceProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.TraceProof
         * @static
         * @param {crowdnotifier_v3.TraceProof} message TraceProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TraceProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.masterPublicKey = "";
                else {
                    object.masterPublicKey = [];
                    if (options.bytes !== Array)
                        object.masterPublicKey = $util.newBuffer(object.masterPublicKey);
                }
                if (options.bytes === String)
                    object.nonce1 = "";
                else {
                    object.nonce1 = [];
                    if (options.bytes !== Array)
                        object.nonce1 = $util.newBuffer(object.nonce1);
                }
                if (options.bytes === String)
                    object.nonce2 = "";
                else {
                    object.nonce2 = [];
                    if (options.bytes !== Array)
                        object.nonce2 = $util.newBuffer(object.nonce2);
                }
            }
            if (message.masterPublicKey != null && message.hasOwnProperty("masterPublicKey"))
                object.masterPublicKey = options.bytes === String ? $util.base64.encode(message.masterPublicKey, 0, message.masterPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.masterPublicKey) : message.masterPublicKey;
            if (message.nonce1 != null && message.hasOwnProperty("nonce1"))
                object.nonce1 = options.bytes === String ? $util.base64.encode(message.nonce1, 0, message.nonce1.length) : options.bytes === Array ? Array.prototype.slice.call(message.nonce1) : message.nonce1;
            if (message.nonce2 != null && message.hasOwnProperty("nonce2"))
                object.nonce2 = options.bytes === String ? $util.base64.encode(message.nonce2, 0, message.nonce2.length) : options.bytes === Array ? Array.prototype.slice.call(message.nonce2) : message.nonce2;
            return object;
        };

        /**
         * Converts this TraceProof to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.TraceProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TraceProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TraceProof;
    })();

    crowdnotifier_v3.PreTraceWithProof = (function() {

        /**
         * Properties of a PreTraceWithProof.
         * @memberof crowdnotifier_v3
         * @interface IPreTraceWithProof
         * @property {crowdnotifier_v3.IPreTrace|null} [preTrace] PreTraceWithProof preTrace
         * @property {crowdnotifier_v3.ITraceProof|null} [proof] PreTraceWithProof proof
         * @property {Uint8Array|null} [qrCodePayload] PreTraceWithProof qrCodePayload
         * @property {number|Long|null} [startTime] PreTraceWithProof startTime
         * @property {number|Long|null} [endTime] PreTraceWithProof endTime
         * @property {number|Long|null} [startOfInterval] PreTraceWithProof startOfInterval
         */

        /**
         * Constructs a new PreTraceWithProof.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a PreTraceWithProof.
         * @implements IPreTraceWithProof
         * @constructor
         * @param {crowdnotifier_v3.IPreTraceWithProof=} [properties] Properties to set
         */
        function PreTraceWithProof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PreTraceWithProof preTrace.
         * @member {crowdnotifier_v3.IPreTrace|null|undefined} preTrace
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @instance
         */
        PreTraceWithProof.prototype.preTrace = null;

        /**
         * PreTraceWithProof proof.
         * @member {crowdnotifier_v3.ITraceProof|null|undefined} proof
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @instance
         */
        PreTraceWithProof.prototype.proof = null;

        /**
         * PreTraceWithProof qrCodePayload.
         * @member {Uint8Array} qrCodePayload
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @instance
         */
        PreTraceWithProof.prototype.qrCodePayload = $util.newBuffer([]);

        /**
         * PreTraceWithProof startTime.
         * @member {number|Long} startTime
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @instance
         */
        PreTraceWithProof.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PreTraceWithProof endTime.
         * @member {number|Long} endTime
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @instance
         */
        PreTraceWithProof.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PreTraceWithProof startOfInterval.
         * @member {number|Long} startOfInterval
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @instance
         */
        PreTraceWithProof.prototype.startOfInterval = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PreTraceWithProof instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @static
         * @param {crowdnotifier_v3.IPreTraceWithProof=} [properties] Properties to set
         * @returns {crowdnotifier_v3.PreTraceWithProof} PreTraceWithProof instance
         */
        PreTraceWithProof.create = function create(properties) {
            return new PreTraceWithProof(properties);
        };

        /**
         * Encodes the specified PreTraceWithProof message. Does not implicitly {@link crowdnotifier_v3.PreTraceWithProof.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @static
         * @param {crowdnotifier_v3.IPreTraceWithProof} message PreTraceWithProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PreTraceWithProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.preTrace != null && Object.hasOwnProperty.call(message, "preTrace"))
                $root.crowdnotifier_v3.PreTrace.encode(message.preTrace, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.proof != null && Object.hasOwnProperty.call(message, "proof"))
                $root.crowdnotifier_v3.TraceProof.encode(message.proof, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.qrCodePayload != null && Object.hasOwnProperty.call(message, "qrCodePayload"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.qrCodePayload);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.endTime);
            if (message.startOfInterval != null && Object.hasOwnProperty.call(message, "startOfInterval"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.startOfInterval);
            return writer;
        };

        /**
         * Encodes the specified PreTraceWithProof message, length delimited. Does not implicitly {@link crowdnotifier_v3.PreTraceWithProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @static
         * @param {crowdnotifier_v3.IPreTraceWithProof} message PreTraceWithProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PreTraceWithProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PreTraceWithProof message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.PreTraceWithProof} PreTraceWithProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PreTraceWithProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.PreTraceWithProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.preTrace = $root.crowdnotifier_v3.PreTrace.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof = $root.crowdnotifier_v3.TraceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.qrCodePayload = reader.bytes();
                    break;
                case 4:
                    message.startTime = reader.int64();
                    break;
                case 5:
                    message.endTime = reader.int64();
                    break;
                case 6:
                    message.startOfInterval = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PreTraceWithProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.PreTraceWithProof} PreTraceWithProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PreTraceWithProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PreTraceWithProof message.
         * @function verify
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PreTraceWithProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.preTrace != null && message.hasOwnProperty("preTrace")) {
                var error = $root.crowdnotifier_v3.PreTrace.verify(message.preTrace);
                if (error)
                    return "preTrace." + error;
            }
            if (message.proof != null && message.hasOwnProperty("proof")) {
                var error = $root.crowdnotifier_v3.TraceProof.verify(message.proof);
                if (error)
                    return "proof." + error;
            }
            if (message.qrCodePayload != null && message.hasOwnProperty("qrCodePayload"))
                if (!(message.qrCodePayload && typeof message.qrCodePayload.length === "number" || $util.isString(message.qrCodePayload)))
                    return "qrCodePayload: buffer expected";
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (!$util.isInteger(message.endTime) && !(message.endTime && $util.isInteger(message.endTime.low) && $util.isInteger(message.endTime.high)))
                    return "endTime: integer|Long expected";
            if (message.startOfInterval != null && message.hasOwnProperty("startOfInterval"))
                if (!$util.isInteger(message.startOfInterval) && !(message.startOfInterval && $util.isInteger(message.startOfInterval.low) && $util.isInteger(message.startOfInterval.high)))
                    return "startOfInterval: integer|Long expected";
            return null;
        };

        /**
         * Creates a PreTraceWithProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.PreTraceWithProof} PreTraceWithProof
         */
        PreTraceWithProof.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.PreTraceWithProof)
                return object;
            var message = new $root.crowdnotifier_v3.PreTraceWithProof();
            if (object.preTrace != null) {
                if (typeof object.preTrace !== "object")
                    throw TypeError(".crowdnotifier_v3.PreTraceWithProof.preTrace: object expected");
                message.preTrace = $root.crowdnotifier_v3.PreTrace.fromObject(object.preTrace);
            }
            if (object.proof != null) {
                if (typeof object.proof !== "object")
                    throw TypeError(".crowdnotifier_v3.PreTraceWithProof.proof: object expected");
                message.proof = $root.crowdnotifier_v3.TraceProof.fromObject(object.proof);
            }
            if (object.qrCodePayload != null)
                if (typeof object.qrCodePayload === "string")
                    $util.base64.decode(object.qrCodePayload, message.qrCodePayload = $util.newBuffer($util.base64.length(object.qrCodePayload)), 0);
                else if (object.qrCodePayload.length)
                    message.qrCodePayload = object.qrCodePayload;
            if (object.startTime != null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
            if (object.endTime != null)
                if ($util.Long)
                    (message.endTime = $util.Long.fromValue(object.endTime)).unsigned = false;
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber();
            if (object.startOfInterval != null)
                if ($util.Long)
                    (message.startOfInterval = $util.Long.fromValue(object.startOfInterval)).unsigned = false;
                else if (typeof object.startOfInterval === "string")
                    message.startOfInterval = parseInt(object.startOfInterval, 10);
                else if (typeof object.startOfInterval === "number")
                    message.startOfInterval = object.startOfInterval;
                else if (typeof object.startOfInterval === "object")
                    message.startOfInterval = new $util.LongBits(object.startOfInterval.low >>> 0, object.startOfInterval.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PreTraceWithProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @static
         * @param {crowdnotifier_v3.PreTraceWithProof} message PreTraceWithProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PreTraceWithProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.preTrace = null;
                object.proof = null;
                if (options.bytes === String)
                    object.qrCodePayload = "";
                else {
                    object.qrCodePayload = [];
                    if (options.bytes !== Array)
                        object.qrCodePayload = $util.newBuffer(object.qrCodePayload);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.endTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startOfInterval = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startOfInterval = options.longs === String ? "0" : 0;
            }
            if (message.preTrace != null && message.hasOwnProperty("preTrace"))
                object.preTrace = $root.crowdnotifier_v3.PreTrace.toObject(message.preTrace, options);
            if (message.proof != null && message.hasOwnProperty("proof"))
                object.proof = $root.crowdnotifier_v3.TraceProof.toObject(message.proof, options);
            if (message.qrCodePayload != null && message.hasOwnProperty("qrCodePayload"))
                object.qrCodePayload = options.bytes === String ? $util.base64.encode(message.qrCodePayload, 0, message.qrCodePayload.length) : options.bytes === Array ? Array.prototype.slice.call(message.qrCodePayload) : message.qrCodePayload;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber() : message.endTime;
            if (message.startOfInterval != null && message.hasOwnProperty("startOfInterval"))
                if (typeof message.startOfInterval === "number")
                    object.startOfInterval = options.longs === String ? String(message.startOfInterval) : message.startOfInterval;
                else
                    object.startOfInterval = options.longs === String ? $util.Long.prototype.toString.call(message.startOfInterval) : options.longs === Number ? new $util.LongBits(message.startOfInterval.low >>> 0, message.startOfInterval.high >>> 0).toNumber() : message.startOfInterval;
            return object;
        };

        /**
         * Converts this PreTraceWithProof to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.PreTraceWithProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PreTraceWithProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PreTraceWithProof;
    })();

    crowdnotifier_v3.Trace = (function() {

        /**
         * Properties of a Trace.
         * @memberof crowdnotifier_v3
         * @interface ITrace
         * @property {Uint8Array|null} [identity] Trace identity
         * @property {Uint8Array|null} [secretKeyForIdentity] Trace secretKeyForIdentity
         * @property {number|Long|null} [startTime] Trace startTime
         * @property {number|Long|null} [endTime] Trace endTime
         * @property {Uint8Array|null} [nonce] Trace nonce
         * @property {Uint8Array|null} [encryptedAssociatedData] Trace encryptedAssociatedData
         */

        /**
         * Constructs a new Trace.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a Trace.
         * @implements ITrace
         * @constructor
         * @param {crowdnotifier_v3.ITrace=} [properties] Properties to set
         */
        function Trace(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Trace identity.
         * @member {Uint8Array} identity
         * @memberof crowdnotifier_v3.Trace
         * @instance
         */
        Trace.prototype.identity = $util.newBuffer([]);

        /**
         * Trace secretKeyForIdentity.
         * @member {Uint8Array} secretKeyForIdentity
         * @memberof crowdnotifier_v3.Trace
         * @instance
         */
        Trace.prototype.secretKeyForIdentity = $util.newBuffer([]);

        /**
         * Trace startTime.
         * @member {number|Long} startTime
         * @memberof crowdnotifier_v3.Trace
         * @instance
         */
        Trace.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Trace endTime.
         * @member {number|Long} endTime
         * @memberof crowdnotifier_v3.Trace
         * @instance
         */
        Trace.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Trace nonce.
         * @member {Uint8Array} nonce
         * @memberof crowdnotifier_v3.Trace
         * @instance
         */
        Trace.prototype.nonce = $util.newBuffer([]);

        /**
         * Trace encryptedAssociatedData.
         * @member {Uint8Array} encryptedAssociatedData
         * @memberof crowdnotifier_v3.Trace
         * @instance
         */
        Trace.prototype.encryptedAssociatedData = $util.newBuffer([]);

        /**
         * Creates a new Trace instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.Trace
         * @static
         * @param {crowdnotifier_v3.ITrace=} [properties] Properties to set
         * @returns {crowdnotifier_v3.Trace} Trace instance
         */
        Trace.create = function create(properties) {
            return new Trace(properties);
        };

        /**
         * Encodes the specified Trace message. Does not implicitly {@link crowdnotifier_v3.Trace.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.Trace
         * @static
         * @param {crowdnotifier_v3.ITrace} message Trace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trace.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.identity != null && Object.hasOwnProperty.call(message, "identity"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.identity);
            if (message.secretKeyForIdentity != null && Object.hasOwnProperty.call(message, "secretKeyForIdentity"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.secretKeyForIdentity);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.endTime);
            if (message.nonce != null && Object.hasOwnProperty.call(message, "nonce"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.nonce);
            if (message.encryptedAssociatedData != null && Object.hasOwnProperty.call(message, "encryptedAssociatedData"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.encryptedAssociatedData);
            return writer;
        };

        /**
         * Encodes the specified Trace message, length delimited. Does not implicitly {@link crowdnotifier_v3.Trace.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.Trace
         * @static
         * @param {crowdnotifier_v3.ITrace} message Trace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trace.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Trace message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.Trace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.Trace} Trace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Trace.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.Trace();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.identity = reader.bytes();
                    break;
                case 2:
                    message.secretKeyForIdentity = reader.bytes();
                    break;
                case 3:
                    message.startTime = reader.int64();
                    break;
                case 4:
                    message.endTime = reader.int64();
                    break;
                case 5:
                    message.nonce = reader.bytes();
                    break;
                case 6:
                    message.encryptedAssociatedData = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Trace message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.Trace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.Trace} Trace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Trace.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Trace message.
         * @function verify
         * @memberof crowdnotifier_v3.Trace
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Trace.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.identity != null && message.hasOwnProperty("identity"))
                if (!(message.identity && typeof message.identity.length === "number" || $util.isString(message.identity)))
                    return "identity: buffer expected";
            if (message.secretKeyForIdentity != null && message.hasOwnProperty("secretKeyForIdentity"))
                if (!(message.secretKeyForIdentity && typeof message.secretKeyForIdentity.length === "number" || $util.isString(message.secretKeyForIdentity)))
                    return "secretKeyForIdentity: buffer expected";
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (!$util.isInteger(message.endTime) && !(message.endTime && $util.isInteger(message.endTime.low) && $util.isInteger(message.endTime.high)))
                    return "endTime: integer|Long expected";
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                if (!(message.nonce && typeof message.nonce.length === "number" || $util.isString(message.nonce)))
                    return "nonce: buffer expected";
            if (message.encryptedAssociatedData != null && message.hasOwnProperty("encryptedAssociatedData"))
                if (!(message.encryptedAssociatedData && typeof message.encryptedAssociatedData.length === "number" || $util.isString(message.encryptedAssociatedData)))
                    return "encryptedAssociatedData: buffer expected";
            return null;
        };

        /**
         * Creates a Trace message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.Trace
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.Trace} Trace
         */
        Trace.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.Trace)
                return object;
            var message = new $root.crowdnotifier_v3.Trace();
            if (object.identity != null)
                if (typeof object.identity === "string")
                    $util.base64.decode(object.identity, message.identity = $util.newBuffer($util.base64.length(object.identity)), 0);
                else if (object.identity.length)
                    message.identity = object.identity;
            if (object.secretKeyForIdentity != null)
                if (typeof object.secretKeyForIdentity === "string")
                    $util.base64.decode(object.secretKeyForIdentity, message.secretKeyForIdentity = $util.newBuffer($util.base64.length(object.secretKeyForIdentity)), 0);
                else if (object.secretKeyForIdentity.length)
                    message.secretKeyForIdentity = object.secretKeyForIdentity;
            if (object.startTime != null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
            if (object.endTime != null)
                if ($util.Long)
                    (message.endTime = $util.Long.fromValue(object.endTime)).unsigned = false;
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber();
            if (object.nonce != null)
                if (typeof object.nonce === "string")
                    $util.base64.decode(object.nonce, message.nonce = $util.newBuffer($util.base64.length(object.nonce)), 0);
                else if (object.nonce.length)
                    message.nonce = object.nonce;
            if (object.encryptedAssociatedData != null)
                if (typeof object.encryptedAssociatedData === "string")
                    $util.base64.decode(object.encryptedAssociatedData, message.encryptedAssociatedData = $util.newBuffer($util.base64.length(object.encryptedAssociatedData)), 0);
                else if (object.encryptedAssociatedData.length)
                    message.encryptedAssociatedData = object.encryptedAssociatedData;
            return message;
        };

        /**
         * Creates a plain object from a Trace message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.Trace
         * @static
         * @param {crowdnotifier_v3.Trace} message Trace
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Trace.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.identity = "";
                else {
                    object.identity = [];
                    if (options.bytes !== Array)
                        object.identity = $util.newBuffer(object.identity);
                }
                if (options.bytes === String)
                    object.secretKeyForIdentity = "";
                else {
                    object.secretKeyForIdentity = [];
                    if (options.bytes !== Array)
                        object.secretKeyForIdentity = $util.newBuffer(object.secretKeyForIdentity);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.endTime = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.nonce = "";
                else {
                    object.nonce = [];
                    if (options.bytes !== Array)
                        object.nonce = $util.newBuffer(object.nonce);
                }
                if (options.bytes === String)
                    object.encryptedAssociatedData = "";
                else {
                    object.encryptedAssociatedData = [];
                    if (options.bytes !== Array)
                        object.encryptedAssociatedData = $util.newBuffer(object.encryptedAssociatedData);
                }
            }
            if (message.identity != null && message.hasOwnProperty("identity"))
                object.identity = options.bytes === String ? $util.base64.encode(message.identity, 0, message.identity.length) : options.bytes === Array ? Array.prototype.slice.call(message.identity) : message.identity;
            if (message.secretKeyForIdentity != null && message.hasOwnProperty("secretKeyForIdentity"))
                object.secretKeyForIdentity = options.bytes === String ? $util.base64.encode(message.secretKeyForIdentity, 0, message.secretKeyForIdentity.length) : options.bytes === Array ? Array.prototype.slice.call(message.secretKeyForIdentity) : message.secretKeyForIdentity;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber() : message.endTime;
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                object.nonce = options.bytes === String ? $util.base64.encode(message.nonce, 0, message.nonce.length) : options.bytes === Array ? Array.prototype.slice.call(message.nonce) : message.nonce;
            if (message.encryptedAssociatedData != null && message.hasOwnProperty("encryptedAssociatedData"))
                object.encryptedAssociatedData = options.bytes === String ? $util.base64.encode(message.encryptedAssociatedData, 0, message.encryptedAssociatedData.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedAssociatedData) : message.encryptedAssociatedData;
            return object;
        };

        /**
         * Converts this Trace to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.Trace
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Trace.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Trace;
    })();

    crowdnotifier_v3.QRCodePayload = (function() {

        /**
         * Properties of a QRCodePayload.
         * @memberof crowdnotifier_v3
         * @interface IQRCodePayload
         * @property {number|null} [version] QRCodePayload version
         * @property {crowdnotifier_v3.ITraceLocation|null} [locationData] QRCodePayload locationData
         * @property {crowdnotifier_v3.ICrowdNotifierData|null} [crowdNotifierData] QRCodePayload crowdNotifierData
         * @property {Uint8Array|null} [countryData] QRCodePayload countryData
         */

        /**
         * Constructs a new QRCodePayload.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a QRCodePayload.
         * @implements IQRCodePayload
         * @constructor
         * @param {crowdnotifier_v3.IQRCodePayload=} [properties] Properties to set
         */
        function QRCodePayload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QRCodePayload version.
         * @member {number} version
         * @memberof crowdnotifier_v3.QRCodePayload
         * @instance
         */
        QRCodePayload.prototype.version = 0;

        /**
         * QRCodePayload locationData.
         * @member {crowdnotifier_v3.ITraceLocation|null|undefined} locationData
         * @memberof crowdnotifier_v3.QRCodePayload
         * @instance
         */
        QRCodePayload.prototype.locationData = null;

        /**
         * QRCodePayload crowdNotifierData.
         * @member {crowdnotifier_v3.ICrowdNotifierData|null|undefined} crowdNotifierData
         * @memberof crowdnotifier_v3.QRCodePayload
         * @instance
         */
        QRCodePayload.prototype.crowdNotifierData = null;

        /**
         * QRCodePayload countryData.
         * @member {Uint8Array} countryData
         * @memberof crowdnotifier_v3.QRCodePayload
         * @instance
         */
        QRCodePayload.prototype.countryData = $util.newBuffer([]);

        /**
         * Creates a new QRCodePayload instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.QRCodePayload
         * @static
         * @param {crowdnotifier_v3.IQRCodePayload=} [properties] Properties to set
         * @returns {crowdnotifier_v3.QRCodePayload} QRCodePayload instance
         */
        QRCodePayload.create = function create(properties) {
            return new QRCodePayload(properties);
        };

        /**
         * Encodes the specified QRCodePayload message. Does not implicitly {@link crowdnotifier_v3.QRCodePayload.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.QRCodePayload
         * @static
         * @param {crowdnotifier_v3.IQRCodePayload} message QRCodePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QRCodePayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.locationData != null && Object.hasOwnProperty.call(message, "locationData"))
                $root.crowdnotifier_v3.TraceLocation.encode(message.locationData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.crowdNotifierData != null && Object.hasOwnProperty.call(message, "crowdNotifierData"))
                $root.crowdnotifier_v3.CrowdNotifierData.encode(message.crowdNotifierData, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.countryData != null && Object.hasOwnProperty.call(message, "countryData"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.countryData);
            return writer;
        };

        /**
         * Encodes the specified QRCodePayload message, length delimited. Does not implicitly {@link crowdnotifier_v3.QRCodePayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.QRCodePayload
         * @static
         * @param {crowdnotifier_v3.IQRCodePayload} message QRCodePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QRCodePayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QRCodePayload message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.QRCodePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.QRCodePayload} QRCodePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QRCodePayload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.QRCodePayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.uint32();
                    break;
                case 2:
                    message.locationData = $root.crowdnotifier_v3.TraceLocation.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.crowdNotifierData = $root.crowdnotifier_v3.CrowdNotifierData.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.countryData = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a QRCodePayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.QRCodePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.QRCodePayload} QRCodePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QRCodePayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QRCodePayload message.
         * @function verify
         * @memberof crowdnotifier_v3.QRCodePayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QRCodePayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.locationData != null && message.hasOwnProperty("locationData")) {
                var error = $root.crowdnotifier_v3.TraceLocation.verify(message.locationData);
                if (error)
                    return "locationData." + error;
            }
            if (message.crowdNotifierData != null && message.hasOwnProperty("crowdNotifierData")) {
                var error = $root.crowdnotifier_v3.CrowdNotifierData.verify(message.crowdNotifierData);
                if (error)
                    return "crowdNotifierData." + error;
            }
            if (message.countryData != null && message.hasOwnProperty("countryData"))
                if (!(message.countryData && typeof message.countryData.length === "number" || $util.isString(message.countryData)))
                    return "countryData: buffer expected";
            return null;
        };

        /**
         * Creates a QRCodePayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.QRCodePayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.QRCodePayload} QRCodePayload
         */
        QRCodePayload.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.QRCodePayload)
                return object;
            var message = new $root.crowdnotifier_v3.QRCodePayload();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.locationData != null) {
                if (typeof object.locationData !== "object")
                    throw TypeError(".crowdnotifier_v3.QRCodePayload.locationData: object expected");
                message.locationData = $root.crowdnotifier_v3.TraceLocation.fromObject(object.locationData);
            }
            if (object.crowdNotifierData != null) {
                if (typeof object.crowdNotifierData !== "object")
                    throw TypeError(".crowdnotifier_v3.QRCodePayload.crowdNotifierData: object expected");
                message.crowdNotifierData = $root.crowdnotifier_v3.CrowdNotifierData.fromObject(object.crowdNotifierData);
            }
            if (object.countryData != null)
                if (typeof object.countryData === "string")
                    $util.base64.decode(object.countryData, message.countryData = $util.newBuffer($util.base64.length(object.countryData)), 0);
                else if (object.countryData.length)
                    message.countryData = object.countryData;
            return message;
        };

        /**
         * Creates a plain object from a QRCodePayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.QRCodePayload
         * @static
         * @param {crowdnotifier_v3.QRCodePayload} message QRCodePayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QRCodePayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = 0;
                object.locationData = null;
                object.crowdNotifierData = null;
                if (options.bytes === String)
                    object.countryData = "";
                else {
                    object.countryData = [];
                    if (options.bytes !== Array)
                        object.countryData = $util.newBuffer(object.countryData);
                }
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.locationData != null && message.hasOwnProperty("locationData"))
                object.locationData = $root.crowdnotifier_v3.TraceLocation.toObject(message.locationData, options);
            if (message.crowdNotifierData != null && message.hasOwnProperty("crowdNotifierData"))
                object.crowdNotifierData = $root.crowdnotifier_v3.CrowdNotifierData.toObject(message.crowdNotifierData, options);
            if (message.countryData != null && message.hasOwnProperty("countryData"))
                object.countryData = options.bytes === String ? $util.base64.encode(message.countryData, 0, message.countryData.length) : options.bytes === Array ? Array.prototype.slice.call(message.countryData) : message.countryData;
            return object;
        };

        /**
         * Converts this QRCodePayload to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.QRCodePayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QRCodePayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QRCodePayload;
    })();

    crowdnotifier_v3.TraceLocation = (function() {

        /**
         * Properties of a TraceLocation.
         * @memberof crowdnotifier_v3
         * @interface ITraceLocation
         * @property {number|null} [version] TraceLocation version
         * @property {string|null} [description] TraceLocation description
         * @property {string|null} [address] TraceLocation address
         * @property {number|Long|null} [startTimestamp] TraceLocation startTimestamp
         * @property {number|Long|null} [endTimestamp] TraceLocation endTimestamp
         */

        /**
         * Constructs a new TraceLocation.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a TraceLocation.
         * @implements ITraceLocation
         * @constructor
         * @param {crowdnotifier_v3.ITraceLocation=} [properties] Properties to set
         */
        function TraceLocation(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TraceLocation version.
         * @member {number} version
         * @memberof crowdnotifier_v3.TraceLocation
         * @instance
         */
        TraceLocation.prototype.version = 0;

        /**
         * TraceLocation description.
         * @member {string} description
         * @memberof crowdnotifier_v3.TraceLocation
         * @instance
         */
        TraceLocation.prototype.description = "";

        /**
         * TraceLocation address.
         * @member {string} address
         * @memberof crowdnotifier_v3.TraceLocation
         * @instance
         */
        TraceLocation.prototype.address = "";

        /**
         * TraceLocation startTimestamp.
         * @member {number|Long} startTimestamp
         * @memberof crowdnotifier_v3.TraceLocation
         * @instance
         */
        TraceLocation.prototype.startTimestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * TraceLocation endTimestamp.
         * @member {number|Long} endTimestamp
         * @memberof crowdnotifier_v3.TraceLocation
         * @instance
         */
        TraceLocation.prototype.endTimestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new TraceLocation instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.TraceLocation
         * @static
         * @param {crowdnotifier_v3.ITraceLocation=} [properties] Properties to set
         * @returns {crowdnotifier_v3.TraceLocation} TraceLocation instance
         */
        TraceLocation.create = function create(properties) {
            return new TraceLocation(properties);
        };

        /**
         * Encodes the specified TraceLocation message. Does not implicitly {@link crowdnotifier_v3.TraceLocation.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.TraceLocation
         * @static
         * @param {crowdnotifier_v3.ITraceLocation} message TraceLocation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TraceLocation.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.address);
            if (message.startTimestamp != null && Object.hasOwnProperty.call(message, "startTimestamp"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.startTimestamp);
            if (message.endTimestamp != null && Object.hasOwnProperty.call(message, "endTimestamp"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.endTimestamp);
            return writer;
        };

        /**
         * Encodes the specified TraceLocation message, length delimited. Does not implicitly {@link crowdnotifier_v3.TraceLocation.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.TraceLocation
         * @static
         * @param {crowdnotifier_v3.ITraceLocation} message TraceLocation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TraceLocation.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TraceLocation message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.TraceLocation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.TraceLocation} TraceLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TraceLocation.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.TraceLocation();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.uint32();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                case 3:
                    message.address = reader.string();
                    break;
                case 4:
                    message.startTimestamp = reader.uint64();
                    break;
                case 5:
                    message.endTimestamp = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TraceLocation message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.TraceLocation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.TraceLocation} TraceLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TraceLocation.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TraceLocation message.
         * @function verify
         * @memberof crowdnotifier_v3.TraceLocation
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TraceLocation.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.address != null && message.hasOwnProperty("address"))
                if (!$util.isString(message.address))
                    return "address: string expected";
            if (message.startTimestamp != null && message.hasOwnProperty("startTimestamp"))
                if (!$util.isInteger(message.startTimestamp) && !(message.startTimestamp && $util.isInteger(message.startTimestamp.low) && $util.isInteger(message.startTimestamp.high)))
                    return "startTimestamp: integer|Long expected";
            if (message.endTimestamp != null && message.hasOwnProperty("endTimestamp"))
                if (!$util.isInteger(message.endTimestamp) && !(message.endTimestamp && $util.isInteger(message.endTimestamp.low) && $util.isInteger(message.endTimestamp.high)))
                    return "endTimestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a TraceLocation message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.TraceLocation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.TraceLocation} TraceLocation
         */
        TraceLocation.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.TraceLocation)
                return object;
            var message = new $root.crowdnotifier_v3.TraceLocation();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.description != null)
                message.description = String(object.description);
            if (object.address != null)
                message.address = String(object.address);
            if (object.startTimestamp != null)
                if ($util.Long)
                    (message.startTimestamp = $util.Long.fromValue(object.startTimestamp)).unsigned = true;
                else if (typeof object.startTimestamp === "string")
                    message.startTimestamp = parseInt(object.startTimestamp, 10);
                else if (typeof object.startTimestamp === "number")
                    message.startTimestamp = object.startTimestamp;
                else if (typeof object.startTimestamp === "object")
                    message.startTimestamp = new $util.LongBits(object.startTimestamp.low >>> 0, object.startTimestamp.high >>> 0).toNumber(true);
            if (object.endTimestamp != null)
                if ($util.Long)
                    (message.endTimestamp = $util.Long.fromValue(object.endTimestamp)).unsigned = true;
                else if (typeof object.endTimestamp === "string")
                    message.endTimestamp = parseInt(object.endTimestamp, 10);
                else if (typeof object.endTimestamp === "number")
                    message.endTimestamp = object.endTimestamp;
                else if (typeof object.endTimestamp === "object")
                    message.endTimestamp = new $util.LongBits(object.endTimestamp.low >>> 0, object.endTimestamp.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a TraceLocation message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.TraceLocation
         * @static
         * @param {crowdnotifier_v3.TraceLocation} message TraceLocation
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TraceLocation.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = 0;
                object.description = "";
                object.address = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.startTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTimestamp = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.endTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.endTimestamp = options.longs === String ? "0" : 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = message.address;
            if (message.startTimestamp != null && message.hasOwnProperty("startTimestamp"))
                if (typeof message.startTimestamp === "number")
                    object.startTimestamp = options.longs === String ? String(message.startTimestamp) : message.startTimestamp;
                else
                    object.startTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.startTimestamp) : options.longs === Number ? new $util.LongBits(message.startTimestamp.low >>> 0, message.startTimestamp.high >>> 0).toNumber(true) : message.startTimestamp;
            if (message.endTimestamp != null && message.hasOwnProperty("endTimestamp"))
                if (typeof message.endTimestamp === "number")
                    object.endTimestamp = options.longs === String ? String(message.endTimestamp) : message.endTimestamp;
                else
                    object.endTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.endTimestamp) : options.longs === Number ? new $util.LongBits(message.endTimestamp.low >>> 0, message.endTimestamp.high >>> 0).toNumber(true) : message.endTimestamp;
            return object;
        };

        /**
         * Converts this TraceLocation to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.TraceLocation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TraceLocation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TraceLocation;
    })();

    crowdnotifier_v3.CrowdNotifierData = (function() {

        /**
         * Properties of a CrowdNotifierData.
         * @memberof crowdnotifier_v3
         * @interface ICrowdNotifierData
         * @property {number|null} [version] CrowdNotifierData version
         * @property {Uint8Array|null} [publicKey] CrowdNotifierData publicKey
         * @property {Uint8Array|null} [cryptographicSeed] CrowdNotifierData cryptographicSeed
         * @property {number|null} [type] CrowdNotifierData type
         */

        /**
         * Constructs a new CrowdNotifierData.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a CrowdNotifierData.
         * @implements ICrowdNotifierData
         * @constructor
         * @param {crowdnotifier_v3.ICrowdNotifierData=} [properties] Properties to set
         */
        function CrowdNotifierData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CrowdNotifierData version.
         * @member {number} version
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @instance
         */
        CrowdNotifierData.prototype.version = 0;

        /**
         * CrowdNotifierData publicKey.
         * @member {Uint8Array} publicKey
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @instance
         */
        CrowdNotifierData.prototype.publicKey = $util.newBuffer([]);

        /**
         * CrowdNotifierData cryptographicSeed.
         * @member {Uint8Array} cryptographicSeed
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @instance
         */
        CrowdNotifierData.prototype.cryptographicSeed = $util.newBuffer([]);

        /**
         * CrowdNotifierData type.
         * @member {number} type
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @instance
         */
        CrowdNotifierData.prototype.type = 0;

        /**
         * Creates a new CrowdNotifierData instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @static
         * @param {crowdnotifier_v3.ICrowdNotifierData=} [properties] Properties to set
         * @returns {crowdnotifier_v3.CrowdNotifierData} CrowdNotifierData instance
         */
        CrowdNotifierData.create = function create(properties) {
            return new CrowdNotifierData(properties);
        };

        /**
         * Encodes the specified CrowdNotifierData message. Does not implicitly {@link crowdnotifier_v3.CrowdNotifierData.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @static
         * @param {crowdnotifier_v3.ICrowdNotifierData} message CrowdNotifierData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CrowdNotifierData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.publicKey);
            if (message.cryptographicSeed != null && Object.hasOwnProperty.call(message, "cryptographicSeed"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.cryptographicSeed);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.type);
            return writer;
        };

        /**
         * Encodes the specified CrowdNotifierData message, length delimited. Does not implicitly {@link crowdnotifier_v3.CrowdNotifierData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @static
         * @param {crowdnotifier_v3.ICrowdNotifierData} message CrowdNotifierData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CrowdNotifierData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CrowdNotifierData message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.CrowdNotifierData} CrowdNotifierData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CrowdNotifierData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.CrowdNotifierData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.uint32();
                    break;
                case 2:
                    message.publicKey = reader.bytes();
                    break;
                case 3:
                    message.cryptographicSeed = reader.bytes();
                    break;
                case 4:
                    message.type = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CrowdNotifierData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.CrowdNotifierData} CrowdNotifierData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CrowdNotifierData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CrowdNotifierData message.
         * @function verify
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CrowdNotifierData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                    return "publicKey: buffer expected";
            if (message.cryptographicSeed != null && message.hasOwnProperty("cryptographicSeed"))
                if (!(message.cryptographicSeed && typeof message.cryptographicSeed.length === "number" || $util.isString(message.cryptographicSeed)))
                    return "cryptographicSeed: buffer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            return null;
        };

        /**
         * Creates a CrowdNotifierData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.CrowdNotifierData} CrowdNotifierData
         */
        CrowdNotifierData.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.CrowdNotifierData)
                return object;
            var message = new $root.crowdnotifier_v3.CrowdNotifierData();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                else if (object.publicKey.length)
                    message.publicKey = object.publicKey;
            if (object.cryptographicSeed != null)
                if (typeof object.cryptographicSeed === "string")
                    $util.base64.decode(object.cryptographicSeed, message.cryptographicSeed = $util.newBuffer($util.base64.length(object.cryptographicSeed)), 0);
                else if (object.cryptographicSeed.length)
                    message.cryptographicSeed = object.cryptographicSeed;
            if (object.type != null)
                message.type = object.type >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a CrowdNotifierData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @static
         * @param {crowdnotifier_v3.CrowdNotifierData} message CrowdNotifierData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CrowdNotifierData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = 0;
                if (options.bytes === String)
                    object.publicKey = "";
                else {
                    object.publicKey = [];
                    if (options.bytes !== Array)
                        object.publicKey = $util.newBuffer(object.publicKey);
                }
                if (options.bytes === String)
                    object.cryptographicSeed = "";
                else {
                    object.cryptographicSeed = [];
                    if (options.bytes !== Array)
                        object.cryptographicSeed = $util.newBuffer(object.cryptographicSeed);
                }
                object.type = 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
            if (message.cryptographicSeed != null && message.hasOwnProperty("cryptographicSeed"))
                object.cryptographicSeed = options.bytes === String ? $util.base64.encode(message.cryptographicSeed, 0, message.cryptographicSeed.length) : options.bytes === Array ? Array.prototype.slice.call(message.cryptographicSeed) : message.cryptographicSeed;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };

        /**
         * Converts this CrowdNotifierData to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.CrowdNotifierData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CrowdNotifierData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CrowdNotifierData;
    })();

    crowdnotifier_v3.NotifyMeLocationData = (function() {

        /**
         * Properties of a NotifyMeLocationData.
         * @memberof crowdnotifier_v3
         * @interface INotifyMeLocationData
         * @property {number|null} [version] NotifyMeLocationData version
         * @property {crowdnotifier_v3.VenueType|null} [type] NotifyMeLocationData type
         * @property {string|null} [room] NotifyMeLocationData room
         */

        /**
         * Constructs a new NotifyMeLocationData.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a NotifyMeLocationData.
         * @implements INotifyMeLocationData
         * @constructor
         * @param {crowdnotifier_v3.INotifyMeLocationData=} [properties] Properties to set
         */
        function NotifyMeLocationData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotifyMeLocationData version.
         * @member {number} version
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @instance
         */
        NotifyMeLocationData.prototype.version = 0;

        /**
         * NotifyMeLocationData type.
         * @member {crowdnotifier_v3.VenueType} type
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @instance
         */
        NotifyMeLocationData.prototype.type = 0;

        /**
         * NotifyMeLocationData room.
         * @member {string} room
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @instance
         */
        NotifyMeLocationData.prototype.room = "";

        /**
         * Creates a new NotifyMeLocationData instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @static
         * @param {crowdnotifier_v3.INotifyMeLocationData=} [properties] Properties to set
         * @returns {crowdnotifier_v3.NotifyMeLocationData} NotifyMeLocationData instance
         */
        NotifyMeLocationData.create = function create(properties) {
            return new NotifyMeLocationData(properties);
        };

        /**
         * Encodes the specified NotifyMeLocationData message. Does not implicitly {@link crowdnotifier_v3.NotifyMeLocationData.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @static
         * @param {crowdnotifier_v3.INotifyMeLocationData} message NotifyMeLocationData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyMeLocationData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.room != null && Object.hasOwnProperty.call(message, "room"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.room);
            return writer;
        };

        /**
         * Encodes the specified NotifyMeLocationData message, length delimited. Does not implicitly {@link crowdnotifier_v3.NotifyMeLocationData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @static
         * @param {crowdnotifier_v3.INotifyMeLocationData} message NotifyMeLocationData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyMeLocationData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NotifyMeLocationData message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.NotifyMeLocationData} NotifyMeLocationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyMeLocationData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.NotifyMeLocationData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.uint32();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.room = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NotifyMeLocationData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.NotifyMeLocationData} NotifyMeLocationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyMeLocationData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotifyMeLocationData message.
         * @function verify
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotifyMeLocationData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    break;
                }
            if (message.room != null && message.hasOwnProperty("room"))
                if (!$util.isString(message.room))
                    return "room: string expected";
            return null;
        };

        /**
         * Creates a NotifyMeLocationData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.NotifyMeLocationData} NotifyMeLocationData
         */
        NotifyMeLocationData.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.NotifyMeLocationData)
                return object;
            var message = new $root.crowdnotifier_v3.NotifyMeLocationData();
            if (object.version != null)
                message.version = object.version >>> 0;
            switch (object.type) {
            case "OTHER":
            case 0:
                message.type = 0;
                break;
            case "MEETING_ROOM":
            case 1:
                message.type = 1;
                break;
            case "CAFETERIA":
            case 2:
                message.type = 2;
                break;
            case "PRIVATE_EVENT":
            case 3:
                message.type = 3;
                break;
            case "CANTEEN":
            case 4:
                message.type = 4;
                break;
            case "LIBRARY":
            case 5:
                message.type = 5;
                break;
            case "LECTURE_ROOM":
            case 6:
                message.type = 6;
                break;
            case "SHOP":
            case 7:
                message.type = 7;
                break;
            case "GYM":
            case 8:
                message.type = 8;
                break;
            case "KITCHEN_AREA":
            case 9:
                message.type = 9;
                break;
            case "OFFICE_SPACE":
            case 10:
                message.type = 10;
                break;
            }
            if (object.room != null)
                message.room = String(object.room);
            return message;
        };

        /**
         * Creates a plain object from a NotifyMeLocationData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @static
         * @param {crowdnotifier_v3.NotifyMeLocationData} message NotifyMeLocationData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotifyMeLocationData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = 0;
                object.type = options.enums === String ? "OTHER" : 0;
                object.room = "";
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.crowdnotifier_v3.VenueType[message.type] : message.type;
            if (message.room != null && message.hasOwnProperty("room"))
                object.room = message.room;
            return object;
        };

        /**
         * Converts this NotifyMeLocationData to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.NotifyMeLocationData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotifyMeLocationData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NotifyMeLocationData;
    })();

    /**
     * VenueType enum.
     * @name crowdnotifier_v3.VenueType
     * @enum {number}
     * @property {number} OTHER=0 OTHER value
     * @property {number} MEETING_ROOM=1 MEETING_ROOM value
     * @property {number} CAFETERIA=2 CAFETERIA value
     * @property {number} PRIVATE_EVENT=3 PRIVATE_EVENT value
     * @property {number} CANTEEN=4 CANTEEN value
     * @property {number} LIBRARY=5 LIBRARY value
     * @property {number} LECTURE_ROOM=6 LECTURE_ROOM value
     * @property {number} SHOP=7 SHOP value
     * @property {number} GYM=8 GYM value
     * @property {number} KITCHEN_AREA=9 KITCHEN_AREA value
     * @property {number} OFFICE_SPACE=10 OFFICE_SPACE value
     */
    crowdnotifier_v3.VenueType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OTHER"] = 0;
        values[valuesById[1] = "MEETING_ROOM"] = 1;
        values[valuesById[2] = "CAFETERIA"] = 2;
        values[valuesById[3] = "PRIVATE_EVENT"] = 3;
        values[valuesById[4] = "CANTEEN"] = 4;
        values[valuesById[5] = "LIBRARY"] = 5;
        values[valuesById[6] = "LECTURE_ROOM"] = 6;
        values[valuesById[7] = "SHOP"] = 7;
        values[valuesById[8] = "GYM"] = 8;
        values[valuesById[9] = "KITCHEN_AREA"] = 9;
        values[valuesById[10] = "OFFICE_SPACE"] = 10;
        return values;
    })();

    crowdnotifier_v3.AssociatedData = (function() {

        /**
         * Properties of an AssociatedData.
         * @memberof crowdnotifier_v3
         * @interface IAssociatedData
         * @property {number|null} [version] AssociatedData version
         * @property {string|null} [message] AssociatedData message
         * @property {Uint8Array|null} [countryData] AssociatedData countryData
         */

        /**
         * Constructs a new AssociatedData.
         * @memberof crowdnotifier_v3
         * @classdesc Represents an AssociatedData.
         * @implements IAssociatedData
         * @constructor
         * @param {crowdnotifier_v3.IAssociatedData=} [properties] Properties to set
         */
        function AssociatedData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AssociatedData version.
         * @member {number} version
         * @memberof crowdnotifier_v3.AssociatedData
         * @instance
         */
        AssociatedData.prototype.version = 0;

        /**
         * AssociatedData message.
         * @member {string} message
         * @memberof crowdnotifier_v3.AssociatedData
         * @instance
         */
        AssociatedData.prototype.message = "";

        /**
         * AssociatedData countryData.
         * @member {Uint8Array} countryData
         * @memberof crowdnotifier_v3.AssociatedData
         * @instance
         */
        AssociatedData.prototype.countryData = $util.newBuffer([]);

        /**
         * Creates a new AssociatedData instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.AssociatedData
         * @static
         * @param {crowdnotifier_v3.IAssociatedData=} [properties] Properties to set
         * @returns {crowdnotifier_v3.AssociatedData} AssociatedData instance
         */
        AssociatedData.create = function create(properties) {
            return new AssociatedData(properties);
        };

        /**
         * Encodes the specified AssociatedData message. Does not implicitly {@link crowdnotifier_v3.AssociatedData.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.AssociatedData
         * @static
         * @param {crowdnotifier_v3.IAssociatedData} message AssociatedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AssociatedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.version);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.countryData != null && Object.hasOwnProperty.call(message, "countryData"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.countryData);
            return writer;
        };

        /**
         * Encodes the specified AssociatedData message, length delimited. Does not implicitly {@link crowdnotifier_v3.AssociatedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.AssociatedData
         * @static
         * @param {crowdnotifier_v3.IAssociatedData} message AssociatedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AssociatedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AssociatedData message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.AssociatedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.AssociatedData} AssociatedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AssociatedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.AssociatedData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.int32();
                    break;
                case 2:
                    message.message = reader.string();
                    break;
                case 3:
                    message.countryData = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AssociatedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.AssociatedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.AssociatedData} AssociatedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AssociatedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AssociatedData message.
         * @function verify
         * @memberof crowdnotifier_v3.AssociatedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AssociatedData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.countryData != null && message.hasOwnProperty("countryData"))
                if (!(message.countryData && typeof message.countryData.length === "number" || $util.isString(message.countryData)))
                    return "countryData: buffer expected";
            return null;
        };

        /**
         * Creates an AssociatedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.AssociatedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.AssociatedData} AssociatedData
         */
        AssociatedData.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.AssociatedData)
                return object;
            var message = new $root.crowdnotifier_v3.AssociatedData();
            if (object.version != null)
                message.version = object.version | 0;
            if (object.message != null)
                message.message = String(object.message);
            if (object.countryData != null)
                if (typeof object.countryData === "string")
                    $util.base64.decode(object.countryData, message.countryData = $util.newBuffer($util.base64.length(object.countryData)), 0);
                else if (object.countryData.length)
                    message.countryData = object.countryData;
            return message;
        };

        /**
         * Creates a plain object from an AssociatedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.AssociatedData
         * @static
         * @param {crowdnotifier_v3.AssociatedData} message AssociatedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AssociatedData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = 0;
                object.message = "";
                if (options.bytes === String)
                    object.countryData = "";
                else {
                    object.countryData = [];
                    if (options.bytes !== Array)
                        object.countryData = $util.newBuffer(object.countryData);
                }
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.countryData != null && message.hasOwnProperty("countryData"))
                object.countryData = options.bytes === String ? $util.base64.encode(message.countryData, 0, message.countryData.length) : options.bytes === Array ? Array.prototype.slice.call(message.countryData) : message.countryData;
            return object;
        };

        /**
         * Converts this AssociatedData to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.AssociatedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AssociatedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AssociatedData;
    })();

    crowdnotifier_v3.NotifyMeAssociatedData = (function() {

        /**
         * Properties of a NotifyMeAssociatedData.
         * @memberof crowdnotifier_v3
         * @interface INotifyMeAssociatedData
         * @property {number|null} [version] NotifyMeAssociatedData version
         * @property {crowdnotifier_v3.EventCriticality|null} [criticality] NotifyMeAssociatedData criticality
         */

        /**
         * Constructs a new NotifyMeAssociatedData.
         * @memberof crowdnotifier_v3
         * @classdesc Represents a NotifyMeAssociatedData.
         * @implements INotifyMeAssociatedData
         * @constructor
         * @param {crowdnotifier_v3.INotifyMeAssociatedData=} [properties] Properties to set
         */
        function NotifyMeAssociatedData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotifyMeAssociatedData version.
         * @member {number} version
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @instance
         */
        NotifyMeAssociatedData.prototype.version = 0;

        /**
         * NotifyMeAssociatedData criticality.
         * @member {crowdnotifier_v3.EventCriticality} criticality
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @instance
         */
        NotifyMeAssociatedData.prototype.criticality = 0;

        /**
         * Creates a new NotifyMeAssociatedData instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @static
         * @param {crowdnotifier_v3.INotifyMeAssociatedData=} [properties] Properties to set
         * @returns {crowdnotifier_v3.NotifyMeAssociatedData} NotifyMeAssociatedData instance
         */
        NotifyMeAssociatedData.create = function create(properties) {
            return new NotifyMeAssociatedData(properties);
        };

        /**
         * Encodes the specified NotifyMeAssociatedData message. Does not implicitly {@link crowdnotifier_v3.NotifyMeAssociatedData.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @static
         * @param {crowdnotifier_v3.INotifyMeAssociatedData} message NotifyMeAssociatedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyMeAssociatedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.version);
            if (message.criticality != null && Object.hasOwnProperty.call(message, "criticality"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.criticality);
            return writer;
        };

        /**
         * Encodes the specified NotifyMeAssociatedData message, length delimited. Does not implicitly {@link crowdnotifier_v3.NotifyMeAssociatedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @static
         * @param {crowdnotifier_v3.INotifyMeAssociatedData} message NotifyMeAssociatedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyMeAssociatedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NotifyMeAssociatedData message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v3.NotifyMeAssociatedData} NotifyMeAssociatedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyMeAssociatedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v3.NotifyMeAssociatedData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.int32();
                    break;
                case 2:
                    message.criticality = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NotifyMeAssociatedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v3.NotifyMeAssociatedData} NotifyMeAssociatedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyMeAssociatedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotifyMeAssociatedData message.
         * @function verify
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotifyMeAssociatedData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.criticality != null && message.hasOwnProperty("criticality"))
                switch (message.criticality) {
                default:
                    return "criticality: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        /**
         * Creates a NotifyMeAssociatedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v3.NotifyMeAssociatedData} NotifyMeAssociatedData
         */
        NotifyMeAssociatedData.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v3.NotifyMeAssociatedData)
                return object;
            var message = new $root.crowdnotifier_v3.NotifyMeAssociatedData();
            if (object.version != null)
                message.version = object.version | 0;
            switch (object.criticality) {
            case "LOW":
            case 0:
                message.criticality = 0;
                break;
            case "HIGH":
            case 1:
                message.criticality = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a NotifyMeAssociatedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @static
         * @param {crowdnotifier_v3.NotifyMeAssociatedData} message NotifyMeAssociatedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotifyMeAssociatedData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = 0;
                object.criticality = options.enums === String ? "LOW" : 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.criticality != null && message.hasOwnProperty("criticality"))
                object.criticality = options.enums === String ? $root.crowdnotifier_v3.EventCriticality[message.criticality] : message.criticality;
            return object;
        };

        /**
         * Converts this NotifyMeAssociatedData to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v3.NotifyMeAssociatedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotifyMeAssociatedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NotifyMeAssociatedData;
    })();

    /**
     * EventCriticality enum.
     * @name crowdnotifier_v3.EventCriticality
     * @enum {number}
     * @property {number} LOW=0 LOW value
     * @property {number} HIGH=1 HIGH value
     */
    crowdnotifier_v3.EventCriticality = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "LOW"] = 0;
        values[valuesById[1] = "HIGH"] = 1;
        return values;
    })();

    return crowdnotifier_v3;
})();

module.exports = $root;
