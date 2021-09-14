/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.crowdnotifier_v4 = (function() {

    /**
     * Namespace crowdnotifier_v4.
     * @exports crowdnotifier_v4
     * @namespace
     */
    var crowdnotifier_v4 = {};

    crowdnotifier_v4.QRCodePayload = (function() {

        /**
         * Properties of a QRCodePayload.
         * @memberof crowdnotifier_v4
         * @interface IQRCodePayload
         * @property {number|null} [version] QRCodePayload version
         * @property {crowdnotifier_v4.ITraceLocation|null} [locationData] QRCodePayload locationData
         * @property {crowdnotifier_v4.ICrowdNotifierData|null} [crowdNotifierData] QRCodePayload crowdNotifierData
         * @property {Uint8Array|null} [countryData] QRCodePayload countryData
         */

        /**
         * Constructs a new QRCodePayload.
         * @memberof crowdnotifier_v4
         * @classdesc Represents a QRCodePayload.
         * @implements IQRCodePayload
         * @constructor
         * @param {crowdnotifier_v4.IQRCodePayload=} [properties] Properties to set
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
         * @memberof crowdnotifier_v4.QRCodePayload
         * @instance
         */
        QRCodePayload.prototype.version = 0;

        /**
         * QRCodePayload locationData.
         * @member {crowdnotifier_v4.ITraceLocation|null|undefined} locationData
         * @memberof crowdnotifier_v4.QRCodePayload
         * @instance
         */
        QRCodePayload.prototype.locationData = null;

        /**
         * QRCodePayload crowdNotifierData.
         * @member {crowdnotifier_v4.ICrowdNotifierData|null|undefined} crowdNotifierData
         * @memberof crowdnotifier_v4.QRCodePayload
         * @instance
         */
        QRCodePayload.prototype.crowdNotifierData = null;

        /**
         * QRCodePayload countryData.
         * @member {Uint8Array} countryData
         * @memberof crowdnotifier_v4.QRCodePayload
         * @instance
         */
        QRCodePayload.prototype.countryData = $util.newBuffer([]);

        /**
         * Creates a new QRCodePayload instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v4.QRCodePayload
         * @static
         * @param {crowdnotifier_v4.IQRCodePayload=} [properties] Properties to set
         * @returns {crowdnotifier_v4.QRCodePayload} QRCodePayload instance
         */
        QRCodePayload.create = function create(properties) {
            return new QRCodePayload(properties);
        };

        /**
         * Encodes the specified QRCodePayload message. Does not implicitly {@link crowdnotifier_v4.QRCodePayload.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v4.QRCodePayload
         * @static
         * @param {crowdnotifier_v4.IQRCodePayload} message QRCodePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QRCodePayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.locationData != null && Object.hasOwnProperty.call(message, "locationData"))
                $root.crowdnotifier_v4.TraceLocation.encode(message.locationData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.crowdNotifierData != null && Object.hasOwnProperty.call(message, "crowdNotifierData"))
                $root.crowdnotifier_v4.CrowdNotifierData.encode(message.crowdNotifierData, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.countryData != null && Object.hasOwnProperty.call(message, "countryData"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.countryData);
            return writer;
        };

        /**
         * Encodes the specified QRCodePayload message, length delimited. Does not implicitly {@link crowdnotifier_v4.QRCodePayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v4.QRCodePayload
         * @static
         * @param {crowdnotifier_v4.IQRCodePayload} message QRCodePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QRCodePayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QRCodePayload message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v4.QRCodePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v4.QRCodePayload} QRCodePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QRCodePayload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v4.QRCodePayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.uint32();
                    break;
                case 2:
                    message.locationData = $root.crowdnotifier_v4.TraceLocation.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.crowdNotifierData = $root.crowdnotifier_v4.CrowdNotifierData.decode(reader, reader.uint32());
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
         * @memberof crowdnotifier_v4.QRCodePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v4.QRCodePayload} QRCodePayload
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
         * @memberof crowdnotifier_v4.QRCodePayload
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
                var error = $root.crowdnotifier_v4.TraceLocation.verify(message.locationData);
                if (error)
                    return "locationData." + error;
            }
            if (message.crowdNotifierData != null && message.hasOwnProperty("crowdNotifierData")) {
                var error = $root.crowdnotifier_v4.CrowdNotifierData.verify(message.crowdNotifierData);
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
         * @memberof crowdnotifier_v4.QRCodePayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v4.QRCodePayload} QRCodePayload
         */
        QRCodePayload.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v4.QRCodePayload)
                return object;
            var message = new $root.crowdnotifier_v4.QRCodePayload();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.locationData != null) {
                if (typeof object.locationData !== "object")
                    throw TypeError(".crowdnotifier_v4.QRCodePayload.locationData: object expected");
                message.locationData = $root.crowdnotifier_v4.TraceLocation.fromObject(object.locationData);
            }
            if (object.crowdNotifierData != null) {
                if (typeof object.crowdNotifierData !== "object")
                    throw TypeError(".crowdnotifier_v4.QRCodePayload.crowdNotifierData: object expected");
                message.crowdNotifierData = $root.crowdnotifier_v4.CrowdNotifierData.fromObject(object.crowdNotifierData);
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
         * @memberof crowdnotifier_v4.QRCodePayload
         * @static
         * @param {crowdnotifier_v4.QRCodePayload} message QRCodePayload
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
                object.locationData = $root.crowdnotifier_v4.TraceLocation.toObject(message.locationData, options);
            if (message.crowdNotifierData != null && message.hasOwnProperty("crowdNotifierData"))
                object.crowdNotifierData = $root.crowdnotifier_v4.CrowdNotifierData.toObject(message.crowdNotifierData, options);
            if (message.countryData != null && message.hasOwnProperty("countryData"))
                object.countryData = options.bytes === String ? $util.base64.encode(message.countryData, 0, message.countryData.length) : options.bytes === Array ? Array.prototype.slice.call(message.countryData) : message.countryData;
            return object;
        };

        /**
         * Converts this QRCodePayload to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v4.QRCodePayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QRCodePayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QRCodePayload;
    })();

    crowdnotifier_v4.TraceLocation = (function() {

        /**
         * Properties of a TraceLocation.
         * @memberof crowdnotifier_v4
         * @interface ITraceLocation
         * @property {number|null} [version] TraceLocation version
         * @property {string|null} [description] TraceLocation description
         * @property {string|null} [address] TraceLocation address
         * @property {number|Long|null} [startTimestamp] TraceLocation startTimestamp
         * @property {number|Long|null} [endTimestamp] TraceLocation endTimestamp
         */

        /**
         * Constructs a new TraceLocation.
         * @memberof crowdnotifier_v4
         * @classdesc Represents a TraceLocation.
         * @implements ITraceLocation
         * @constructor
         * @param {crowdnotifier_v4.ITraceLocation=} [properties] Properties to set
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
         * @memberof crowdnotifier_v4.TraceLocation
         * @instance
         */
        TraceLocation.prototype.version = 0;

        /**
         * TraceLocation description.
         * @member {string} description
         * @memberof crowdnotifier_v4.TraceLocation
         * @instance
         */
        TraceLocation.prototype.description = "";

        /**
         * TraceLocation address.
         * @member {string} address
         * @memberof crowdnotifier_v4.TraceLocation
         * @instance
         */
        TraceLocation.prototype.address = "";

        /**
         * TraceLocation startTimestamp.
         * @member {number|Long} startTimestamp
         * @memberof crowdnotifier_v4.TraceLocation
         * @instance
         */
        TraceLocation.prototype.startTimestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * TraceLocation endTimestamp.
         * @member {number|Long} endTimestamp
         * @memberof crowdnotifier_v4.TraceLocation
         * @instance
         */
        TraceLocation.prototype.endTimestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new TraceLocation instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v4.TraceLocation
         * @static
         * @param {crowdnotifier_v4.ITraceLocation=} [properties] Properties to set
         * @returns {crowdnotifier_v4.TraceLocation} TraceLocation instance
         */
        TraceLocation.create = function create(properties) {
            return new TraceLocation(properties);
        };

        /**
         * Encodes the specified TraceLocation message. Does not implicitly {@link crowdnotifier_v4.TraceLocation.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v4.TraceLocation
         * @static
         * @param {crowdnotifier_v4.ITraceLocation} message TraceLocation message or plain object to encode
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
         * Encodes the specified TraceLocation message, length delimited. Does not implicitly {@link crowdnotifier_v4.TraceLocation.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v4.TraceLocation
         * @static
         * @param {crowdnotifier_v4.ITraceLocation} message TraceLocation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TraceLocation.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TraceLocation message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v4.TraceLocation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v4.TraceLocation} TraceLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TraceLocation.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v4.TraceLocation();
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
         * @memberof crowdnotifier_v4.TraceLocation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v4.TraceLocation} TraceLocation
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
         * @memberof crowdnotifier_v4.TraceLocation
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
         * @memberof crowdnotifier_v4.TraceLocation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v4.TraceLocation} TraceLocation
         */
        TraceLocation.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v4.TraceLocation)
                return object;
            var message = new $root.crowdnotifier_v4.TraceLocation();
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
         * @memberof crowdnotifier_v4.TraceLocation
         * @static
         * @param {crowdnotifier_v4.TraceLocation} message TraceLocation
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
         * @memberof crowdnotifier_v4.TraceLocation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TraceLocation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TraceLocation;
    })();

    crowdnotifier_v4.CrowdNotifierData = (function() {

        /**
         * Properties of a CrowdNotifierData.
         * @memberof crowdnotifier_v4
         * @interface ICrowdNotifierData
         * @property {number|null} [version] CrowdNotifierData version
         * @property {Uint8Array|null} [publicKey] CrowdNotifierData publicKey
         * @property {Uint8Array|null} [cryptographicSeed] CrowdNotifierData cryptographicSeed
         * @property {number|null} [type] CrowdNotifierData type
         */

        /**
         * Constructs a new CrowdNotifierData.
         * @memberof crowdnotifier_v4
         * @classdesc Represents a CrowdNotifierData.
         * @implements ICrowdNotifierData
         * @constructor
         * @param {crowdnotifier_v4.ICrowdNotifierData=} [properties] Properties to set
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
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @instance
         */
        CrowdNotifierData.prototype.version = 0;

        /**
         * CrowdNotifierData publicKey.
         * @member {Uint8Array} publicKey
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @instance
         */
        CrowdNotifierData.prototype.publicKey = $util.newBuffer([]);

        /**
         * CrowdNotifierData cryptographicSeed.
         * @member {Uint8Array} cryptographicSeed
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @instance
         */
        CrowdNotifierData.prototype.cryptographicSeed = $util.newBuffer([]);

        /**
         * CrowdNotifierData type.
         * @member {number} type
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @instance
         */
        CrowdNotifierData.prototype.type = 0;

        /**
         * Creates a new CrowdNotifierData instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @static
         * @param {crowdnotifier_v4.ICrowdNotifierData=} [properties] Properties to set
         * @returns {crowdnotifier_v4.CrowdNotifierData} CrowdNotifierData instance
         */
        CrowdNotifierData.create = function create(properties) {
            return new CrowdNotifierData(properties);
        };

        /**
         * Encodes the specified CrowdNotifierData message. Does not implicitly {@link crowdnotifier_v4.CrowdNotifierData.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @static
         * @param {crowdnotifier_v4.ICrowdNotifierData} message CrowdNotifierData message or plain object to encode
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
         * Encodes the specified CrowdNotifierData message, length delimited. Does not implicitly {@link crowdnotifier_v4.CrowdNotifierData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @static
         * @param {crowdnotifier_v4.ICrowdNotifierData} message CrowdNotifierData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CrowdNotifierData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CrowdNotifierData message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v4.CrowdNotifierData} CrowdNotifierData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CrowdNotifierData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v4.CrowdNotifierData();
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
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v4.CrowdNotifierData} CrowdNotifierData
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
         * @memberof crowdnotifier_v4.CrowdNotifierData
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
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v4.CrowdNotifierData} CrowdNotifierData
         */
        CrowdNotifierData.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v4.CrowdNotifierData)
                return object;
            var message = new $root.crowdnotifier_v4.CrowdNotifierData();
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
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @static
         * @param {crowdnotifier_v4.CrowdNotifierData} message CrowdNotifierData
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
         * @memberof crowdnotifier_v4.CrowdNotifierData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CrowdNotifierData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CrowdNotifierData;
    })();

    crowdnotifier_v4.SwissCovidLocationData = (function() {

        /**
         * Properties of a SwissCovidLocationData.
         * @memberof crowdnotifier_v4
         * @interface ISwissCovidLocationData
         * @property {number|null} [version] SwissCovidLocationData version
         * @property {crowdnotifier_v4.VenueType|null} [type] SwissCovidLocationData type
         * @property {string|null} [room] SwissCovidLocationData room
         * @property {number|Long|null} [checkoutWarningDelayMs] SwissCovidLocationData checkoutWarningDelayMs
         * @property {number|Long|null} [automaticCheckoutDelaylMs] SwissCovidLocationData automaticCheckoutDelaylMs
         * @property {Array.<number|Long>|null} [reminderDelayOptionsMs] SwissCovidLocationData reminderDelayOptionsMs
         */

        /**
         * Constructs a new SwissCovidLocationData.
         * @memberof crowdnotifier_v4
         * @classdesc Represents a SwissCovidLocationData.
         * @implements ISwissCovidLocationData
         * @constructor
         * @param {crowdnotifier_v4.ISwissCovidLocationData=} [properties] Properties to set
         */
        function SwissCovidLocationData(properties) {
            this.reminderDelayOptionsMs = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SwissCovidLocationData version.
         * @member {number} version
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @instance
         */
        SwissCovidLocationData.prototype.version = 0;

        /**
         * SwissCovidLocationData type.
         * @member {crowdnotifier_v4.VenueType} type
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @instance
         */
        SwissCovidLocationData.prototype.type = 0;

        /**
         * SwissCovidLocationData room.
         * @member {string} room
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @instance
         */
        SwissCovidLocationData.prototype.room = "";

        /**
         * SwissCovidLocationData checkoutWarningDelayMs.
         * @member {number|Long} checkoutWarningDelayMs
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @instance
         */
        SwissCovidLocationData.prototype.checkoutWarningDelayMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SwissCovidLocationData automaticCheckoutDelaylMs.
         * @member {number|Long} automaticCheckoutDelaylMs
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @instance
         */
        SwissCovidLocationData.prototype.automaticCheckoutDelaylMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SwissCovidLocationData reminderDelayOptionsMs.
         * @member {Array.<number|Long>} reminderDelayOptionsMs
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @instance
         */
        SwissCovidLocationData.prototype.reminderDelayOptionsMs = $util.emptyArray;

        /**
         * Creates a new SwissCovidLocationData instance using the specified properties.
         * @function create
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @static
         * @param {crowdnotifier_v4.ISwissCovidLocationData=} [properties] Properties to set
         * @returns {crowdnotifier_v4.SwissCovidLocationData} SwissCovidLocationData instance
         */
        SwissCovidLocationData.create = function create(properties) {
            return new SwissCovidLocationData(properties);
        };

        /**
         * Encodes the specified SwissCovidLocationData message. Does not implicitly {@link crowdnotifier_v4.SwissCovidLocationData.verify|verify} messages.
         * @function encode
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @static
         * @param {crowdnotifier_v4.ISwissCovidLocationData} message SwissCovidLocationData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SwissCovidLocationData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.room != null && Object.hasOwnProperty.call(message, "room"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.room);
            if (message.checkoutWarningDelayMs != null && Object.hasOwnProperty.call(message, "checkoutWarningDelayMs"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.checkoutWarningDelayMs);
            if (message.automaticCheckoutDelaylMs != null && Object.hasOwnProperty.call(message, "automaticCheckoutDelaylMs"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.automaticCheckoutDelaylMs);
            if (message.reminderDelayOptionsMs != null && message.reminderDelayOptionsMs.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.reminderDelayOptionsMs.length; ++i)
                    writer.int64(message.reminderDelayOptionsMs[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified SwissCovidLocationData message, length delimited. Does not implicitly {@link crowdnotifier_v4.SwissCovidLocationData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @static
         * @param {crowdnotifier_v4.ISwissCovidLocationData} message SwissCovidLocationData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SwissCovidLocationData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SwissCovidLocationData message from the specified reader or buffer.
         * @function decode
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {crowdnotifier_v4.SwissCovidLocationData} SwissCovidLocationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SwissCovidLocationData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.crowdnotifier_v4.SwissCovidLocationData();
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
                case 4:
                    message.checkoutWarningDelayMs = reader.int64();
                    break;
                case 5:
                    message.automaticCheckoutDelaylMs = reader.int64();
                    break;
                case 6:
                    if (!(message.reminderDelayOptionsMs && message.reminderDelayOptionsMs.length))
                        message.reminderDelayOptionsMs = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.reminderDelayOptionsMs.push(reader.int64());
                    } else
                        message.reminderDelayOptionsMs.push(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SwissCovidLocationData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {crowdnotifier_v4.SwissCovidLocationData} SwissCovidLocationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SwissCovidLocationData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SwissCovidLocationData message.
         * @function verify
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SwissCovidLocationData.verify = function verify(message) {
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
                    break;
                }
            if (message.room != null && message.hasOwnProperty("room"))
                if (!$util.isString(message.room))
                    return "room: string expected";
            if (message.checkoutWarningDelayMs != null && message.hasOwnProperty("checkoutWarningDelayMs"))
                if (!$util.isInteger(message.checkoutWarningDelayMs) && !(message.checkoutWarningDelayMs && $util.isInteger(message.checkoutWarningDelayMs.low) && $util.isInteger(message.checkoutWarningDelayMs.high)))
                    return "checkoutWarningDelayMs: integer|Long expected";
            if (message.automaticCheckoutDelaylMs != null && message.hasOwnProperty("automaticCheckoutDelaylMs"))
                if (!$util.isInteger(message.automaticCheckoutDelaylMs) && !(message.automaticCheckoutDelaylMs && $util.isInteger(message.automaticCheckoutDelaylMs.low) && $util.isInteger(message.automaticCheckoutDelaylMs.high)))
                    return "automaticCheckoutDelaylMs: integer|Long expected";
            if (message.reminderDelayOptionsMs != null && message.hasOwnProperty("reminderDelayOptionsMs")) {
                if (!Array.isArray(message.reminderDelayOptionsMs))
                    return "reminderDelayOptionsMs: array expected";
                for (var i = 0; i < message.reminderDelayOptionsMs.length; ++i)
                    if (!$util.isInteger(message.reminderDelayOptionsMs[i]) && !(message.reminderDelayOptionsMs[i] && $util.isInteger(message.reminderDelayOptionsMs[i].low) && $util.isInteger(message.reminderDelayOptionsMs[i].high)))
                        return "reminderDelayOptionsMs: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a SwissCovidLocationData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {crowdnotifier_v4.SwissCovidLocationData} SwissCovidLocationData
         */
        SwissCovidLocationData.fromObject = function fromObject(object) {
            if (object instanceof $root.crowdnotifier_v4.SwissCovidLocationData)
                return object;
            var message = new $root.crowdnotifier_v4.SwissCovidLocationData();
            if (object.version != null)
                message.version = object.version >>> 0;
            switch (object.type) {
            case "USER_QR_CODE":
            case 0:
                message.type = 0;
                break;
            case "CONTACT_TRACING_QR_CODE":
            case 1:
                message.type = 1;
                break;
            }
            if (object.room != null)
                message.room = String(object.room);
            if (object.checkoutWarningDelayMs != null)
                if ($util.Long)
                    (message.checkoutWarningDelayMs = $util.Long.fromValue(object.checkoutWarningDelayMs)).unsigned = false;
                else if (typeof object.checkoutWarningDelayMs === "string")
                    message.checkoutWarningDelayMs = parseInt(object.checkoutWarningDelayMs, 10);
                else if (typeof object.checkoutWarningDelayMs === "number")
                    message.checkoutWarningDelayMs = object.checkoutWarningDelayMs;
                else if (typeof object.checkoutWarningDelayMs === "object")
                    message.checkoutWarningDelayMs = new $util.LongBits(object.checkoutWarningDelayMs.low >>> 0, object.checkoutWarningDelayMs.high >>> 0).toNumber();
            if (object.automaticCheckoutDelaylMs != null)
                if ($util.Long)
                    (message.automaticCheckoutDelaylMs = $util.Long.fromValue(object.automaticCheckoutDelaylMs)).unsigned = false;
                else if (typeof object.automaticCheckoutDelaylMs === "string")
                    message.automaticCheckoutDelaylMs = parseInt(object.automaticCheckoutDelaylMs, 10);
                else if (typeof object.automaticCheckoutDelaylMs === "number")
                    message.automaticCheckoutDelaylMs = object.automaticCheckoutDelaylMs;
                else if (typeof object.automaticCheckoutDelaylMs === "object")
                    message.automaticCheckoutDelaylMs = new $util.LongBits(object.automaticCheckoutDelaylMs.low >>> 0, object.automaticCheckoutDelaylMs.high >>> 0).toNumber();
            if (object.reminderDelayOptionsMs) {
                if (!Array.isArray(object.reminderDelayOptionsMs))
                    throw TypeError(".crowdnotifier_v4.SwissCovidLocationData.reminderDelayOptionsMs: array expected");
                message.reminderDelayOptionsMs = [];
                for (var i = 0; i < object.reminderDelayOptionsMs.length; ++i)
                    if ($util.Long)
                        (message.reminderDelayOptionsMs[i] = $util.Long.fromValue(object.reminderDelayOptionsMs[i])).unsigned = false;
                    else if (typeof object.reminderDelayOptionsMs[i] === "string")
                        message.reminderDelayOptionsMs[i] = parseInt(object.reminderDelayOptionsMs[i], 10);
                    else if (typeof object.reminderDelayOptionsMs[i] === "number")
                        message.reminderDelayOptionsMs[i] = object.reminderDelayOptionsMs[i];
                    else if (typeof object.reminderDelayOptionsMs[i] === "object")
                        message.reminderDelayOptionsMs[i] = new $util.LongBits(object.reminderDelayOptionsMs[i].low >>> 0, object.reminderDelayOptionsMs[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from a SwissCovidLocationData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @static
         * @param {crowdnotifier_v4.SwissCovidLocationData} message SwissCovidLocationData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SwissCovidLocationData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.reminderDelayOptionsMs = [];
            if (options.defaults) {
                object.version = 0;
                object.type = options.enums === String ? "USER_QR_CODE" : 0;
                object.room = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.checkoutWarningDelayMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.checkoutWarningDelayMs = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.automaticCheckoutDelaylMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.automaticCheckoutDelaylMs = options.longs === String ? "0" : 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.crowdnotifier_v4.VenueType[message.type] : message.type;
            if (message.room != null && message.hasOwnProperty("room"))
                object.room = message.room;
            if (message.checkoutWarningDelayMs != null && message.hasOwnProperty("checkoutWarningDelayMs"))
                if (typeof message.checkoutWarningDelayMs === "number")
                    object.checkoutWarningDelayMs = options.longs === String ? String(message.checkoutWarningDelayMs) : message.checkoutWarningDelayMs;
                else
                    object.checkoutWarningDelayMs = options.longs === String ? $util.Long.prototype.toString.call(message.checkoutWarningDelayMs) : options.longs === Number ? new $util.LongBits(message.checkoutWarningDelayMs.low >>> 0, message.checkoutWarningDelayMs.high >>> 0).toNumber() : message.checkoutWarningDelayMs;
            if (message.automaticCheckoutDelaylMs != null && message.hasOwnProperty("automaticCheckoutDelaylMs"))
                if (typeof message.automaticCheckoutDelaylMs === "number")
                    object.automaticCheckoutDelaylMs = options.longs === String ? String(message.automaticCheckoutDelaylMs) : message.automaticCheckoutDelaylMs;
                else
                    object.automaticCheckoutDelaylMs = options.longs === String ? $util.Long.prototype.toString.call(message.automaticCheckoutDelaylMs) : options.longs === Number ? new $util.LongBits(message.automaticCheckoutDelaylMs.low >>> 0, message.automaticCheckoutDelaylMs.high >>> 0).toNumber() : message.automaticCheckoutDelaylMs;
            if (message.reminderDelayOptionsMs && message.reminderDelayOptionsMs.length) {
                object.reminderDelayOptionsMs = [];
                for (var j = 0; j < message.reminderDelayOptionsMs.length; ++j)
                    if (typeof message.reminderDelayOptionsMs[j] === "number")
                        object.reminderDelayOptionsMs[j] = options.longs === String ? String(message.reminderDelayOptionsMs[j]) : message.reminderDelayOptionsMs[j];
                    else
                        object.reminderDelayOptionsMs[j] = options.longs === String ? $util.Long.prototype.toString.call(message.reminderDelayOptionsMs[j]) : options.longs === Number ? new $util.LongBits(message.reminderDelayOptionsMs[j].low >>> 0, message.reminderDelayOptionsMs[j].high >>> 0).toNumber() : message.reminderDelayOptionsMs[j];
            }
            return object;
        };

        /**
         * Converts this SwissCovidLocationData to JSON.
         * @function toJSON
         * @memberof crowdnotifier_v4.SwissCovidLocationData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SwissCovidLocationData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SwissCovidLocationData;
    })();

    /**
     * VenueType enum.
     * @name crowdnotifier_v4.VenueType
     * @enum {number}
     * @property {number} USER_QR_CODE=0 USER_QR_CODE value
     * @property {number} CONTACT_TRACING_QR_CODE=1 CONTACT_TRACING_QR_CODE value
     */
    crowdnotifier_v4.VenueType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "USER_QR_CODE"] = 0;
        values[valuesById[1] = "CONTACT_TRACING_QR_CODE"] = 1;
        return values;
    })();

    return crowdnotifier_v4;
})();

module.exports = $root;
