import { d as defineComponent, h, e as effectScope, i as inject, o as onMounted, a as onUnmounted, c as computed, w as watch, F as Fragment, g as getCurrentInstance, b as isRef, r as ref, s as shallowRef, f as setupDevtoolsPlugin, j as createVNode, T as Text, k as boot } from "./index.6764d851.js";
/*!
  * shared v9.12.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign$1 = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => {
  if (!isObject$1(val))
    return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto.constructor === Object;
};
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join$1(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
function incrementer(code2) {
  let current = code2;
  return () => ++current;
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (isNotObjectOrIsArray(src2[key]) || isNotObjectOrIsArray(des2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
/*!
  * message-compiler v9.12.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  if (source != null) {
    loc.source = source;
  }
  return loc;
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format$1(message, ...args) {
  if (args.length === 1 && isObject(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const assign = Object.assign;
const isString = (val) => typeof val === "string";
const isObject = (val) => val !== null && typeof val === "object";
function join(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
const CompileWarnCodes = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
};
const warnMessages = {
  [CompileWarnCodes.USE_MODULO_SYNTAX]: `Use modulo before '{{0}}'.`
};
function createCompileWarn(code2, loc, ...args) {
  const msg = format$1(warnMessages[code2] || "", ...args || []);
  const message = { message: String(msg), code: code2 };
  if (loc) {
    message.location = loc;
  }
  return message;
}
const CompileErrorCodes = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  __EXTEND_POINT__: 17
};
const errorMessages = {
  [CompileErrorCodes.EXPECTED_TOKEN]: `Expected token: '{0}'`,
  [CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER]: `Invalid token in placeholder: '{0}'`,
  [CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: `Unterminated single quote in placeholder`,
  [CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE]: `Unknown escape sequence: \\{0}`,
  [CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE]: `Invalid unicode escape sequence: {0}`,
  [CompileErrorCodes.UNBALANCED_CLOSING_BRACE]: `Unbalanced closing brace`,
  [CompileErrorCodes.UNTERMINATED_CLOSING_BRACE]: `Unterminated closing brace`,
  [CompileErrorCodes.EMPTY_PLACEHOLDER]: `Empty placeholder`,
  [CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER]: `Not allowed nest placeholder`,
  [CompileErrorCodes.INVALID_LINKED_FORMAT]: `Invalid linked format`,
  [CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL]: `Plural must have messages`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER]: `Unexpected empty linked modifier`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY]: `Unexpected empty linked key`,
  [CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS]: `Unexpected lexical analysis in token: '{0}'`,
  [CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE]: `unhandled codegen node type: '{0}'`,
  [CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE]: `unhandled mimifier node type: '{0}'`
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages: messages2, args } = options;
  const msg = format$1((messages2 || errorMessages)[code2] || "", ...args || []);
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 14,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 14,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code2, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(context2, 14);
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 8 || currentType === 12)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 10) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isIdentifierStart(ch);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function detectModuloStart(scnr) {
    const spaces = peekSpaces(scnr);
    const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
    scnr.resetPeek();
    return {
      isModulo: ret,
      hasSpace: spaces.length > 0
    };
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "", detectModulo = false) => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return prev === "%" ? false : hasSpace;
      } else if (ch === "@" || !ch) {
        return prev === "%" ? true : hasSpace;
      } else if (ch === "%") {
        scnr.peek();
        return fn(hasSpace, "%", true);
      } else if (ch === "|") {
        return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP, detectModulo);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF, detectModulo);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36 || cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readModulo(scnr) {
    skipSpaces(scnr);
    const ch = scnr.currentChar();
    if (ch !== "%") {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
    }
    scnr.next();
    return "%";
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === "%") {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else {
          break;
        }
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (detect = false, buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(detect, buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(true, buf);
      }
    };
    return fn(false, "");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(scnr, "|");
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(context2, 2, "{");
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(context2, 3, "}");
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 6, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 7, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 13, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(context2, 8, "@");
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(context2, 9, ".");
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(context2, 10, ":");
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 12, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 11, readLinkedRefer(scnr));
          }
        }
        if (currentType === 8) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = { type: 14 };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(context2, 3, "}");
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        const { isModulo, hasSpace } = detectModuloStart(scnr);
        if (isModulo) {
          return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(_context, 14);
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "\uFFFD";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError, onWarn } = options;
  function emitError(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function emitWarn(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onWarn) {
      const loc = location ? createLocation(start, end) : null;
      onWarn(createCompileWarn(code2, loc, args));
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (type) {
      node.type = type;
    }
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key, modulo) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    if (modulo === true) {
      node.modulo = true;
    }
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 12) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 9) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 10) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 11:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 7:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    let modulo = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          modulo = true;
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || "", !!modulo));
          if (modulo) {
            emitWarn(tokenizer, CompileWarnCodes.USE_MODULO_SYNTAX, context.lastStartLoc, 0, getTokenCaption(token));
            modulo = null;
          }
          break;
        case 7:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 8: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 14 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 14);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 14) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 14) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 14) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper("plural");
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper("linked");
      transformer.helper("type");
      break;
    }
    case 5:
      transformer.helper("interpolate");
      transformer.helper("list");
      break;
    case 4:
      transformer.helper("interpolate");
      transformer.helper("named");
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper("normalize");
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
const ERROR_DOMAIN$1 = "minifier";
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
    default: {
      throw createCompileError(CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: ERROR_DOMAIN$1,
        args: [node.type]
      });
    }
  }
  delete node.type;
}
const ERROR_DOMAIN = "parser";
function createCodeGenerator(ast, options) {
  const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code2, node) {
    _context.code += code2;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper("linked")}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper("normalize")}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper("plural")}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper("interpolate")}(${helper("list")}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper("interpolate")}(${helper("named")}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
    default: {
      throw createCompileError(CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: ERROR_DOMAIN,
        args: [node.type]
      });
    }
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  const sourceMap = !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    mode,
    filename,
    sourceMap,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code: code2, map } = generator.context();
  return {
    ast,
    code: code2,
    map: map ? map.toJSON() : void 0
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
/*!
  * core-base v9.12.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function initFeatureFlags$1() {
  if (typeof __INTLIFY_JIT_COMPILATION__ !== "boolean") {
    getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
const pathStateMachine = [];
pathStateMachine[0] = {
  ["w"]: [0],
  ["i"]: [3, 0],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[1] = {
  ["w"]: [1],
  ["."]: [2],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[2] = {
  ["w"]: [2],
  ["i"]: [3, 0],
  ["0"]: [3, 0]
};
pathStateMachine[3] = {
  ["i"]: [3, 0],
  ["0"]: [3, 0],
  ["w"]: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  ["o"]: [7, 1]
};
pathStateMachine[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [
    4,
    2
  ],
  ["]"]: [1, 3],
  ["o"]: 8,
  ["l"]: [4, 0]
};
pathStateMachine[5] = {
  ["'"]: [4, 0],
  ["o"]: 8,
  ["l"]: [5, 0]
};
pathStateMachine[6] = {
  ['"']: [4, 0],
  ["o"]: 8,
  ["l"]: [6, 0]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[0] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[1] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[2] = () => {
    actions[0]();
    subPathDepth++;
  };
  actions[3] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[0]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[1]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[0]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap["l"] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject$1(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join$1(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages2) => {
    return messages2[pluralRule(pluralIndex, messages2.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject$1(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString$1(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key)(ctx);
    const msg = type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret;
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    ["list"]: list,
    ["named"]: named,
    ["plural"]: plural,
    ["linked"]: linked,
    ["message"]: message,
    ["type"]: type,
    ["interpolate"]: interpolate,
    ["normalize"]: normalize,
    ["values"]: assign$1({}, _list, _named)
  };
  return ctx;
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n2, version, meta) {
  devtools && devtools.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: i18n2,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook("function:translate");
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const code$1$1 = CompileWarnCodes.__EXTEND_POINT__;
const inc$1$1 = incrementer(code$1$1);
const CoreWarnCodes = {
  NOT_FOUND_KEY: code$1$1,
  FALLBACK_TO_TRANSLATE: inc$1$1(),
  CANNOT_FORMAT_NUMBER: inc$1$1(),
  FALLBACK_TO_NUMBER_FORMAT: inc$1$1(),
  CANNOT_FORMAT_DATE: inc$1$1(),
  FALLBACK_TO_DATE_FORMAT: inc$1$1(),
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: inc$1$1(),
  __EXTEND_POINT__: inc$1$1()
};
const code$2 = CompileErrorCodes.__EXTEND_POINT__;
const inc$2 = incrementer(code$2);
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$2,
  INVALID_DATE_ARGUMENT: inc$2(),
  INVALID_ISO_DATE_ARGUMENT: inc$2(),
  NOT_SUPPORT_NON_STRING_MESSAGE: inc$2(),
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: inc$2(),
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: inc$2(),
  NOT_SUPPORT_LOCALE_TYPE: inc$2(),
  __EXTEND_POINT__: inc$2()
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString$1(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve = locale();
        if (isPromise(resolve)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject$1(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString$1(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString$1(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString$1(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.12.1";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString$1(val) ? capitalize(val) : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString$1(options.version) ? options.version : VERSION$1;
  const locale = isString$1(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages2 = isPlainObject(options.messages) ? options.messages : { [_locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale]: {} };
  const modifiers = assign$1({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject$1(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages: messages2,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString$1(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = ast.b || ast.body;
  if ((body.t || body.type) === 1) {
    const plural = body;
    const cases = plural.c || plural.cases;
    return ctx.plural(cases.reduce((messages2, c) => [
      ...messages2,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const _static = node.s || node.static;
  if (_static) {
    return ctx.type === "text" ? _static : ctx.normalize([_static]);
  } else {
    const messages2 = (node.i || node.items).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages2);
  }
}
function formatMessagePart(ctx, node) {
  const type = node.t || node.type;
  switch (type) {
    case 3: {
      const text = node;
      return text.v || text.value;
    }
    case 9: {
      const literal = node;
      return literal.v || literal.value;
    }
    case 4: {
      const named = node;
      return ctx.interpolate(ctx.named(named.k || named.key));
    }
    case 5: {
      const list = node;
      return ctx.interpolate(ctx.list(list.i != null ? list.i : list.index));
    }
    case 6: {
      const linked = node;
      const modifier = linked.m || linked.modifier;
      return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      const linkedKey = node;
      return linkedKey.v || linkedKey.value;
    }
    case 8: {
      const linkedModifier = node;
      return linkedModifier.v || linkedModifier.value;
    }
    default:
      throw new Error(`unhandled node type on format message part: ${type}`);
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = /* @__PURE__ */ Object.create(null);
const isMessageAST = (val) => isObject$1(val) && (val.t === 0 || val.type === 0) && ("b" in val || "body" in val);
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
function compile(message, context) {
  if (__INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__ && isString$1(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: false,
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages: messages2 } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString$1(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages2[locale] || {}
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString$1(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString$1(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString$1(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign$1({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString$1(item) ? escapeHtml(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString$1(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages: messages2, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages2[targetLocale] || {};
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    const missingRet = handleMissing(
      context,
      key,
      targetLocale,
      missingWarn,
      type
    );
    if (missingRet !== key) {
      format2 = missingRet;
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString$1(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString$1(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString$1(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign$1(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message, key);
    if (val == null && fallbackContext) {
      const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message2, key);
    }
    if (isString$1(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign$1({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString$1(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign$1({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
{
  initFeatureFlags$1();
}
/*!
  * vue-i18n v9.12.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.12.1";
function initFeatureFlags() {
  if (typeof __INTLIFY_JIT_COMPILATION__ !== "boolean") {
    getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
const code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = incrementer(code$1);
({
  FALLBACK_TO_ROOT: code$1,
  NOT_SUPPORTED_PRESERVE: inc$1(),
  NOT_SUPPORTED_FORMATTER: inc$1(),
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  IGNORE_OBJ_FLATTEN: inc$1(),
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1(),
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: inc$1()
});
const code = CoreErrorCodes.__EXTEND_POINT__;
const inc = incrementer(code);
const I18nErrorCodes = {
  UNEXPECTED_RETURN_TYPE: code,
  INVALID_ARGUMENT: inc(),
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSTALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  UNEXPECTED_ERROR: inc(),
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  __EXTEND_POINT__: inc()
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        if (!isObject$1(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
      }
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages: messages2, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages2) ? messages2 : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString$1(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages2 = isObject$1(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages2 = getLocaleMessages(gl.locale.value, {
      messages: messages2,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages2);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages2[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = inBrowser ? ref : shallowRef;
  const translateExistCompatible = !!options.translateExistCompatible;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages2 = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (true) {
        setAdditionalMeta(getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      {
        setAdditionalMeta(null);
      }
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign$1({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      (root) => root[NumberPartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString$1(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      (root) => root[DatetimePartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString$1(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return !translateExistCompatible ? isMessageAST(resolved) || isMessageFunction(resolved) || isString$1(resolved) : resolved != null;
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages3 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages3 = messageValue;
        break;
      }
    }
    return messages3;
  }
  function tm(key) {
    const messages3 = resolveMessages(key);
    return messages3 != null ? messages3 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign$1(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign$1(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages: messages2,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-t",
  props: assign$1({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString$1(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n2[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign$1({}, attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString$1(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString$1(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign$1({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString$1(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign$1({}, attrs);
    const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-n",
  props: assign$1({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n2[NumberPartsSymbol](...args));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-d",
  props: assign$1({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n2[DatetimePartsSymbol](...args));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n2, instance) {
  const i18nInternal = i18n2;
  if (i18n2.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n2.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
  }
}
function vTDirective(i18n2) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n2, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n2.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString$1(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString$1(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n2, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n2));
  }
}
const VueDevToolsLabels = {
  ["vue-devtools-plugin-vue-i18n"]: "Vue I18n devtools",
  ["vue-i18n-resource-inspector"]: "I18n Resources",
  ["vue-i18n-timeline"]: "Vue I18n"
};
const VueDevToolsPlaceholders = {
  ["vue-i18n-resource-inspector"]: "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  ["vue-i18n-timeline"]: 16764185
};
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
async function enableDevTools(app, i18n2) {
  return new Promise((resolve, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n2);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el && componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n2.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels["vue-i18n-resource-inspector"],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n2);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n2);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n2);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n2);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels["vue-i18n-timeline"],
          color: VueDevToolsTimelineColors["vue-i18n-timeline"]
        });
        resolve(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n2) {
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages2) {
  const value = {};
  Object.keys(messages2).forEach((key) => {
    const v = messages2[key];
    if (isFunction(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isMessageAST(v) && v.loc && v.loc.source) {
      value[key] = v.loc.source;
    } else if (isObject$1(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>\u0192</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n2) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  for (const [keyInstance, instance] of i18n2.__instances) {
    const composer = i18n2.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n2) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n2.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$1(nodeId, i18n2) {
  if (nodeId === "global") {
    return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  } else {
    const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n2.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString$1(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString$1(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n2 = {
      get mode() {
        return "composition";
      },
      get allowComposition() {
        return __allowComposition;
      },
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n2.__composerExtend = opts.__composerExtend;
          i18n2.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        if (__globalInjection) {
          globalReleaseHandler = injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler();
          i18n2.dispose();
          unmountApp();
        };
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          }
          const emitter = createEmitter();
          {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      __instances,
      __getInstance,
      __setInstance,
      __deleteInstance
    };
    return i18n2;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n2 = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n2);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n2, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n2;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign$1({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n2 = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n2) {
  return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
}
function getComposer(i18n2, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
}
function setupLifeCycle(i18n2, target, composer) {
  let emitter = null;
  {
    onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    onUnmounted(() => {
      const _composer = composer;
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
      const dispose = _composer[DisposeSymbol];
      if (dispose) {
        dispose();
        delete _composer[DisposeSymbol];
      }
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n2 = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n2, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n2;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
{
  initFeatureFlags();
}
if (__INTLIFY_JIT_COMPILATION__) {
  registerMessageCompiler(compile);
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
var enUS = {
  failed: "Action failed",
  success: "Action was successful"
};
var messages = {
  "en-US": enUS
};
var i18n = boot(({ app }) => {
  const i18n2 = createI18n({
    locale: "en-US",
    globalInjection: true,
    messages
  });
  app.use(i18n2);
});
export { i18n as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi45YmJiNjE2MS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BpbnRsaWZ5L3NoYXJlZC9kaXN0L3NoYXJlZC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGludGxpZnkvbWVzc2FnZS1jb21waWxlci9kaXN0L21lc3NhZ2UtY29tcGlsZXIuZXNtLWJyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGludGxpZnkvY29yZS1iYXNlL2Rpc3QvY29yZS1iYXNlLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLnJ1bnRpbWUubWpzIiwiLi4vLi4vLi4vc3JjL2kxOG4vZW4tVVMvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvaTE4bi9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9ib290L2kxOG4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gICogc2hhcmVkIHY5LjEyLjFcbiAgKiAoYykgMjAyNCBrYXp1eWEga2F3YWd1Y2hpXG4gICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICAqL1xuLyoqXG4gKiBPcmlnaW5hbCBVdGlsaXRpZXNcbiAqIHdyaXR0ZW4gYnkga2F6dXlhIGthd2FndWNoaVxuICovXG5jb25zdCBpbkJyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBtYXJrO1xubGV0IG1lYXN1cmU7XG5pZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgY29uc3QgcGVyZiA9IGluQnJvd3NlciAmJiB3aW5kb3cucGVyZm9ybWFuY2U7XG4gICAgaWYgKHBlcmYgJiZcbiAgICAgICAgcGVyZi5tYXJrICYmXG4gICAgICAgIHBlcmYubWVhc3VyZSAmJlxuICAgICAgICBwZXJmLmNsZWFyTWFya3MgJiZcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBicm93c2VyIGNvbXBhdFxuICAgICAgICBwZXJmLmNsZWFyTWVhc3VyZXMpIHtcbiAgICAgICAgbWFyayA9ICh0YWcpID0+IHtcbiAgICAgICAgICAgIHBlcmYubWFyayh0YWcpO1xuICAgICAgICB9O1xuICAgICAgICBtZWFzdXJlID0gKG5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpID0+IHtcbiAgICAgICAgICAgIHBlcmYubWVhc3VyZShuYW1lLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICAgICAgICAgIHBlcmYuY2xlYXJNYXJrcyhzdGFydFRhZyk7XG4gICAgICAgICAgICBwZXJmLmNsZWFyTWFya3MoZW5kVGFnKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5jb25zdCBSRV9BUkdTID0gL1xceyhbMC05YS16QS1aXSspXFx9L2c7XG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuZnVuY3Rpb24gZm9ybWF0KG1lc3NhZ2UsIC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgaXNPYmplY3QoYXJnc1swXSkpIHtcbiAgICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgfVxuICAgIGlmICghYXJncyB8fCAhYXJncy5oYXNPd25Qcm9wZXJ0eSkge1xuICAgICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlLnJlcGxhY2UoUkVfQVJHUywgKG1hdGNoLCBpZGVudGlmaWVyKSA9PiB7XG4gICAgICAgIHJldHVybiBhcmdzLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpID8gYXJnc1tpZGVudGlmaWVyXSA6ICcnO1xuICAgIH0pO1xufVxuY29uc3QgbWFrZVN5bWJvbCA9IChuYW1lLCBzaGFyZWFibGUgPSBmYWxzZSkgPT4gIXNoYXJlYWJsZSA/IFN5bWJvbChuYW1lKSA6IFN5bWJvbC5mb3IobmFtZSk7XG5jb25zdCBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5ID0gKGxvY2FsZSwga2V5LCBzb3VyY2UpID0+IGZyaWVuZGx5SlNPTnN0cmluZ2lmeSh7IGw6IGxvY2FsZSwgazoga2V5LCBzOiBzb3VyY2UgfSk7XG5jb25zdCBmcmllbmRseUpTT05zdHJpbmdpZnkgPSAoanNvbikgPT4gSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAucmVwbGFjZSgvXFx1MjAyOC9nLCAnXFxcXHUyMDI4JylcbiAgICAucmVwbGFjZSgvXFx1MjAyOS9nLCAnXFxcXHUyMDI5JylcbiAgICAucmVwbGFjZSgvXFx1MDAyNy9nLCAnXFxcXHUwMDI3Jyk7XG5jb25zdCBpc051bWJlciA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCk7XG5jb25zdCBpc0RhdGUgPSAodmFsKSA9PiB0b1R5cGVTdHJpbmcodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xuY29uc3QgaXNSZWdFeHAgPSAodmFsKSA9PiB0b1R5cGVTdHJpbmcodmFsKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG5jb25zdCBpc0VtcHR5T2JqZWN0ID0gKHZhbCkgPT4gaXNQbGFpbk9iamVjdCh2YWwpICYmIE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwO1xuY29uc3QgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbmxldCBfZ2xvYmFsVGhpcztcbmNvbnN0IGdldEdsb2JhbFRoaXMgPSAoKSA9PiB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgcmV0dXJuIChfZ2xvYmFsVGhpcyB8fFxuICAgICAgICAoX2dsb2JhbFRoaXMgPVxuICAgICAgICAgICAgdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgPyBnbG9iYWxUaGlzXG4gICAgICAgICAgICAgICAgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmXG4gICAgICAgICAgICAgICAgICAgIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gd2luZG93XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBnbG9iYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9KSk7XG59O1xuZnVuY3Rpb24gZXNjYXBlSHRtbChyYXdUZXh0KSB7XG4gICAgcmV0dXJuIHJhd1RleHRcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgLnJlcGxhY2UoLycvZywgJyZhcG9zOycpO1xufVxuY29uc3QgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuLyogZXNsaW50LWVuYWJsZSAqL1xuLyoqXG4gKiBVc2VmdWwgVXRpbGl0aWVzIEJ5IEV2YW4geW91XG4gKiBNb2RpZmllZCBieSBrYXp1eWEga2F3YWd1Y2hpXG4gKiBNSVQgTGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1uZXh0L2Jsb2IvbWFzdGVyL3BhY2thZ2VzL3NoYXJlZC9zcmMvaW5kZXgudHNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtbmV4dC9ibG9iL21hc3Rlci9wYWNrYWdlcy9zaGFyZWQvc3JjL2NvZGVmcmFtZS50c1xuICovXG5jb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmNvbnN0IGlzRnVuY3Rpb24gPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNTdHJpbmcgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbmNvbnN0IGlzQm9vbGVhbiA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdib29sZWFuJztcbmNvbnN0IGlzU3ltYm9sID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ3N5bWJvbCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuY29uc3QgaXNPYmplY3QgPSAodmFsKSA9PiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuY29uc3QgaXNQcm9taXNlID0gKHZhbCkgPT4ge1xuICAgIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnRoZW4pICYmIGlzRnVuY3Rpb24odmFsLmNhdGNoKTtcbn07XG5jb25zdCBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCB0b1R5cGVTdHJpbmcgPSAodmFsdWUpID0+IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgICBpZiAoIWlzT2JqZWN0KHZhbCkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICAgIHJldHVybiBwcm90byA9PT0gbnVsbCB8fCBwcm90by5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xufTtcbi8vIGZvciBjb252ZXJ0aW5nIGxpc3QgYW5kIG5hbWVkIHZhbHVlcyB0byBkaXNwbGF5ZWQgc3RyaW5ncy5cbmNvbnN0IHRvRGlzcGxheVN0cmluZyA9ICh2YWwpID0+IHtcbiAgICByZXR1cm4gdmFsID09IG51bGxcbiAgICAgICAgPyAnJ1xuICAgICAgICA6IGlzQXJyYXkodmFsKSB8fCAoaXNQbGFpbk9iamVjdCh2YWwpICYmIHZhbC50b1N0cmluZyA9PT0gb2JqZWN0VG9TdHJpbmcpXG4gICAgICAgICAgICA/IEpTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMilcbiAgICAgICAgICAgIDogU3RyaW5nKHZhbCk7XG59O1xuZnVuY3Rpb24gam9pbihpdGVtcywgc2VwYXJhdG9yID0gJycpIHtcbiAgICByZXR1cm4gaXRlbXMucmVkdWNlKChzdHIsIGl0ZW0sIGluZGV4KSA9PiAoaW5kZXggPT09IDAgPyBzdHIgKyBpdGVtIDogc3RyICsgc2VwYXJhdG9yICsgaXRlbSksICcnKTtcbn1cbmNvbnN0IFJBTkdFID0gMjtcbmZ1bmN0aW9uIGdlbmVyYXRlQ29kZUZyYW1lKHNvdXJjZSwgc3RhcnQgPSAwLCBlbmQgPSBzb3VyY2UubGVuZ3RoKSB7XG4gICAgY29uc3QgbGluZXMgPSBzb3VyY2Uuc3BsaXQoL1xccj9cXG4vKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY291bnQgKz0gbGluZXNbaV0ubGVuZ3RoICsgMTtcbiAgICAgICAgaWYgKGNvdW50ID49IHN0YXJ0KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSAtIFJBTkdFOyBqIDw9IGkgKyBSQU5HRSB8fCBlbmQgPiBjb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGogPCAwIHx8IGogPj0gbGluZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gaiArIDE7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goYCR7bGluZX0keycgJy5yZXBlYXQoMyAtIFN0cmluZyhsaW5lKS5sZW5ndGgpfXwgICR7bGluZXNbal19YCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUxlbmd0aCA9IGxpbmVzW2pdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHVuZGVybGluZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWQgPSBzdGFydCAtIChjb3VudCAtIGxpbmVMZW5ndGgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgoMSwgZW5kID4gY291bnQgPyBsaW5lTGVuZ3RoIC0gcGFkIDogZW5kIC0gc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChgICAgfCAgYCArICcgJy5yZXBlYXQocGFkKSArICdeJy5yZXBlYXQobGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGogPiBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmQgPiBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5taW4oZW5kIC0gY291bnQsIGxpbmVMZW5ndGgpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGAgICB8ICBgICsgJ14nLnJlcGVhdChsZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSBsaW5lTGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzLmpvaW4oJ1xcbicpO1xufVxuZnVuY3Rpb24gaW5jcmVtZW50ZXIoY29kZSkge1xuICAgIGxldCBjdXJyZW50ID0gY29kZTtcbiAgICByZXR1cm4gKCkgPT4gKytjdXJyZW50O1xufVxuXG5mdW5jdGlvbiB3YXJuKG1zZywgZXJyKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLndhcm4oYFtpbnRsaWZ5XSBgICsgbXNnKTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIuc3RhY2spO1xuICAgICAgICB9XG4gICAgfVxufVxuY29uc3QgaGFzV2FybmVkID0ge307XG5mdW5jdGlvbiB3YXJuT25jZShtc2cpIHtcbiAgICBpZiAoIWhhc1dhcm5lZFttc2ddKSB7XG4gICAgICAgIGhhc1dhcm5lZFttc2ddID0gdHJ1ZTtcbiAgICAgICAgd2Fybihtc2cpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBFdmVudCBlbWl0dGVyLCBmb3JrZWQgZnJvbSB0aGUgYmVsb3c6XG4gKiAtIG9yaWdpbmFsIHJlcG9zaXRvcnkgdXJsOiBodHRwczovL2dpdGh1Yi5jb20vZGV2ZWxvcGl0L21pdHRcbiAqIC0gY29kZSB1cmw6IGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvbWl0dC9ibG9iL21hc3Rlci9zcmMvaW5kZXgudHNcbiAqIC0gYXV0aG9yOiBKYXNvbiBNaWxsZXIgKGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQpXG4gKiAtIGxpY2Vuc2U6IE1JVFxuICovXG4vKipcbiAqIENyZWF0ZSBhIGV2ZW50IGVtaXR0ZXJcbiAqXG4gKiBAcmV0dXJucyBBbiBldmVudCBlbWl0dGVyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVtaXR0ZXIoKSB7XG4gICAgY29uc3QgZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGVtaXR0ZXIgPSB7XG4gICAgICAgIGV2ZW50cyxcbiAgICAgICAgb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJzID0gZXZlbnRzLmdldChldmVudCk7XG4gICAgICAgICAgICBjb25zdCBhZGRlZCA9IGhhbmRsZXJzICYmIGhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgICAgICAgICBpZiAoIWFkZGVkKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLnNldChldmVudCwgW2hhbmRsZXJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2ZmKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVycyA9IGV2ZW50cy5nZXQoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcikgPj4+IDAsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbWl0KGV2ZW50LCBwYXlsb2FkKSB7XG4gICAgICAgICAgICAoZXZlbnRzLmdldChldmVudCkgfHwgW10pXG4gICAgICAgICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAgICAgICAubWFwKGhhbmRsZXIgPT4gaGFuZGxlcihwYXlsb2FkKSk7XG4gICAgICAgICAgICAoZXZlbnRzLmdldCgnKicpIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5zbGljZSgpXG4gICAgICAgICAgICAgICAgLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoZXZlbnQsIHBheWxvYWQpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbmNvbnN0IGlzTm90T2JqZWN0T3JJc0FycmF5ID0gKHZhbCkgPT4gIWlzT2JqZWN0KHZhbCkgfHwgaXNBcnJheSh2YWwpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIGRlZXBDb3B5KHNyYywgZGVzKSB7XG4gICAgLy8gc3JjIGFuZCBkZXMgc2hvdWxkIGJvdGggYmUgb2JqZWN0cywgYW5kIG5vbmUgb2YgdGhlbSBjYW4gYmUgYSBhcnJheVxuICAgIGlmIChpc05vdE9iamVjdE9ySXNBcnJheShzcmMpIHx8IGlzTm90T2JqZWN0T3JJc0FycmF5KGRlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlJyk7XG4gICAgfVxuICAgIGNvbnN0IHN0YWNrID0gW3sgc3JjLCBkZXMgfV07XG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICBjb25zdCB7IHNyYywgZGVzIH0gPSBzdGFjay5wb3AoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoc3JjKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNOb3RPYmplY3RPcklzQXJyYXkoc3JjW2tleV0pIHx8IGlzTm90T2JqZWN0T3JJc0FycmF5KGRlc1trZXldKSkge1xuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2Ugd2l0aCBzcmNba2V5XSB3aGVuOlxuICAgICAgICAgICAgICAgIC8vIHNyY1trZXldIG9yIGRlc1trZXldIGlzIG5vdCBhbiBvYmplY3QsIG9yXG4gICAgICAgICAgICAgICAgLy8gc3JjW2tleV0gb3IgZGVzW2tleV0gaXMgYW4gYXJyYXlcbiAgICAgICAgICAgICAgICBkZXNba2V5XSA9IHNyY1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3JjW2tleV0gYW5kIGRlc1trZXldIGFyZSBib3RoIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHsgc3JjOiBzcmNba2V5XSwgZGVzOiBkZXNba2V5XSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBhc3NpZ24sIGNyZWF0ZUVtaXR0ZXIsIGRlZXBDb3B5LCBlc2NhcGVIdG1sLCBmb3JtYXQsIGZyaWVuZGx5SlNPTnN0cmluZ2lmeSwgZ2VuZXJhdGVDb2RlRnJhbWUsIGdlbmVyYXRlRm9ybWF0Q2FjaGVLZXksIGdldEdsb2JhbFRoaXMsIGhhc093biwgaW5Ccm93c2VyLCBpbmNyZW1lbnRlciwgaXNBcnJheSwgaXNCb29sZWFuLCBpc0RhdGUsIGlzRW1wdHlPYmplY3QsIGlzRnVuY3Rpb24sIGlzTnVtYmVyLCBpc09iamVjdCwgaXNQbGFpbk9iamVjdCwgaXNQcm9taXNlLCBpc1JlZ0V4cCwgaXNTdHJpbmcsIGlzU3ltYm9sLCBqb2luLCBtYWtlU3ltYm9sLCBtYXJrLCBtZWFzdXJlLCBvYmplY3RUb1N0cmluZywgdG9EaXNwbGF5U3RyaW5nLCB0b1R5cGVTdHJpbmcsIHdhcm4sIHdhcm5PbmNlIH07XG4iLCIvKiFcbiAgKiBtZXNzYWdlLWNvbXBpbGVyIHY5LjEyLjFcbiAgKiAoYykgMjAyNCBrYXp1eWEga2F3YWd1Y2hpXG4gICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICAqL1xuY29uc3QgTE9DQVRJT05fU1RVQiA9IHtcbiAgICBzdGFydDogeyBsaW5lOiAxLCBjb2x1bW46IDEsIG9mZnNldDogMCB9LFxuICAgIGVuZDogeyBsaW5lOiAxLCBjb2x1bW46IDEsIG9mZnNldDogMCB9XG59O1xuZnVuY3Rpb24gY3JlYXRlUG9zaXRpb24obGluZSwgY29sdW1uLCBvZmZzZXQpIHtcbiAgICByZXR1cm4geyBsaW5lLCBjb2x1bW4sIG9mZnNldCB9O1xufVxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oc3RhcnQsIGVuZCwgc291cmNlKSB7XG4gICAgY29uc3QgbG9jID0geyBzdGFydCwgZW5kIH07XG4gICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgIGxvYy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIHJldHVybiBsb2M7XG59XG5cbi8qKlxuICogT3JpZ2luYWwgVXRpbGl0aWVzXG4gKiB3cml0dGVuIGJ5IGthenV5YSBrYXdhZ3VjaGlcbiAqL1xuY29uc3QgUkVfQVJHUyA9IC9cXHsoWzAtOWEtekEtWl0rKVxcfS9nO1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmZ1bmN0aW9uIGZvcm1hdChtZXNzYWdlLCAuLi5hcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGlzT2JqZWN0KGFyZ3NbMF0pKSB7XG4gICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgIH1cbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcbiAgICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKFJFX0FSR1MsIChtYXRjaCwgaWRlbnRpZmllcikgPT4ge1xuICAgICAgICByZXR1cm4gYXJncy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSA/IGFyZ3NbaWRlbnRpZmllcl0gOiAnJztcbiAgICB9KTtcbn1cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5jb25zdCBpc1N0cmluZyA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmNvbnN0IGlzT2JqZWN0ID0gKHZhbCkgPT4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xuZnVuY3Rpb24gam9pbihpdGVtcywgc2VwYXJhdG9yID0gJycpIHtcbiAgICByZXR1cm4gaXRlbXMucmVkdWNlKChzdHIsIGl0ZW0sIGluZGV4KSA9PiAoaW5kZXggPT09IDAgPyBzdHIgKyBpdGVtIDogc3RyICsgc2VwYXJhdG9yICsgaXRlbSksICcnKTtcbn1cblxuY29uc3QgQ29tcGlsZVdhcm5Db2RlcyA9IHtcbiAgICBVU0VfTU9EVUxPX1NZTlRBWDogMSxcbiAgICBfX0VYVEVORF9QT0lOVF9fOiAyXG59O1xuLyoqIEBpbnRlcm5hbCAqL1xuY29uc3Qgd2Fybk1lc3NhZ2VzID0ge1xuICAgIFtDb21waWxlV2FybkNvZGVzLlVTRV9NT0RVTE9fU1lOVEFYXTogYFVzZSBtb2R1bG8gYmVmb3JlICd7ezB9fScuYFxufTtcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVXYXJuKGNvZGUsIGxvYywgLi4uYXJncykge1xuICAgIGNvbnN0IG1zZyA9IGZvcm1hdCh3YXJuTWVzc2FnZXNbY29kZV0gfHwgJycsIC4uLihhcmdzIHx8IFtdKSkgO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB7IG1lc3NhZ2U6IFN0cmluZyhtc2cpLCBjb2RlIH07XG4gICAgaWYgKGxvYykge1xuICAgICAgICBtZXNzYWdlLmxvY2F0aW9uID0gbG9jO1xuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuY29uc3QgQ29tcGlsZUVycm9yQ29kZXMgPSB7XG4gICAgLy8gdG9rZW5pemVyIGVycm9yIGNvZGVzXG4gICAgRVhQRUNURURfVE9LRU46IDEsXG4gICAgSU5WQUxJRF9UT0tFTl9JTl9QTEFDRUhPTERFUjogMixcbiAgICBVTlRFUk1JTkFURURfU0lOR0xFX1FVT1RFX0lOX1BMQUNFSE9MREVSOiAzLFxuICAgIFVOS05PV05fRVNDQVBFX1NFUVVFTkNFOiA0LFxuICAgIElOVkFMSURfVU5JQ09ERV9FU0NBUEVfU0VRVUVOQ0U6IDUsXG4gICAgVU5CQUxBTkNFRF9DTE9TSU5HX0JSQUNFOiA2LFxuICAgIFVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFOiA3LFxuICAgIEVNUFRZX1BMQUNFSE9MREVSOiA4LFxuICAgIE5PVF9BTExPV19ORVNUX1BMQUNFSE9MREVSOiA5LFxuICAgIElOVkFMSURfTElOS0VEX0ZPUk1BVDogMTAsXG4gICAgLy8gcGFyc2VyIGVycm9yIGNvZGVzXG4gICAgTVVTVF9IQVZFX01FU1NBR0VTX0lOX1BMVVJBTDogMTEsXG4gICAgVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfTU9ESUZJRVI6IDEyLFxuICAgIFVORVhQRUNURURfRU1QVFlfTElOS0VEX0tFWTogMTMsXG4gICAgVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTOiAxNCxcbiAgICAvLyBnZW5lcmF0b3IgZXJyb3IgY29kZXNcbiAgICBVTkhBTkRMRURfQ09ERUdFTl9OT0RFX1RZUEU6IDE1LFxuICAgIC8vIG1pbmlmaWVyIGVycm9yIGNvZGVzXG4gICAgVU5IQU5ETEVEX01JTklGSUVSX05PREVfVFlQRTogMTYsXG4gICAgLy8gU3BlY2lhbCB2YWx1ZSBmb3IgaGlnaGVyLW9yZGVyIGNvbXBpbGVycyB0byBwaWNrIHVwIHRoZSBsYXN0IGNvZGVcbiAgICAvLyB0byBhdm9pZCBjb2xsaXNpb24gb2YgZXJyb3IgY29kZXMuIFRoaXMgc2hvdWxkIGFsd2F5cyBiZSBrZXB0IGFzIHRoZSBsYXN0XG4gICAgLy8gaXRlbS5cbiAgICBfX0VYVEVORF9QT0lOVF9fOiAxN1xufTtcbi8qKiBAaW50ZXJuYWwgKi9cbmNvbnN0IGVycm9yTWVzc2FnZXMgPSB7XG4gICAgLy8gdG9rZW5pemVyIGVycm9yIG1lc3NhZ2VzXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLkVYUEVDVEVEX1RPS0VOXTogYEV4cGVjdGVkIHRva2VuOiAnezB9J2AsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVE9LRU5fSU5fUExBQ0VIT0xERVJdOiBgSW52YWxpZCB0b2tlbiBpbiBwbGFjZWhvbGRlcjogJ3swfSdgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfU0lOR0xFX1FVT1RFX0lOX1BMQUNFSE9MREVSXTogYFVudGVybWluYXRlZCBzaW5nbGUgcXVvdGUgaW4gcGxhY2Vob2xkZXJgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTktOT1dOX0VTQ0FQRV9TRVFVRU5DRV06IGBVbmtub3duIGVzY2FwZSBzZXF1ZW5jZTogXFxcXHswfWAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVU5JQ09ERV9FU0NBUEVfU0VRVUVOQ0VdOiBgSW52YWxpZCB1bmljb2RlIGVzY2FwZSBzZXF1ZW5jZTogezB9YCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5CQUxBTkNFRF9DTE9TSU5HX0JSQUNFXTogYFVuYmFsYW5jZWQgY2xvc2luZyBicmFjZWAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFXTogYFVudGVybWluYXRlZCBjbG9zaW5nIGJyYWNlYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuRU1QVFlfUExBQ0VIT0xERVJdOiBgRW1wdHkgcGxhY2Vob2xkZXJgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5OT1RfQUxMT1dfTkVTVF9QTEFDRUhPTERFUl06IGBOb3QgYWxsb3dlZCBuZXN0IHBsYWNlaG9sZGVyYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9MSU5LRURfRk9STUFUXTogYEludmFsaWQgbGlua2VkIGZvcm1hdGAsXG4gICAgLy8gcGFyc2VyIGVycm9yIG1lc3NhZ2VzXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLk1VU1RfSEFWRV9NRVNTQUdFU19JTl9QTFVSQUxdOiBgUGx1cmFsIG11c3QgaGF2ZSBtZXNzYWdlc2AsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfRU1QVFlfTElOS0VEX01PRElGSUVSXTogYFVuZXhwZWN0ZWQgZW1wdHkgbGlua2VkIG1vZGlmaWVyYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfS0VZXTogYFVuZXhwZWN0ZWQgZW1wdHkgbGlua2VkIGtleWAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJU106IGBVbmV4cGVjdGVkIGxleGljYWwgYW5hbHlzaXMgaW4gdG9rZW46ICd7MH0nYCxcbiAgICAvLyBnZW5lcmF0b3IgZXJyb3IgbWVzc2FnZXNcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5IQU5ETEVEX0NPREVHRU5fTk9ERV9UWVBFXTogYHVuaGFuZGxlZCBjb2RlZ2VuIG5vZGUgdHlwZTogJ3swfSdgLFxuICAgIC8vIG1pbmltaXplciBlcnJvciBtZXNzYWdlc1xuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTkhBTkRMRURfTUlOSUZJRVJfTk9ERV9UWVBFXTogYHVuaGFuZGxlZCBtaW1pZmllciBub2RlIHR5cGU6ICd7MH0nYFxufTtcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVFcnJvcihjb2RlLCBsb2MsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHsgZG9tYWluLCBtZXNzYWdlcywgYXJncyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBtc2cgPSBmb3JtYXQoKG1lc3NhZ2VzIHx8IGVycm9yTWVzc2FnZXMpW2NvZGVdIHx8ICcnLCAuLi4oYXJncyB8fCBbXSkpXG4gICAgICAgIDtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBTeW50YXhFcnJvcihTdHJpbmcobXNnKSk7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gICAgaWYgKGxvYykge1xuICAgICAgICBlcnJvci5sb2NhdGlvbiA9IGxvYztcbiAgICB9XG4gICAgZXJyb3IuZG9tYWluID0gZG9tYWluO1xuICAgIHJldHVybiBlcnJvcjtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGRlZmF1bHRPbkVycm9yKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuY29uc3QgUkVfSFRNTF9UQUcgPSAvPFxcLz9bXFx3XFxzPVwiLy4nOjsjLVxcL10rPi87XG5jb25zdCBkZXRlY3RIdG1sVGFnID0gKHNvdXJjZSkgPT4gUkVfSFRNTF9UQUcudGVzdChzb3VyY2UpO1xuXG5jb25zdCBDSEFSX1NQID0gJyAnO1xuY29uc3QgQ0hBUl9DUiA9ICdcXHInO1xuY29uc3QgQ0hBUl9MRiA9ICdcXG4nO1xuY29uc3QgQ0hBUl9MUyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHgyMDI4KTtcbmNvbnN0IENIQVJfUFMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4MjAyOSk7XG5mdW5jdGlvbiBjcmVhdGVTY2FubmVyKHN0cikge1xuICAgIGNvbnN0IF9idWYgPSBzdHI7XG4gICAgbGV0IF9pbmRleCA9IDA7XG4gICAgbGV0IF9saW5lID0gMTtcbiAgICBsZXQgX2NvbHVtbiA9IDE7XG4gICAgbGV0IF9wZWVrT2Zmc2V0ID0gMDtcbiAgICBjb25zdCBpc0NSTEYgPSAoaW5kZXgpID0+IF9idWZbaW5kZXhdID09PSBDSEFSX0NSICYmIF9idWZbaW5kZXggKyAxXSA9PT0gQ0hBUl9MRjtcbiAgICBjb25zdCBpc0xGID0gKGluZGV4KSA9PiBfYnVmW2luZGV4XSA9PT0gQ0hBUl9MRjtcbiAgICBjb25zdCBpc1BTID0gKGluZGV4KSA9PiBfYnVmW2luZGV4XSA9PT0gQ0hBUl9QUztcbiAgICBjb25zdCBpc0xTID0gKGluZGV4KSA9PiBfYnVmW2luZGV4XSA9PT0gQ0hBUl9MUztcbiAgICBjb25zdCBpc0xpbmVFbmQgPSAoaW5kZXgpID0+IGlzQ1JMRihpbmRleCkgfHwgaXNMRihpbmRleCkgfHwgaXNQUyhpbmRleCkgfHwgaXNMUyhpbmRleCk7XG4gICAgY29uc3QgaW5kZXggPSAoKSA9PiBfaW5kZXg7XG4gICAgY29uc3QgbGluZSA9ICgpID0+IF9saW5lO1xuICAgIGNvbnN0IGNvbHVtbiA9ICgpID0+IF9jb2x1bW47XG4gICAgY29uc3QgcGVla09mZnNldCA9ICgpID0+IF9wZWVrT2Zmc2V0O1xuICAgIGNvbnN0IGNoYXJBdCA9IChvZmZzZXQpID0+IGlzQ1JMRihvZmZzZXQpIHx8IGlzUFMob2Zmc2V0KSB8fCBpc0xTKG9mZnNldCkgPyBDSEFSX0xGIDogX2J1ZltvZmZzZXRdO1xuICAgIGNvbnN0IGN1cnJlbnRDaGFyID0gKCkgPT4gY2hhckF0KF9pbmRleCk7XG4gICAgY29uc3QgY3VycmVudFBlZWsgPSAoKSA9PiBjaGFyQXQoX2luZGV4ICsgX3BlZWtPZmZzZXQpO1xuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIF9wZWVrT2Zmc2V0ID0gMDtcbiAgICAgICAgaWYgKGlzTGluZUVuZChfaW5kZXgpKSB7XG4gICAgICAgICAgICBfbGluZSsrO1xuICAgICAgICAgICAgX2NvbHVtbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ1JMRihfaW5kZXgpKSB7XG4gICAgICAgICAgICBfaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBfaW5kZXgrKztcbiAgICAgICAgX2NvbHVtbisrO1xuICAgICAgICByZXR1cm4gX2J1ZltfaW5kZXhdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwZWVrKCkge1xuICAgICAgICBpZiAoaXNDUkxGKF9pbmRleCArIF9wZWVrT2Zmc2V0KSkge1xuICAgICAgICAgICAgX3BlZWtPZmZzZXQrKztcbiAgICAgICAgfVxuICAgICAgICBfcGVla09mZnNldCsrO1xuICAgICAgICByZXR1cm4gX2J1ZltfaW5kZXggKyBfcGVla09mZnNldF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICBfaW5kZXggPSAwO1xuICAgICAgICBfbGluZSA9IDE7XG4gICAgICAgIF9jb2x1bW4gPSAxO1xuICAgICAgICBfcGVla09mZnNldCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2V0UGVlayhvZmZzZXQgPSAwKSB7XG4gICAgICAgIF9wZWVrT2Zmc2V0ID0gb2Zmc2V0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBza2lwVG9QZWVrKCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBfaW5kZXggKyBfcGVla09mZnNldDtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgd2hpbGUgKHRhcmdldCAhPT0gX2luZGV4KSB7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgX3BlZWtPZmZzZXQgPSAwO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBpbmRleCxcbiAgICAgICAgbGluZSxcbiAgICAgICAgY29sdW1uLFxuICAgICAgICBwZWVrT2Zmc2V0LFxuICAgICAgICBjaGFyQXQsXG4gICAgICAgIGN1cnJlbnRDaGFyLFxuICAgICAgICBjdXJyZW50UGVlayxcbiAgICAgICAgbmV4dCxcbiAgICAgICAgcGVlayxcbiAgICAgICAgcmVzZXQsXG4gICAgICAgIHJlc2V0UGVlayxcbiAgICAgICAgc2tpcFRvUGVla1xuICAgIH07XG59XG5cbmNvbnN0IEVPRiA9IHVuZGVmaW5lZDtcbmNvbnN0IERPVCA9ICcuJztcbmNvbnN0IExJVEVSQUxfREVMSU1JVEVSID0gXCInXCI7XG5jb25zdCBFUlJPUl9ET01BSU4kMyA9ICd0b2tlbml6ZXInO1xuZnVuY3Rpb24gY3JlYXRlVG9rZW5pemVyKHNvdXJjZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uICE9PSBmYWxzZTtcbiAgICBjb25zdCBfc2NuciA9IGNyZWF0ZVNjYW5uZXIoc291cmNlKTtcbiAgICBjb25zdCBjdXJyZW50T2Zmc2V0ID0gKCkgPT4gX3NjbnIuaW5kZXgoKTtcbiAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSAoKSA9PiBjcmVhdGVQb3NpdGlvbihfc2Nuci5saW5lKCksIF9zY25yLmNvbHVtbigpLCBfc2Nuci5pbmRleCgpKTtcbiAgICBjb25zdCBfaW5pdExvYyA9IGN1cnJlbnRQb3NpdGlvbigpO1xuICAgIGNvbnN0IF9pbml0T2Zmc2V0ID0gY3VycmVudE9mZnNldCgpO1xuICAgIGNvbnN0IF9jb250ZXh0ID0ge1xuICAgICAgICBjdXJyZW50VHlwZTogMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8sXG4gICAgICAgIG9mZnNldDogX2luaXRPZmZzZXQsXG4gICAgICAgIHN0YXJ0TG9jOiBfaW5pdExvYyxcbiAgICAgICAgZW5kTG9jOiBfaW5pdExvYyxcbiAgICAgICAgbGFzdFR5cGU6IDE0IC8qIFRva2VuVHlwZXMuRU9GICovLFxuICAgICAgICBsYXN0T2Zmc2V0OiBfaW5pdE9mZnNldCxcbiAgICAgICAgbGFzdFN0YXJ0TG9jOiBfaW5pdExvYyxcbiAgICAgICAgbGFzdEVuZExvYzogX2luaXRMb2MsXG4gICAgICAgIGJyYWNlTmVzdDogMCxcbiAgICAgICAgaW5MaW5rZWQ6IGZhbHNlLFxuICAgICAgICB0ZXh0OiAnJ1xuICAgIH07XG4gICAgY29uc3QgY29udGV4dCA9ICgpID0+IF9jb250ZXh0O1xuICAgIGNvbnN0IHsgb25FcnJvciB9ID0gb3B0aW9ucztcbiAgICBmdW5jdGlvbiBlbWl0RXJyb3IoY29kZSwgcG9zLCBvZmZzZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gY29udGV4dCgpO1xuICAgICAgICBwb3MuY29sdW1uICs9IG9mZnNldDtcbiAgICAgICAgcG9zLm9mZnNldCArPSBvZmZzZXQ7XG4gICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBsb2MgPSBsb2NhdGlvbiA/IGNyZWF0ZUxvY2F0aW9uKGN0eC5zdGFydExvYywgcG9zKSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbG9jLCB7XG4gICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4kMyxcbiAgICAgICAgICAgICAgICBhcmdzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRUb2tlbihjb250ZXh0LCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICBjb250ZXh0LmVuZExvYyA9IGN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICBjb250ZXh0LmN1cnJlbnRUeXBlID0gdHlwZTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB7IHR5cGUgfTtcbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICB0b2tlbi5sb2MgPSBjcmVhdGVMb2NhdGlvbihjb250ZXh0LnN0YXJ0TG9jLCBjb250ZXh0LmVuZExvYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRva2VuLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgICBjb25zdCBnZXRFbmRUb2tlbiA9IChjb250ZXh0KSA9PiBnZXRUb2tlbihjb250ZXh0LCAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLyk7XG4gICAgZnVuY3Rpb24gZWF0KHNjbnIsIGNoKSB7XG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09IGNoKSB7XG4gICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgIHJldHVybiBjaDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5FWFBFQ1RFRF9UT0tFTiwgY3VycmVudFBvc2l0aW9uKCksIDAsIGNoKTtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwZWVrU3BhY2VzKHNjbnIpIHtcbiAgICAgICAgbGV0IGJ1ZiA9ICcnO1xuICAgICAgICB3aGlsZSAoc2Nuci5jdXJyZW50UGVlaygpID09PSBDSEFSX1NQIHx8IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgYnVmICs9IHNjbnIuY3VycmVudFBlZWsoKTtcbiAgICAgICAgICAgIHNjbnIucGVlaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNraXBTcGFjZXMoc2Nucikge1xuICAgICAgICBjb25zdCBidWYgPSBwZWVrU3BhY2VzKHNjbnIpO1xuICAgICAgICBzY25yLnNraXBUb1BlZWsoKTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNJZGVudGlmaWVyU3RhcnQoY2gpIHtcbiAgICAgICAgaWYgKGNoID09PSBFT0YpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYyA9IGNoLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIHJldHVybiAoKGNjID49IDk3ICYmIGNjIDw9IDEyMikgfHwgLy8gYS16XG4gICAgICAgICAgICAoY2MgPj0gNjUgJiYgY2MgPD0gOTApIHx8IC8vIEEtWlxuICAgICAgICAgICAgY2MgPT09IDk1IC8vIF9cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNOdW1iZXJTdGFydChjaCkge1xuICAgICAgICBpZiAoY2ggPT09IEVPRikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuIGNjID49IDQ4ICYmIGNjIDw9IDU3OyAvLyAwLTlcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNOYW1lZElkZW50aWZpZXJTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IHJldCA9IGlzSWRlbnRpZmllclN0YXJ0KHNjbnIuY3VycmVudFBlZWsoKSk7XG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTGlzdElkZW50aWZpZXJTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50UGVlaygpID09PSAnLScgPyBzY25yLnBlZWsoKSA6IHNjbnIuY3VycmVudFBlZWsoKTtcbiAgICAgICAgY29uc3QgcmV0ID0gaXNOdW1iZXJTdGFydChjaCk7XG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTGl0ZXJhbFN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSAyIC8qIFRva2VuVHlwZXMuQnJhY2VMZWZ0ICovKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBMSVRFUkFMX0RFTElNSVRFUjtcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaW5rZWREb3RTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gOCAvKiBUb2tlblR5cGVzLkxpbmtlZEFsaWFzICovKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBcIi5cIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERvdCAqLztcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaW5rZWRNb2RpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSA5IC8qIFRva2VuVHlwZXMuTGlua2VkRG90ICovKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gaXNJZGVudGlmaWVyU3RhcnQoc2Nuci5jdXJyZW50UGVlaygpKTtcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaW5rZWREZWxpbWl0ZXJTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmICghKGN1cnJlbnRUeXBlID09PSA4IC8qIFRva2VuVHlwZXMuTGlua2VkQWxpYXMgKi8gfHxcbiAgICAgICAgICAgIGN1cnJlbnRUeXBlID09PSAxMiAvKiBUb2tlblR5cGVzLkxpbmtlZE1vZGlmaWVyICovKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCI6XCIgLyogVG9rZW5DaGFycy5MaW5rZWREZWxpbWl0ZXIgKi87XG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTGlua2VkUmVmZXJTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMTAgLyogVG9rZW5UeXBlcy5MaW5rZWREZWxpbWl0ZXIgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50UGVlaygpO1xuICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0lkZW50aWZpZXJTdGFydChzY25yLnBlZWsoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcInxcIiAvKiBUb2tlbkNoYXJzLlBpcGUgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCI6XCIgLyogVG9rZW5DaGFycy5MaW5rZWREZWxpbWl0ZXIgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIuXCIgLyogVG9rZW5DaGFycy5MaW5rZWREb3QgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gQ0hBUl9TUCB8fFxuICAgICAgICAgICAgICAgICFjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX0xGKSB7XG4gICAgICAgICAgICAgICAgc2Nuci5wZWVrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvdGhlciBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSWRlbnRpZmllclN0YXJ0KGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmV0ID0gZm4oKTtcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNQbHVyYWxTdGFydChzY25yKSB7XG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCJ8XCIgLyogVG9rZW5DaGFycy5QaXBlICovO1xuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZXRlY3RNb2R1bG9TdGFydChzY25yKSB7XG4gICAgICAgIGNvbnN0IHNwYWNlcyA9IHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8gJiZcbiAgICAgICAgICAgIHNjbnIucGVlaygpID09PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLztcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTW9kdWxvOiByZXQsXG4gICAgICAgICAgICBoYXNTcGFjZTogc3BhY2VzLmxlbmd0aCA+IDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNUZXh0U3RhcnQoc2NuciwgcmVzZXQgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGZuID0gKGhhc1NwYWNlID0gZmFsc2UsIHByZXYgPSAnJywgZGV0ZWN0TW9kdWxvID0gZmFsc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50UGVlaygpO1xuICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLyA/IGZhbHNlIDogaGFzU3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLyB8fCAhY2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8gPyB0cnVlIDogaGFzU3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8pIHtcbiAgICAgICAgICAgICAgICBzY25yLnBlZWsoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oaGFzU3BhY2UsIFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcInxcIiAvKiBUb2tlbkNoYXJzLlBpcGUgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8gfHwgZGV0ZWN0TW9kdWxvXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICA6ICEocHJldiA9PT0gQ0hBUl9TUCB8fCBwcmV2ID09PSBDSEFSX0xGKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX1NQKSB7XG4gICAgICAgICAgICAgICAgc2Nuci5wZWVrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHRydWUsIENIQVJfU1AsIGRldGVjdE1vZHVsbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgICAgIHNjbnIucGVlaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmbih0cnVlLCBDSEFSX0xGLCBkZXRlY3RNb2R1bG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJldCA9IGZuKCk7XG4gICAgICAgIHJlc2V0ICYmIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRha2VDaGFyKHNjbnIsIGZuKSB7XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xuICAgICAgICBpZiAoY2ggPT09IEVPRikge1xuICAgICAgICAgICAgcmV0dXJuIEVPRjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm4oY2gpKSB7XG4gICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgIHJldHVybiBjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNJZGVudGlmaWVyKGNoKSB7XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuICgoY2MgPj0gOTcgJiYgY2MgPD0gMTIyKSB8fCAvLyBhLXpcbiAgICAgICAgICAgIChjYyA+PSA2NSAmJiBjYyA8PSA5MCkgfHwgLy8gQS1aXG4gICAgICAgICAgICAoY2MgPj0gNDggJiYgY2MgPD0gNTcpIHx8IC8vIDAtOVxuICAgICAgICAgICAgY2MgPT09IDk1IHx8IC8vIF9cbiAgICAgICAgICAgIGNjID09PSAzNiAvLyAkXG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRha2VJZGVudGlmaWVyQ2hhcihzY25yKSB7XG4gICAgICAgIHJldHVybiB0YWtlQ2hhcihzY25yLCBpc0lkZW50aWZpZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc05hbWVkSWRlbnRpZmllcihjaCkge1xuICAgICAgICBjb25zdCBjYyA9IGNoLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIHJldHVybiAoKGNjID49IDk3ICYmIGNjIDw9IDEyMikgfHwgLy8gYS16XG4gICAgICAgICAgICAoY2MgPj0gNjUgJiYgY2MgPD0gOTApIHx8IC8vIEEtWlxuICAgICAgICAgICAgKGNjID49IDQ4ICYmIGNjIDw9IDU3KSB8fCAvLyAwLTlcbiAgICAgICAgICAgIGNjID09PSA5NSB8fCAvLyBfXG4gICAgICAgICAgICBjYyA9PT0gMzYgfHwgLy8gJFxuICAgICAgICAgICAgY2MgPT09IDQ1IC8vIC1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGFrZU5hbWVkSWRlbnRpZmllckNoYXIoc2Nucikge1xuICAgICAgICByZXR1cm4gdGFrZUNoYXIoc2NuciwgaXNOYW1lZElkZW50aWZpZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0RpZ2l0KGNoKSB7XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuIGNjID49IDQ4ICYmIGNjIDw9IDU3OyAvLyAwLTlcbiAgICB9XG4gICAgZnVuY3Rpb24gdGFrZURpZ2l0KHNjbnIpIHtcbiAgICAgICAgcmV0dXJuIHRha2VDaGFyKHNjbnIsIGlzRGlnaXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0hleERpZ2l0KGNoKSB7XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuICgoY2MgPj0gNDggJiYgY2MgPD0gNTcpIHx8IC8vIDAtOVxuICAgICAgICAgICAgKGNjID49IDY1ICYmIGNjIDw9IDcwKSB8fCAvLyBBLUZcbiAgICAgICAgICAgIChjYyA+PSA5NyAmJiBjYyA8PSAxMDIpKTsgLy8gYS1mXG4gICAgfVxuICAgIGZ1bmN0aW9uIHRha2VIZXhEaWdpdChzY25yKSB7XG4gICAgICAgIHJldHVybiB0YWtlQ2hhcihzY25yLCBpc0hleERpZ2l0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RGlnaXRzKHNjbnIpIHtcbiAgICAgICAgbGV0IGNoID0gJyc7XG4gICAgICAgIGxldCBudW0gPSAnJztcbiAgICAgICAgd2hpbGUgKChjaCA9IHRha2VEaWdpdChzY25yKSkpIHtcbiAgICAgICAgICAgIG51bSArPSBjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkTW9kdWxvKHNjbnIpIHtcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgIGlmIChjaCAhPT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8pIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5FWFBFQ1RFRF9UT0tFTiwgY3VycmVudFBvc2l0aW9uKCksIDAsIGNoKTtcbiAgICAgICAgfVxuICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgcmV0dXJuIFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkVGV4dChzY25yKSB7XG4gICAgICAgIGxldCBidWYgPSAnJztcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwifFwiIC8qIFRva2VuQ2hhcnMuUGlwZSAqLyB8fFxuICAgICAgICAgICAgICAgICFjaCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVGV4dFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZiArPSBjaDtcbiAgICAgICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gQ0hBUl9TUCB8fCBjaCA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgICAgIGlmIChpc1RleHRTdGFydChzY25yKSkge1xuICAgICAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmICs9IGNoO1xuICAgICAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZE5hbWVkSWRlbnRpZmllcihzY25yKSB7XG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgIGxldCBjaCA9ICcnO1xuICAgICAgICBsZXQgbmFtZSA9ICcnO1xuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZU5hbWVkSWRlbnRpZmllckNoYXIoc2NucikpKSB7XG4gICAgICAgICAgICBuYW1lICs9IGNoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09IEVPRikge1xuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRMaXN0SWRlbnRpZmllcihzY25yKSB7XG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgICAgICBpZiAoc2Nuci5jdXJyZW50Q2hhcigpID09PSAnLScpIHtcbiAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgdmFsdWUgKz0gYC0ke2dldERpZ2l0cyhzY25yKX1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgKz0gZ2V0RGlnaXRzKHNjbnIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09IEVPRikge1xuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0xpdGVyYWwoY2gpIHtcbiAgICAgICAgcmV0dXJuIGNoICE9PSBMSVRFUkFMX0RFTElNSVRFUiAmJiBjaCAhPT0gQ0hBUl9MRjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZExpdGVyYWwoc2Nucikge1xuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgICAgZWF0KHNjbnIsIGBcXCdgKTtcbiAgICAgICAgbGV0IGNoID0gJyc7XG4gICAgICAgIGxldCBsaXRlcmFsID0gJyc7XG4gICAgICAgIHdoaWxlICgoY2ggPSB0YWtlQ2hhcihzY25yLCBpc0xpdGVyYWwpKSkge1xuICAgICAgICAgICAgaWYgKGNoID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICBsaXRlcmFsICs9IHJlYWRFc2NhcGVTZXF1ZW5jZShzY25yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpdGVyYWwgKz0gY2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudCA9IHNjbnIuY3VycmVudENoYXIoKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IENIQVJfTEYgfHwgY3VycmVudCA9PT0gRU9GKSB7XG4gICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX1NJTkdMRV9RVU9URV9JTl9QTEFDRUhPTERFUiwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICAgICAgLy8gVE9ETzogSXMgaXQgY29ycmVjdCByZWFsbHk/XG4gICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgICAgICAgICAgICAgIGVhdChzY25yLCBgXFwnYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGl0ZXJhbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgICAgZWF0KHNjbnIsIGBcXCdgKTtcbiAgICAgICAgcmV0dXJuIGxpdGVyYWw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRFc2NhcGVTZXF1ZW5jZShzY25yKSB7XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgICAgICBjYXNlICdcXFxcJzpcbiAgICAgICAgICAgIGNhc2UgYFxcJ2A6IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYFxcXFwke2NofWA7XG4gICAgICAgICAgICBjYXNlICd1JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCBjaCwgNCk7XG4gICAgICAgICAgICBjYXNlICdVJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCBjaCwgNik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTktOT1dOX0VTQ0FQRV9TRVFVRU5DRSwgY3VycmVudFBvc2l0aW9uKCksIDAsIGNoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCB1bmljb2RlLCBkaWdpdHMpIHtcbiAgICAgICAgZWF0KHNjbnIsIHVuaWNvZGUpO1xuICAgICAgICBsZXQgc2VxdWVuY2UgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWdpdHM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2ggPSB0YWtlSGV4RGlnaXQoc2Nucik7XG4gICAgICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVU5JQ09ERV9FU0NBUEVfU0VRVUVOQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwLCBgXFxcXCR7dW5pY29kZX0ke3NlcXVlbmNlfSR7c2Nuci5jdXJyZW50Q2hhcigpfWApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VxdWVuY2UgKz0gY2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBcXFxcJHt1bmljb2RlfSR7c2VxdWVuY2V9YDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNJbnZhbGlkSWRlbnRpZmllcihjaCkge1xuICAgICAgICByZXR1cm4gKGNoICE9PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLyAmJlxuICAgICAgICAgICAgY2ggIT09IFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLyAmJlxuICAgICAgICAgICAgY2ggIT09IENIQVJfU1AgJiZcbiAgICAgICAgICAgIGNoICE9PSBDSEFSX0xGKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZEludmFsaWRJZGVudGlmaWVyKHNjbnIpIHtcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgbGV0IGNoID0gJyc7XG4gICAgICAgIGxldCBpZGVudGlmaWVycyA9ICcnO1xuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZUNoYXIoc2NuciwgaXNJbnZhbGlkSWRlbnRpZmllcikpKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVycyArPSBjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWRlbnRpZmllcnM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRMaW5rZWRNb2RpZmllcihzY25yKSB7XG4gICAgICAgIGxldCBjaCA9ICcnO1xuICAgICAgICBsZXQgbmFtZSA9ICcnO1xuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZUlkZW50aWZpZXJDaGFyKHNjbnIpKSkge1xuICAgICAgICAgICAgbmFtZSArPSBjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZExpbmtlZFJlZmVyKHNjbnIpIHtcbiAgICAgICAgY29uc3QgZm4gPSAoZGV0ZWN0ID0gZmFsc2UsIGJ1ZikgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwiQFwiIC8qIFRva2VuQ2hhcnMuTGlua2VkQWxpYXMgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJ8XCIgLyogVG9rZW5DaGFycy5QaXBlICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwiKFwiIC8qIFRva2VuQ2hhcnMuUGFyZW5MZWZ0ICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwiKVwiIC8qIFRva2VuQ2hhcnMuUGFyZW5SaWdodCAqLyB8fFxuICAgICAgICAgICAgICAgICFjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gQ0hBUl9TUCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gQ0hBUl9MRiB8fCBjaCA9PT0gRE9UKSB7XG4gICAgICAgICAgICAgICAgYnVmICs9IGNoO1xuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmbihkZXRlY3QsIGJ1Zik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHRydWUsIGJ1Zik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmbihmYWxzZSwgJycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkUGx1cmFsKHNjbnIpIHtcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcGx1cmFsID0gZWF0KHNjbnIsIFwifFwiIC8qIFRva2VuQ2hhcnMuUGlwZSAqLyk7XG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgIHJldHVybiBwbHVyYWw7XG4gICAgfVxuICAgIC8vIFRPRE86IFdlIG5lZWQgcmVmYWN0b3Jpbmcgb2YgdG9rZW4gcGFyc2luZyAuLi5cbiAgICBmdW5jdGlvbiByZWFkVG9rZW5JblBsYWNlaG9sZGVyKHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IHRva2VuID0gbnVsbDtcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ7XCIgLyogVG9rZW5DaGFycy5CcmFjZUxlZnQgKi86XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLk5PVF9BTExPV19ORVNUX1BMQUNFSE9MREVSLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLywgXCJ7XCIgLyogVG9rZW5DaGFycy5CcmFjZUxlZnQgKi8pO1xuICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICBjYXNlIFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLzpcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgPT09IDIgLyogVG9rZW5UeXBlcy5CcmFjZUxlZnQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLkVNUFRZX1BMQUNFSE9MREVSLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMyAvKiBUb2tlblR5cGVzLkJyYWNlUmlnaHQgKi8sIFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QtLTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA+IDAgJiYgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5pbkxpbmtlZCAmJiBjb250ZXh0LmJyYWNlTmVzdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgIGNhc2UgXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLzpcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2tlbiA9IHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkTmFtZWRJZGVudGlmaWVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRMaXN0SWRlbnRpZmllciA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkTGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGlzUGx1cmFsU3RhcnQoc2NucikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAxIC8qIFRva2VuVHlwZXMuUGlwZSAqLywgcmVhZFBsdXJhbChzY25yKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5pbkxpbmtlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmJyYWNlTmVzdCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgKGNvbnRleHQuY3VycmVudFR5cGUgPT09IDUgLyogVG9rZW5UeXBlcy5OYW1lZCAqLyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXJyZW50VHlwZSA9PT0gNiAvKiBUb2tlblR5cGVzLkxpc3QgKi8gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgPT09IDcgLyogVG9rZW5UeXBlcy5MaXRlcmFsICovKSkge1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX0NMT1NJTkdfQlJBQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuKHNjbnIsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHZhbGlkTmFtZWRJZGVudGlmaWVyID0gaXNOYW1lZElkZW50aWZpZXJTdGFydChzY25yLCBjb250ZXh0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCA1IC8qIFRva2VuVHlwZXMuTmFtZWQgKi8sIHJlYWROYW1lZElkZW50aWZpZXIoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgodmFsaWRMaXN0SWRlbnRpZmllciA9IGlzTGlzdElkZW50aWZpZXJTdGFydChzY25yLCBjb250ZXh0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCA2IC8qIFRva2VuVHlwZXMuTGlzdCAqLywgcmVhZExpc3RJZGVudGlmaWVyKHNjbnIpKTtcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHZhbGlkTGl0ZXJhbCA9IGlzTGl0ZXJhbFN0YXJ0KHNjbnIsIGNvbnRleHQpKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDcgLyogVG9rZW5UeXBlcy5MaXRlcmFsICovLCByZWFkTGl0ZXJhbChzY25yKSk7XG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZE5hbWVkSWRlbnRpZmllciAmJiAhdmFsaWRMaXN0SWRlbnRpZmllciAmJiAhdmFsaWRMaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHdlIHNob3VsZCBiZSByZS1kZXNpZ25lZCBpbnZhbGlkIGNhc2VzLCB3aGVuIHdlIHdpbGwgZXh0ZW5kIG1lc3NhZ2Ugc3ludGF4IG5lYXIgdGhlIGZ1dHVyZSAuLi5cbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAxMyAvKiBUb2tlblR5cGVzLkludmFsaWRQbGFjZSAqLywgcmVhZEludmFsaWRJZGVudGlmaWVyKHNjbnIpKTtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVE9LRU5fSU5fUExBQ0VIT0xERVIsIGN1cnJlbnRQb3NpdGlvbigpLCAwLCB0b2tlbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgICAvLyBUT0RPOiBXZSBuZWVkIHJlZmFjdG9yaW5nIG9mIHRva2VuIHBhcnNpbmcgLi4uXG4gICAgZnVuY3Rpb24gcmVhZFRva2VuSW5MaW5rZWQoc2NuciwgY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlIH0gPSBjb250ZXh0O1xuICAgICAgICBsZXQgdG9rZW4gPSBudWxsO1xuICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcbiAgICAgICAgaWYgKChjdXJyZW50VHlwZSA9PT0gOCAvKiBUb2tlblR5cGVzLkxpbmtlZEFsaWFzICovIHx8XG4gICAgICAgICAgICBjdXJyZW50VHlwZSA9PT0gOSAvKiBUb2tlblR5cGVzLkxpbmtlZERvdCAqLyB8fFxuICAgICAgICAgICAgY3VycmVudFR5cGUgPT09IDEyIC8qIFRva2VuVHlwZXMuTGlua2VkTW9kaWZpZXIgKi8gfHxcbiAgICAgICAgICAgIGN1cnJlbnRUeXBlID09PSAxMCAvKiBUb2tlblR5cGVzLkxpbmtlZERlbGltaXRlciAqLykgJiZcbiAgICAgICAgICAgIChjaCA9PT0gQ0hBUl9MRiB8fCBjaCA9PT0gQ0hBUl9TUCkpIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX0xJTktFRF9GT1JNQVQsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgICAgICBjYXNlIFwiQFwiIC8qIFRva2VuQ2hhcnMuTGlua2VkQWxpYXMgKi86XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCA4IC8qIFRva2VuVHlwZXMuTGlua2VkQWxpYXMgKi8sIFwiQFwiIC8qIFRva2VuQ2hhcnMuTGlua2VkQWxpYXMgKi8pO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgIGNhc2UgXCIuXCIgLyogVG9rZW5DaGFycy5MaW5rZWREb3QgKi86XG4gICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgOSAvKiBUb2tlblR5cGVzLkxpbmtlZERvdCAqLywgXCIuXCIgLyogVG9rZW5DaGFycy5MaW5rZWREb3QgKi8pO1xuICAgICAgICAgICAgY2FzZSBcIjpcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERlbGltaXRlciAqLzpcbiAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCAxMCAvKiBUb2tlblR5cGVzLkxpbmtlZERlbGltaXRlciAqLywgXCI6XCIgLyogVG9rZW5DaGFycy5MaW5rZWREZWxpbWl0ZXIgKi8pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoaXNQbHVyYWxTdGFydChzY25yKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDEgLyogVG9rZW5UeXBlcy5QaXBlICovLCByZWFkUGx1cmFsKHNjbnIpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTGlua2VkRG90U3RhcnQoc2NuciwgY29udGV4dCkgfHxcbiAgICAgICAgICAgICAgICAgICAgaXNMaW5rZWREZWxpbWl0ZXJTdGFydChzY25yLCBjb250ZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuSW5MaW5rZWQoc2NuciwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc0xpbmtlZE1vZGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDEyIC8qIFRva2VuVHlwZXMuTGlua2VkTW9kaWZpZXIgKi8sIHJlYWRMaW5rZWRNb2RpZmllcihzY25yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc0xpbmtlZFJlZmVyU3RhcnQoc2NuciwgY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2NhbiB0aGUgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JblBsYWNlaG9sZGVyKHNjbnIsIGNvbnRleHQpIHx8IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDExIC8qIFRva2VuVHlwZXMuTGlua2VkS2V5ICovLCByZWFkTGlua2VkUmVmZXIoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHlwZSA9PT0gOCAvKiBUb2tlblR5cGVzLkxpbmtlZEFsaWFzICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX0xJTktFRF9GT1JNQVQsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuKHNjbnIsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFRPRE86IFdlIG5lZWQgcmVmYWN0b3Jpbmcgb2YgdG9rZW4gcGFyc2luZyAuLi5cbiAgICBmdW5jdGlvbiByZWFkVG9rZW4oc2NuciwgY29udGV4dCkge1xuICAgICAgICBsZXQgdG9rZW4gPSB7IHR5cGU6IDE0IC8qIFRva2VuVHlwZXMuRU9GICovIH07XG4gICAgICAgIGlmIChjb250ZXh0LmJyYWNlTmVzdCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JblBsYWNlaG9sZGVyKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb250ZXh0LmluTGlua2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuSW5MaW5rZWQoc2NuciwgY29udGV4dCkgfHwgZ2V0RW5kVG9rZW4oY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ7XCIgLyogVG9rZW5DaGFycy5CcmFjZUxlZnQgKi86XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluUGxhY2Vob2xkZXIoc2NuciwgY29udGV4dCkgfHwgZ2V0RW5kVG9rZW4oY29udGV4dCk7XG4gICAgICAgICAgICBjYXNlIFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLzpcbiAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5CQUxBTkNFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDMgLyogVG9rZW5UeXBlcy5CcmFjZVJpZ2h0ICovLCBcIn1cIiAvKiBUb2tlbkNoYXJzLkJyYWNlUmlnaHQgKi8pO1xuICAgICAgICAgICAgY2FzZSBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovOlxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KSB8fCBnZXRFbmRUb2tlbihjb250ZXh0KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNQbHVyYWxTdGFydChzY25yKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDEgLyogVG9rZW5UeXBlcy5QaXBlICovLCByZWFkUGx1cmFsKHNjbnIpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBpc01vZHVsbywgaGFzU3BhY2UgfSA9IGRldGVjdE1vZHVsb1N0YXJ0KHNjbnIpO1xuICAgICAgICAgICAgICAgIGlmIChpc01vZHVsbykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzU3BhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZ2V0VG9rZW4oY29udGV4dCwgMCAvKiBUb2tlblR5cGVzLlRleHQgKi8sIHJlYWRUZXh0KHNjbnIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBnZXRUb2tlbihjb250ZXh0LCA0IC8qIFRva2VuVHlwZXMuTW9kdWxvICovLCByZWFkTW9kdWxvKHNjbnIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzVGV4dFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCAwIC8qIFRva2VuVHlwZXMuVGV4dCAqLywgcmVhZFRleHQoc2NucikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5leHRUb2tlbigpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSwgb2Zmc2V0LCBzdGFydExvYywgZW5kTG9jIH0gPSBfY29udGV4dDtcbiAgICAgICAgX2NvbnRleHQubGFzdFR5cGUgPSBjdXJyZW50VHlwZTtcbiAgICAgICAgX2NvbnRleHQubGFzdE9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgX2NvbnRleHQubGFzdFN0YXJ0TG9jID0gc3RhcnRMb2M7XG4gICAgICAgIF9jb250ZXh0Lmxhc3RFbmRMb2MgPSBlbmRMb2M7XG4gICAgICAgIF9jb250ZXh0Lm9mZnNldCA9IGN1cnJlbnRPZmZzZXQoKTtcbiAgICAgICAgX2NvbnRleHQuc3RhcnRMb2MgPSBjdXJyZW50UG9zaXRpb24oKTtcbiAgICAgICAgaWYgKF9zY25yLmN1cnJlbnRDaGFyKCkgPT09IEVPRikge1xuICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKF9jb250ZXh0LCAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWRUb2tlbihfc2NuciwgX2NvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0VG9rZW4sXG4gICAgICAgIGN1cnJlbnRPZmZzZXQsXG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbixcbiAgICAgICAgY29udGV4dFxuICAgIH07XG59XG5cbmNvbnN0IEVSUk9SX0RPTUFJTiQyID0gJ3BhcnNlcic7XG4vLyBCYWNrc2xhc2ggYmFja3NsYXNoLCBiYWNrc2xhc2ggcXVvdGUsIHVISEhILCBVSEhISEhILlxuY29uc3QgS05PV05fRVNDQVBFUyA9IC8oPzpcXFxcXFxcXHxcXFxcJ3xcXFxcdShbMC05YS1mQS1GXXs0fSl8XFxcXFUoWzAtOWEtZkEtRl17Nn0pKS9nO1xuZnVuY3Rpb24gZnJvbUVzY2FwZVNlcXVlbmNlKG1hdGNoLCBjb2RlUG9pbnQ0LCBjb2RlUG9pbnQ2KSB7XG4gICAgc3dpdGNoIChtYXRjaCkge1xuICAgICAgICBjYXNlIGBcXFxcXFxcXGA6XG4gICAgICAgICAgICByZXR1cm4gYFxcXFxgO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgICAgY2FzZSBgXFxcXFxcJ2A6XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgICAgICAgIHJldHVybiBgXFwnYDtcbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgY29uc3QgY29kZVBvaW50ID0gcGFyc2VJbnQoY29kZVBvaW50NCB8fCBjb2RlUG9pbnQ2LCAxNik7XG4gICAgICAgICAgICBpZiAoY29kZVBvaW50IDw9IDB4ZDdmZiB8fCBjb2RlUG9pbnQgPj0gMHhlMDAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpbnZhbGlkIC4uLlxuICAgICAgICAgICAgLy8gUmVwbGFjZSB0aGVtIHdpdGggVStGRkZEIFJFUExBQ0VNRU5UIENIQVJBQ1RFUi5cbiAgICAgICAgICAgIHJldHVybiAn77+9JztcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhcnNlcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gIT09IGZhbHNlO1xuICAgIGNvbnN0IHsgb25FcnJvciwgb25XYXJuIH0gPSBvcHRpb25zO1xuICAgIGZ1bmN0aW9uIGVtaXRFcnJvcih0b2tlbnplciwgY29kZSwgc3RhcnQsIG9mZnNldCwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBlbmQgPSB0b2tlbnplci5jdXJyZW50UG9zaXRpb24oKTtcbiAgICAgICAgZW5kLm9mZnNldCArPSBvZmZzZXQ7XG4gICAgICAgIGVuZC5jb2x1bW4gKz0gb2Zmc2V0O1xuICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgICAgY29uc3QgbG9jID0gbG9jYXRpb24gPyBjcmVhdGVMb2NhdGlvbihzdGFydCwgZW5kKSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbG9jLCB7XG4gICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4kMixcbiAgICAgICAgICAgICAgICBhcmdzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbWl0V2Fybih0b2tlbnplciwgY29kZSwgc3RhcnQsIG9mZnNldCwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBlbmQgPSB0b2tlbnplci5jdXJyZW50UG9zaXRpb24oKTtcbiAgICAgICAgZW5kLm9mZnNldCArPSBvZmZzZXQ7XG4gICAgICAgIGVuZC5jb2x1bW4gKz0gb2Zmc2V0O1xuICAgICAgICBpZiAob25XYXJuKSB7XG4gICAgICAgICAgICBjb25zdCBsb2MgPSBsb2NhdGlvbiA/IGNyZWF0ZUxvY2F0aW9uKHN0YXJ0LCBlbmQpIDogbnVsbDtcbiAgICAgICAgICAgIG9uV2FybihjcmVhdGVDb21waWxlV2Fybihjb2RlLCBsb2MsIGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdGFydE5vZGUodHlwZSwgb2Zmc2V0LCBsb2MpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHsgdHlwZSB9O1xuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIG5vZGUuc3RhcnQgPSBvZmZzZXQ7XG4gICAgICAgICAgICBub2RlLmVuZCA9IG9mZnNldDtcbiAgICAgICAgICAgIG5vZGUubG9jID0geyBzdGFydDogbG9jLCBlbmQ6IGxvYyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbmROb2RlKG5vZGUsIG9mZnNldCwgcG9zLCB0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICBub2RlLnR5cGUgPSB0eXBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgbm9kZS5lbmQgPSBvZmZzZXQ7XG4gICAgICAgICAgICBpZiAobm9kZS5sb2MpIHtcbiAgICAgICAgICAgICAgICBub2RlLmxvYy5lbmQgPSBwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VUZXh0KHRva2VuaXplciwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoMyAvKiBOb2RlVHlwZXMuVGV4dCAqLywgY29udGV4dC5vZmZzZXQsIGNvbnRleHQuc3RhcnRMb2MpO1xuICAgICAgICBub2RlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlTGlzdCh0b2tlbml6ZXIsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBicmFjZSBsZWZ0IGxvY1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDUgLyogTm9kZVR5cGVzLkxpc3QgKi8sIG9mZnNldCwgbG9jKTtcbiAgICAgICAgbm9kZS5pbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCk7XG4gICAgICAgIHRva2VuaXplci5uZXh0VG9rZW4oKTsgLy8gc2tpcCBicmFjaCByaWdodFxuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZU5hbWVkKHRva2VuaXplciwga2V5LCBtb2R1bG8pIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IHsgbGFzdE9mZnNldDogb2Zmc2V0LCBsYXN0U3RhcnRMb2M6IGxvYyB9ID0gY29udGV4dDsgLy8gZ2V0IGJyYWNlIGxlZnQgbG9jXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoNCAvKiBOb2RlVHlwZXMuTmFtZWQgKi8sIG9mZnNldCwgbG9jKTtcbiAgICAgICAgbm9kZS5rZXkgPSBrZXk7XG4gICAgICAgIGlmIChtb2R1bG8gPT09IHRydWUpIHtcbiAgICAgICAgICAgIG5vZGUubW9kdWxvID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbml6ZXIubmV4dFRva2VuKCk7IC8vIHNraXAgYnJhY2ggcmlnaHRcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VMaXRlcmFsKHRva2VuaXplciwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IHsgbGFzdE9mZnNldDogb2Zmc2V0LCBsYXN0U3RhcnRMb2M6IGxvYyB9ID0gY29udGV4dDsgLy8gZ2V0IGJyYWNlIGxlZnQgbG9jXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoOSAvKiBOb2RlVHlwZXMuTGl0ZXJhbCAqLywgb2Zmc2V0LCBsb2MpO1xuICAgICAgICBub2RlLnZhbHVlID0gdmFsdWUucmVwbGFjZShLTk9XTl9FU0NBUEVTLCBmcm9tRXNjYXBlU2VxdWVuY2UpO1xuICAgICAgICB0b2tlbml6ZXIubmV4dFRva2VuKCk7IC8vIHNraXAgYnJhY2ggcmlnaHRcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VMaW5rZWRNb2RpZmllcih0b2tlbml6ZXIpIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBsaW5rZWQgZG90IGxvY1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDggLyogTm9kZVR5cGVzLkxpbmtlZE1vZGlmaWVyICovLCBvZmZzZXQsIGxvYyk7XG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAxMiAvKiBUb2tlblR5cGVzLkxpbmtlZE1vZGlmaWVyICovKSB7XG4gICAgICAgICAgICAvLyBlbXB0eSBtb2RpZmllclxuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfTU9ESUZJRVIsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwKTtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGVuZE5vZGUobm9kZSwgb2Zmc2V0LCBsb2MpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuZXh0Q29uc3VtZVRva2VuOiB0b2tlbixcbiAgICAgICAgICAgICAgICBub2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIHRva2VuXG4gICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnZhbHVlID0gdG9rZW4udmFsdWUgfHwgJyc7XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VMaW5rZWRLZXkodG9rZW5pemVyLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSg3IC8qIE5vZGVUeXBlcy5MaW5rZWRLZXkgKi8sIGNvbnRleHQub2Zmc2V0LCBjb250ZXh0LnN0YXJ0TG9jKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUxpbmtlZCh0b2tlbml6ZXIpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IGxpbmtlZE5vZGUgPSBzdGFydE5vZGUoNiAvKiBOb2RlVHlwZXMuTGlua2VkICovLCBjb250ZXh0Lm9mZnNldCwgY29udGV4dC5zdGFydExvYyk7XG4gICAgICAgIGxldCB0b2tlbiA9IHRva2VuaXplci5uZXh0VG9rZW4oKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDkgLyogVG9rZW5UeXBlcy5MaW5rZWREb3QgKi8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlTGlua2VkTW9kaWZpZXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGxpbmtlZE5vZGUubW9kaWZpZXIgPSBwYXJzZWQubm9kZTtcbiAgICAgICAgICAgIHRva2VuID0gcGFyc2VkLm5leHRDb25zdW1lVG9rZW4gfHwgdG9rZW5pemVyLm5leHRUb2tlbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFzc2V0IGNoZWNrIHRva2VuXG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAxMCAvKiBUb2tlblR5cGVzLkxpbmtlZERlbGltaXRlciAqLykge1xuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgIC8vIHNraXAgYnJhY2UgbGVmdFxuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIDExIC8qIFRva2VuVHlwZXMuTGlua2VkS2V5ICovOlxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlLmtleSA9IHBhcnNlTGlua2VkS2V5KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1IC8qIFRva2VuVHlwZXMuTmFtZWQgKi86XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGUua2V5ID0gcGFyc2VOYW1lZCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNiAvKiBUb2tlblR5cGVzLkxpc3QgKi86XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGUua2V5ID0gcGFyc2VMaXN0KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3IC8qIFRva2VuVHlwZXMuTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBwYXJzZUxpdGVyYWwodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgLy8gZW1wdHkga2V5XG4gICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfS0VZLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dENvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVtcHR5TGlua2VkS2V5Tm9kZSA9IHN0YXJ0Tm9kZSg3IC8qIE5vZGVUeXBlcy5MaW5rZWRLZXkgKi8sIG5leHRDb250ZXh0Lm9mZnNldCwgbmV4dENvbnRleHQuc3RhcnRMb2MpO1xuICAgICAgICAgICAgICAgIGVtcHR5TGlua2VkS2V5Tm9kZS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIGVuZE5vZGUoZW1wdHlMaW5rZWRLZXlOb2RlLCBuZXh0Q29udGV4dC5vZmZzZXQsIG5leHRDb250ZXh0LnN0YXJ0TG9jKTtcbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlLmtleSA9IGVtcHR5TGlua2VkS2V5Tm9kZTtcbiAgICAgICAgICAgICAgICBlbmROb2RlKGxpbmtlZE5vZGUsIG5leHRDb250ZXh0Lm9mZnNldCwgbmV4dENvbnRleHQuc3RhcnRMb2MpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDb25zdW1lVG9rZW46IHRva2VuLFxuICAgICAgICAgICAgICAgICAgICBub2RlOiBsaW5rZWROb2RlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbmROb2RlKGxpbmtlZE5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub2RlOiBsaW5rZWROb2RlXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlTWVzc2FnZSh0b2tlbml6ZXIpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0T2Zmc2V0ID0gY29udGV4dC5jdXJyZW50VHlwZSA9PT0gMSAvKiBUb2tlblR5cGVzLlBpcGUgKi9cbiAgICAgICAgICAgID8gdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKVxuICAgICAgICAgICAgOiBjb250ZXh0Lm9mZnNldDtcbiAgICAgICAgY29uc3Qgc3RhcnRMb2MgPSBjb250ZXh0LmN1cnJlbnRUeXBlID09PSAxIC8qIFRva2VuVHlwZXMuUGlwZSAqL1xuICAgICAgICAgICAgPyBjb250ZXh0LmVuZExvY1xuICAgICAgICAgICAgOiBjb250ZXh0LnN0YXJ0TG9jO1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDIgLyogTm9kZVR5cGVzLk1lc3NhZ2UgKi8sIHN0YXJ0T2Zmc2V0LCBzdGFydExvYyk7XG4gICAgICAgIG5vZGUuaXRlbXMgPSBbXTtcbiAgICAgICAgbGV0IG5leHRUb2tlbiA9IG51bGw7XG4gICAgICAgIGxldCBtb2R1bG8gPSBudWxsO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IG5leHRUb2tlbiB8fCB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgICAgICBuZXh0VG9rZW4gPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIFRva2VuVHlwZXMuVGV4dCAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMucHVzaChwYXJzZVRleHQodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDYgLyogVG9rZW5UeXBlcy5MaXN0ICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlTGlzdCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiBUb2tlblR5cGVzLk1vZHVsbyAqLzpcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1IC8qIFRva2VuVHlwZXMuTmFtZWQgKi86XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBub2RlLml0ZW1zLnB1c2gocGFyc2VOYW1lZCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnLCAhIW1vZHVsbykpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kdWxvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0V2Fybih0b2tlbml6ZXIsIENvbXBpbGVXYXJuQ29kZXMuVVNFX01PRFVMT19TWU5UQVgsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsbyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA3IC8qIFRva2VuVHlwZXMuTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMucHVzaChwYXJzZUxpdGVyYWwodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDggLyogVG9rZW5UeXBlcy5MaW5rZWRBbGlhcyAqLzoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUxpbmtlZCh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLml0ZW1zLnB1c2gocGFyc2VkLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0VG9rZW4gPSBwYXJzZWQubmV4dENvbnN1bWVUb2tlbiB8fCBudWxsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGNvbnRleHQuY3VycmVudFR5cGUgIT09IDE0IC8qIFRva2VuVHlwZXMuRU9GICovICYmXG4gICAgICAgICAgICBjb250ZXh0LmN1cnJlbnRUeXBlICE9PSAxIC8qIFRva2VuVHlwZXMuUGlwZSAqLyk7XG4gICAgICAgIC8vIGFkanVzdCBtZXNzYWdlIG5vZGUgbG9jXG4gICAgICAgIGNvbnN0IGVuZE9mZnNldCA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogVG9rZW5UeXBlcy5QaXBlICovXG4gICAgICAgICAgICA/IGNvbnRleHQubGFzdE9mZnNldFxuICAgICAgICAgICAgOiB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpO1xuICAgICAgICBjb25zdCBlbmRMb2MgPSBjb250ZXh0LmN1cnJlbnRUeXBlID09PSAxIC8qIFRva2VuVHlwZXMuUGlwZSAqL1xuICAgICAgICAgICAgPyBjb250ZXh0Lmxhc3RFbmRMb2NcbiAgICAgICAgICAgIDogdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICBlbmROb2RlKG5vZGUsIGVuZE9mZnNldCwgZW5kTG9jKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlUGx1cmFsKHRva2VuaXplciwgb2Zmc2V0LCBsb2MsIG1zZ05vZGUpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGxldCBoYXNFbXB0eU1lc3NhZ2UgPSBtc2dOb2RlLml0ZW1zLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSgxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi8sIG9mZnNldCwgbG9jKTtcbiAgICAgICAgbm9kZS5jYXNlcyA9IFtdO1xuICAgICAgICBub2RlLmNhc2VzLnB1c2gobXNnTm9kZSk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHBhcnNlTWVzc2FnZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKCFoYXNFbXB0eU1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBoYXNFbXB0eU1lc3NhZ2UgPSBtc2cuaXRlbXMubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5jYXNlcy5wdXNoKG1zZyk7XG4gICAgICAgIH0gd2hpbGUgKGNvbnRleHQuY3VycmVudFR5cGUgIT09IDE0IC8qIFRva2VuVHlwZXMuRU9GICovKTtcbiAgICAgICAgaWYgKGhhc0VtcHR5TWVzc2FnZSkge1xuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuTVVTVF9IQVZFX01FU1NBR0VTX0lOX1BMVVJBTCwgbG9jLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVJlc291cmNlKHRva2VuaXplcikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgY29uc3QgeyBvZmZzZXQsIHN0YXJ0TG9jIH0gPSBjb250ZXh0O1xuICAgICAgICBjb25zdCBtc2dOb2RlID0gcGFyc2VNZXNzYWdlKHRva2VuaXplcik7XG4gICAgICAgIGlmIChjb250ZXh0LmN1cnJlbnRUeXBlID09PSAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLykge1xuICAgICAgICAgICAgcmV0dXJuIG1zZ05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQbHVyYWwodG9rZW5pemVyLCBvZmZzZXQsIHN0YXJ0TG9jLCBtc2dOb2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZShzb3VyY2UpIHtcbiAgICAgICAgY29uc3QgdG9rZW5pemVyID0gY3JlYXRlVG9rZW5pemVyKHNvdXJjZSwgYXNzaWduKHt9LCBvcHRpb25zKSk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDAgLyogTm9kZVR5cGVzLlJlc291cmNlICovLCBjb250ZXh0Lm9mZnNldCwgY29udGV4dC5zdGFydExvYyk7XG4gICAgICAgIGlmIChsb2NhdGlvbiAmJiBub2RlLmxvYykge1xuICAgICAgICAgICAgbm9kZS5sb2Muc291cmNlID0gc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUuYm9keSA9IHBhcnNlUmVzb3VyY2UodG9rZW5pemVyKTtcbiAgICAgICAgaWYgKG9wdGlvbnMub25DYWNoZUtleSkge1xuICAgICAgICAgICAgbm9kZS5jYWNoZUtleSA9IG9wdGlvbnMub25DYWNoZUtleShzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFzc2VydCB3aGV0aGVyIGFjaGlldmVkIHRvIEVPRlxuICAgICAgICBpZiAoY29udGV4dC5jdXJyZW50VHlwZSAhPT0gMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8pIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIHNvdXJjZVtjb250ZXh0Lm9mZnNldF0gfHwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHJldHVybiB7IHBhcnNlIH07XG59XG5mdW5jdGlvbiBnZXRUb2tlbkNhcHRpb24odG9rZW4pIHtcbiAgICBpZiAodG9rZW4udHlwZSA9PT0gMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8pIHtcbiAgICAgICAgcmV0dXJuICdFT0YnO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gKHRva2VuLnZhbHVlIHx8ICcnKS5yZXBsYWNlKC9cXHI/XFxuL2d1LCAnXFxcXG4nKTtcbiAgICByZXR1cm4gbmFtZS5sZW5ndGggPiAxMCA/IG5hbWUuc2xpY2UoMCwgOSkgKyAn4oCmJyA6IG5hbWU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zZm9ybWVyKGFzdCwgb3B0aW9ucyA9IHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbikge1xuICAgIGNvbnN0IF9jb250ZXh0ID0ge1xuICAgICAgICBhc3QsXG4gICAgICAgIGhlbHBlcnM6IG5ldyBTZXQoKVxuICAgIH07XG4gICAgY29uc3QgY29udGV4dCA9ICgpID0+IF9jb250ZXh0O1xuICAgIGNvbnN0IGhlbHBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIF9jb250ZXh0LmhlbHBlcnMuYWRkKG5hbWUpO1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9O1xuICAgIHJldHVybiB7IGNvbnRleHQsIGhlbHBlciB9O1xufVxuZnVuY3Rpb24gdHJhdmVyc2VOb2Rlcyhub2RlcywgdHJhbnNmb3JtZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyYXZlcnNlTm9kZShub2Rlc1tpXSwgdHJhbnNmb3JtZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyYXZlcnNlTm9kZShub2RlLCB0cmFuc2Zvcm1lcikge1xuICAgIC8vIFRPRE86IGlmIHdlIG5lZWQgcHJlLWhvb2sgb2YgdHJhbnNmb3JtLCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgdG8gaGVyZVxuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgMSAvKiBOb2RlVHlwZXMuUGx1cmFsICovOlxuICAgICAgICAgICAgdHJhdmVyc2VOb2Rlcyhub2RlLmNhc2VzLCB0cmFuc2Zvcm1lcik7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJwbHVyYWxcIiAvKiBIZWxwZXJOYW1lTWFwLlBMVVJBTCAqLyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyIC8qIE5vZGVUeXBlcy5NZXNzYWdlICovOlxuICAgICAgICAgICAgdHJhdmVyc2VOb2Rlcyhub2RlLml0ZW1zLCB0cmFuc2Zvcm1lcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2IC8qIE5vZGVUeXBlcy5MaW5rZWQgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZCA9IG5vZGU7XG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGUobGlua2VkLmtleSwgdHJhbnNmb3JtZXIpO1xuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwibGlua2VkXCIgLyogSGVscGVyTmFtZU1hcC5MSU5LRUQgKi8pO1xuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwidHlwZVwiIC8qIEhlbHBlck5hbWVNYXAuVFlQRSAqLyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDUgLyogTm9kZVR5cGVzLkxpc3QgKi86XG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJpbnRlcnBvbGF0ZVwiIC8qIEhlbHBlck5hbWVNYXAuSU5URVJQT0xBVEUgKi8pO1xuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwibGlzdFwiIC8qIEhlbHBlck5hbWVNYXAuTElTVCAqLyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0IC8qIE5vZGVUeXBlcy5OYW1lZCAqLzpcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcImludGVycG9sYXRlXCIgLyogSGVscGVyTmFtZU1hcC5JTlRFUlBPTEFURSAqLyk7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJuYW1lZFwiIC8qIEhlbHBlck5hbWVNYXAuTkFNRUQgKi8pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFRPRE86IGlmIHdlIG5lZWQgcG9zdC1ob29rIG9mIHRyYW5zZm9ybSwgc2hvdWxkIGJlIGltcGxlbWVudGVkIHRvIGhlcmVcbn1cbi8vIHRyYW5zZm9ybSBBU1RcbmZ1bmN0aW9uIHRyYW5zZm9ybShhc3QsIG9wdGlvbnMgPSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4pIHtcbiAgICBjb25zdCB0cmFuc2Zvcm1lciA9IGNyZWF0ZVRyYW5zZm9ybWVyKGFzdCk7XG4gICAgdHJhbnNmb3JtZXIuaGVscGVyKFwibm9ybWFsaXplXCIgLyogSGVscGVyTmFtZU1hcC5OT1JNQUxJWkUgKi8pO1xuICAgIC8vIHRyYXZlcnNlXG4gICAgYXN0LmJvZHkgJiYgdHJhdmVyc2VOb2RlKGFzdC5ib2R5LCB0cmFuc2Zvcm1lcik7XG4gICAgLy8gc2V0IG1ldGEgaW5mb3JtYXRpb25cbiAgICBjb25zdCBjb250ZXh0ID0gdHJhbnNmb3JtZXIuY29udGV4dCgpO1xuICAgIGFzdC5oZWxwZXJzID0gQXJyYXkuZnJvbShjb250ZXh0LmhlbHBlcnMpO1xufVxuXG5mdW5jdGlvbiBvcHRpbWl6ZShhc3QpIHtcbiAgICBjb25zdCBib2R5ID0gYXN0LmJvZHk7XG4gICAgaWYgKGJvZHkudHlwZSA9PT0gMiAvKiBOb2RlVHlwZXMuTWVzc2FnZSAqLykge1xuICAgICAgICBvcHRpbWl6ZU1lc3NhZ2VOb2RlKGJvZHkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYm9keS5jYXNlcy5mb3JFYWNoKGMgPT4gb3B0aW1pemVNZXNzYWdlTm9kZShjKSk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG59XG5mdW5jdGlvbiBvcHRpbWl6ZU1lc3NhZ2VOb2RlKG1lc3NhZ2UpIHtcbiAgICBpZiAobWVzc2FnZS5pdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG1lc3NhZ2UuaXRlbXNbMF07XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDMgLyogTm9kZVR5cGVzLlRleHQgKi8gfHwgaXRlbS50eXBlID09PSA5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovKSB7XG4gICAgICAgICAgICBtZXNzYWdlLnN0YXRpYyA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICBkZWxldGUgaXRlbS52YWx1ZTsgLy8gb3B0aW1pemF0aW9uIGZvciBzaXplXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc3NhZ2UuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBtZXNzYWdlLml0ZW1zW2ldO1xuICAgICAgICAgICAgaWYgKCEoaXRlbS50eXBlID09PSAzIC8qIE5vZGVUeXBlcy5UZXh0ICovIHx8IGl0ZW0udHlwZSA9PT0gOSAvKiBOb2RlVHlwZXMuTGl0ZXJhbCAqLykpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpdGVtLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSBtZXNzYWdlLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgbWVzc2FnZS5zdGF0aWMgPSBqb2luKHZhbHVlcyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc3NhZ2UuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gbWVzc2FnZS5pdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAzIC8qIE5vZGVUeXBlcy5UZXh0ICovIHx8IGl0ZW0udHlwZSA9PT0gOSAvKiBOb2RlVHlwZXMuTGl0ZXJhbCAqLykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS52YWx1ZTsgLy8gb3B0aW1pemF0aW9uIGZvciBzaXplXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBFUlJPUl9ET01BSU4kMSA9ICdtaW5pZmllcic7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5mdW5jdGlvbiBtaW5pZnkobm9kZSkge1xuICAgIG5vZGUudCA9IG5vZGUudHlwZTtcbiAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICBjYXNlIDAgLyogTm9kZVR5cGVzLlJlc291cmNlICovOiB7XG4gICAgICAgICAgICBjb25zdCByZXNvdXJjZSA9IG5vZGU7XG4gICAgICAgICAgICBtaW5pZnkocmVzb3VyY2UuYm9keSk7XG4gICAgICAgICAgICByZXNvdXJjZS5iID0gcmVzb3VyY2UuYm9keTtcbiAgICAgICAgICAgIGRlbGV0ZSByZXNvdXJjZS5ib2R5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IHBsdXJhbCA9IG5vZGU7XG4gICAgICAgICAgICBjb25zdCBjYXNlcyA9IHBsdXJhbC5jYXNlcztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtaW5pZnkoY2FzZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGx1cmFsLmMgPSBjYXNlcztcbiAgICAgICAgICAgIGRlbGV0ZSBwbHVyYWwuY2FzZXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDIgLyogTm9kZVR5cGVzLk1lc3NhZ2UgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBub2RlO1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBtZXNzYWdlLml0ZW1zO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG1pbmlmeShpdGVtc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXNzYWdlLmkgPSBpdGVtcztcbiAgICAgICAgICAgIGRlbGV0ZSBtZXNzYWdlLml0ZW1zO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc3RhdGljKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5zID0gbWVzc2FnZS5zdGF0aWM7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1lc3NhZ2Uuc3RhdGljO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAzIC8qIE5vZGVUeXBlcy5UZXh0ICovOlxuICAgICAgICBjYXNlIDkgLyogTm9kZVR5cGVzLkxpdGVyYWwgKi86XG4gICAgICAgIGNhc2UgOCAvKiBOb2RlVHlwZXMuTGlua2VkTW9kaWZpZXIgKi86XG4gICAgICAgIGNhc2UgNyAvKiBOb2RlVHlwZXMuTGlua2VkS2V5ICovOiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZU5vZGUgPSBub2RlO1xuICAgICAgICAgICAgaWYgKHZhbHVlTm9kZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlTm9kZS52ID0gdmFsdWVOb2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZU5vZGUudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDYgLyogTm9kZVR5cGVzLkxpbmtlZCAqLzoge1xuICAgICAgICAgICAgY29uc3QgbGlua2VkID0gbm9kZTtcbiAgICAgICAgICAgIG1pbmlmeShsaW5rZWQua2V5KTtcbiAgICAgICAgICAgIGxpbmtlZC5rID0gbGlua2VkLmtleTtcbiAgICAgICAgICAgIGRlbGV0ZSBsaW5rZWQua2V5O1xuICAgICAgICAgICAgaWYgKGxpbmtlZC5tb2RpZmllcikge1xuICAgICAgICAgICAgICAgIG1pbmlmeShsaW5rZWQubW9kaWZpZXIpO1xuICAgICAgICAgICAgICAgIGxpbmtlZC5tID0gbGlua2VkLm1vZGlmaWVyO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBsaW5rZWQubW9kaWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDUgLyogTm9kZVR5cGVzLkxpc3QgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBub2RlO1xuICAgICAgICAgICAgbGlzdC5pID0gbGlzdC5pbmRleDtcbiAgICAgICAgICAgIGRlbGV0ZSBsaXN0LmluZGV4O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA0IC8qIE5vZGVUeXBlcy5OYW1lZCAqLzoge1xuICAgICAgICAgICAgY29uc3QgbmFtZWQgPSBub2RlO1xuICAgICAgICAgICAgbmFtZWQuayA9IG5hbWVkLmtleTtcbiAgICAgICAgICAgIGRlbGV0ZSBuYW1lZC5rZXk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvbXBpbGVFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTkhBTkRMRURfTUlOSUZJRVJfTk9ERV9UWVBFLCBudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogRVJST1JfRE9NQUlOJDEsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtub2RlLnR5cGVdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBub2RlLnR5cGU7XG59XG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC90cmlwbGUtc2xhc2gtcmVmZXJlbmNlXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInNvdXJjZS1tYXAtanNcIiAvPlxuY29uc3QgRVJST1JfRE9NQUlOID0gJ3BhcnNlcic7XG5mdW5jdGlvbiBjcmVhdGVDb2RlR2VuZXJhdG9yKGFzdCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgc291cmNlTWFwLCBmaWxlbmFtZSwgYnJlYWtMaW5lQ29kZSwgbmVlZEluZGVudDogX25lZWRJbmRlbnQgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgbG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uICE9PSBmYWxzZTtcbiAgICBjb25zdCBfY29udGV4dCA9IHtcbiAgICAgICAgZmlsZW5hbWUsXG4gICAgICAgIGNvZGU6ICcnLFxuICAgICAgICBjb2x1bW46IDEsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbWFwOiB1bmRlZmluZWQsXG4gICAgICAgIGJyZWFrTGluZUNvZGUsXG4gICAgICAgIG5lZWRJbmRlbnQ6IF9uZWVkSW5kZW50LFxuICAgICAgICBpbmRlbnRMZXZlbDogMFxuICAgIH07XG4gICAgaWYgKGxvY2F0aW9uICYmIGFzdC5sb2MpIHtcbiAgICAgICAgX2NvbnRleHQuc291cmNlID0gYXN0LmxvYy5zb3VyY2U7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRleHQgPSAoKSA9PiBfY29udGV4dDtcbiAgICBmdW5jdGlvbiBwdXNoKGNvZGUsIG5vZGUpIHtcbiAgICAgICAgX2NvbnRleHQuY29kZSArPSBjb2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfbmV3bGluZShuLCB3aXRoQnJlYWtMaW5lID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBfYnJlYWtMaW5lQ29kZSA9IHdpdGhCcmVha0xpbmUgPyBicmVha0xpbmVDb2RlIDogJyc7XG4gICAgICAgIHB1c2goX25lZWRJbmRlbnQgPyBfYnJlYWtMaW5lQ29kZSArIGAgIGAucmVwZWF0KG4pIDogX2JyZWFrTGluZUNvZGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmRlbnQod2l0aE5ld0xpbmUgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGxldmVsID0gKytfY29udGV4dC5pbmRlbnRMZXZlbDtcbiAgICAgICAgd2l0aE5ld0xpbmUgJiYgX25ld2xpbmUobGV2ZWwpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWluZGVudCh3aXRoTmV3TGluZSA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgbGV2ZWwgPSAtLV9jb250ZXh0LmluZGVudExldmVsO1xuICAgICAgICB3aXRoTmV3TGluZSAmJiBfbmV3bGluZShsZXZlbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5ld2xpbmUoKSB7XG4gICAgICAgIF9uZXdsaW5lKF9jb250ZXh0LmluZGVudExldmVsKTtcbiAgICB9XG4gICAgY29uc3QgaGVscGVyID0gKGtleSkgPT4gYF8ke2tleX1gO1xuICAgIGNvbnN0IG5lZWRJbmRlbnQgPSAoKSA9PiBfY29udGV4dC5uZWVkSW5kZW50O1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHB1c2gsXG4gICAgICAgIGluZGVudCxcbiAgICAgICAgZGVpbmRlbnQsXG4gICAgICAgIG5ld2xpbmUsXG4gICAgICAgIGhlbHBlcixcbiAgICAgICAgbmVlZEluZGVudFxuICAgIH07XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUxpbmtlZE5vZGUoZ2VuZXJhdG9yLCBub2RlKSB7XG4gICAgY29uc3QgeyBoZWxwZXIgfSA9IGdlbmVyYXRvcjtcbiAgICBnZW5lcmF0b3IucHVzaChgJHtoZWxwZXIoXCJsaW5rZWRcIiAvKiBIZWxwZXJOYW1lTWFwLkxJTktFRCAqLyl9KGApO1xuICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUua2V5KTtcbiAgICBpZiAobm9kZS5tb2RpZmllcikge1xuICAgICAgICBnZW5lcmF0b3IucHVzaChgLCBgKTtcbiAgICAgICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5tb2RpZmllcik7XG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAsIF90eXBlYCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW5lcmF0b3IucHVzaChgLCB1bmRlZmluZWQsIF90eXBlYCk7XG4gICAgfVxuICAgIGdlbmVyYXRvci5wdXNoKGApYCk7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZU1lc3NhZ2VOb2RlKGdlbmVyYXRvciwgbm9kZSkge1xuICAgIGNvbnN0IHsgaGVscGVyLCBuZWVkSW5kZW50IH0gPSBnZW5lcmF0b3I7XG4gICAgZ2VuZXJhdG9yLnB1c2goYCR7aGVscGVyKFwibm9ybWFsaXplXCIgLyogSGVscGVyTmFtZU1hcC5OT1JNQUxJWkUgKi8pfShbYCk7XG4gICAgZ2VuZXJhdG9yLmluZGVudChuZWVkSW5kZW50KCkpO1xuICAgIGNvbnN0IGxlbmd0aCA9IG5vZGUuaXRlbXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5pdGVtc1tpXSk7XG4gICAgICAgIGlmIChpID09PSBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0b3IucHVzaCgnLCAnKTtcbiAgICB9XG4gICAgZ2VuZXJhdG9yLmRlaW5kZW50KG5lZWRJbmRlbnQoKSk7XG4gICAgZ2VuZXJhdG9yLnB1c2goJ10pJyk7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBsdXJhbE5vZGUoZ2VuZXJhdG9yLCBub2RlKSB7XG4gICAgY29uc3QgeyBoZWxwZXIsIG5lZWRJbmRlbnQgfSA9IGdlbmVyYXRvcjtcbiAgICBpZiAobm9kZS5jYXNlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcInBsdXJhbFwiIC8qIEhlbHBlck5hbWVNYXAuUExVUkFMICovKX0oW2ApO1xuICAgICAgICBnZW5lcmF0b3IuaW5kZW50KG5lZWRJbmRlbnQoKSk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IG5vZGUuY2FzZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZU5vZGUoZ2VuZXJhdG9yLCBub2RlLmNhc2VzW2ldKTtcbiAgICAgICAgICAgIGlmIChpID09PSBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaCgnLCAnKTtcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0b3IuZGVpbmRlbnQobmVlZEluZGVudCgpKTtcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYF0pYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVSZXNvdXJjZShnZW5lcmF0b3IsIG5vZGUpIHtcbiAgICBpZiAobm9kZS5ib2R5KSB7XG4gICAgICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUuYm9keSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW5lcmF0b3IucHVzaCgnbnVsbCcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUpIHtcbiAgICBjb25zdCB7IGhlbHBlciB9ID0gZ2VuZXJhdG9yO1xuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgMCAvKiBOb2RlVHlwZXMuUmVzb3VyY2UgKi86XG4gICAgICAgICAgICBnZW5lcmF0ZVJlc291cmNlKGdlbmVyYXRvciwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi86XG4gICAgICAgICAgICBnZW5lcmF0ZVBsdXJhbE5vZGUoZ2VuZXJhdG9yLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDIgLyogTm9kZVR5cGVzLk1lc3NhZ2UgKi86XG4gICAgICAgICAgICBnZW5lcmF0ZU1lc3NhZ2VOb2RlKGdlbmVyYXRvciwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2IC8qIE5vZGVUeXBlcy5MaW5rZWQgKi86XG4gICAgICAgICAgICBnZW5lcmF0ZUxpbmtlZE5vZGUoZ2VuZXJhdG9yLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDggLyogTm9kZVR5cGVzLkxpbmtlZE1vZGlmaWVyICovOlxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNyAvKiBOb2RlVHlwZXMuTGlua2VkS2V5ICovOlxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNSAvKiBOb2RlVHlwZXMuTGlzdCAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcImludGVycG9sYXRlXCIgLyogSGVscGVyTmFtZU1hcC5JTlRFUlBPTEFURSAqLyl9KCR7aGVscGVyKFwibGlzdFwiIC8qIEhlbHBlck5hbWVNYXAuTElTVCAqLyl9KCR7bm9kZS5pbmRleH0pKWAsIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNCAvKiBOb2RlVHlwZXMuTmFtZWQgKi86XG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChgJHtoZWxwZXIoXCJpbnRlcnBvbGF0ZVwiIC8qIEhlbHBlck5hbWVNYXAuSU5URVJQT0xBVEUgKi8pfSgke2hlbHBlcihcIm5hbWVkXCIgLyogSGVscGVyTmFtZU1hcC5OQU1FRCAqLyl9KCR7SlNPTi5zdHJpbmdpZnkobm9kZS5rZXkpfSkpYCwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovOlxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMyAvKiBOb2RlVHlwZXMuVGV4dCAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKEpTT04uc3RyaW5naWZ5KG5vZGUudmFsdWUpLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvbXBpbGVFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTkhBTkRMRURfQ09ERUdFTl9OT0RFX1RZUEUsIG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4sXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtub2RlLnR5cGVdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgfVxufVxuLy8gZ2VuZXJhdGUgY29kZSBmcm9tIEFTVFxuY29uc3QgZ2VuZXJhdGUgPSAoYXN0LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuKSA9PiB7XG4gICAgY29uc3QgbW9kZSA9IGlzU3RyaW5nKG9wdGlvbnMubW9kZSkgPyBvcHRpb25zLm1vZGUgOiAnbm9ybWFsJztcbiAgICBjb25zdCBmaWxlbmFtZSA9IGlzU3RyaW5nKG9wdGlvbnMuZmlsZW5hbWUpXG4gICAgICAgID8gb3B0aW9ucy5maWxlbmFtZVxuICAgICAgICA6ICdtZXNzYWdlLmludGwnO1xuICAgIGNvbnN0IHNvdXJjZU1hcCA9ICEhb3B0aW9ucy5zb3VyY2VNYXA7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgYnJlYWtMaW5lQ29kZSA9IG9wdGlvbnMuYnJlYWtMaW5lQ29kZSAhPSBudWxsXG4gICAgICAgID8gb3B0aW9ucy5icmVha0xpbmVDb2RlXG4gICAgICAgIDogbW9kZSA9PT0gJ2Fycm93J1xuICAgICAgICAgICAgPyAnOydcbiAgICAgICAgICAgIDogJ1xcbic7XG4gICAgY29uc3QgbmVlZEluZGVudCA9IG9wdGlvbnMubmVlZEluZGVudCA/IG9wdGlvbnMubmVlZEluZGVudCA6IG1vZGUgIT09ICdhcnJvdyc7XG4gICAgY29uc3QgaGVscGVycyA9IGFzdC5oZWxwZXJzIHx8IFtdO1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IGNyZWF0ZUNvZGVHZW5lcmF0b3IoYXN0LCB7XG4gICAgICAgIG1vZGUsXG4gICAgICAgIGZpbGVuYW1lLFxuICAgICAgICBzb3VyY2VNYXAsXG4gICAgICAgIGJyZWFrTGluZUNvZGUsXG4gICAgICAgIG5lZWRJbmRlbnRcbiAgICB9KTtcbiAgICBnZW5lcmF0b3IucHVzaChtb2RlID09PSAnbm9ybWFsJyA/IGBmdW5jdGlvbiBfX21zZ19fIChjdHgpIHtgIDogYChjdHgpID0+IHtgKTtcbiAgICBnZW5lcmF0b3IuaW5kZW50KG5lZWRJbmRlbnQpO1xuICAgIGlmIChoZWxwZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYGNvbnN0IHsgJHtqb2luKGhlbHBlcnMubWFwKHMgPT4gYCR7c306IF8ke3N9YCksICcsICcpfSB9ID0gY3R4YCk7XG4gICAgICAgIGdlbmVyYXRvci5uZXdsaW5lKCk7XG4gICAgfVxuICAgIGdlbmVyYXRvci5wdXNoKGByZXR1cm4gYCk7XG4gICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgYXN0KTtcbiAgICBnZW5lcmF0b3IuZGVpbmRlbnQobmVlZEluZGVudCk7XG4gICAgZ2VuZXJhdG9yLnB1c2goYH1gKTtcbiAgICBkZWxldGUgYXN0LmhlbHBlcnM7XG4gICAgY29uc3QgeyBjb2RlLCBtYXAgfSA9IGdlbmVyYXRvci5jb250ZXh0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXN0LFxuICAgICAgICBjb2RlLFxuICAgICAgICBtYXA6IG1hcCA/IG1hcC50b0pTT04oKSA6IHVuZGVmaW5lZCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gYmFzZUNvbXBpbGUoc291cmNlLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBhc3NpZ25lZE9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgIGNvbnN0IGppdCA9ICEhYXNzaWduZWRPcHRpb25zLmppdDtcbiAgICBjb25zdCBlbmFsYmVNaW5pZnkgPSAhIWFzc2lnbmVkT3B0aW9ucy5taW5pZnk7XG4gICAgY29uc3QgZW5hbWJlT3B0aW1pemUgPSBhc3NpZ25lZE9wdGlvbnMub3B0aW1pemUgPT0gbnVsbCA/IHRydWUgOiBhc3NpZ25lZE9wdGlvbnMub3B0aW1pemU7XG4gICAgLy8gcGFyc2Ugc291cmNlIGNvZGVzXG4gICAgY29uc3QgcGFyc2VyID0gY3JlYXRlUGFyc2VyKGFzc2lnbmVkT3B0aW9ucyk7XG4gICAgY29uc3QgYXN0ID0gcGFyc2VyLnBhcnNlKHNvdXJjZSk7XG4gICAgaWYgKCFqaXQpIHtcbiAgICAgICAgLy8gdHJhbnNmb3JtIEFTVHNcbiAgICAgICAgdHJhbnNmb3JtKGFzdCwgYXNzaWduZWRPcHRpb25zKTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgamF2YXNjcmlwdCBjb2Rlc1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGUoYXN0LCBhc3NpZ25lZE9wdGlvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gb3B0aW1pemUgQVNUc1xuICAgICAgICBlbmFtYmVPcHRpbWl6ZSAmJiBvcHRpbWl6ZShhc3QpO1xuICAgICAgICAvLyBtaW5pbWl6ZSBBU1RzXG4gICAgICAgIGVuYWxiZU1pbmlmeSAmJiBtaW5pZnkoYXN0KTtcbiAgICAgICAgLy8gSW4gSklUIG1vZGUsIG5vIGFzdCB0cmFuc2Zvcm0sIG5vIGNvZGUgZ2VuZXJhdGlvbi5cbiAgICAgICAgcmV0dXJuIHsgYXN0LCBjb2RlOiAnJyB9O1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQ29tcGlsZUVycm9yQ29kZXMsIENvbXBpbGVXYXJuQ29kZXMsIEVSUk9SX0RPTUFJTiQyIGFzIEVSUk9SX0RPTUFJTiwgTE9DQVRJT05fU1RVQiwgYmFzZUNvbXBpbGUsIGNyZWF0ZUNvbXBpbGVFcnJvciwgY3JlYXRlQ29tcGlsZVdhcm4sIGNyZWF0ZUxvY2F0aW9uLCBjcmVhdGVQYXJzZXIsIGNyZWF0ZVBvc2l0aW9uLCBkZWZhdWx0T25FcnJvciwgZGV0ZWN0SHRtbFRhZywgZXJyb3JNZXNzYWdlcywgd2Fybk1lc3NhZ2VzIH07XG4iLCIvKiFcbiAgKiBjb3JlLWJhc2UgdjkuMTIuMVxuICAqIChjKSAyMDI0IGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5pbXBvcnQgeyBnZXRHbG9iYWxUaGlzLCBpc09iamVjdCwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc1BsYWluT2JqZWN0LCBhc3NpZ24sIGpvaW4sIHRvRGlzcGxheVN0cmluZywgaXNBcnJheSwgaW5jcmVtZW50ZXIsIGZvcm1hdCBhcyBmb3JtYXQkMSwgaXNQcm9taXNlLCBpc0Jvb2xlYW4sIHdhcm4sIGlzUmVnRXhwLCB3YXJuT25jZSwgZXNjYXBlSHRtbCwgaW5Ccm93c2VyLCBtYXJrLCBtZWFzdXJlLCBpc0VtcHR5T2JqZWN0LCBnZW5lcmF0ZUNvZGVGcmFtZSwgZ2VuZXJhdGVGb3JtYXRDYWNoZUtleSwgaXNEYXRlIH0gZnJvbSAnQGludGxpZnkvc2hhcmVkJztcbmltcG9ydCB7IENvbXBpbGVXYXJuQ29kZXMsIENvbXBpbGVFcnJvckNvZGVzLCBjcmVhdGVDb21waWxlRXJyb3IsIGRldGVjdEh0bWxUYWcsIGRlZmF1bHRPbkVycm9yLCBiYXNlQ29tcGlsZSBhcyBiYXNlQ29tcGlsZSQxIH0gZnJvbSAnQGludGxpZnkvbWVzc2FnZS1jb21waWxlcic7XG5leHBvcnQgeyBDb21waWxlRXJyb3JDb2RlcywgY3JlYXRlQ29tcGlsZUVycm9yIH0gZnJvbSAnQGludGxpZnkvbWVzc2FnZS1jb21waWxlcic7XG5cbi8qKlxuICogVGhpcyBpcyBvbmx5IGNhbGxlZCBpbiBlc20tYnVuZGxlciBidWlsZHMuXG4gKiBpc3RhbmJ1bC1pZ25vcmUtbmV4dFxuICovXG5mdW5jdGlvbiBpbml0RmVhdHVyZUZsYWdzKCkge1xuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGdldEdsb2JhbFRoaXMoKS5fX0lOVExJRllfUFJPRF9ERVZUT09MU19fID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX0pJVF9DT01QSUxBVElPTl9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9KSVRfQ09NUElMQVRJT05fXyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fSU5UTElGWV9EUk9QX01FU1NBR0VfQ09NUElMRVJfXyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGdldEdsb2JhbFRoaXMoKS5fX0lOVExJRllfRFJPUF9NRVNTQUdFX0NPTVBJTEVSX18gPSBmYWxzZTtcbiAgICB9XG59XG5cbmNvbnN0IHBhdGhTdGF0ZU1hY2hpbmUgPSAgW107XG5wYXRoU3RhdGVNYWNoaW5lWzAgLyogU3RhdGVzLkJFRk9SRV9QQVRIICovXSA9IHtcbiAgICBbXCJ3XCIgLyogUGF0aENoYXJUeXBlcy5XT1JLU1BBQ0UgKi9dOiBbMCAvKiBTdGF0ZXMuQkVGT1JFX1BBVEggKi9dLFxuICAgIFtcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJbXCIgLyogUGF0aENoYXJUeXBlcy5MRUZUX0JSQUNLRVQgKi9dOiBbNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi9dLFxuICAgIFtcIm9cIiAvKiBQYXRoQ2hhclR5cGVzLkVORF9PRl9GQUlMICovXTogWzcgLyogU3RhdGVzLkFGVEVSX1BBVEggKi9dXG59O1xucGF0aFN0YXRlTWFjaGluZVsxIC8qIFN0YXRlcy5JTl9QQVRIICovXSA9IHtcbiAgICBbXCJ3XCIgLyogUGF0aENoYXJUeXBlcy5XT1JLU1BBQ0UgKi9dOiBbMSAvKiBTdGF0ZXMuSU5fUEFUSCAqL10sXG4gICAgW1wiLlwiIC8qIFBhdGhDaGFyVHlwZXMuRE9UICovXTogWzIgLyogU3RhdGVzLkJFRk9SRV9JREVOVCAqL10sXG4gICAgW1wiW1wiIC8qIFBhdGhDaGFyVHlwZXMuTEVGVF9CUkFDS0VUICovXTogWzQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovXSxcbiAgICBbXCJvXCIgLyogUGF0aENoYXJUeXBlcy5FTkRfT0ZfRkFJTCAqL106IFs3IC8qIFN0YXRlcy5BRlRFUl9QQVRIICovXVxufTtcbnBhdGhTdGF0ZU1hY2hpbmVbMiAvKiBTdGF0ZXMuQkVGT1JFX0lERU5UICovXSA9IHtcbiAgICBbXCJ3XCIgLyogUGF0aENoYXJUeXBlcy5XT1JLU1BBQ0UgKi9dOiBbMiAvKiBTdGF0ZXMuQkVGT1JFX0lERU5UICovXSxcbiAgICBbXCJpXCIgLyogUGF0aENoYXJUeXBlcy5JREVOVCAqL106IFszIC8qIFN0YXRlcy5JTl9JREVOVCAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL10sXG4gICAgW1wiMFwiIC8qIFBhdGhDaGFyVHlwZXMuWkVSTyAqL106IFszIC8qIFN0YXRlcy5JTl9JREVOVCAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL11cbn07XG5wYXRoU3RhdGVNYWNoaW5lWzMgLyogU3RhdGVzLklOX0lERU5UICovXSA9IHtcbiAgICBbXCJpXCIgLyogUGF0aENoYXJUeXBlcy5JREVOVCAqL106IFszIC8qIFN0YXRlcy5JTl9JREVOVCAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL10sXG4gICAgW1wiMFwiIC8qIFBhdGhDaGFyVHlwZXMuWkVSTyAqL106IFszIC8qIFN0YXRlcy5JTl9JREVOVCAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL10sXG4gICAgW1wid1wiIC8qIFBhdGhDaGFyVHlwZXMuV09SS1NQQUNFICovXTogWzEgLyogU3RhdGVzLklOX1BBVEggKi8sIDEgLyogQWN0aW9ucy5QVVNIICovXSxcbiAgICBbXCIuXCIgLyogUGF0aENoYXJUeXBlcy5ET1QgKi9dOiBbMiAvKiBTdGF0ZXMuQkVGT1JFX0lERU5UICovLCAxIC8qIEFjdGlvbnMuUFVTSCAqL10sXG4gICAgW1wiW1wiIC8qIFBhdGhDaGFyVHlwZXMuTEVGVF9CUkFDS0VUICovXTogWzQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovLCAxIC8qIEFjdGlvbnMuUFVTSCAqL10sXG4gICAgW1wib1wiIC8qIFBhdGhDaGFyVHlwZXMuRU5EX09GX0ZBSUwgKi9dOiBbNyAvKiBTdGF0ZXMuQUZURVJfUEFUSCAqLywgMSAvKiBBY3Rpb25zLlBVU0ggKi9dXG59O1xucGF0aFN0YXRlTWFjaGluZVs0IC8qIFN0YXRlcy5JTl9TVUJfUEFUSCAqL10gPSB7XG4gICAgW1wiJ1wiIC8qIFBhdGhDaGFyVHlwZXMuU0lOR0xFX1FVT1RFICovXTogWzUgLyogU3RhdGVzLklOX1NJTkdMRV9RVU9URSAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL10sXG4gICAgW1wiXFxcIlwiIC8qIFBhdGhDaGFyVHlwZXMuRE9VQkxFX1FVT1RFICovXTogWzYgLyogU3RhdGVzLklOX0RPVUJMRV9RVU9URSAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL10sXG4gICAgW1wiW1wiIC8qIFBhdGhDaGFyVHlwZXMuTEVGVF9CUkFDS0VUICovXTogW1xuICAgICAgICA0IC8qIFN0YXRlcy5JTl9TVUJfUEFUSCAqLyxcbiAgICAgICAgMiAvKiBBY3Rpb25zLklOQ19TVUJfUEFUSF9ERVBUSCAqL1xuICAgIF0sXG4gICAgW1wiXVwiIC8qIFBhdGhDaGFyVHlwZXMuUklHSFRfQlJBQ0tFVCAqL106IFsxIC8qIFN0YXRlcy5JTl9QQVRIICovLCAzIC8qIEFjdGlvbnMuUFVTSF9TVUJfUEFUSCAqL10sXG4gICAgW1wib1wiIC8qIFBhdGhDaGFyVHlwZXMuRU5EX09GX0ZBSUwgKi9dOiA4IC8qIFN0YXRlcy5FUlJPUiAqLyxcbiAgICBbXCJsXCIgLyogUGF0aENoYXJUeXBlcy5FTFNFICovXTogWzQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXVxufTtcbnBhdGhTdGF0ZU1hY2hpbmVbNSAvKiBTdGF0ZXMuSU5fU0lOR0xFX1FVT1RFICovXSA9IHtcbiAgICBbXCInXCIgLyogUGF0aENoYXJUeXBlcy5TSU5HTEVfUVVPVEUgKi9dOiBbNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi8sIDAgLyogQWN0aW9ucy5BUFBFTkQgKi9dLFxuICAgIFtcIm9cIiAvKiBQYXRoQ2hhclR5cGVzLkVORF9PRl9GQUlMICovXTogOCAvKiBTdGF0ZXMuRVJST1IgKi8sXG4gICAgW1wibFwiIC8qIFBhdGhDaGFyVHlwZXMuRUxTRSAqL106IFs1IC8qIFN0YXRlcy5JTl9TSU5HTEVfUVVPVEUgKi8sIDAgLyogQWN0aW9ucy5BUFBFTkQgKi9dXG59O1xucGF0aFN0YXRlTWFjaGluZVs2IC8qIFN0YXRlcy5JTl9ET1VCTEVfUVVPVEUgKi9dID0ge1xuICAgIFtcIlxcXCJcIiAvKiBQYXRoQ2hhclR5cGVzLkRPVUJMRV9RVU9URSAqL106IFs0IC8qIFN0YXRlcy5JTl9TVUJfUEFUSCAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL10sXG4gICAgW1wib1wiIC8qIFBhdGhDaGFyVHlwZXMuRU5EX09GX0ZBSUwgKi9dOiA4IC8qIFN0YXRlcy5FUlJPUiAqLyxcbiAgICBbXCJsXCIgLyogUGF0aENoYXJUeXBlcy5FTFNFICovXTogWzYgLyogU3RhdGVzLklOX0RPVUJMRV9RVU9URSAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL11cbn07XG4vKipcbiAqIENoZWNrIGlmIGFuIGV4cHJlc3Npb24gaXMgYSBsaXRlcmFsIHZhbHVlLlxuICovXG5jb25zdCBsaXRlcmFsVmFsdWVSRSA9IC9eXFxzPyg/OnRydWV8ZmFsc2V8LT9bXFxkLl0rfCdbXiddKid8XCJbXlwiXSpcIilcXHM/JC87XG5mdW5jdGlvbiBpc0xpdGVyYWwoZXhwKSB7XG4gICAgcmV0dXJuIGxpdGVyYWxWYWx1ZVJFLnRlc3QoZXhwKTtcbn1cbi8qKlxuICogU3RyaXAgcXVvdGVzIGZyb20gYSBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gc3RyaXBRdW90ZXMoc3RyKSB7XG4gICAgY29uc3QgYSA9IHN0ci5jaGFyQ29kZUF0KDApO1xuICAgIGNvbnN0IGIgPSBzdHIuY2hhckNvZGVBdChzdHIubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIGEgPT09IGIgJiYgKGEgPT09IDB4MjIgfHwgYSA9PT0gMHgyNykgPyBzdHIuc2xpY2UoMSwgLTEpIDogc3RyO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgdGhlIHR5cGUgb2YgYSBjaGFyYWN0ZXIgaW4gYSBrZXlwYXRoLlxuICovXG5mdW5jdGlvbiBnZXRQYXRoQ2hhclR5cGUoY2gpIHtcbiAgICBpZiAoY2ggPT09IHVuZGVmaW5lZCB8fCBjaCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJvXCIgLyogUGF0aENoYXJUeXBlcy5FTkRfT0ZfRkFJTCAqLztcbiAgICB9XG4gICAgY29uc3QgY29kZSA9IGNoLmNoYXJDb2RlQXQoMCk7XG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIGNhc2UgMHg1YjogLy8gW1xuICAgICAgICBjYXNlIDB4NWQ6IC8vIF1cbiAgICAgICAgY2FzZSAweDJlOiAvLyAuXG4gICAgICAgIGNhc2UgMHgyMjogLy8gXCJcbiAgICAgICAgY2FzZSAweDI3OiAvLyAnXG4gICAgICAgICAgICByZXR1cm4gY2g7XG4gICAgICAgIGNhc2UgMHg1ZjogLy8gX1xuICAgICAgICBjYXNlIDB4MjQ6IC8vICRcbiAgICAgICAgY2FzZSAweDJkOiAvLyAtXG4gICAgICAgICAgICByZXR1cm4gXCJpXCIgLyogUGF0aENoYXJUeXBlcy5JREVOVCAqLztcbiAgICAgICAgY2FzZSAweDA5OiAvLyBUYWIgKEhUKVxuICAgICAgICBjYXNlIDB4MGE6IC8vIE5ld2xpbmUgKExGKVxuICAgICAgICBjYXNlIDB4MGQ6IC8vIFJldHVybiAoQ1IpXG4gICAgICAgIGNhc2UgMHhhMDogLy8gTm8tYnJlYWsgc3BhY2UgKE5CU1ApXG4gICAgICAgIGNhc2UgMHhmZWZmOiAvLyBCeXRlIE9yZGVyIE1hcmsgKEJPTSlcbiAgICAgICAgY2FzZSAweDIwMjg6IC8vIExpbmUgU2VwYXJhdG9yIChMUylcbiAgICAgICAgY2FzZSAweDIwMjk6IC8vIFBhcmFncmFwaCBTZXBhcmF0b3IgKFBTKVxuICAgICAgICAgICAgcmV0dXJuIFwid1wiIC8qIFBhdGhDaGFyVHlwZXMuV09SS1NQQUNFICovO1xuICAgIH1cbiAgICByZXR1cm4gXCJpXCIgLyogUGF0aENoYXJUeXBlcy5JREVOVCAqLztcbn1cbi8qKlxuICogRm9ybWF0IGEgc3ViUGF0aCwgcmV0dXJuIGl0cyBwbGFpbiBmb3JtIGlmIGl0IGlzXG4gKiBhIGxpdGVyYWwgc3RyaW5nIG9yIG51bWJlci4gT3RoZXJ3aXNlIHByZXBlbmQgdGhlXG4gKiBkeW5hbWljIGluZGljYXRvciAoKikuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdFN1YlBhdGgocGF0aCkge1xuICAgIGNvbnN0IHRyaW1tZWQgPSBwYXRoLnRyaW0oKTtcbiAgICAvLyBpbnZhbGlkIGxlYWRpbmcgMFxuICAgIGlmIChwYXRoLmNoYXJBdCgwKSA9PT0gJzAnICYmIGlzTmFOKHBhcnNlSW50KHBhdGgpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc0xpdGVyYWwodHJpbW1lZClcbiAgICAgICAgPyBzdHJpcFF1b3Rlcyh0cmltbWVkKVxuICAgICAgICA6IFwiKlwiIC8qIFBhdGhDaGFyVHlwZXMuQVNUQVJJU0sgKi8gKyB0cmltbWVkO1xufVxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBwYXRoIGludG8gYW4gYXJyYXkgb2Ygc2VnbWVudHNcbiAqL1xuZnVuY3Rpb24gcGFyc2UocGF0aCkge1xuICAgIGNvbnN0IGtleXMgPSBbXTtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBsZXQgbW9kZSA9IDAgLyogU3RhdGVzLkJFRk9SRV9QQVRIICovO1xuICAgIGxldCBzdWJQYXRoRGVwdGggPSAwO1xuICAgIGxldCBjO1xuICAgIGxldCBrZXk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBsZXQgbmV3Q2hhcjtcbiAgICBsZXQgdHlwZTtcbiAgICBsZXQgdHJhbnNpdGlvbjtcbiAgICBsZXQgYWN0aW9uO1xuICAgIGxldCB0eXBlTWFwO1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcbiAgICBhY3Rpb25zWzAgLyogQWN0aW9ucy5BUFBFTkQgKi9dID0gKCkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGtleSA9IG5ld0NoYXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBrZXkgKz0gbmV3Q2hhcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYWN0aW9uc1sxIC8qIEFjdGlvbnMuUFVTSCAqL10gPSAoKSA9PiB7XG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGFjdGlvbnNbMiAvKiBBY3Rpb25zLklOQ19TVUJfUEFUSF9ERVBUSCAqL10gPSAoKSA9PiB7XG4gICAgICAgIGFjdGlvbnNbMCAvKiBBY3Rpb25zLkFQUEVORCAqL10oKTtcbiAgICAgICAgc3ViUGF0aERlcHRoKys7XG4gICAgfTtcbiAgICBhY3Rpb25zWzMgLyogQWN0aW9ucy5QVVNIX1NVQl9QQVRIICovXSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHN1YlBhdGhEZXB0aCA+IDApIHtcbiAgICAgICAgICAgIHN1YlBhdGhEZXB0aC0tO1xuICAgICAgICAgICAgbW9kZSA9IDQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovO1xuICAgICAgICAgICAgYWN0aW9uc1swIC8qIEFjdGlvbnMuQVBQRU5EICovXSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3ViUGF0aERlcHRoID0gMDtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleSA9IGZvcm1hdFN1YlBhdGgoa2V5KTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc1sxIC8qIEFjdGlvbnMuUFVTSCAqL10oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gbWF5YmVVbmVzY2FwZVF1b3RlKCkge1xuICAgICAgICBjb25zdCBuZXh0Q2hhciA9IHBhdGhbaW5kZXggKyAxXTtcbiAgICAgICAgaWYgKChtb2RlID09PSA1IC8qIFN0YXRlcy5JTl9TSU5HTEVfUVVPVEUgKi8gJiZcbiAgICAgICAgICAgIG5leHRDaGFyID09PSBcIidcIiAvKiBQYXRoQ2hhclR5cGVzLlNJTkdMRV9RVU9URSAqLykgfHxcbiAgICAgICAgICAgIChtb2RlID09PSA2IC8qIFN0YXRlcy5JTl9ET1VCTEVfUVVPVEUgKi8gJiZcbiAgICAgICAgICAgICAgICBuZXh0Q2hhciA9PT0gXCJcXFwiXCIgLyogUGF0aENoYXJUeXBlcy5ET1VCTEVfUVVPVEUgKi8pKSB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgbmV3Q2hhciA9ICdcXFxcJyArIG5leHRDaGFyO1xuICAgICAgICAgICAgYWN0aW9uc1swIC8qIEFjdGlvbnMuQVBQRU5EICovXSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG1vZGUgIT09IG51bGwpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgYyA9IHBhdGhbaW5kZXhdO1xuICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnICYmIG1heWJlVW5lc2NhcGVRdW90ZSgpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0eXBlID0gZ2V0UGF0aENoYXJUeXBlKGMpO1xuICAgICAgICB0eXBlTWFwID0gcGF0aFN0YXRlTWFjaGluZVttb2RlXTtcbiAgICAgICAgdHJhbnNpdGlvbiA9IHR5cGVNYXBbdHlwZV0gfHwgdHlwZU1hcFtcImxcIiAvKiBQYXRoQ2hhclR5cGVzLkVMU0UgKi9dIHx8IDggLyogU3RhdGVzLkVSUk9SICovO1xuICAgICAgICAvLyBjaGVjayBwYXJzZSBlcnJvclxuICAgICAgICBpZiAodHJhbnNpdGlvbiA9PT0gOCAvKiBTdGF0ZXMuRVJST1IgKi8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtb2RlID0gdHJhbnNpdGlvblswXTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25bMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWN0aW9uID0gYWN0aW9uc1t0cmFuc2l0aW9uWzFdXTtcbiAgICAgICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBuZXdDaGFyID0gYztcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgcGFyc2UgZmluaXNoXG4gICAgICAgIGlmIChtb2RlID09PSA3IC8qIFN0YXRlcy5BRlRFUl9QQVRIICovKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIHBhdGggdG9rZW4gY2FjaGVcbmNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xuLyoqXG4gKiBrZXktdmFsdWUgbWVzc2FnZSByZXNvbHZlclxuICpcbiAqIEByZW1hcmtzXG4gKiBSZXNvbHZlcyBtZXNzYWdlcyB3aXRoIHRoZSBrZXktdmFsdWUgc3RydWN0dXJlLiBOb3RlIHRoYXQgbWVzc2FnZXMgd2l0aCBhIGhpZXJhcmNoaWNhbCBzdHJ1Y3R1cmUgc3VjaCBhcyBvYmplY3RzIGNhbm5vdCBiZSByZXNvbHZlZFxuICpcbiAqIEBwYXJhbSBvYmogLSBBIHRhcmdldCBvYmplY3QgdG8gYmUgcmVzb2x2ZWQgd2l0aCBwYXRoXG4gKiBAcGFyYW0gcGF0aCAtIEEge0BsaW5rIFBhdGggfCBwYXRofSB0byByZXNvbHZlIHRoZSB2YWx1ZSBvZiBtZXNzYWdlXG4gKlxuICogQHJldHVybnMgQSByZXNvbHZlZCB7QGxpbmsgUGF0aFZhbHVlIHwgcGF0aCB2YWx1ZX1cbiAqXG4gKiBAVnVlSTE4bkdlbmVyYWxcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVdpdGhLZXlWYWx1ZShvYmosIHBhdGgpIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSA/IG9ialtwYXRoXSA6IG51bGw7XG59XG4vKipcbiAqIG1lc3NhZ2UgcmVzb2x2ZXJcbiAqXG4gKiBAcmVtYXJrc1xuICogUmVzb2x2ZXMgbWVzc2FnZXMuIG1lc3NhZ2VzIHdpdGggYSBoaWVyYXJjaGljYWwgc3RydWN0dXJlIHN1Y2ggYXMgb2JqZWN0cyBjYW4gYmUgcmVzb2x2ZWQuIFRoaXMgcmVzb2x2ZXIgaXMgdXNlZCBpbiBWdWVJMThuIGFzIGRlZmF1bHQuXG4gKlxuICogQHBhcmFtIG9iaiAtIEEgdGFyZ2V0IG9iamVjdCB0byBiZSByZXNvbHZlZCB3aXRoIHBhdGhcbiAqIEBwYXJhbSBwYXRoIC0gQSB7QGxpbmsgUGF0aCB8IHBhdGh9IHRvIHJlc29sdmUgdGhlIHZhbHVlIG9mIG1lc3NhZ2VcbiAqXG4gKiBAcmV0dXJucyBBIHJlc29sdmVkIHtAbGluayBQYXRoVmFsdWUgfCBwYXRoIHZhbHVlfVxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5mdW5jdGlvbiByZXNvbHZlVmFsdWUob2JqLCBwYXRoKSB7XG4gICAgLy8gY2hlY2sgb2JqZWN0XG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBwYXJzZSBwYXRoXG4gICAgbGV0IGhpdCA9IGNhY2hlLmdldChwYXRoKTtcbiAgICBpZiAoIWhpdCkge1xuICAgICAgICBoaXQgPSBwYXJzZShwYXRoKTtcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgICAgY2FjaGUuc2V0KHBhdGgsIGhpdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY2hlY2sgaGl0XG4gICAgaWYgKCFoaXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIHJlc29sdmUgcGF0aCB2YWx1ZVxuICAgIGNvbnN0IGxlbiA9IGhpdC5sZW5ndGg7XG4gICAgbGV0IGxhc3QgPSBvYmo7XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IGxhc3RbaGl0W2ldXTtcbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNGdW5jdGlvbihsYXN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdCA9IHZhbDtcbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gbGFzdDtcbn1cblxuY29uc3QgREVGQVVMVF9NT0RJRklFUiA9IChzdHIpID0+IHN0cjtcbmNvbnN0IERFRkFVTFRfTUVTU0FHRSA9IChjdHgpID0+ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5jb25zdCBERUZBVUxUX01FU1NBR0VfREFUQV9UWVBFID0gJ3RleHQnO1xuY29uc3QgREVGQVVMVF9OT1JNQUxJWkUgPSAodmFsdWVzKSA9PiB2YWx1ZXMubGVuZ3RoID09PSAwID8gJycgOiBqb2luKHZhbHVlcyk7XG5jb25zdCBERUZBVUxUX0lOVEVSUE9MQVRFID0gdG9EaXNwbGF5U3RyaW5nO1xuZnVuY3Rpb24gcGx1cmFsRGVmYXVsdChjaG9pY2UsIGNob2ljZXNMZW5ndGgpIHtcbiAgICBjaG9pY2UgPSBNYXRoLmFicyhjaG9pY2UpO1xuICAgIGlmIChjaG9pY2VzTGVuZ3RoID09PSAyKSB7XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICByZXR1cm4gY2hvaWNlXG4gICAgICAgICAgICA/IGNob2ljZSA+IDFcbiAgICAgICAgICAgICAgICA/IDFcbiAgICAgICAgICAgICAgICA6IDBcbiAgICAgICAgICAgIDogMTtcbiAgICB9XG4gICAgcmV0dXJuIGNob2ljZSA/IE1hdGgubWluKGNob2ljZSwgMikgOiAwO1xufVxuZnVuY3Rpb24gZ2V0UGx1cmFsSW5kZXgob3B0aW9ucykge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGluZGV4ID0gaXNOdW1iZXIob3B0aW9ucy5wbHVyYWxJbmRleClcbiAgICAgICAgPyBvcHRpb25zLnBsdXJhbEluZGV4XG4gICAgICAgIDogLTE7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgcmV0dXJuIG9wdGlvbnMubmFtZWQgJiYgKGlzTnVtYmVyKG9wdGlvbnMubmFtZWQuY291bnQpIHx8IGlzTnVtYmVyKG9wdGlvbnMubmFtZWQubikpXG4gICAgICAgID8gaXNOdW1iZXIob3B0aW9ucy5uYW1lZC5jb3VudClcbiAgICAgICAgICAgID8gb3B0aW9ucy5uYW1lZC5jb3VudFxuICAgICAgICAgICAgOiBpc051bWJlcihvcHRpb25zLm5hbWVkLm4pXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLm5hbWVkLm5cbiAgICAgICAgICAgICAgICA6IGluZGV4XG4gICAgICAgIDogaW5kZXg7XG59XG5mdW5jdGlvbiBub3JtYWxpemVOYW1lZChwbHVyYWxJbmRleCwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzLmNvdW50KSB7XG4gICAgICAgIHByb3BzLmNvdW50ID0gcGx1cmFsSW5kZXg7XG4gICAgfVxuICAgIGlmICghcHJvcHMubikge1xuICAgICAgICBwcm9wcy5uID0gcGx1cmFsSW5kZXg7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUNvbnRleHQob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgbG9jYWxlID0gb3B0aW9ucy5sb2NhbGU7XG4gICAgY29uc3QgcGx1cmFsSW5kZXggPSBnZXRQbHVyYWxJbmRleChvcHRpb25zKTtcbiAgICBjb25zdCBwbHVyYWxSdWxlID0gaXNPYmplY3Qob3B0aW9ucy5wbHVyYWxSdWxlcykgJiZcbiAgICAgICAgaXNTdHJpbmcobG9jYWxlKSAmJlxuICAgICAgICBpc0Z1bmN0aW9uKG9wdGlvbnMucGx1cmFsUnVsZXNbbG9jYWxlXSlcbiAgICAgICAgPyBvcHRpb25zLnBsdXJhbFJ1bGVzW2xvY2FsZV1cbiAgICAgICAgOiBwbHVyYWxEZWZhdWx0O1xuICAgIGNvbnN0IG9yZ1BsdXJhbFJ1bGUgPSBpc09iamVjdChvcHRpb25zLnBsdXJhbFJ1bGVzKSAmJlxuICAgICAgICBpc1N0cmluZyhsb2NhbGUpICYmXG4gICAgICAgIGlzRnVuY3Rpb24ob3B0aW9ucy5wbHVyYWxSdWxlc1tsb2NhbGVdKVxuICAgICAgICA/IHBsdXJhbERlZmF1bHRcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcGx1cmFsID0gKG1lc3NhZ2VzKSA9PiB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlc1twbHVyYWxSdWxlKHBsdXJhbEluZGV4LCBtZXNzYWdlcy5sZW5ndGgsIG9yZ1BsdXJhbFJ1bGUpXTtcbiAgICB9O1xuICAgIGNvbnN0IF9saXN0ID0gb3B0aW9ucy5saXN0IHx8IFtdO1xuICAgIGNvbnN0IGxpc3QgPSAoaW5kZXgpID0+IF9saXN0W2luZGV4XTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IF9uYW1lZCA9IG9wdGlvbnMubmFtZWQgfHwge307XG4gICAgaXNOdW1iZXIob3B0aW9ucy5wbHVyYWxJbmRleCkgJiYgbm9ybWFsaXplTmFtZWQocGx1cmFsSW5kZXgsIF9uYW1lZCk7XG4gICAgY29uc3QgbmFtZWQgPSAoa2V5KSA9PiBfbmFtZWRba2V5XTtcbiAgICBmdW5jdGlvbiBtZXNzYWdlKGtleSkge1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgY29uc3QgbXNnID0gaXNGdW5jdGlvbihvcHRpb25zLm1lc3NhZ2VzKVxuICAgICAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VzKGtleSlcbiAgICAgICAgICAgIDogaXNPYmplY3Qob3B0aW9ucy5tZXNzYWdlcylcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMubWVzc2FnZXNba2V5XVxuICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIHJldHVybiAhbXNnXG4gICAgICAgICAgICA/IG9wdGlvbnMucGFyZW50XG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLnBhcmVudC5tZXNzYWdlKGtleSkgLy8gcmVzb2x2ZSBmcm9tIHBhcmVudCBtZXNzYWdlc1xuICAgICAgICAgICAgICAgIDogREVGQVVMVF9NRVNTQUdFXG4gICAgICAgICAgICA6IG1zZztcbiAgICB9XG4gICAgY29uc3QgX21vZGlmaWVyID0gKG5hbWUpID0+IG9wdGlvbnMubW9kaWZpZXJzXG4gICAgICAgID8gb3B0aW9ucy5tb2RpZmllcnNbbmFtZV1cbiAgICAgICAgOiBERUZBVUxUX01PRElGSUVSO1xuICAgIGNvbnN0IG5vcm1hbGl6ZSA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5wcm9jZXNzb3IpICYmIGlzRnVuY3Rpb24ob3B0aW9ucy5wcm9jZXNzb3Iubm9ybWFsaXplKVxuICAgICAgICA/IG9wdGlvbnMucHJvY2Vzc29yLm5vcm1hbGl6ZVxuICAgICAgICA6IERFRkFVTFRfTk9STUFMSVpFO1xuICAgIGNvbnN0IGludGVycG9sYXRlID0gaXNQbGFpbk9iamVjdChvcHRpb25zLnByb2Nlc3NvcikgJiZcbiAgICAgICAgaXNGdW5jdGlvbihvcHRpb25zLnByb2Nlc3Nvci5pbnRlcnBvbGF0ZSlcbiAgICAgICAgPyBvcHRpb25zLnByb2Nlc3Nvci5pbnRlcnBvbGF0ZVxuICAgICAgICA6IERFRkFVTFRfSU5URVJQT0xBVEU7XG4gICAgY29uc3QgdHlwZSA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5wcm9jZXNzb3IpICYmIGlzU3RyaW5nKG9wdGlvbnMucHJvY2Vzc29yLnR5cGUpXG4gICAgICAgID8gb3B0aW9ucy5wcm9jZXNzb3IudHlwZVxuICAgICAgICA6IERFRkFVTFRfTUVTU0FHRV9EQVRBX1RZUEU7XG4gICAgY29uc3QgbGlua2VkID0gKGtleSwgLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBbYXJnMSwgYXJnMl0gPSBhcmdzO1xuICAgICAgICBsZXQgdHlwZSA9ICd0ZXh0JztcbiAgICAgICAgbGV0IG1vZGlmaWVyID0gJyc7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGFyZzEpKSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBhcmcxLm1vZGlmaWVyIHx8IG1vZGlmaWVyO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBhcmcxLnR5cGUgfHwgdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzU3RyaW5nKGFyZzEpKSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBhcmcxIHx8IG1vZGlmaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcoYXJnMSkpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9IGFyZzEgfHwgbW9kaWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcoYXJnMikpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gYXJnMiB8fCB0eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJldCA9IG1lc3NhZ2Uoa2V5KShjdHgpO1xuICAgICAgICBjb25zdCBtc2cgPSBcbiAgICAgICAgLy8gVGhlIG1lc3NhZ2UgaW4gdm5vZGUgcmVzb2x2ZWQgd2l0aCBsaW5rZWQgYXJlIHJldHVybmVkIGFzIGFuIGFycmF5IGJ5IHByb2Nlc3Nvci5ub21hbGl6ZVxuICAgICAgICB0eXBlID09PSAndm5vZGUnICYmIGlzQXJyYXkocmV0KSAmJiBtb2RpZmllclxuICAgICAgICAgICAgPyByZXRbMF1cbiAgICAgICAgICAgIDogcmV0O1xuICAgICAgICByZXR1cm4gbW9kaWZpZXIgPyBfbW9kaWZpZXIobW9kaWZpZXIpKG1zZywgdHlwZSkgOiBtc2c7XG4gICAgfTtcbiAgICBjb25zdCBjdHggPSB7XG4gICAgICAgIFtcImxpc3RcIiAvKiBIZWxwZXJOYW1lTWFwLkxJU1QgKi9dOiBsaXN0LFxuICAgICAgICBbXCJuYW1lZFwiIC8qIEhlbHBlck5hbWVNYXAuTkFNRUQgKi9dOiBuYW1lZCxcbiAgICAgICAgW1wicGx1cmFsXCIgLyogSGVscGVyTmFtZU1hcC5QTFVSQUwgKi9dOiBwbHVyYWwsXG4gICAgICAgIFtcImxpbmtlZFwiIC8qIEhlbHBlck5hbWVNYXAuTElOS0VEICovXTogbGlua2VkLFxuICAgICAgICBbXCJtZXNzYWdlXCIgLyogSGVscGVyTmFtZU1hcC5NRVNTQUdFICovXTogbWVzc2FnZSxcbiAgICAgICAgW1widHlwZVwiIC8qIEhlbHBlck5hbWVNYXAuVFlQRSAqL106IHR5cGUsXG4gICAgICAgIFtcImludGVycG9sYXRlXCIgLyogSGVscGVyTmFtZU1hcC5JTlRFUlBPTEFURSAqL106IGludGVycG9sYXRlLFxuICAgICAgICBbXCJub3JtYWxpemVcIiAvKiBIZWxwZXJOYW1lTWFwLk5PUk1BTElaRSAqL106IG5vcm1hbGl6ZSxcbiAgICAgICAgW1widmFsdWVzXCIgLyogSGVscGVyTmFtZU1hcC5WQUxVRVMgKi9dOiBhc3NpZ24oe30sIF9saXN0LCBfbmFtZWQpXG4gICAgfTtcbiAgICByZXR1cm4gY3R4O1xufVxuXG5sZXQgZGV2dG9vbHMgPSBudWxsO1xuZnVuY3Rpb24gc2V0RGV2VG9vbHNIb29rKGhvb2spIHtcbiAgICBkZXZ0b29scyA9IGhvb2s7XG59XG5mdW5jdGlvbiBnZXREZXZUb29sc0hvb2soKSB7XG4gICAgcmV0dXJuIGRldnRvb2xzO1xufVxuZnVuY3Rpb24gaW5pdEkxOG5EZXZUb29scyhpMThuLCB2ZXJzaW9uLCBtZXRhKSB7XG4gICAgLy8gVE9ETzogcXVldWUgaWYgZGV2dG9vbHMgaXMgdW5kZWZpbmVkXG4gICAgZGV2dG9vbHMgJiZcbiAgICAgICAgZGV2dG9vbHMuZW1pdChcImkxOG46aW5pdFwiIC8qIEludGxpZnlEZXZUb29sc0hvb2tzLkkxOG5Jbml0ICovLCB7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICBpMThuLFxuICAgICAgICAgICAgdmVyc2lvbixcbiAgICAgICAgICAgIG1ldGFcbiAgICAgICAgfSk7XG59XG5jb25zdCB0cmFuc2xhdGVEZXZUb29scyA9IC8qICNfX1BVUkVfXyovIGNyZWF0ZURldlRvb2xzSG9vayhcImZ1bmN0aW9uOnRyYW5zbGF0ZVwiIC8qIEludGxpZnlEZXZUb29sc0hvb2tzLkZ1bmN0aW9uVHJhbnNsYXRlICovKTtcbmZ1bmN0aW9uIGNyZWF0ZURldlRvb2xzSG9vayhob29rKSB7XG4gICAgcmV0dXJuIChwYXlsb2FkcykgPT4gZGV2dG9vbHMgJiYgZGV2dG9vbHMuZW1pdChob29rLCBwYXlsb2Fkcyk7XG59XG5cbmNvbnN0IGNvZGUkMSA9IENvbXBpbGVXYXJuQ29kZXMuX19FWFRFTkRfUE9JTlRfXztcbmNvbnN0IGluYyQxID0gaW5jcmVtZW50ZXIoY29kZSQxKTtcbmNvbnN0IENvcmVXYXJuQ29kZXMgPSB7XG4gICAgTk9UX0ZPVU5EX0tFWTogY29kZSQxLCAvLyAyXG4gICAgRkFMTEJBQ0tfVE9fVFJBTlNMQVRFOiBpbmMkMSgpLCAvLyAzXG4gICAgQ0FOTk9UX0ZPUk1BVF9OVU1CRVI6IGluYyQxKCksIC8vIDRcbiAgICBGQUxMQkFDS19UT19OVU1CRVJfRk9STUFUOiBpbmMkMSgpLCAvLyA1XG4gICAgQ0FOTk9UX0ZPUk1BVF9EQVRFOiBpbmMkMSgpLCAvLyA2XG4gICAgRkFMTEJBQ0tfVE9fREFURV9GT1JNQVQ6IGluYyQxKCksIC8vIDdcbiAgICBFWFBFUklNRU5UQUxfQ1VTVE9NX01FU1NBR0VfQ09NUElMRVI6IGluYyQxKCksIC8vIDhcbiAgICBfX0VYVEVORF9QT0lOVF9fOiBpbmMkMSgpIC8vIDlcbn07XG4vKiogQGludGVybmFsICovXG5jb25zdCB3YXJuTWVzc2FnZXMgPSB7XG4gICAgW0NvcmVXYXJuQ29kZXMuTk9UX0ZPVU5EX0tFWV06IGBOb3QgZm91bmQgJ3trZXl9JyBrZXkgaW4gJ3tsb2NhbGV9JyBsb2NhbGUgbWVzc2FnZXMuYCxcbiAgICBbQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19UUkFOU0xBVEVdOiBgRmFsbCBiYWNrIHRvIHRyYW5zbGF0ZSAne2tleX0nIGtleSB3aXRoICd7dGFyZ2V0fScgbG9jYWxlLmAsXG4gICAgW0NvcmVXYXJuQ29kZXMuQ0FOTk9UX0ZPUk1BVF9OVU1CRVJdOiBgQ2Fubm90IGZvcm1hdCBhIG51bWJlciB2YWx1ZSBkdWUgdG8gbm90IHN1cHBvcnRlZCBJbnRsLk51bWJlckZvcm1hdC5gLFxuICAgIFtDb3JlV2FybkNvZGVzLkZBTExCQUNLX1RPX05VTUJFUl9GT1JNQVRdOiBgRmFsbCBiYWNrIHRvIG51bWJlciBmb3JtYXQgJ3trZXl9JyBrZXkgd2l0aCAne3RhcmdldH0nIGxvY2FsZS5gLFxuICAgIFtDb3JlV2FybkNvZGVzLkNBTk5PVF9GT1JNQVRfREFURV06IGBDYW5ub3QgZm9ybWF0IGEgZGF0ZSB2YWx1ZSBkdWUgdG8gbm90IHN1cHBvcnRlZCBJbnRsLkRhdGVUaW1lRm9ybWF0LmAsXG4gICAgW0NvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fREFURV9GT1JNQVRdOiBgRmFsbCBiYWNrIHRvIGRhdGV0aW1lIGZvcm1hdCAne2tleX0nIGtleSB3aXRoICd7dGFyZ2V0fScgbG9jYWxlLmAsXG4gICAgW0NvcmVXYXJuQ29kZXMuRVhQRVJJTUVOVEFMX0NVU1RPTV9NRVNTQUdFX0NPTVBJTEVSXTogYFRoaXMgcHJvamVjdCBpcyB1c2luZyBDdXN0b20gTWVzc2FnZSBDb21waWxlciwgd2hpY2ggaXMgYW4gZXhwZXJpbWVudGFsIGZlYXR1cmUuIEl0IG1heSByZWNlaXZlIGJyZWFraW5nIGNoYW5nZXMgb3IgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLmBcbn07XG5mdW5jdGlvbiBnZXRXYXJuTWVzc2FnZShjb2RlLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGZvcm1hdCQxKHdhcm5NZXNzYWdlc1tjb2RlXSwgLi4uYXJncyk7XG59XG5cbmNvbnN0IGNvZGUgPSBDb21waWxlRXJyb3JDb2Rlcy5fX0VYVEVORF9QT0lOVF9fO1xuY29uc3QgaW5jID0gaW5jcmVtZW50ZXIoY29kZSk7XG5jb25zdCBDb3JlRXJyb3JDb2RlcyA9IHtcbiAgICBJTlZBTElEX0FSR1VNRU5UOiBjb2RlLCAvLyAxN1xuICAgIElOVkFMSURfREFURV9BUkdVTUVOVDogaW5jKCksIC8vIDE4XG4gICAgSU5WQUxJRF9JU09fREFURV9BUkdVTUVOVDogaW5jKCksIC8vIDE5XG4gICAgTk9UX1NVUFBPUlRfTk9OX1NUUklOR19NRVNTQUdFOiBpbmMoKSwgLy8gMjBcbiAgICBOT1RfU1VQUE9SVF9MT0NBTEVfUFJPTUlTRV9WQUxVRTogaW5jKCksIC8vIDIxXG4gICAgTk9UX1NVUFBPUlRfTE9DQUxFX0FTWU5DX0ZVTkNUSU9OOiBpbmMoKSwgLy8gMjJcbiAgICBOT1RfU1VQUE9SVF9MT0NBTEVfVFlQRTogaW5jKCksIC8vIDIzXG4gICAgX19FWFRFTkRfUE9JTlRfXzogaW5jKCkgLy8gMjRcbn07XG5mdW5jdGlvbiBjcmVhdGVDb3JlRXJyb3IoY29kZSkge1xuICAgIHJldHVybiBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbnVsbCwgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpID8geyBtZXNzYWdlczogZXJyb3JNZXNzYWdlcyB9IDogdW5kZWZpbmVkKTtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmNvbnN0IGVycm9yTWVzc2FnZXMgPSB7XG4gICAgW0NvcmVFcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlRdOiAnSW52YWxpZCBhcmd1bWVudHMnLFxuICAgIFtDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0RBVEVfQVJHVU1FTlRdOiAnVGhlIGRhdGUgcHJvdmlkZWQgaXMgYW4gaW52YWxpZCBEYXRlIG9iamVjdC4nICtcbiAgICAgICAgJ01ha2Ugc3VyZSB5b3VyIERhdGUgcmVwcmVzZW50cyBhIHZhbGlkIGRhdGUuJyxcbiAgICBbQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9JU09fREFURV9BUkdVTUVOVF06ICdUaGUgYXJndW1lbnQgcHJvdmlkZWQgaXMgbm90IGEgdmFsaWQgSVNPIGRhdGUgc3RyaW5nJyxcbiAgICBbQ29yZUVycm9yQ29kZXMuTk9UX1NVUFBPUlRfTk9OX1NUUklOR19NRVNTQUdFXTogJ05vdCBzdXBwb3J0IG5vbi1zdHJpbmcgbWVzc2FnZScsXG4gICAgW0NvcmVFcnJvckNvZGVzLk5PVF9TVVBQT1JUX0xPQ0FMRV9QUk9NSVNFX1ZBTFVFXTogJ2Nhbm5vdCBzdXBwb3J0IHByb21pc2UgdmFsdWUnLFxuICAgIFtDb3JlRXJyb3JDb2Rlcy5OT1RfU1VQUE9SVF9MT0NBTEVfQVNZTkNfRlVOQ1RJT05dOiAnY2Fubm90IHN1cHBvcnQgYXN5bmMgZnVuY3Rpb24nLFxuICAgIFtDb3JlRXJyb3JDb2Rlcy5OT1RfU1VQUE9SVF9MT0NBTEVfVFlQRV06ICdjYW5ub3Qgc3VwcG9ydCBsb2NhbGUgdHlwZSdcbn07XG5cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGdldExvY2FsZShjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlICE9IG51bGxcbiAgICAgICAgPyByZXNvbHZlTG9jYWxlKG9wdGlvbnMubG9jYWxlKVxuICAgICAgICA6IHJlc29sdmVMb2NhbGUoY29udGV4dC5sb2NhbGUpO1xufVxubGV0IF9yZXNvbHZlTG9jYWxlO1xuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gcmVzb2x2ZUxvY2FsZShsb2NhbGUpIHtcbiAgICBpZiAoaXNTdHJpbmcobG9jYWxlKSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24obG9jYWxlKSkge1xuICAgICAgICAgICAgaWYgKGxvY2FsZS5yZXNvbHZlZE9uY2UgJiYgX3Jlc29sdmVMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVzb2x2ZUxvY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxvY2FsZS5jb25zdHJ1Y3Rvci5uYW1lID09PSAnRnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZSA9IGxvY2FsZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2UocmVzb2x2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLk5PVF9TVVBQT1JUX0xPQ0FMRV9QUk9NSVNFX1ZBTFVFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfcmVzb2x2ZUxvY2FsZSA9IHJlc29sdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLk5PVF9TVVBQT1JUX0xPQ0FMRV9BU1lOQ19GVU5DVElPTik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuTk9UX1NVUFBPUlRfTE9DQUxFX1RZUEUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBGYWxsYmFjayB3aXRoIHNpbXBsZSBpbXBsZW1lbmF0aW9uXG4gKlxuICogQHJlbWFya3NcbiAqIEEgZmFsbGJhY2sgbG9jYWxlIGZ1bmN0aW9uIGltcGxlbWVudGVkIHdpdGggYSBzaW1wbGUgZmFsbGJhY2sgYWxnb3JpdGhtLlxuICpcbiAqIEJhc2ljYWxseSwgaXQgcmV0dXJucyB0aGUgdmFsdWUgYXMgc3BlY2lmaWVkIGluIHRoZSBgZmFsbGJhY2tMb2NhbGVgIHByb3BzLCBhbmQgaXMgcHJvY2Vzc2VkIHdpdGggdGhlIGZhbGxiYWNrIGluc2lkZSBpbnRsaWZ5LlxuICpcbiAqIEBwYXJhbSBjdHggLSBBIHtAbGluayBDb3JlQ29udGV4dCB8IGNvbnRleHR9XG4gKiBAcGFyYW0gZmFsbGJhY2sgLSBBIHtAbGluayBGYWxsYmFja0xvY2FsZSB8IGZhbGxiYWNrIGxvY2FsZX1cbiAqIEBwYXJhbSBzdGFydCAtIEEgc3RhcnRpbmcge0BsaW5rIExvY2FsZSB8IGxvY2FsZX1cbiAqXG4gKiBAcmV0dXJucyBGYWxsYmFjayBsb2NhbGVzXG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmZ1bmN0aW9uIGZhbGxiYWNrV2l0aFNpbXBsZShjdHgsIGZhbGxiYWNrLCBzdGFydCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuKSB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KFtcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgLi4uKGlzQXJyYXkoZmFsbGJhY2spXG4gICAgICAgICAgICAgICAgPyBmYWxsYmFja1xuICAgICAgICAgICAgICAgIDogaXNPYmplY3QoZmFsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgID8gT2JqZWN0LmtleXMoZmFsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIDogaXNTdHJpbmcoZmFsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFtmYWxsYmFja11cbiAgICAgICAgICAgICAgICAgICAgICAgIDogW3N0YXJ0XSlcbiAgICAgICAgXSldO1xufVxuLyoqXG4gKiBGYWxsYmFjayB3aXRoIGxvY2FsZSBjaGFpblxuICpcbiAqIEByZW1hcmtzXG4gKiBBIGZhbGxiYWNrIGxvY2FsZSBmdW5jdGlvbiBpbXBsZW1lbnRlZCB3aXRoIGEgZmFsbGJhY2sgY2hhaW4gYWxnb3JpdGhtLiBJdCdzIHVzZWQgaW4gVnVlSTE4biBhcyBkZWZhdWx0LlxuICpcbiAqIEBwYXJhbSBjdHggLSBBIHtAbGluayBDb3JlQ29udGV4dCB8IGNvbnRleHR9XG4gKiBAcGFyYW0gZmFsbGJhY2sgLSBBIHtAbGluayBGYWxsYmFja0xvY2FsZSB8IGZhbGxiYWNrIGxvY2FsZX1cbiAqIEBwYXJhbSBzdGFydCAtIEEgc3RhcnRpbmcge0BsaW5rIExvY2FsZSB8IGxvY2FsZX1cbiAqXG4gKiBAcmV0dXJucyBGYWxsYmFjayBsb2NhbGVzXG4gKlxuICogQFZ1ZUkxOG5TZWUgW0ZhbGxiYWNraW5nXSguLi9ndWlkZS9lc3NlbnRpYWxzL2ZhbGxiYWNrKVxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5mdW5jdGlvbiBmYWxsYmFja1dpdGhMb2NhbGVDaGFpbihjdHgsIGZhbGxiYWNrLCBzdGFydCkge1xuICAgIGNvbnN0IHN0YXJ0TG9jYWxlID0gaXNTdHJpbmcoc3RhcnQpID8gc3RhcnQgOiBERUZBVUxUX0xPQ0FMRTtcbiAgICBjb25zdCBjb250ZXh0ID0gY3R4O1xuICAgIGlmICghY29udGV4dC5fX2xvY2FsZUNoYWluQ2FjaGUpIHtcbiAgICAgICAgY29udGV4dC5fX2xvY2FsZUNoYWluQ2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGxldCBjaGFpbiA9IGNvbnRleHQuX19sb2NhbGVDaGFpbkNhY2hlLmdldChzdGFydExvY2FsZSk7XG4gICAgaWYgKCFjaGFpbikge1xuICAgICAgICBjaGFpbiA9IFtdO1xuICAgICAgICAvLyBmaXJzdCBibG9jayBkZWZpbmVkIGJ5IHN0YXJ0XG4gICAgICAgIGxldCBibG9jayA9IFtzdGFydF07XG4gICAgICAgIC8vIHdoaWxlIGFueSBpbnRlcnZlbmluZyBibG9jayBmb3VuZFxuICAgICAgICB3aGlsZSAoaXNBcnJheShibG9jaykpIHtcbiAgICAgICAgICAgIGJsb2NrID0gYXBwZW5kQmxvY2tUb0NoYWluKGNoYWluLCBibG9jaywgZmFsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAvLyBsYXN0IGJsb2NrIGRlZmluZWQgYnkgZGVmYXVsdFxuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IGlzQXJyYXkoZmFsbGJhY2spIHx8ICFpc1BsYWluT2JqZWN0KGZhbGxiYWNrKVxuICAgICAgICAgICAgPyBmYWxsYmFja1xuICAgICAgICAgICAgOiBmYWxsYmFja1snZGVmYXVsdCddXG4gICAgICAgICAgICAgICAgPyBmYWxsYmFja1snZGVmYXVsdCddXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAvLyBjb252ZXJ0IGRlZmF1bHRzIHRvIGFycmF5XG4gICAgICAgIGJsb2NrID0gaXNTdHJpbmcoZGVmYXVsdHMpID8gW2RlZmF1bHRzXSA6IGRlZmF1bHRzO1xuICAgICAgICBpZiAoaXNBcnJheShibG9jaykpIHtcbiAgICAgICAgICAgIGFwcGVuZEJsb2NrVG9DaGFpbihjaGFpbiwgYmxvY2ssIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZS5zZXQoc3RhcnRMb2NhbGUsIGNoYWluKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYWluO1xufVxuZnVuY3Rpb24gYXBwZW5kQmxvY2tUb0NoYWluKGNoYWluLCBibG9jaywgYmxvY2tzKSB7XG4gICAgbGV0IGZvbGxvdyA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9jay5sZW5ndGggJiYgaXNCb29sZWFuKGZvbGxvdyk7IGkrKykge1xuICAgICAgICBjb25zdCBsb2NhbGUgPSBibG9ja1tpXTtcbiAgICAgICAgaWYgKGlzU3RyaW5nKGxvY2FsZSkpIHtcbiAgICAgICAgICAgIGZvbGxvdyA9IGFwcGVuZExvY2FsZVRvQ2hhaW4oY2hhaW4sIGJsb2NrW2ldLCBibG9ja3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb2xsb3c7XG59XG5mdW5jdGlvbiBhcHBlbmRMb2NhbGVUb0NoYWluKGNoYWluLCBsb2NhbGUsIGJsb2Nrcykge1xuICAgIGxldCBmb2xsb3c7XG4gICAgY29uc3QgdG9rZW5zID0gbG9jYWxlLnNwbGl0KCctJyk7XG4gICAgZG8ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0b2tlbnMuam9pbignLScpO1xuICAgICAgICBmb2xsb3cgPSBhcHBlbmRJdGVtVG9DaGFpbihjaGFpbiwgdGFyZ2V0LCBibG9ja3MpO1xuICAgICAgICB0b2tlbnMuc3BsaWNlKC0xLCAxKTtcbiAgICB9IHdoaWxlICh0b2tlbnMubGVuZ3RoICYmIGZvbGxvdyA9PT0gdHJ1ZSk7XG4gICAgcmV0dXJuIGZvbGxvdztcbn1cbmZ1bmN0aW9uIGFwcGVuZEl0ZW1Ub0NoYWluKGNoYWluLCB0YXJnZXQsIGJsb2Nrcykge1xuICAgIGxldCBmb2xsb3cgPSBmYWxzZTtcbiAgICBpZiAoIWNoYWluLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgICAgZm9sbG93ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgZm9sbG93ID0gdGFyZ2V0W3RhcmdldC5sZW5ndGggLSAxXSAhPT0gJyEnO1xuICAgICAgICAgICAgY29uc3QgbG9jYWxlID0gdGFyZ2V0LnJlcGxhY2UoLyEvZywgJycpO1xuICAgICAgICAgICAgY2hhaW4ucHVzaChsb2NhbGUpO1xuICAgICAgICAgICAgaWYgKChpc0FycmF5KGJsb2NrcykgfHwgaXNQbGFpbk9iamVjdChibG9ja3MpKSAmJlxuICAgICAgICAgICAgICAgIGJsb2Nrc1tsb2NhbGVdIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgICBmb2xsb3cgPSBibG9ja3NbbG9jYWxlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm9sbG93O1xufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKipcbiAqIEludGxpZnkgY29yZS1iYXNlIHZlcnNpb25cbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCBWRVJTSU9OID0gJzkuMTIuMSc7XG5jb25zdCBOT1RfUkVPU0xWRUQgPSAtMTtcbmNvbnN0IERFRkFVTFRfTE9DQUxFID0gJ2VuLVVTJztcbmNvbnN0IE1JU1NJTkdfUkVTT0xWRV9WQUxVRSA9ICcnO1xuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+IGAke3N0ci5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKX0ke3N0ci5zdWJzdHIoMSl9YDtcbmZ1bmN0aW9uIGdldERlZmF1bHRMaW5rZWRNb2RpZmllcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXBwZXI6ICh2YWwsIHR5cGUpID0+IHtcbiAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09ICd0ZXh0JyAmJiBpc1N0cmluZyh2YWwpXG4gICAgICAgICAgICAgICAgPyB2YWwudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgIDogdHlwZSA9PT0gJ3Zub2RlJyAmJiBpc09iamVjdCh2YWwpICYmICdfX3ZfaXNWTm9kZScgaW4gdmFsXG4gICAgICAgICAgICAgICAgICAgID8gdmFsLmNoaWxkcmVuLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgOiB2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGxvd2VyOiAodmFsLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSAndGV4dCcgJiYgaXNTdHJpbmcodmFsKVxuICAgICAgICAgICAgICAgID8gdmFsLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICA6IHR5cGUgPT09ICd2bm9kZScgJiYgaXNPYmplY3QodmFsKSAmJiAnX192X2lzVk5vZGUnIGluIHZhbFxuICAgICAgICAgICAgICAgICAgICA/IHZhbC5jaGlsZHJlbi50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsO1xuICAgICAgICB9LFxuICAgICAgICBjYXBpdGFsaXplOiAodmFsLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgIHJldHVybiAodHlwZSA9PT0gJ3RleHQnICYmIGlzU3RyaW5nKHZhbClcbiAgICAgICAgICAgICAgICA/IGNhcGl0YWxpemUodmFsKVxuICAgICAgICAgICAgICAgIDogdHlwZSA9PT0gJ3Zub2RlJyAmJiBpc09iamVjdCh2YWwpICYmICdfX3ZfaXNWTm9kZScgaW4gdmFsXG4gICAgICAgICAgICAgICAgICAgID8gY2FwaXRhbGl6ZSh2YWwuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgICAgIDogdmFsKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5sZXQgX2NvbXBpbGVyO1xuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlQ29tcGlsZXIoY29tcGlsZXIpIHtcbiAgICBfY29tcGlsZXIgPSBjb21waWxlcjtcbn1cbmxldCBfcmVzb2x2ZXI7XG4vKipcbiAqIFJlZ2lzdGVyIHRoZSBtZXNzYWdlIHJlc29sdmVyXG4gKlxuICogQHBhcmFtIHJlc29sdmVyIC0gQSB7QGxpbmsgTWVzc2FnZVJlc29sdmVyfSBmdW5jdGlvblxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VSZXNvbHZlcihyZXNvbHZlcikge1xuICAgIF9yZXNvbHZlciA9IHJlc29sdmVyO1xufVxubGV0IF9mYWxsYmFja2VyO1xuLyoqXG4gKiBSZWdpc3RlciB0aGUgbG9jYWxlIGZhbGxiYWNrZXJcbiAqXG4gKiBAcGFyYW0gZmFsbGJhY2tlciAtIEEge0BsaW5rIExvY2FsZUZhbGxiYWNrZXJ9IGZ1bmN0aW9uXG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlRmFsbGJhY2tlcihmYWxsYmFja2VyKSB7XG4gICAgX2ZhbGxiYWNrZXIgPSBmYWxsYmFja2VyO1xufVxuLy8gQWRkaXRpb25hbCBNZXRhIGZvciBJbnRsaWZ5IERldlRvb2xzXG5sZXQgX2FkZGl0aW9uYWxNZXRhID0gIG51bGw7XG4vKiAjX19OT19TSURFX0VGRkVDVFNfXyAqL1xuY29uc3Qgc2V0QWRkaXRpb25hbE1ldGEgPSAobWV0YSkgPT4ge1xuICAgIF9hZGRpdGlvbmFsTWV0YSA9IG1ldGE7XG59O1xuLyogI19fTk9fU0lERV9FRkZFQ1RTX18gKi9cbmNvbnN0IGdldEFkZGl0aW9uYWxNZXRhID0gKCkgPT4gX2FkZGl0aW9uYWxNZXRhO1xubGV0IF9mYWxsYmFja0NvbnRleHQgPSBudWxsO1xuY29uc3Qgc2V0RmFsbGJhY2tDb250ZXh0ID0gKGNvbnRleHQpID0+IHtcbiAgICBfZmFsbGJhY2tDb250ZXh0ID0gY29udGV4dDtcbn07XG5jb25zdCBnZXRGYWxsYmFja0NvbnRleHQgPSAoKSA9PiBfZmFsbGJhY2tDb250ZXh0O1xuLy8gSUQgZm9yIENvcmVDb250ZXh0XG5sZXQgX2NpZCA9IDA7XG5mdW5jdGlvbiBjcmVhdGVDb3JlQ29udGV4dChvcHRpb25zID0ge30pIHtcbiAgICAvLyBzZXR1cCBvcHRpb25zXG4gICAgY29uc3Qgb25XYXJuID0gaXNGdW5jdGlvbihvcHRpb25zLm9uV2FybikgPyBvcHRpb25zLm9uV2FybiA6IHdhcm47XG4gICAgY29uc3QgdmVyc2lvbiA9IGlzU3RyaW5nKG9wdGlvbnMudmVyc2lvbikgPyBvcHRpb25zLnZlcnNpb24gOiBWRVJTSU9OO1xuICAgIGNvbnN0IGxvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKSB8fCBpc0Z1bmN0aW9uKG9wdGlvbnMubG9jYWxlKVxuICAgICAgICA/IG9wdGlvbnMubG9jYWxlXG4gICAgICAgIDogREVGQVVMVF9MT0NBTEU7XG4gICAgY29uc3QgX2xvY2FsZSA9IGlzRnVuY3Rpb24obG9jYWxlKSA/IERFRkFVTFRfTE9DQUxFIDogbG9jYWxlO1xuICAgIGNvbnN0IGZhbGxiYWNrTG9jYWxlID0gaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgIGlzU3RyaW5nKG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxuICAgICAgICA6IF9sb2NhbGU7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMubWVzc2FnZXMpXG4gICAgICAgID8gb3B0aW9ucy5tZXNzYWdlc1xuICAgICAgICA6IHsgW19sb2NhbGVdOiB7fSB9O1xuICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0cyA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpXG4gICAgICAgICAgICA/IG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzXG4gICAgICAgICAgICA6IHsgW19sb2NhbGVdOiB7fSB9XG4gICAgICAgIDtcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gaXNQbGFpbk9iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpXG4gICAgICAgICAgICA/IG9wdGlvbnMubnVtYmVyRm9ybWF0c1xuICAgICAgICAgICAgOiB7IFtfbG9jYWxlXToge30gfVxuICAgICAgICA7XG4gICAgY29uc3QgbW9kaWZpZXJzID0gYXNzaWduKHt9LCBvcHRpb25zLm1vZGlmaWVycyB8fCB7fSwgZ2V0RGVmYXVsdExpbmtlZE1vZGlmaWVycygpKTtcbiAgICBjb25zdCBwbHVyYWxSdWxlcyA9IG9wdGlvbnMucGx1cmFsUnVsZXMgfHwge307XG4gICAgY29uc3QgbWlzc2luZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5taXNzaW5nKSA/IG9wdGlvbnMubWlzc2luZyA6IG51bGw7XG4gICAgY29uc3QgbWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5taXNzaW5nV2FybilcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pIHx8IGlzUmVnRXhwKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBmYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mYWxsYmFja0Zvcm1hdDtcbiAgICBjb25zdCB1bnJlc29sdmluZyA9ICEhb3B0aW9ucy51bnJlc29sdmluZztcbiAgICBjb25zdCBwb3N0VHJhbnNsYXRpb24gPSBpc0Z1bmN0aW9uKG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uKVxuICAgICAgICA/IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uXG4gICAgICAgIDogbnVsbDtcbiAgICBjb25zdCBwcm9jZXNzb3IgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMucHJvY2Vzc29yKSA/IG9wdGlvbnMucHJvY2Vzc29yIDogbnVsbDtcbiAgICBjb25zdCB3YXJuSHRtbE1lc3NhZ2UgPSBpc0Jvb2xlYW4ob3B0aW9ucy53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgID8gb3B0aW9ucy53YXJuSHRtbE1lc3NhZ2VcbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGVzY2FwZVBhcmFtZXRlciA9ICEhb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXI7XG4gICAgY29uc3QgbWVzc2FnZUNvbXBpbGVyID0gaXNGdW5jdGlvbihvcHRpb25zLm1lc3NhZ2VDb21waWxlcilcbiAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VDb21waWxlclxuICAgICAgICA6IF9jb21waWxlcjtcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICFmYWxzZSAmJlxuICAgICAgICAhZmFsc2UgJiZcbiAgICAgICAgaXNGdW5jdGlvbihvcHRpb25zLm1lc3NhZ2VDb21waWxlcikpIHtcbiAgICAgICAgd2Fybk9uY2UoZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5FWFBFUklNRU5UQUxfQ1VTVE9NX01FU1NBR0VfQ09NUElMRVIpKTtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZVJlc29sdmVyID0gaXNGdW5jdGlvbihvcHRpb25zLm1lc3NhZ2VSZXNvbHZlcilcbiAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VSZXNvbHZlclxuICAgICAgICA6IF9yZXNvbHZlciB8fCByZXNvbHZlV2l0aEtleVZhbHVlO1xuICAgIGNvbnN0IGxvY2FsZUZhbGxiYWNrZXIgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubG9jYWxlRmFsbGJhY2tlcilcbiAgICAgICAgPyBvcHRpb25zLmxvY2FsZUZhbGxiYWNrZXJcbiAgICAgICAgOiBfZmFsbGJhY2tlciB8fCBmYWxsYmFja1dpdGhTaW1wbGU7XG4gICAgY29uc3QgZmFsbGJhY2tDb250ZXh0ID0gaXNPYmplY3Qob3B0aW9ucy5mYWxsYmFja0NvbnRleHQpXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0NvbnRleHRcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgLy8gc2V0dXAgaW50ZXJuYWwgb3B0aW9uc1xuICAgIGNvbnN0IGludGVybmFsT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgY29uc3QgX19kYXRldGltZUZvcm1hdHRlcnMgPSBpc09iamVjdChpbnRlcm5hbE9wdGlvbnMuX19kYXRldGltZUZvcm1hdHRlcnMpXG4gICAgICAgICAgICA/IGludGVybmFsT3B0aW9ucy5fX2RhdGV0aW1lRm9ybWF0dGVyc1xuICAgICAgICAgICAgOiBuZXcgTWFwKClcbiAgICAgICAgO1xuICAgIGNvbnN0IF9fbnVtYmVyRm9ybWF0dGVycyA9IGlzT2JqZWN0KGludGVybmFsT3B0aW9ucy5fX251bWJlckZvcm1hdHRlcnMpXG4gICAgICAgICAgICA/IGludGVybmFsT3B0aW9ucy5fX251bWJlckZvcm1hdHRlcnNcbiAgICAgICAgICAgIDogbmV3IE1hcCgpXG4gICAgICAgIDtcbiAgICBjb25zdCBfX21ldGEgPSBpc09iamVjdChpbnRlcm5hbE9wdGlvbnMuX19tZXRhKSA/IGludGVybmFsT3B0aW9ucy5fX21ldGEgOiB7fTtcbiAgICBfY2lkKys7XG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgY2lkOiBfY2lkLFxuICAgICAgICBsb2NhbGUsXG4gICAgICAgIGZhbGxiYWNrTG9jYWxlLFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgbW9kaWZpZXJzLFxuICAgICAgICBwbHVyYWxSdWxlcyxcbiAgICAgICAgbWlzc2luZyxcbiAgICAgICAgbWlzc2luZ1dhcm4sXG4gICAgICAgIGZhbGxiYWNrV2FybixcbiAgICAgICAgZmFsbGJhY2tGb3JtYXQsXG4gICAgICAgIHVucmVzb2x2aW5nLFxuICAgICAgICBwb3N0VHJhbnNsYXRpb24sXG4gICAgICAgIHByb2Nlc3NvcixcbiAgICAgICAgd2Fybkh0bWxNZXNzYWdlLFxuICAgICAgICBlc2NhcGVQYXJhbWV0ZXIsXG4gICAgICAgIG1lc3NhZ2VDb21waWxlcixcbiAgICAgICAgbWVzc2FnZVJlc29sdmVyLFxuICAgICAgICBsb2NhbGVGYWxsYmFja2VyLFxuICAgICAgICBmYWxsYmFja0NvbnRleHQsXG4gICAgICAgIG9uV2FybixcbiAgICAgICAgX19tZXRhXG4gICAgfTtcbiAgICB7XG4gICAgICAgIGNvbnRleHQuZGF0ZXRpbWVGb3JtYXRzID0gZGF0ZXRpbWVGb3JtYXRzO1xuICAgICAgICBjb250ZXh0Lm51bWJlckZvcm1hdHMgPSBudW1iZXJGb3JtYXRzO1xuICAgICAgICBjb250ZXh0Ll9fZGF0ZXRpbWVGb3JtYXR0ZXJzID0gX19kYXRldGltZUZvcm1hdHRlcnM7XG4gICAgICAgIGNvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzID0gX19udW1iZXJGb3JtYXR0ZXJzO1xuICAgIH1cbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICBjb250ZXh0Ll9fdl9lbWl0dGVyID1cbiAgICAgICAgICAgIGludGVybmFsT3B0aW9ucy5fX3ZfZW1pdHRlciAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBpbnRlcm5hbE9wdGlvbnMuX192X2VtaXR0ZXJcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gTk9URTogZXhwZXJpbWVudGFsICEhXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICAgIGluaXRJMThuRGV2VG9vbHMoY29udGV4dCwgdmVyc2lvbiwgX19tZXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBpc1RyYW5zbGF0ZUZhbGxiYWNrV2FybihmYWxsYmFjaywga2V5KSB7XG4gICAgcmV0dXJuIGZhbGxiYWNrIGluc3RhbmNlb2YgUmVnRXhwID8gZmFsbGJhY2sudGVzdChrZXkpIDogZmFsbGJhY2s7XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBpc1RyYW5zbGF0ZU1pc3NpbmdXYXJuKG1pc3NpbmcsIGtleSkge1xuICAgIHJldHVybiBtaXNzaW5nIGluc3RhbmNlb2YgUmVnRXhwID8gbWlzc2luZy50ZXN0KGtleSkgOiBtaXNzaW5nO1xufVxuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gaGFuZGxlTWlzc2luZyhjb250ZXh0LCBrZXksIGxvY2FsZSwgbWlzc2luZ1dhcm4sIHR5cGUpIHtcbiAgICBjb25zdCB7IG1pc3NpbmcsIG9uV2FybiB9ID0gY29udGV4dDtcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcIm1pc3NpbmdcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLk1JU1NJTkcgKi8sIHtcbiAgICAgICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7dHlwZX06JHtrZXl9YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1pc3NpbmcgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gbWlzc2luZyhjb250ZXh0LCBsb2NhbGUsIGtleSwgdHlwZSk7XG4gICAgICAgIHJldHVybiBpc1N0cmluZyhyZXQpID8gcmV0IDoga2V5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpc1RyYW5zbGF0ZU1pc3NpbmdXYXJuKG1pc3NpbmdXYXJuLCBrZXkpKSB7XG4gICAgICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5OT1RfRk9VTkRfS0VZLCB7IGtleSwgbG9jYWxlIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKGN0eCwgbG9jYWxlLCBmYWxsYmFjaykge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjdHg7XG4gICAgY29udGV4dC5fX2xvY2FsZUNoYWluQ2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgY3R4LmxvY2FsZUZhbGxiYWNrZXIoY3R4LCBmYWxsYmFjaywgbG9jYWxlKTtcbn1cbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5mdW5jdGlvbiBmb3JtYXQoYXN0KSB7XG4gICAgY29uc3QgbXNnID0gKGN0eCkgPT4gZm9ybWF0UGFydHMoY3R4LCBhc3QpO1xuICAgIHJldHVybiBtc2c7XG59XG5mdW5jdGlvbiBmb3JtYXRQYXJ0cyhjdHgsIGFzdCkge1xuICAgIGNvbnN0IGJvZHkgPSBhc3QuYiB8fCBhc3QuYm9keTtcbiAgICBpZiAoKGJvZHkudCB8fCBib2R5LnR5cGUpID09PSAxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi8pIHtcbiAgICAgICAgY29uc3QgcGx1cmFsID0gYm9keTtcbiAgICAgICAgY29uc3QgY2FzZXMgPSBwbHVyYWwuYyB8fCBwbHVyYWwuY2FzZXM7XG4gICAgICAgIHJldHVybiBjdHgucGx1cmFsKGNhc2VzLnJlZHVjZSgobWVzc2FnZXMsIGMpID0+IFtcbiAgICAgICAgICAgIC4uLm1lc3NhZ2VzLFxuICAgICAgICAgICAgZm9ybWF0TWVzc2FnZVBhcnRzKGN0eCwgYylcbiAgICAgICAgXSwgW10pKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmb3JtYXRNZXNzYWdlUGFydHMoY3R4LCBib2R5KTtcbiAgICB9XG59XG5mdW5jdGlvbiBmb3JtYXRNZXNzYWdlUGFydHMoY3R4LCBub2RlKSB7XG4gICAgY29uc3QgX3N0YXRpYyA9IG5vZGUucyB8fCBub2RlLnN0YXRpYztcbiAgICBpZiAoX3N0YXRpYykge1xuICAgICAgICByZXR1cm4gY3R4LnR5cGUgPT09ICd0ZXh0J1xuICAgICAgICAgICAgPyBfc3RhdGljXG4gICAgICAgICAgICA6IGN0eC5ub3JtYWxpemUoW19zdGF0aWNdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gKG5vZGUuaSB8fCBub2RlLml0ZW1zKS5yZWR1Y2UoKGFjbSwgYykgPT4gWy4uLmFjbSwgZm9ybWF0TWVzc2FnZVBhcnQoY3R4LCBjKV0sIFtdKTtcbiAgICAgICAgcmV0dXJuIGN0eC5ub3JtYWxpemUobWVzc2FnZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2VQYXJ0KGN0eCwgbm9kZSkge1xuICAgIGNvbnN0IHR5cGUgPSBub2RlLnQgfHwgbm9kZS50eXBlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIDMgLyogTm9kZVR5cGVzLlRleHQgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBub2RlO1xuICAgICAgICAgICAgcmV0dXJuICh0ZXh0LnYgfHwgdGV4dC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovOiB7XG4gICAgICAgICAgICBjb25zdCBsaXRlcmFsID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiAobGl0ZXJhbC52IHx8IGxpdGVyYWwudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNCAvKiBOb2RlVHlwZXMuTmFtZWQgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVkID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiBjdHguaW50ZXJwb2xhdGUoY3R4Lm5hbWVkKG5hbWVkLmsgfHwgbmFtZWQua2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA1IC8qIE5vZGVUeXBlcy5MaXN0ICovOiB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiBjdHguaW50ZXJwb2xhdGUoY3R4Lmxpc3QobGlzdC5pICE9IG51bGwgPyBsaXN0LmkgOiBsaXN0LmluZGV4KSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA2IC8qIE5vZGVUeXBlcy5MaW5rZWQgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZCA9IG5vZGU7XG4gICAgICAgICAgICBjb25zdCBtb2RpZmllciA9IGxpbmtlZC5tIHx8IGxpbmtlZC5tb2RpZmllcjtcbiAgICAgICAgICAgIHJldHVybiBjdHgubGlua2VkKGZvcm1hdE1lc3NhZ2VQYXJ0KGN0eCwgbGlua2VkLmsgfHwgbGlua2VkLmtleSksIG1vZGlmaWVyID8gZm9ybWF0TWVzc2FnZVBhcnQoY3R4LCBtb2RpZmllcikgOiB1bmRlZmluZWQsIGN0eC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDcgLyogTm9kZVR5cGVzLkxpbmtlZEtleSAqLzoge1xuICAgICAgICAgICAgY29uc3QgbGlua2VkS2V5ID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiAobGlua2VkS2V5LnYgfHwgbGlua2VkS2V5LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDggLyogTm9kZVR5cGVzLkxpbmtlZE1vZGlmaWVyICovOiB7XG4gICAgICAgICAgICBjb25zdCBsaW5rZWRNb2RpZmllciA9IG5vZGU7XG4gICAgICAgICAgICByZXR1cm4gKGxpbmtlZE1vZGlmaWVyLnYgfHwgbGlua2VkTW9kaWZpZXIudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBub2RlIHR5cGUgb24gZm9ybWF0IG1lc3NhZ2UgcGFydDogJHt0eXBlfWApO1xuICAgIH1cbn1cblxuY29uc3QgV0FSTl9NRVNTQUdFID0gYERldGVjdGVkIEhUTUwgaW4gJ3tzb3VyY2V9JyBtZXNzYWdlLiBSZWNvbW1lbmQgbm90IHVzaW5nIEhUTUwgbWVzc2FnZXMgdG8gYXZvaWQgWFNTLmA7XG5mdW5jdGlvbiBjaGVja0h0bWxNZXNzYWdlKHNvdXJjZSwgd2Fybkh0bWxNZXNzYWdlKSB7XG4gICAgaWYgKHdhcm5IdG1sTWVzc2FnZSAmJiBkZXRlY3RIdG1sVGFnKHNvdXJjZSkpIHtcbiAgICAgICAgd2Fybihmb3JtYXQkMShXQVJOX01FU1NBR0UsIHsgc291cmNlIH0pKTtcbiAgICB9XG59XG5jb25zdCBkZWZhdWx0T25DYWNoZUtleSA9IChtZXNzYWdlKSA9PiBtZXNzYWdlO1xubGV0IGNvbXBpbGVDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5mdW5jdGlvbiBvbkNvbXBpbGVXYXJuKF93YXJuKSB7XG4gICAgaWYgKF93YXJuLmNvZGUgPT09IENvbXBpbGVXYXJuQ29kZXMuVVNFX01PRFVMT19TWU5UQVgpIHtcbiAgICAgICAgd2FybihgVGhlIHVzZSBvZiBuYW1lZCBpbnRlcnBvbGF0aW9uIHdpdGggbW9kdWxvIHN5bnRheCBpcyBkZXByZWNhdGVkLiBgICtcbiAgICAgICAgICAgIGBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdjEwLlxcbmAgK1xuICAgICAgICAgICAgYHJlZmVyZW5jZTogaHR0cHM6Ly92dWUtaTE4bi5pbnRsaWZ5LmRldi9ndWlkZS9lc3NlbnRpYWxzL3N5bnRheCNyYWlscy1pMThuLWZvcm1hdCBcXG5gICtcbiAgICAgICAgICAgIGAobWVzc2FnZSBjb21waWxlciB3YXJuaW5nIG1lc3NhZ2U6ICR7X3dhcm4ubWVzc2FnZX0pYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJDb21waWxlQ2FjaGUoKSB7XG4gICAgY29tcGlsZUNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmNvbnN0IGlzTWVzc2FnZUFTVCA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiZcbiAgICAodmFsLnQgPT09IDAgfHwgdmFsLnR5cGUgPT09IDApICYmXG4gICAgKCdiJyBpbiB2YWwgfHwgJ2JvZHknIGluIHZhbCk7XG5mdW5jdGlvbiBiYXNlQ29tcGlsZShtZXNzYWdlLCBvcHRpb25zID0ge30pIHtcbiAgICAvLyBlcnJvciBkZXRlY3Rpbmcgb24gY29tcGlsZVxuICAgIGxldCBkZXRlY3RFcnJvciA9IGZhbHNlO1xuICAgIGNvbnN0IG9uRXJyb3IgPSBvcHRpb25zLm9uRXJyb3IgfHwgZGVmYXVsdE9uRXJyb3I7XG4gICAgb3B0aW9ucy5vbkVycm9yID0gKGVycikgPT4ge1xuICAgICAgICBkZXRlY3RFcnJvciA9IHRydWU7XG4gICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICB9O1xuICAgIC8vIGNvbXBpbGUgd2l0aCBtZXNhc2dlLWNvbXBpbGVyXG4gICAgcmV0dXJuIHsgLi4uYmFzZUNvbXBpbGUkMShtZXNzYWdlLCBvcHRpb25zKSwgZGV0ZWN0RXJyb3IgfTtcbn1cbi8qICNfX05PX1NJREVfRUZGRUNUU19fICovXG5jb25zdCBjb21waWxlVG9GdW5jdGlvbiA9IChtZXNzYWdlLCBjb250ZXh0KSA9PiB7XG4gICAgaWYgKCFpc1N0cmluZyhtZXNzYWdlKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuTk9UX1NVUFBPUlRfTk9OX1NUUklOR19NRVNTQUdFKTtcbiAgICB9XG4gICAgLy8gc2V0IG9uV2FyblxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgY29udGV4dC5vbldhcm4gPSBvbkNvbXBpbGVXYXJuO1xuICAgIH1cbiAgICB7XG4gICAgICAgIC8vIGNoZWNrIEhUTUwgbWVzc2FnZVxuICAgICAgICBjb25zdCB3YXJuSHRtbE1lc3NhZ2UgPSBpc0Jvb2xlYW4oY29udGV4dC53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgICAgICA/IGNvbnRleHQud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBjaGVja0h0bWxNZXNzYWdlKG1lc3NhZ2UsIHdhcm5IdG1sTWVzc2FnZSk7XG4gICAgICAgIC8vIGNoZWNrIGNhY2hlc1xuICAgICAgICBjb25zdCBvbkNhY2hlS2V5ID0gY29udGV4dC5vbkNhY2hlS2V5IHx8IGRlZmF1bHRPbkNhY2hlS2V5O1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IG9uQ2FjaGVLZXkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGNvbXBpbGVDYWNoZVtjYWNoZUtleV07XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tcGlsZVxuICAgICAgICBjb25zdCB7IGNvZGUsIGRldGVjdEVycm9yIH0gPSBiYXNlQ29tcGlsZShtZXNzYWdlLCBjb250ZXh0KTtcbiAgICAgICAgLy8gZXZhbHVhdGUgZnVuY3Rpb25cbiAgICAgICAgY29uc3QgbXNnID0gbmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtjb2RlfWApKCk7XG4gICAgICAgIC8vIGlmIG9jY3VycmVkIGNvbXBpbGUgZXJyb3IsIGRvbid0IGNhY2hlXG4gICAgICAgIHJldHVybiAhZGV0ZWN0RXJyb3JcbiAgICAgICAgICAgID8gKGNvbXBpbGVDYWNoZVtjYWNoZUtleV0gPSBtc2cpXG4gICAgICAgICAgICA6IG1zZztcbiAgICB9XG59O1xuZnVuY3Rpb24gY29tcGlsZShtZXNzYWdlLCBjb250ZXh0KSB7XG4gICAgLy8gc2V0IG9uV2FyblxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgY29udGV4dC5vbldhcm4gPSBvbkNvbXBpbGVXYXJuO1xuICAgIH1cbiAgICBpZiAoKChfX0lOVExJRllfSklUX0NPTVBJTEFUSU9OX18gJiYgIV9fSU5UTElGWV9EUk9QX01FU1NBR0VfQ09NUElMRVJfXykpICYmXG4gICAgICAgIGlzU3RyaW5nKG1lc3NhZ2UpKSB7XG4gICAgICAgIC8vIGNoZWNrIEhUTUwgbWVzc2FnZVxuICAgICAgICBjb25zdCB3YXJuSHRtbE1lc3NhZ2UgPSBpc0Jvb2xlYW4oY29udGV4dC53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgICAgICA/IGNvbnRleHQud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBjaGVja0h0bWxNZXNzYWdlKG1lc3NhZ2UsIHdhcm5IdG1sTWVzc2FnZSk7XG4gICAgICAgIC8vIGNoZWNrIGNhY2hlc1xuICAgICAgICBjb25zdCBvbkNhY2hlS2V5ID0gY29udGV4dC5vbkNhY2hlS2V5IHx8IGRlZmF1bHRPbkNhY2hlS2V5O1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IG9uQ2FjaGVLZXkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGNvbXBpbGVDYWNoZVtjYWNoZUtleV07XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tcGlsZSB3aXRoIEpJVCBtb2RlXG4gICAgICAgIGNvbnN0IHsgYXN0LCBkZXRlY3RFcnJvciB9ID0gYmFzZUNvbXBpbGUobWVzc2FnZSwge1xuICAgICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICAgIGxvY2F0aW9uOiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyksXG4gICAgICAgICAgICBqaXQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGNvbXBvc2UgbWVzc2FnZSBmdW5jdGlvbiBmcm9tIEFTVFxuICAgICAgICBjb25zdCBtc2cgPSBmb3JtYXQoYXN0KTtcbiAgICAgICAgLy8gaWYgb2NjdXJyZWQgY29tcGlsZSBlcnJvciwgZG9uJ3QgY2FjaGVcbiAgICAgICAgcmV0dXJuICFkZXRlY3RFcnJvclxuICAgICAgICAgICAgPyAoY29tcGlsZUNhY2hlW2NhY2hlS2V5XSA9IG1zZylcbiAgICAgICAgICAgIDogbXNnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiAhaXNNZXNzYWdlQVNUKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB3YXJuKGB0aGUgbWVzc2FnZSB0aGF0IGlzIHJlc29sdmUgd2l0aCBrZXkgJyR7Y29udGV4dC5rZXl9JyBpcyBub3Qgc3VwcG9ydGVkIGZvciBqaXQgY29tcGlsYXRpb25gKTtcbiAgICAgICAgICAgIHJldHVybiAoKCkgPT4gbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQVNUIGNhc2UgKHBhc3NlZCBmcm9tIGJ1bmRsZXIpXG4gICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gbWVzc2FnZS5jYWNoZUtleTtcbiAgICAgICAgaWYgKGNhY2hlS2V5KSB7XG4gICAgICAgICAgICBjb25zdCBjYWNoZWQgPSBjb21waWxlQ2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb21wb3NlIG1lc3NhZ2UgZnVuY3Rpb24gZnJvbSBtZXNzYWdlIChBU1QpXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBpbGVDYWNoZVtjYWNoZUtleV0gPVxuICAgICAgICAgICAgICAgIGZvcm1hdChtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBOT09QX01FU1NBR0VfRlVOQ1RJT04gPSAoKSA9PiAnJztcbmNvbnN0IGlzTWVzc2FnZUZ1bmN0aW9uID0gKHZhbCkgPT4gaXNGdW5jdGlvbih2YWwpO1xuLy8gaW1wbGVtZW50YXRpb24gb2YgYHRyYW5zbGF0ZWAgZnVuY3Rpb25cbmZ1bmN0aW9uIHRyYW5zbGF0ZShjb250ZXh0LCAuLi5hcmdzKSB7XG4gICAgY29uc3QgeyBmYWxsYmFja0Zvcm1hdCwgcG9zdFRyYW5zbGF0aW9uLCB1bnJlc29sdmluZywgbWVzc2FnZUNvbXBpbGVyLCBmYWxsYmFja0xvY2FsZSwgbWVzc2FnZXMgfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgW2tleSwgb3B0aW9uc10gPSBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyk7XG4gICAgY29uc3QgbWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybilcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXG4gICAgICAgIDogY29udGV4dC5taXNzaW5nV2FybjtcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cbiAgICAgICAgOiBjb250ZXh0LmZhbGxiYWNrV2FybjtcbiAgICBjb25zdCBlc2NhcGVQYXJhbWV0ZXIgPSBpc0Jvb2xlYW4ob3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXIpXG4gICAgICAgID8gb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXJcbiAgICAgICAgOiBjb250ZXh0LmVzY2FwZVBhcmFtZXRlcjtcbiAgICBjb25zdCByZXNvbHZlZE1lc3NhZ2UgPSAhIW9wdGlvbnMucmVzb2x2ZWRNZXNzYWdlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGRlZmF1bHRNc2dPcktleSA9IGlzU3RyaW5nKG9wdGlvbnMuZGVmYXVsdCkgfHwgaXNCb29sZWFuKG9wdGlvbnMuZGVmYXVsdCkgLy8gZGVmYXVsdCBieSBmdW5jdGlvbiBvcHRpb25cbiAgICAgICAgPyAhaXNCb29sZWFuKG9wdGlvbnMuZGVmYXVsdClcbiAgICAgICAgICAgID8gb3B0aW9ucy5kZWZhdWx0XG4gICAgICAgICAgICA6ICghbWVzc2FnZUNvbXBpbGVyID8gKCkgPT4ga2V5IDoga2V5KVxuICAgICAgICA6IGZhbGxiYWNrRm9ybWF0IC8vIGRlZmF1bHQgYnkgYGZhbGxiYWNrRm9ybWF0YCBvcHRpb25cbiAgICAgICAgICAgID8gKCFtZXNzYWdlQ29tcGlsZXIgPyAoKSA9PiBrZXkgOiBrZXkpXG4gICAgICAgICAgICA6ICcnO1xuICAgIGNvbnN0IGVuYWJsZURlZmF1bHRNc2cgPSBmYWxsYmFja0Zvcm1hdCB8fCBkZWZhdWx0TXNnT3JLZXkgIT09ICcnO1xuICAgIGNvbnN0IGxvY2FsZSA9IGdldExvY2FsZShjb250ZXh0LCBvcHRpb25zKTtcbiAgICAvLyBlc2NhcGUgcGFyYW1zXG4gICAgZXNjYXBlUGFyYW1ldGVyICYmIGVzY2FwZVBhcmFtcyhvcHRpb25zKTtcbiAgICAvLyByZXNvbHZlIG1lc3NhZ2UgZm9ybWF0XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICAgIGxldCBbZm9ybWF0U2NvcGUsIHRhcmdldExvY2FsZSwgbWVzc2FnZV0gPSAhcmVzb2x2ZWRNZXNzYWdlXG4gICAgICAgID8gcmVzb2x2ZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCBsb2NhbGUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuKVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzW2xvY2FsZV0gfHwge31cbiAgICAgICAgXTtcbiAgICAvLyBOT1RFOlxuICAgIC8vICBGaXggdG8gd29yayBhcm91bmQgYHNzclRyYW5zZnJvbWAgYnVnIGluIFZpdGUuXG4gICAgLy8gIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvNDMwNlxuICAgIC8vICBUbyBnZXQgYXJvdW5kIHRoaXMsIHVzZSB0ZW1wb3JhcnkgdmFyaWFibGVzLlxuICAgIC8vICBodHRwczovL2dpdGh1Yi5jb20vbnV4dC9mcmFtZXdvcmsvaXNzdWVzLzE0NjEjaXNzdWVjb21tZW50LTk1NDYwNjI0M1xuICAgIGxldCBmb3JtYXQgPSBmb3JtYXRTY29wZTtcbiAgICAvLyBpZiB5b3UgdXNlIGRlZmF1bHQgbWVzc2FnZSwgc2V0IGl0IGFzIG1lc3NhZ2UgZm9ybWF0IVxuICAgIGxldCBjYWNoZUJhc2VLZXkgPSBrZXk7XG4gICAgaWYgKCFyZXNvbHZlZE1lc3NhZ2UgJiZcbiAgICAgICAgIShpc1N0cmluZyhmb3JtYXQpIHx8XG4gICAgICAgICAgICBpc01lc3NhZ2VBU1QoZm9ybWF0KSB8fFxuICAgICAgICAgICAgaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KSkpIHtcbiAgICAgICAgaWYgKGVuYWJsZURlZmF1bHRNc2cpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGRlZmF1bHRNc2dPcktleTtcbiAgICAgICAgICAgIGNhY2hlQmFzZUtleSA9IGZvcm1hdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjaGVja2luZyBtZXNzYWdlIGZvcm1hdCBhbmQgdGFyZ2V0IGxvY2FsZVxuICAgIGlmICghcmVzb2x2ZWRNZXNzYWdlICYmXG4gICAgICAgICghKGlzU3RyaW5nKGZvcm1hdCkgfHxcbiAgICAgICAgICAgIGlzTWVzc2FnZUFTVChmb3JtYXQpIHx8XG4gICAgICAgICAgICBpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpKSB8fFxuICAgICAgICAgICAgIWlzU3RyaW5nKHRhcmdldExvY2FsZSkpKSB7XG4gICAgICAgIHJldHVybiB1bnJlc29sdmluZyA/IE5PVF9SRU9TTFZFRCA6IGtleTtcbiAgICB9XG4gICAgLy8gVE9ETzogcmVmYWN0b3JcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGlzU3RyaW5nKGZvcm1hdCkgJiYgY29udGV4dC5tZXNzYWdlQ29tcGlsZXIgPT0gbnVsbCkge1xuICAgICAgICB3YXJuKGBUaGUgbWVzc2FnZSBmb3JtYXQgY29tcGlsYXRpb24gaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJ1aWxkLiBgICtcbiAgICAgICAgICAgIGBCZWNhdXNlIG1lc3NhZ2UgY29tcGlsZXIgaXNuJ3QgaW5jbHVkZWQuIGAgK1xuICAgICAgICAgICAgYFlvdSBuZWVkIHRvIHByZS1jb21waWxhdGlvbiBhbGwgbWVzc2FnZSBmb3JtYXQuIGAgK1xuICAgICAgICAgICAgYFNvIHRyYW5zbGF0ZSBmdW5jdGlvbiByZXR1cm4gJyR7a2V5fScuYCk7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICAgIC8vIHNldHVwIGNvbXBpbGUgZXJyb3IgZGV0ZWN0aW5nXG4gICAgbGV0IG9jY3VycmVkID0gZmFsc2U7XG4gICAgY29uc3Qgb25FcnJvciA9ICgpID0+IHtcbiAgICAgICAgb2NjdXJyZWQgPSB0cnVlO1xuICAgIH07XG4gICAgLy8gY29tcGlsZSBtZXNzYWdlIGZvcm1hdFxuICAgIGNvbnN0IG1zZyA9ICFpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpXG4gICAgICAgID8gY29tcGlsZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCB0YXJnZXRMb2NhbGUsIGZvcm1hdCwgY2FjaGVCYXNlS2V5LCBvbkVycm9yKVxuICAgICAgICA6IGZvcm1hdDtcbiAgICAvLyBpZiBvY2N1cnJlZCBjb21waWxlIGVycm9yLCByZXR1cm4gdGhlIG1lc3NhZ2UgZm9ybWF0XG4gICAgaWYgKG9jY3VycmVkKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuICAgIC8vIGV2YWx1YXRlIG1lc3NhZ2Ugd2l0aCBjb250ZXh0XG4gICAgY29uc3QgY3R4T3B0aW9ucyA9IGdldE1lc3NhZ2VDb250ZXh0T3B0aW9ucyhjb250ZXh0LCB0YXJnZXRMb2NhbGUsIG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgIGNvbnN0IG1zZ0NvbnRleHQgPSBjcmVhdGVNZXNzYWdlQ29udGV4dChjdHhPcHRpb25zKTtcbiAgICBjb25zdCBtZXNzYWdlZCA9IGV2YWx1YXRlTWVzc2FnZShjb250ZXh0LCBtc2csIG1zZ0NvbnRleHQpO1xuICAgIC8vIGlmIHVzZSBwb3N0IHRyYW5zbGF0aW9uIG9wdGlvbiwgcHJvY2VlZCBpdCB3aXRoIGhhbmRsZXJcbiAgICBjb25zdCByZXQgPSBwb3N0VHJhbnNsYXRpb25cbiAgICAgICAgPyBwb3N0VHJhbnNsYXRpb24obWVzc2FnZWQsIGtleSlcbiAgICAgICAgOiBtZXNzYWdlZDtcbiAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIGNvbnN0IHBheWxvYWRzID0ge1xuICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAga2V5OiBpc1N0cmluZyhrZXkpXG4gICAgICAgICAgICAgICAgPyBrZXlcbiAgICAgICAgICAgICAgICA6IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdClcbiAgICAgICAgICAgICAgICAgICAgPyBmb3JtYXQua2V5XG4gICAgICAgICAgICAgICAgICAgIDogJycsXG4gICAgICAgICAgICBsb2NhbGU6IHRhcmdldExvY2FsZSB8fCAoaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KVxuICAgICAgICAgICAgICAgID8gZm9ybWF0LmxvY2FsZVxuICAgICAgICAgICAgICAgIDogJycpLFxuICAgICAgICAgICAgZm9ybWF0OiBpc1N0cmluZyhmb3JtYXQpXG4gICAgICAgICAgICAgICAgPyBmb3JtYXRcbiAgICAgICAgICAgICAgICA6IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdClcbiAgICAgICAgICAgICAgICAgICAgPyBmb3JtYXQuc291cmNlXG4gICAgICAgICAgICAgICAgICAgIDogJycsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXRcbiAgICAgICAgfTtcbiAgICAgICAgcGF5bG9hZHMubWV0YSA9IGFzc2lnbih7fSwgY29udGV4dC5fX21ldGEsIGdldEFkZGl0aW9uYWxNZXRhKCkgfHwge30pO1xuICAgICAgICB0cmFuc2xhdGVEZXZUb29scyhwYXlsb2Fkcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5mdW5jdGlvbiBlc2NhcGVQYXJhbXMob3B0aW9ucykge1xuICAgIGlmIChpc0FycmF5KG9wdGlvbnMubGlzdCkpIHtcbiAgICAgICAgb3B0aW9ucy5saXN0ID0gb3B0aW9ucy5saXN0Lm1hcChpdGVtID0+IGlzU3RyaW5nKGl0ZW0pID8gZXNjYXBlSHRtbChpdGVtKSA6IGl0ZW0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09iamVjdChvcHRpb25zLm5hbWVkKSkge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLm5hbWVkKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcob3B0aW9ucy5uYW1lZFtrZXldKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubmFtZWRba2V5XSA9IGVzY2FwZUh0bWwob3B0aW9ucy5uYW1lZFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCBsb2NhbGUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlcywgb25XYXJuLCBtZXNzYWdlUmVzb2x2ZXI6IHJlc29sdmVWYWx1ZSwgbG9jYWxlRmFsbGJhY2tlciB9ID0gY29udGV4dDtcbiAgICBjb25zdCBsb2NhbGVzID0gbG9jYWxlRmFsbGJhY2tlcihjb250ZXh0LCBmYWxsYmFja0xvY2FsZSwgbG9jYWxlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgbGV0IG1lc3NhZ2UgPSB7fTtcbiAgICBsZXQgdGFyZ2V0TG9jYWxlO1xuICAgIGxldCBmb3JtYXQgPSBudWxsO1xuICAgIGxldCBmcm9tID0gbG9jYWxlO1xuICAgIGxldCB0byA9IG51bGw7XG4gICAgY29uc3QgdHlwZSA9ICd0cmFuc2xhdGUnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0YXJnZXRMb2NhbGUgPSB0byA9IGxvY2FsZXNbaV07XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgICAgIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlICYmXG4gICAgICAgICAgICBpc1RyYW5zbGF0ZUZhbGxiYWNrV2FybihmYWxsYmFja1dhcm4sIGtleSkpIHtcbiAgICAgICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkZBTExCQUNLX1RPX1RSQU5TTEFURSwge1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldExvY2FsZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBsb2NhbGUgIT09IHRhcmdldExvY2FsZSkge1xuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XG4gICAgICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImZhbGxiYWNrXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5GQUxCQUNLICovLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3R5cGV9OiR7a2V5fWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlID1cbiAgICAgICAgICAgIG1lc3NhZ2VzW3RhcmdldExvY2FsZV0gfHwge307XG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbDtcbiAgICAgICAgbGV0IHN0YXJ0VGFnO1xuICAgICAgICBsZXQgZW5kVGFnO1xuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xuICAgICAgICAgICAgc3RhcnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICBzdGFydFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtcmVzb2x2ZS1zdGFydCc7XG4gICAgICAgICAgICBlbmRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLXJlc29sdmUtZW5kJztcbiAgICAgICAgICAgIG1hcmsgJiYgbWFyayhzdGFydFRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChmb3JtYXQgPSByZXNvbHZlVmFsdWUobWVzc2FnZSwga2V5KSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGlmIG51bGwsIHJlc29sdmUgd2l0aCBvYmplY3Qga2V5IHBhdGhcbiAgICAgICAgICAgIGZvcm1hdCA9IG1lc3NhZ2Vba2V5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xuICAgICAgICAgICAgY29uc3QgZW5kID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XG4gICAgICAgICAgICBpZiAoZW1pdHRlciAmJiBzdGFydCAmJiBmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJtZXNzYWdlLXJlc29sdmVcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLk1FU1NBR0VfUkVTT0xWRSAqLywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2UtcmVzb2x2ZVwiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuTUVTU0FHRV9SRVNPTFZFICovLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogZW5kIC0gc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3R5cGV9OiR7a2V5fWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGFydFRhZyAmJiBlbmRUYWcgJiYgbWFyayAmJiBtZWFzdXJlKSB7XG4gICAgICAgICAgICAgICAgbWFyayhlbmRUYWcpO1xuICAgICAgICAgICAgICAgIG1lYXN1cmUoJ2ludGxpZnkgbWVzc2FnZSByZXNvbHZlJywgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaW5nKGZvcm1hdCkgfHwgaXNNZXNzYWdlQVNUKGZvcm1hdCkgfHwgaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWlzc2luZ1JldCA9IGhhbmRsZU1pc3NpbmcoY29udGV4dCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGtleSwgdGFyZ2V0TG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSk7XG4gICAgICAgIGlmIChtaXNzaW5nUmV0ICE9PSBrZXkpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IG1pc3NpbmdSZXQ7XG4gICAgICAgIH1cbiAgICAgICAgZnJvbSA9IHRvO1xuICAgIH1cbiAgICByZXR1cm4gW2Zvcm1hdCwgdGFyZ2V0TG9jYWxlLCBtZXNzYWdlXTtcbn1cbmZ1bmN0aW9uIGNvbXBpbGVNZXNzYWdlRm9ybWF0KGNvbnRleHQsIGtleSwgdGFyZ2V0TG9jYWxlLCBmb3JtYXQsIGNhY2hlQmFzZUtleSwgb25FcnJvcikge1xuICAgIGNvbnN0IHsgbWVzc2FnZUNvbXBpbGVyLCB3YXJuSHRtbE1lc3NhZ2UgfSA9IGNvbnRleHQ7XG4gICAgaWYgKGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdCkpIHtcbiAgICAgICAgY29uc3QgbXNnID0gZm9ybWF0O1xuICAgICAgICBtc2cubG9jYWxlID0gbXNnLmxvY2FsZSB8fCB0YXJnZXRMb2NhbGU7XG4gICAgICAgIG1zZy5rZXkgPSBtc2cua2V5IHx8IGtleTtcbiAgICAgICAgcmV0dXJuIG1zZztcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2VDb21waWxlciA9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9ICgoKSA9PiBmb3JtYXQpO1xuICAgICAgICBtc2cubG9jYWxlID0gdGFyZ2V0TG9jYWxlO1xuICAgICAgICBtc2cua2V5ID0ga2V5O1xuICAgICAgICByZXR1cm4gbXNnO1xuICAgIH1cbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgbGV0IHN0YXJ0ID0gbnVsbDtcbiAgICBsZXQgc3RhcnRUYWc7XG4gICAgbGV0IGVuZFRhZztcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xuICAgICAgICBzdGFydCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgc3RhcnRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLWNvbXBpbGF0aW9uLXN0YXJ0JztcbiAgICAgICAgZW5kVGFnID0gJ2ludGxpZnktbWVzc2FnZS1jb21waWxhdGlvbi1lbmQnO1xuICAgICAgICBtYXJrICYmIG1hcmsoc3RhcnRUYWcpO1xuICAgIH1cbiAgICBjb25zdCBtc2cgPSBtZXNzYWdlQ29tcGlsZXIoZm9ybWF0LCBnZXRDb21waWxlQ29udGV4dChjb250ZXh0LCB0YXJnZXRMb2NhbGUsIGNhY2hlQmFzZUtleSwgZm9ybWF0LCB3YXJuSHRtbE1lc3NhZ2UsIG9uRXJyb3IpKTtcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgY29uc3QgZW5kID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcbiAgICAgICAgaWYgKGVtaXR0ZXIgJiYgc3RhcnQpIHtcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcIm1lc3NhZ2UtY29tcGlsYXRpb25cIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLk1FU1NBR0VfQ09NUElMQVRJT04gKi8sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2UtY29tcGlsYXRpb25cIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLk1FU1NBR0VfQ09NUElMQVRJT04gKi8sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZm9ybWF0LFxuICAgICAgICAgICAgICAgIHRpbWU6IGVuZCAtIHN0YXJ0LFxuICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAkeyd0cmFuc2xhdGUnfToke2tleX1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRUYWcgJiYgZW5kVGFnICYmIG1hcmsgJiYgbWVhc3VyZSkge1xuICAgICAgICAgICAgbWFyayhlbmRUYWcpO1xuICAgICAgICAgICAgbWVhc3VyZSgnaW50bGlmeSBtZXNzYWdlIGNvbXBpbGF0aW9uJywgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXNnLmxvY2FsZSA9IHRhcmdldExvY2FsZTtcbiAgICBtc2cua2V5ID0ga2V5O1xuICAgIG1zZy5zb3VyY2UgPSBmb3JtYXQ7XG4gICAgcmV0dXJuIG1zZztcbn1cbmZ1bmN0aW9uIGV2YWx1YXRlTWVzc2FnZShjb250ZXh0LCBtc2csIG1zZ0N0eCkge1xuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICBsZXQgc3RhcnQgPSBudWxsO1xuICAgIGxldCBzdGFydFRhZztcbiAgICBsZXQgZW5kVGFnO1xuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgaW5Ccm93c2VyKSB7XG4gICAgICAgIHN0YXJ0ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBzdGFydFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtZXZhbHVhdGlvbi1zdGFydCc7XG4gICAgICAgIGVuZFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtZXZhbHVhdGlvbi1lbmQnO1xuICAgICAgICBtYXJrICYmIG1hcmsoc3RhcnRUYWcpO1xuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlZCA9IG1zZyhtc2dDdHgpO1xuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xuICAgICAgICBjb25zdCBlbmQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICBpZiAoZW1pdHRlciAmJiBzdGFydCkge1xuICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWVzc2FnZS1ldmFsdWF0aW9uXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5NRVNTQUdFX0VWQUxVQVRJT04gKi8sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2UtZXZhbHVhdGlvblwiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuTUVTU0FHRV9FVkFMVUFUSU9OICovLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBtZXNzYWdlZCxcbiAgICAgICAgICAgICAgICB0aW1lOiBlbmQgLSBzdGFydCxcbiAgICAgICAgICAgICAgICBncm91cElkOiBgJHsndHJhbnNsYXRlJ306JHttc2cua2V5fWBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydFRhZyAmJiBlbmRUYWcgJiYgbWFyayAmJiBtZWFzdXJlKSB7XG4gICAgICAgICAgICBtYXJrKGVuZFRhZyk7XG4gICAgICAgICAgICBtZWFzdXJlKCdpbnRsaWZ5IG1lc3NhZ2UgZXZhbHVhdGlvbicsIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlZDtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIHBhcnNlVHJhbnNsYXRlQXJncyguLi5hcmdzKSB7XG4gICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzNdID0gYXJncztcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgaWYgKCFpc1N0cmluZyhhcmcxKSAmJlxuICAgICAgICAhaXNOdW1iZXIoYXJnMSkgJiZcbiAgICAgICAgIWlzTWVzc2FnZUZ1bmN0aW9uKGFyZzEpICYmXG4gICAgICAgICFpc01lc3NhZ2VBU1QoYXJnMSkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlQpO1xuICAgIH1cbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBrZXkgPSBpc051bWJlcihhcmcxKVxuICAgICAgICA/IFN0cmluZyhhcmcxKVxuICAgICAgICA6IGlzTWVzc2FnZUZ1bmN0aW9uKGFyZzEpXG4gICAgICAgICAgICA/IGFyZzFcbiAgICAgICAgICAgIDogYXJnMTtcbiAgICBpZiAoaXNOdW1iZXIoYXJnMikpIHtcbiAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBhcmcyO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICBvcHRpb25zLmRlZmF1bHQgPSBhcmcyO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpICYmICFpc0VtcHR5T2JqZWN0KGFyZzIpKSB7XG4gICAgICAgIG9wdGlvbnMubmFtZWQgPSBhcmcyO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0FycmF5KGFyZzIpKSB7XG4gICAgICAgIG9wdGlvbnMubGlzdCA9IGFyZzI7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihhcmczKSkge1xuICAgICAgICBvcHRpb25zLnBsdXJhbCA9IGFyZzM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGFyZzMpKSB7XG4gICAgICAgIG9wdGlvbnMuZGVmYXVsdCA9IGFyZzM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMykpIHtcbiAgICAgICAgYXNzaWduKG9wdGlvbnMsIGFyZzMpO1xuICAgIH1cbiAgICByZXR1cm4gW2tleSwgb3B0aW9uc107XG59XG5mdW5jdGlvbiBnZXRDb21waWxlQ29udGV4dChjb250ZXh0LCBsb2NhbGUsIGtleSwgc291cmNlLCB3YXJuSHRtbE1lc3NhZ2UsIG9uRXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2NhbGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgd2Fybkh0bWxNZXNzYWdlLFxuICAgICAgICBvbkVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBfc291cmNlID0gZ2V0U291cmNlRm9yQ29kZUZyYW1lKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGBNZXNzYWdlIGNvbXBpbGF0aW9uIGVycm9yOiAke2Vyci5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgY29uc3QgY29kZUZyYW1lID0gZXJyLmxvY2F0aW9uICYmXG4gICAgICAgICAgICAgICAgICAgIF9zb3VyY2UgJiZcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVDb2RlRnJhbWUoX3NvdXJjZSwgZXJyLmxvY2F0aW9uLnN0YXJ0Lm9mZnNldCwgZXJyLmxvY2F0aW9uLmVuZC5vZmZzZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICAgICAgICAgIGlmIChlbWl0dGVyICYmIF9zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwiY29tcGlsZS1lcnJvclwiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuQ09NUElMRV9FUlJPUiAqLywge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogX3NvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBlcnIubG9jYXRpb24gJiYgZXJyLmxvY2F0aW9uLnN0YXJ0Lm9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZXJyLmxvY2F0aW9uICYmIGVyci5sb2NhdGlvbi5lbmQub2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7J3RyYW5zbGF0ZSd9OiR7a2V5fWBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY29kZUZyYW1lID8gYCR7bWVzc2FnZX1cXG4ke2NvZGVGcmFtZX1gIDogbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2FjaGVLZXk6IChzb3VyY2UpID0+IGdlbmVyYXRlRm9ybWF0Q2FjaGVLZXkobG9jYWxlLCBrZXksIHNvdXJjZSlcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0U291cmNlRm9yQ29kZUZyYW1lKHNvdXJjZSkge1xuICAgIGlmIChpc1N0cmluZyhzb3VyY2UpKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoc291cmNlLmxvYyAmJiBzb3VyY2UubG9jLnNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5sb2Muc291cmNlO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TWVzc2FnZUNvbnRleHRPcHRpb25zKGNvbnRleHQsIGxvY2FsZSwgbWVzc2FnZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgbW9kaWZpZXJzLCBwbHVyYWxSdWxlcywgbWVzc2FnZVJlc29sdmVyOiByZXNvbHZlVmFsdWUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuLCBmYWxsYmFja0NvbnRleHQgfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgcmVzb2x2ZU1lc3NhZ2UgPSAoa2V5KSA9PiB7XG4gICAgICAgIGxldCB2YWwgPSByZXNvbHZlVmFsdWUobWVzc2FnZSwga2V5KTtcbiAgICAgICAgLy8gZmFsbGJhY2sgdG8gcm9vdCBjb250ZXh0XG4gICAgICAgIGlmICh2YWwgPT0gbnVsbCAmJiBmYWxsYmFja0NvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IFssICwgbWVzc2FnZV0gPSByZXNvbHZlTWVzc2FnZUZvcm1hdChmYWxsYmFja0NvbnRleHQsIGtleSwgbG9jYWxlLCBmYWxsYmFja0xvY2FsZSwgZmFsbGJhY2tXYXJuLCBtaXNzaW5nV2Fybik7XG4gICAgICAgICAgICB2YWwgPSByZXNvbHZlVmFsdWUobWVzc2FnZSwga2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpbmcodmFsKSB8fCBpc01lc3NhZ2VBU1QodmFsKSkge1xuICAgICAgICAgICAgbGV0IG9jY3VycmVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBvbkVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBjb21waWxlTWVzc2FnZUZvcm1hdChjb250ZXh0LCBrZXksIGxvY2FsZSwgdmFsLCBrZXksIG9uRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuICFvY2N1cnJlZFxuICAgICAgICAgICAgICAgID8gbXNnXG4gICAgICAgICAgICAgICAgOiBOT09QX01FU1NBR0VfRlVOQ1RJT047XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNNZXNzYWdlRnVuY3Rpb24odmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE86IHNob3VsZCBiZSBpbXBsZW1lbnRlZCB3YXJuaW5nIG1lc3NhZ2VcbiAgICAgICAgICAgIHJldHVybiBOT09QX01FU1NBR0VfRlVOQ1RJT047XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGN0eE9wdGlvbnMgPSB7XG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgbW9kaWZpZXJzLFxuICAgICAgICBwbHVyYWxSdWxlcyxcbiAgICAgICAgbWVzc2FnZXM6IHJlc29sdmVNZXNzYWdlXG4gICAgfTtcbiAgICBpZiAoY29udGV4dC5wcm9jZXNzb3IpIHtcbiAgICAgICAgY3R4T3B0aW9ucy5wcm9jZXNzb3IgPSBjb250ZXh0LnByb2Nlc3NvcjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubGlzdCkge1xuICAgICAgICBjdHhPcHRpb25zLmxpc3QgPSBvcHRpb25zLmxpc3Q7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm5hbWVkKSB7XG4gICAgICAgIGN0eE9wdGlvbnMubmFtZWQgPSBvcHRpb25zLm5hbWVkO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIob3B0aW9ucy5wbHVyYWwpKSB7XG4gICAgICAgIGN0eE9wdGlvbnMucGx1cmFsSW5kZXggPSBvcHRpb25zLnBsdXJhbDtcbiAgICB9XG4gICAgcmV0dXJuIGN0eE9wdGlvbnM7XG59XG5cbmNvbnN0IGludGxEZWZpbmVkID0gdHlwZW9mIEludGwgIT09ICd1bmRlZmluZWQnO1xuY29uc3QgQXZhaWxhYmlsaXRpZXMgPSB7XG4gICAgZGF0ZVRpbWVGb3JtYXQ6IGludGxEZWZpbmVkICYmIHR5cGVvZiBJbnRsLkRhdGVUaW1lRm9ybWF0ICE9PSAndW5kZWZpbmVkJyxcbiAgICBudW1iZXJGb3JtYXQ6IGludGxEZWZpbmVkICYmIHR5cGVvZiBJbnRsLk51bWJlckZvcm1hdCAhPT0gJ3VuZGVmaW5lZCdcbn07XG5cbi8vIGltcGxlbWVudGF0aW9uIG9mIGBkYXRldGltZWAgZnVuY3Rpb25cbmZ1bmN0aW9uIGRhdGV0aW1lKGNvbnRleHQsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7IGRhdGV0aW1lRm9ybWF0cywgdW5yZXNvbHZpbmcsIGZhbGxiYWNrTG9jYWxlLCBvbldhcm4sIGxvY2FsZUZhbGxiYWNrZXIgfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgeyBfX2RhdGV0aW1lRm9ybWF0dGVycyB9ID0gY29udGV4dDtcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmICFBdmFpbGFiaWxpdGllcy5kYXRlVGltZUZvcm1hdCkge1xuICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5DQU5OT1RfRk9STUFUX0RBVEUpKTtcbiAgICAgICAgcmV0dXJuIE1JU1NJTkdfUkVTT0xWRV9WQUxVRTtcbiAgICB9XG4gICAgY29uc3QgW2tleSwgdmFsdWUsIG9wdGlvbnMsIG92ZXJyaWRlc10gPSBwYXJzZURhdGVUaW1lQXJncyguLi5hcmdzKTtcbiAgICBjb25zdCBtaXNzaW5nV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKVxuICAgICAgICA/IG9wdGlvbnMubWlzc2luZ1dhcm5cbiAgICAgICAgOiBjb250ZXh0Lm1pc3NpbmdXYXJuO1xuICAgIGNvbnN0IGZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybilcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrV2FyblxuICAgICAgICA6IGNvbnRleHQuZmFsbGJhY2tXYXJuO1xuICAgIGNvbnN0IHBhcnQgPSAhIW9wdGlvbnMucGFydDtcbiAgICBjb25zdCBsb2NhbGUgPSBnZXRMb2NhbGUoY29udGV4dCwgb3B0aW9ucyk7XG4gICAgY29uc3QgbG9jYWxlcyA9IGxvY2FsZUZhbGxiYWNrZXIoY29udGV4dCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZmFsbGJhY2tMb2NhbGUsIGxvY2FsZSk7XG4gICAgaWYgKCFpc1N0cmluZyhrZXkpIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3ZlcnJpZGVzKS5mb3JtYXQodmFsdWUpO1xuICAgIH1cbiAgICAvLyByZXNvbHZlIGZvcm1hdFxuICAgIGxldCBkYXRldGltZUZvcm1hdCA9IHt9O1xuICAgIGxldCB0YXJnZXRMb2NhbGU7XG4gICAgbGV0IGZvcm1hdCA9IG51bGw7XG4gICAgbGV0IGZyb20gPSBsb2NhbGU7XG4gICAgbGV0IHRvID0gbnVsbDtcbiAgICBjb25zdCB0eXBlID0gJ2RhdGV0aW1lIGZvcm1hdCc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhcmdldExvY2FsZSA9IHRvID0gbG9jYWxlc1tpXTtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxuICAgICAgICAgICAgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUgJiZcbiAgICAgICAgICAgIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrV2Fybiwga2V5KSkge1xuICAgICAgICAgICAgb25XYXJuKGdldFdhcm5NZXNzYWdlKENvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fREFURV9GT1JNQVQsIHtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRMb2NhbGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJmYWxsYmFja1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuRkFMQkFDSyAqLywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGF0ZXRpbWVGb3JtYXQgPVxuICAgICAgICAgICAgZGF0ZXRpbWVGb3JtYXRzW3RhcmdldExvY2FsZV0gfHwge307XG4gICAgICAgIGZvcm1hdCA9IGRhdGV0aW1lRm9ybWF0W2tleV07XG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KGZvcm1hdCkpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgaGFuZGxlTWlzc2luZyhjb250ZXh0LCBrZXksIHRhcmdldExvY2FsZSwgbWlzc2luZ1dhcm4sIHR5cGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgZnJvbSA9IHRvO1xuICAgIH1cbiAgICAvLyBjaGVja2luZyBmb3JtYXQgYW5kIHRhcmdldCBsb2NhbGVcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoZm9ybWF0KSB8fCAhaXNTdHJpbmcodGFyZ2V0TG9jYWxlKSkge1xuICAgICAgICByZXR1cm4gdW5yZXNvbHZpbmcgPyBOT1RfUkVPU0xWRUQgOiBrZXk7XG4gICAgfVxuICAgIGxldCBpZCA9IGAke3RhcmdldExvY2FsZX1fXyR7a2V5fWA7XG4gICAgaWYgKCFpc0VtcHR5T2JqZWN0KG92ZXJyaWRlcykpIHtcbiAgICAgICAgaWQgPSBgJHtpZH1fXyR7SlNPTi5zdHJpbmdpZnkob3ZlcnJpZGVzKX1gO1xuICAgIH1cbiAgICBsZXQgZm9ybWF0dGVyID0gX19kYXRldGltZUZvcm1hdHRlcnMuZ2V0KGlkKTtcbiAgICBpZiAoIWZvcm1hdHRlcikge1xuICAgICAgICBmb3JtYXR0ZXIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0YXJnZXRMb2NhbGUsIGFzc2lnbih7fSwgZm9ybWF0LCBvdmVycmlkZXMpKTtcbiAgICAgICAgX19kYXRldGltZUZvcm1hdHRlcnMuc2V0KGlkLCBmb3JtYXR0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gIXBhcnQgPyBmb3JtYXR0ZXIuZm9ybWF0KHZhbHVlKSA6IGZvcm1hdHRlci5mb3JtYXRUb1BhcnRzKHZhbHVlKTtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmNvbnN0IERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMgPSBbXG4gICAgJ2xvY2FsZU1hdGNoZXInLFxuICAgICd3ZWVrZGF5JyxcbiAgICAnZXJhJyxcbiAgICAneWVhcicsXG4gICAgJ21vbnRoJyxcbiAgICAnZGF5JyxcbiAgICAnaG91cicsXG4gICAgJ21pbnV0ZScsXG4gICAgJ3NlY29uZCcsXG4gICAgJ3RpbWVab25lTmFtZScsXG4gICAgJ2Zvcm1hdE1hdGNoZXInLFxuICAgICdob3VyMTInLFxuICAgICd0aW1lWm9uZScsXG4gICAgJ2RhdGVTdHlsZScsXG4gICAgJ3RpbWVTdHlsZScsXG4gICAgJ2NhbGVuZGFyJyxcbiAgICAnZGF5UGVyaW9kJyxcbiAgICAnbnVtYmVyaW5nU3lzdGVtJyxcbiAgICAnaG91ckN5Y2xlJyxcbiAgICAnZnJhY3Rpb25hbFNlY29uZERpZ2l0cydcbl07XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBwYXJzZURhdGVUaW1lQXJncyguLi5hcmdzKSB7XG4gICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzMsIGFyZzRdID0gYXJncztcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgbGV0IG92ZXJyaWRlcyA9IHt9O1xuICAgIGxldCB2YWx1ZTtcbiAgICBpZiAoaXNTdHJpbmcoYXJnMSkpIHtcbiAgICAgICAgLy8gT25seSBhbGxvdyBJU08gc3RyaW5ncyAtIG90aGVyIGRhdGUgZm9ybWF0cyBhcmUgb2Z0ZW4gc3VwcG9ydGVkLFxuICAgICAgICAvLyBidXQgbWF5IGNhdXNlIGRpZmZlcmVudCByZXN1bHRzIGluIGRpZmZlcmVudCBicm93c2Vycy5cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGFyZzEubWF0Y2goLyhcXGR7NH0tXFxkezJ9LVxcZHsyfSkoVHxcXHMpPyguKikvKTtcbiAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9JU09fREFURV9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU29tZSBicm93c2VycyBjYW4gbm90IHBhcnNlIHRoZSBpc28gZGF0ZXRpbWUgc2VwYXJhdGVkIGJ5IHNwYWNlLFxuICAgICAgICAvLyB0aGlzIGlzIGEgY29tcHJvbWlzZSBzb2x1dGlvbiBieSByZXBsYWNlIHRoZSAnVCcvJyAnIHdpdGggJ1QnXG4gICAgICAgIGNvbnN0IGRhdGVUaW1lID0gbWF0Y2hlc1szXVxuICAgICAgICAgICAgPyBtYXRjaGVzWzNdLnRyaW0oKS5zdGFydHNXaXRoKCdUJylcbiAgICAgICAgICAgICAgICA/IGAke21hdGNoZXNbMV0udHJpbSgpfSR7bWF0Y2hlc1szXS50cmltKCl9YFxuICAgICAgICAgICAgICAgIDogYCR7bWF0Y2hlc1sxXS50cmltKCl9VCR7bWF0Y2hlc1szXS50cmltKCl9YFxuICAgICAgICAgICAgOiBtYXRjaGVzWzFdLnRyaW0oKTtcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShkYXRlVGltZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgZmFpbCBpZiB0aGUgZGF0ZSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0lTT19EQVRFX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc0RhdGUoYXJnMSkpIHtcbiAgICAgICAgaWYgKGlzTmFOKGFyZzEuZ2V0VGltZSgpKSkge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLklOVkFMSURfREFURV9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSBhcmcxO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc051bWJlcihhcmcxKSkge1xuICAgICAgICB2YWx1ZSA9IGFyZzE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XG4gICAgfVxuICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICBvcHRpb25zLmtleSA9IGFyZzI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYXJnMikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIG92ZXJyaWRlc1trZXldID0gYXJnMltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gYXJnMltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzU3RyaW5nKGFyZzMpKSB7XG4gICAgICAgIG9wdGlvbnMubG9jYWxlID0gYXJnMztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xuICAgICAgICBvdmVycmlkZXMgPSBhcmczO1xuICAgIH1cbiAgICBpZiAoaXNQbGFpbk9iamVjdChhcmc0KSkge1xuICAgICAgICBvdmVycmlkZXMgPSBhcmc0O1xuICAgIH1cbiAgICByZXR1cm4gW29wdGlvbnMua2V5IHx8ICcnLCB2YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXTtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGNsZWFyRGF0ZVRpbWVGb3JtYXQoY3R4LCBsb2NhbGUsIGZvcm1hdCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjdHg7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybWF0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gYCR7bG9jYWxlfV9fJHtrZXl9YDtcbiAgICAgICAgaWYgKCFjb250ZXh0Ll9fZGF0ZXRpbWVGb3JtYXR0ZXJzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuX19kYXRldGltZUZvcm1hdHRlcnMuZGVsZXRlKGlkKTtcbiAgICB9XG59XG5cbi8vIGltcGxlbWVudGF0aW9uIG9mIGBudW1iZXJgIGZ1bmN0aW9uXG5mdW5jdGlvbiBudW1iZXIoY29udGV4dCwgLi4uYXJncykge1xuICAgIGNvbnN0IHsgbnVtYmVyRm9ybWF0cywgdW5yZXNvbHZpbmcsIGZhbGxiYWNrTG9jYWxlLCBvbldhcm4sIGxvY2FsZUZhbGxiYWNrZXIgfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgeyBfX251bWJlckZvcm1hdHRlcnMgfSA9IGNvbnRleHQ7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiAhQXZhaWxhYmlsaXRpZXMubnVtYmVyRm9ybWF0KSB7XG4gICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkNBTk5PVF9GT1JNQVRfTlVNQkVSKSk7XG4gICAgICAgIHJldHVybiBNSVNTSU5HX1JFU09MVkVfVkFMVUU7XG4gICAgfVxuICAgIGNvbnN0IFtrZXksIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdID0gcGFyc2VOdW1iZXJBcmdzKC4uLmFyZ3MpO1xuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxuICAgICAgICA6IGNvbnRleHQubWlzc2luZ1dhcm47XG4gICAgY29uc3QgZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXG4gICAgICAgIDogY29udGV4dC5mYWxsYmFja1dhcm47XG4gICAgY29uc3QgcGFydCA9ICEhb3B0aW9ucy5wYXJ0O1xuICAgIGNvbnN0IGxvY2FsZSA9IGdldExvY2FsZShjb250ZXh0LCBvcHRpb25zKTtcbiAgICBjb25zdCBsb2NhbGVzID0gbG9jYWxlRmFsbGJhY2tlcihjb250ZXh0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBmYWxsYmFja0xvY2FsZSwgbG9jYWxlKTtcbiAgICBpZiAoIWlzU3RyaW5nKGtleSkgfHwga2V5ID09PSAnJykge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3ZlcnJpZGVzKS5mb3JtYXQodmFsdWUpO1xuICAgIH1cbiAgICAvLyByZXNvbHZlIGZvcm1hdFxuICAgIGxldCBudW1iZXJGb3JtYXQgPSB7fTtcbiAgICBsZXQgdGFyZ2V0TG9jYWxlO1xuICAgIGxldCBmb3JtYXQgPSBudWxsO1xuICAgIGxldCBmcm9tID0gbG9jYWxlO1xuICAgIGxldCB0byA9IG51bGw7XG4gICAgY29uc3QgdHlwZSA9ICdudW1iZXIgZm9ybWF0JztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGFyZ2V0TG9jYWxlID0gdG8gPSBsb2NhbGVzW2ldO1xuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICAgICBsb2NhbGUgIT09IHRhcmdldExvY2FsZSAmJlxuICAgICAgICAgICAgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4oZmFsbGJhY2tXYXJuLCBrZXkpKSB7XG4gICAgICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19OVU1CRVJfRk9STUFULCB7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0TG9jYWxlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlKSB7XG4gICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwiZmFsbGJhY2tcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLkZBTEJBQ0sgKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgICAgICAgICB0byxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7dHlwZX06JHtrZXl9YFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG51bWJlckZvcm1hdCA9XG4gICAgICAgICAgICBudW1iZXJGb3JtYXRzW3RhcmdldExvY2FsZV0gfHwge307XG4gICAgICAgIGZvcm1hdCA9IG51bWJlckZvcm1hdFtrZXldO1xuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChmb3JtYXQpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGhhbmRsZU1pc3NpbmcoY29udGV4dCwga2V5LCB0YXJnZXRMb2NhbGUsIG1pc3NpbmdXYXJuLCB0eXBlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGZyb20gPSB0bztcbiAgICB9XG4gICAgLy8gY2hlY2tpbmcgZm9ybWF0IGFuZCB0YXJnZXQgbG9jYWxlXG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGZvcm1hdCkgfHwgIWlzU3RyaW5nKHRhcmdldExvY2FsZSkpIHtcbiAgICAgICAgcmV0dXJuIHVucmVzb2x2aW5nID8gTk9UX1JFT1NMVkVEIDoga2V5O1xuICAgIH1cbiAgICBsZXQgaWQgPSBgJHt0YXJnZXRMb2NhbGV9X18ke2tleX1gO1xuICAgIGlmICghaXNFbXB0eU9iamVjdChvdmVycmlkZXMpKSB7XG4gICAgICAgIGlkID0gYCR7aWR9X18ke0pTT04uc3RyaW5naWZ5KG92ZXJyaWRlcyl9YDtcbiAgICB9XG4gICAgbGV0IGZvcm1hdHRlciA9IF9fbnVtYmVyRm9ybWF0dGVycy5nZXQoaWQpO1xuICAgIGlmICghZm9ybWF0dGVyKSB7XG4gICAgICAgIGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0YXJnZXRMb2NhbGUsIGFzc2lnbih7fSwgZm9ybWF0LCBvdmVycmlkZXMpKTtcbiAgICAgICAgX19udW1iZXJGb3JtYXR0ZXJzLnNldChpZCwgZm9ybWF0dGVyKTtcbiAgICB9XG4gICAgcmV0dXJuICFwYXJ0ID8gZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSkgOiBmb3JtYXR0ZXIuZm9ybWF0VG9QYXJ0cyh2YWx1ZSk7XG59XG4vKiogQGludGVybmFsICovXG5jb25zdCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUyA9IFtcbiAgICAnbG9jYWxlTWF0Y2hlcicsXG4gICAgJ3N0eWxlJyxcbiAgICAnY3VycmVuY3knLFxuICAgICdjdXJyZW5jeURpc3BsYXknLFxuICAgICdjdXJyZW5jeVNpZ24nLFxuICAgICd1c2VHcm91cGluZycsXG4gICAgJ21pbmltdW1JbnRlZ2VyRGlnaXRzJyxcbiAgICAnbWluaW11bUZyYWN0aW9uRGlnaXRzJyxcbiAgICAnbWF4aW11bUZyYWN0aW9uRGlnaXRzJyxcbiAgICAnbWluaW11bVNpZ25pZmljYW50RGlnaXRzJyxcbiAgICAnbWF4aW11bVNpZ25pZmljYW50RGlnaXRzJyxcbiAgICAnY29tcGFjdERpc3BsYXknLFxuICAgICdub3RhdGlvbicsXG4gICAgJ3NpZ25EaXNwbGF5JyxcbiAgICAndW5pdCcsXG4gICAgJ3VuaXREaXNwbGF5JyxcbiAgICAncm91bmRpbmdNb2RlJyxcbiAgICAncm91bmRpbmdQcmlvcml0eScsXG4gICAgJ3JvdW5kaW5nSW5jcmVtZW50JyxcbiAgICAndHJhaWxpbmdaZXJvRGlzcGxheSdcbl07XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBwYXJzZU51bWJlckFyZ3MoLi4uYXJncykge1xuICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczLCBhcmc0XSA9IGFyZ3M7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGxldCBvdmVycmlkZXMgPSB7fTtcbiAgICBpZiAoIWlzTnVtYmVyKGFyZzEpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBhcmcxO1xuICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICBvcHRpb25zLmtleSA9IGFyZzI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYXJnMikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKE5VTUJFUl9GT1JNQVRfT1BUSU9OU19LRVlTLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICBvdmVycmlkZXNba2V5XSA9IGFyZzJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IGFyZzJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc1N0cmluZyhhcmczKSkge1xuICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMykpIHtcbiAgICAgICAgb3ZlcnJpZGVzID0gYXJnMztcbiAgICB9XG4gICAgaWYgKGlzUGxhaW5PYmplY3QoYXJnNCkpIHtcbiAgICAgICAgb3ZlcnJpZGVzID0gYXJnNDtcbiAgICB9XG4gICAgcmV0dXJuIFtvcHRpb25zLmtleSB8fCAnJywgdmFsdWUsIG9wdGlvbnMsIG92ZXJyaWRlc107XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBjbGVhck51bWJlckZvcm1hdChjdHgsIGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgY29uc3QgY29udGV4dCA9IGN0eDtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtYXQpIHtcbiAgICAgICAgY29uc3QgaWQgPSBgJHtsb2NhbGV9X18ke2tleX1gO1xuICAgICAgICBpZiAoIWNvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzLmRlbGV0ZShpZCk7XG4gICAgfVxufVxuXG57XG4gICAgaW5pdEZlYXR1cmVGbGFncygpO1xufVxuXG5leHBvcnQgeyBDb3JlRXJyb3JDb2RlcywgQ29yZVdhcm5Db2RlcywgREFURVRJTUVfRk9STUFUX09QVElPTlNfS0VZUywgREVGQVVMVF9MT0NBTEUsIERFRkFVTFRfTUVTU0FHRV9EQVRBX1RZUEUsIE1JU1NJTkdfUkVTT0xWRV9WQUxVRSwgTk9UX1JFT1NMVkVELCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUywgVkVSU0lPTiwgY2xlYXJDb21waWxlQ2FjaGUsIGNsZWFyRGF0ZVRpbWVGb3JtYXQsIGNsZWFyTnVtYmVyRm9ybWF0LCBjb21waWxlLCBjb21waWxlVG9GdW5jdGlvbiwgY3JlYXRlQ29yZUNvbnRleHQsIGNyZWF0ZUNvcmVFcnJvciwgY3JlYXRlTWVzc2FnZUNvbnRleHQsIGRhdGV0aW1lLCBmYWxsYmFja1dpdGhMb2NhbGVDaGFpbiwgZmFsbGJhY2tXaXRoU2ltcGxlLCBnZXRBZGRpdGlvbmFsTWV0YSwgZ2V0RGV2VG9vbHNIb29rLCBnZXRGYWxsYmFja0NvbnRleHQsIGdldExvY2FsZSwgZ2V0V2Fybk1lc3NhZ2UsIGhhbmRsZU1pc3NpbmcsIGluaXRJMThuRGV2VG9vbHMsIGlzTWVzc2FnZUFTVCwgaXNNZXNzYWdlRnVuY3Rpb24sIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuLCBpc1RyYW5zbGF0ZU1pc3NpbmdXYXJuLCBudW1iZXIsIHBhcnNlLCBwYXJzZURhdGVUaW1lQXJncywgcGFyc2VOdW1iZXJBcmdzLCBwYXJzZVRyYW5zbGF0ZUFyZ3MsIHJlZ2lzdGVyTG9jYWxlRmFsbGJhY2tlciwgcmVnaXN0ZXJNZXNzYWdlQ29tcGlsZXIsIHJlZ2lzdGVyTWVzc2FnZVJlc29sdmVyLCByZXNvbHZlTG9jYWxlLCByZXNvbHZlVmFsdWUsIHJlc29sdmVXaXRoS2V5VmFsdWUsIHNldEFkZGl0aW9uYWxNZXRhLCBzZXREZXZUb29sc0hvb2ssIHNldEZhbGxiYWNrQ29udGV4dCwgdHJhbnNsYXRlLCB0cmFuc2xhdGVEZXZUb29scywgdXBkYXRlRmFsbGJhY2tMb2NhbGUgfTtcbiIsIi8qIVxuICAqIHZ1ZS1pMThuIHY5LjEyLjFcbiAgKiAoYykgMjAyNCBrYXp1eWEga2F3YWd1Y2hpXG4gICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICAqL1xuaW1wb3J0IHsgZ2V0R2xvYmFsVGhpcywgaW5jcmVtZW50ZXIsIGZvcm1hdCwgbWFrZVN5bWJvbCwgaXNQbGFpbk9iamVjdCwgaXNBcnJheSwgZGVlcENvcHksIGlzU3RyaW5nLCBoYXNPd24sIGlzT2JqZWN0LCB3YXJuLCB3YXJuT25jZSwgaXNCb29sZWFuLCBpc1JlZ0V4cCwgaXNGdW5jdGlvbiwgaW5Ccm93c2VyLCBhc3NpZ24sIGlzTnVtYmVyLCBjcmVhdGVFbWl0dGVyLCBpc0VtcHR5T2JqZWN0IH0gZnJvbSAnQGludGxpZnkvc2hhcmVkJztcbmltcG9ydCB7IENvcmVXYXJuQ29kZXMsIENvcmVFcnJvckNvZGVzLCBjcmVhdGVDb21waWxlRXJyb3IsIERFRkFVTFRfTE9DQUxFLCB1cGRhdGVGYWxsYmFja0xvY2FsZSwgc2V0RmFsbGJhY2tDb250ZXh0LCBjcmVhdGVDb3JlQ29udGV4dCwgY2xlYXJEYXRlVGltZUZvcm1hdCwgY2xlYXJOdW1iZXJGb3JtYXQsIHNldEFkZGl0aW9uYWxNZXRhLCBnZXRGYWxsYmFja0NvbnRleHQsIE5PVF9SRU9TTFZFRCwgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4sIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4sIHBhcnNlVHJhbnNsYXRlQXJncywgdHJhbnNsYXRlLCBNSVNTSU5HX1JFU09MVkVfVkFMVUUsIHBhcnNlRGF0ZVRpbWVBcmdzLCBkYXRldGltZSwgcGFyc2VOdW1iZXJBcmdzLCBudW1iZXIsIGlzTWVzc2FnZUFTVCwgaXNNZXNzYWdlRnVuY3Rpb24sIGZhbGxiYWNrV2l0aExvY2FsZUNoYWluLCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUywgREFURVRJTUVfRk9STUFUX09QVElPTlNfS0VZUywgcmVnaXN0ZXJNZXNzYWdlQ29tcGlsZXIsIGNvbXBpbGUsIHJlZ2lzdGVyTWVzc2FnZVJlc29sdmVyLCByZXNvbHZlVmFsdWUsIHJlZ2lzdGVyTG9jYWxlRmFsbGJhY2tlciwgc2V0RGV2VG9vbHNIb29rIH0gZnJvbSAnQGludGxpZnkvY29yZS1iYXNlJztcbmltcG9ydCB7IGNyZWF0ZVZOb2RlLCBUZXh0LCBjb21wdXRlZCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSwgcmVmLCBzaGFsbG93UmVmLCBGcmFnbWVudCwgZGVmaW5lQ29tcG9uZW50LCBoLCBlZmZlY3RTY29wZSwgaW5qZWN0LCBvbk1vdW50ZWQsIG9uVW5tb3VudGVkLCBvbkJlZm9yZU1vdW50LCBpc1JlZiB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBzZXR1cERldnRvb2xzUGx1Z2luIH0gZnJvbSAnQHZ1ZS9kZXZ0b29scy1hcGknO1xuXG4vKipcbiAqIFZ1ZSBJMThuIFZlcnNpb25cbiAqXG4gKiBAcmVtYXJrc1xuICogU2VtdmVyIGZvcm1hdC4gU2FtZSBmb3JtYXQgYXMgdGhlIHBhY2thZ2UuanNvbiBgdmVyc2lvbmAgZmllbGQuXG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmNvbnN0IFZFUlNJT04gPSAnOS4xMi4xJztcbi8qKlxuICogVGhpcyBpcyBvbmx5IGNhbGxlZCBpbiBlc20tYnVuZGxlciBidWlsZHMuXG4gKiBpc3RhbmJ1bC1pZ25vcmUtbmV4dFxuICovXG5mdW5jdGlvbiBpbml0RmVhdHVyZUZsYWdzKCkge1xuICAgIGlmICh0eXBlb2YgX19WVUVfSTE4Tl9GVUxMX0lOU1RBTExfXyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGdldEdsb2JhbFRoaXMoKS5fX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGdldEdsb2JhbFRoaXMoKS5fX1ZVRV9JMThOX0xFR0FDWV9BUElfXyA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX0pJVF9DT01QSUxBVElPTl9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9KSVRfQ09NUElMQVRJT05fXyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fSU5UTElGWV9EUk9QX01FU1NBR0VfQ09NUElMRVJfXyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGdldEdsb2JhbFRoaXMoKS5fX0lOVExJRllfRFJPUF9NRVNTQUdFX0NPTVBJTEVSX18gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gPSBmYWxzZTtcbiAgICB9XG59XG5cbmNvbnN0IGNvZGUkMSA9IENvcmVXYXJuQ29kZXMuX19FWFRFTkRfUE9JTlRfXztcbmNvbnN0IGluYyQxID0gaW5jcmVtZW50ZXIoY29kZSQxKTtcbmNvbnN0IEkxOG5XYXJuQ29kZXMgPSB7XG4gICAgRkFMTEJBQ0tfVE9fUk9PVDogY29kZSQxLCAvLyA5XG4gICAgTk9UX1NVUFBPUlRFRF9QUkVTRVJWRTogaW5jJDEoKSwgLy8gMTBcbiAgICBOT1RfU1VQUE9SVEVEX0ZPUk1BVFRFUjogaW5jJDEoKSwgLy8gMTFcbiAgICBOT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRTogaW5jJDEoKSwgLy8gMTJcbiAgICBOT1RfU1VQUE9SVEVEX0dFVF9DSE9JQ0VfSU5ERVg6IGluYyQxKCksIC8vIDEzXG4gICAgQ09NUE9ORU5UX05BTUVfTEVHQUNZX0NPTVBBVElCTEU6IGluYyQxKCksIC8vIDE0XG4gICAgTk9UX0ZPVU5EX1BBUkVOVF9TQ09QRTogaW5jJDEoKSwgLy8gMTVcbiAgICBJR05PUkVfT0JKX0ZMQVRURU46IGluYyQxKCksIC8vIDE2XG4gICAgTk9USUNFX0RST1BfQUxMT1dfQ09NUE9TSVRJT046IGluYyQxKCksIC8vIDE3XG4gICAgTk9USUNFX0RST1BfVFJBTlNMQVRFX0VYSVNUX0NPTVBBVElCTEVfRkxBRzogaW5jJDEoKSAvLyAxOFxufTtcbmNvbnN0IHdhcm5NZXNzYWdlcyA9IHtcbiAgICBbSTE4bldhcm5Db2Rlcy5GQUxMQkFDS19UT19ST09UXTogYEZhbGwgYmFjayB0byB7dHlwZX0gJ3trZXl9JyB3aXRoIHJvb3QgbG9jYWxlLmAsXG4gICAgW0kxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRV06IGBOb3Qgc3VwcG9ydGVkICdwcmVzZXJ2ZScuYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX0ZPUk1BVFRFUl06IGBOb3Qgc3VwcG9ydGVkICdmb3JtYXR0ZXInLmAsXG4gICAgW0kxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRV9ESVJFQ1RJVkVdOiBgTm90IHN1cHBvcnRlZCAncHJlc2VydmVEaXJlY3RpdmVDb250ZW50Jy5gLFxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfR0VUX0NIT0lDRV9JTkRFWF06IGBOb3Qgc3VwcG9ydGVkICdnZXRDaG9pY2VJbmRleCcuYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5DT01QT05FTlRfTkFNRV9MRUdBQ1lfQ09NUEFUSUJMRV06IGBDb21wb25lbnQgbmFtZSBsZWdhY3kgY29tcGF0aWJsZTogJ3tuYW1lfScgLT4gJ2kxOG4nYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RfRk9VTkRfUEFSRU5UX1NDT1BFXTogYE5vdCBmb3VuZCBwYXJlbnQgc2NvcGUuIHVzZSB0aGUgZ2xvYmFsIHNjb3BlLmAsXG4gICAgW0kxOG5XYXJuQ29kZXMuSUdOT1JFX09CSl9GTEFUVEVOXTogYElnbm9yZSBvYmplY3QgZmxhdHRlbjogJ3trZXl9JyBrZXkgaGFzIGFuIHN0cmluZyB2YWx1ZWAsXG4gICAgW0kxOG5XYXJuQ29kZXMuTk9USUNFX0RST1BfQUxMT1dfQ09NUE9TSVRJT05dOiBgJ2FsbG93Q29tcG9zaXRpb24nIG9wdGlvbiB3aWxsIGJlIGRyb3BwZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbi4gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUg8J+RiSBodHRwczovL3Rpbnl1cmwuY29tLzJwOTdtY3plYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RJQ0VfRFJPUF9UUkFOU0xBVEVfRVhJU1RfQ09NUEFUSUJMRV9GTEFHXTogYCd0cmFuc2xhdGVFeGlzdENvbXBhdGlibGUnIG9wdGlvbiB3aWxsIGJlIGRyb3BwZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbi5gXG59O1xuZnVuY3Rpb24gZ2V0V2Fybk1lc3NhZ2UoY29kZSwgLi4uYXJncykge1xuICAgIHJldHVybiBmb3JtYXQod2Fybk1lc3NhZ2VzW2NvZGVdLCAuLi5hcmdzKTtcbn1cblxuY29uc3QgY29kZSA9IENvcmVFcnJvckNvZGVzLl9fRVhURU5EX1BPSU5UX187XG5jb25zdCBpbmMgPSBpbmNyZW1lbnRlcihjb2RlKTtcbmNvbnN0IEkxOG5FcnJvckNvZGVzID0ge1xuICAgIC8vIGNvbXBvc2VyIG1vZHVsZSBlcnJvcnNcbiAgICBVTkVYUEVDVEVEX1JFVFVSTl9UWVBFOiBjb2RlLCAvLyAyNFxuICAgIC8vIGxlZ2FjeSBtb2R1bGUgZXJyb3JzXG4gICAgSU5WQUxJRF9BUkdVTUVOVDogaW5jKCksIC8vIDI1XG4gICAgLy8gaTE4biBtb2R1bGUgZXJyb3JzXG4gICAgTVVTVF9CRV9DQUxMX1NFVFVQX1RPUDogaW5jKCksIC8vIDI2XG4gICAgTk9UX0lOU1RBTExFRDogaW5jKCksIC8vIDI3XG4gICAgTk9UX0FWQUlMQUJMRV9JTl9MRUdBQ1lfTU9ERTogaW5jKCksIC8vIDI4XG4gICAgLy8gZGlyZWN0aXZlIG1vZHVsZSBlcnJvcnNcbiAgICBSRVFVSVJFRF9WQUxVRTogaW5jKCksIC8vIDI5XG4gICAgSU5WQUxJRF9WQUxVRTogaW5jKCksIC8vIDMwXG4gICAgLy8gdnVlLWRldnRvb2xzIGVycm9yc1xuICAgIENBTk5PVF9TRVRVUF9WVUVfREVWVE9PTFNfUExVR0lOOiBpbmMoKSwgLy8gMzFcbiAgICBOT1RfSU5TVEFMTEVEX1dJVEhfUFJPVklERTogaW5jKCksIC8vIDMyXG4gICAgLy8gdW5leHBlY3RlZCBlcnJvclxuICAgIFVORVhQRUNURURfRVJST1I6IGluYygpLCAvLyAzM1xuICAgIC8vIG5vdCBjb21wYXRpYmxlIGxlZ2FjeSB2dWUtaTE4biBjb25zdHJ1Y3RvclxuICAgIE5PVF9DT01QQVRJQkxFX0xFR0FDWV9WVUVfSTE4TjogaW5jKCksIC8vIDM0XG4gICAgLy8gYnJpZGdlIHN1cHBvcnQgdnVlIDIueCBvbmx5XG4gICAgQlJJREdFX1NVUFBPUlRfVlVFXzJfT05MWTogaW5jKCksIC8vIDM1XG4gICAgLy8gbmVlZCB0byBkZWZpbmUgYGkxOG5gIG9wdGlvbiBpbiBgYWxsb3dDb21wb3NpdGlvbjogdHJ1ZWAgYW5kIGB1c2VTY29wZTogJ2xvY2FsJyBhdCBgdXNlSTE4bmBgXG4gICAgTVVTVF9ERUZJTkVfSTE4Tl9PUFRJT05fSU5fQUxMT1dfQ09NUE9TSVRJT046IGluYygpLCAvLyAzNlxuICAgIC8vIE5vdCBhdmFpbGFibGUgQ29tcG9zdGlvbiBBUEkgaW4gTGVnYWN5IEFQSSBtb2RlLiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQgdGhlIGxlZ2FjeSBBUEkgbW9kZSBpcyB3b3JraW5nIHByb3Blcmx5XG4gICAgTk9UX0FWQUlMQUJMRV9DT01QT1NJVElPTl9JTl9MRUdBQ1k6IGluYygpLCAvLyAzN1xuICAgIC8vIGZvciBlbmhhbmNlbWVudFxuICAgIF9fRVhURU5EX1BPSU5UX186IGluYygpIC8vIDM4XG59O1xuZnVuY3Rpb24gY3JlYXRlSTE4bkVycm9yKGNvZGUsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gY3JlYXRlQ29tcGlsZUVycm9yKGNvZGUsIG51bGwsIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSA/IHsgbWVzc2FnZXM6IGVycm9yTWVzc2FnZXMsIGFyZ3MgfSA6IHVuZGVmaW5lZCk7XG59XG5jb25zdCBlcnJvck1lc3NhZ2VzID0ge1xuICAgIFtJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX1JFVFVSTl9UWVBFXTogJ1VuZXhwZWN0ZWQgcmV0dXJuIHR5cGUgaW4gY29tcG9zZXInLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UXTogJ0ludmFsaWQgYXJndW1lbnQnLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5NVVNUX0JFX0NBTExfU0VUVVBfVE9QXTogJ011c3QgYmUgY2FsbGVkIGF0IHRoZSB0b3Agb2YgYSBgc2V0dXBgIGZ1bmN0aW9uJyxcbiAgICBbSTE4bkVycm9yQ29kZXMuTk9UX0lOU1RBTExFRF06ICdOZWVkIHRvIGluc3RhbGwgd2l0aCBgYXBwLnVzZWAgZnVuY3Rpb24nLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SXTogJ1VuZXhwZWN0ZWQgZXJyb3InLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0lOX0xFR0FDWV9NT0RFXTogJ05vdCBhdmFpbGFibGUgaW4gbGVnYWN5IG1vZGUnLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5SRVFVSVJFRF9WQUxVRV06IGBSZXF1aXJlZCBpbiB2YWx1ZTogezB9YCxcbiAgICBbSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9WQUxVRV06IGBJbnZhbGlkIHZhbHVlYCxcbiAgICBbSTE4bkVycm9yQ29kZXMuQ0FOTk9UX1NFVFVQX1ZVRV9ERVZUT09MU19QTFVHSU5dOiBgQ2Fubm90IHNldHVwIHZ1ZS1kZXZ0b29scyBwbHVnaW5gLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfSU5TVEFMTEVEX1dJVEhfUFJPVklERV06ICdOZWVkIHRvIGluc3RhbGwgd2l0aCBgcHJvdmlkZWAgZnVuY3Rpb24nLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfQ09NUEFUSUJMRV9MRUdBQ1lfVlVFX0kxOE5dOiAnTm90IGNvbXBhdGlibGUgbGVnYWN5IFZ1ZUkxOG4uJyxcbiAgICBbSTE4bkVycm9yQ29kZXMuQlJJREdFX1NVUFBPUlRfVlVFXzJfT05MWV06ICd2dWUtaTE4bi1icmlkZ2Ugc3VwcG9ydCBWdWUgMi54IG9ubHknLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5NVVNUX0RFRklORV9JMThOX09QVElPTl9JTl9BTExPV19DT01QT1NJVElPTl06ICdNdXN0IGRlZmluZSDigJhpMThu4oCZIG9wdGlvbiBvciBjdXN0b20gYmxvY2sgaW4gQ29tcG9zaXRpb24gQVBJIHdpdGggdXNpbmcgbG9jYWwgc2NvcGUgaW4gTGVnYWN5IEFQSSBtb2RlJyxcbiAgICBbSTE4bkVycm9yQ29kZXMuTk9UX0FWQUlMQUJMRV9DT01QT1NJVElPTl9JTl9MRUdBQ1ldOiAnTm90IGF2YWlsYWJsZSBDb21wb3N0aW9uIEFQSSBpbiBMZWdhY3kgQVBJIG1vZGUuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB0aGUgbGVnYWN5IEFQSSBtb2RlIGlzIHdvcmtpbmcgcHJvcGVybHknXG59O1xuXG5jb25zdCBUcmFuc2xhdGVWTm9kZVN5bWJvbCA9IFxuLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX190cmFuc2xhdGVWTm9kZScpO1xuY29uc3QgRGF0ZXRpbWVQYXJ0c1N5bWJvbCA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fZGF0ZXRpbWVQYXJ0cycpO1xuY29uc3QgTnVtYmVyUGFydHNTeW1ib2wgPSAvKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX251bWJlclBhcnRzJyk7XG5jb25zdCBFbmFibGVFbWl0dGVyID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19lbmFibGVFbWl0dGVyJyk7XG5jb25zdCBEaXNhYmxlRW1pdHRlciA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fZGlzYWJsZUVtaXR0ZXInKTtcbmNvbnN0IFNldFBsdXJhbFJ1bGVzU3ltYm9sID0gbWFrZVN5bWJvbCgnX19zZXRQbHVyYWxSdWxlcycpO1xubWFrZVN5bWJvbCgnX19pbnRsaWZ5TWV0YScpO1xuY29uc3QgSW5lamN0V2l0aE9wdGlvblN5bWJvbCA9IFxuLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19pbmplY3RXaXRoT3B0aW9uJyk7XG5jb25zdCBEaXNwb3NlU3ltYm9sID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19kaXNwb3NlJyk7XG5jb25zdCBfX1ZVRV9JMThOX0JSSURHRV9fID0gICdfX1ZVRV9JMThOX0JSSURHRV9fJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyoqXG4gKiBUcmFuc2Zvcm0gZmxhdCBqc29uIGluIG9iaiB0byBub3JtYWwganNvbiBpbiBvYmpcbiAqL1xuZnVuY3Rpb24gaGFuZGxlRmxhdEpzb24ob2JqKSB7XG4gICAgLy8gY2hlY2sgb2JqXG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAvLyBjaGVjayBrZXlcbiAgICAgICAgaWYgKCFoYXNPd24ob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBoYW5kbGUgZm9yIG5vcm1hbCBqc29uXG4gICAgICAgIGlmICgha2V5LmluY2x1ZGVzKCcuJykpIHtcbiAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZSBwcm9jZXNzIHZhbHVlIGlmIHZhbHVlIGlzIGFsc28gYSBvYmplY3RcbiAgICAgICAgICAgIGlmIChpc09iamVjdChvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVGbGF0SnNvbihvYmpba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaGFuZGxlIGZvciBmbGF0IGpzb24sIHRyYW5zZm9ybSB0byBub3JtYWwganNvblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGdvIHRvIHRoZSBsYXN0IG9iamVjdFxuICAgICAgICAgICAgY29uc3Qgc3ViS2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gc3ViS2V5cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRPYmogPSBvYmo7XG4gICAgICAgICAgICBsZXQgaGFzU3RyaW5nVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIShzdWJLZXlzW2ldIGluIGN1cnJlbnRPYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRPYmpbc3ViS2V5c1tpXV0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc09iamVjdChjdXJyZW50T2JqW3N1YktleXNbaV1dKSkge1xuICAgICAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5JR05PUkVfT0JKX0ZMQVRURU4sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHN1YktleXNbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzU3RyaW5nVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VycmVudE9iaiA9IGN1cnJlbnRPYmpbc3ViS2V5c1tpXV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB1cGRhdGUgbGFzdCBvYmplY3QgdmFsdWUsIGRlbGV0ZSBvbGQgcHJvcGVydHlcbiAgICAgICAgICAgIGlmICghaGFzU3RyaW5nVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqW3N1YktleXNbbGFzdEluZGV4XV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZWN1cnNpdmUgcHJvY2VzcyB2YWx1ZSBpZiB2YWx1ZSBpcyBhbHNvIGEgb2JqZWN0XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY3VycmVudE9ialtzdWJLZXlzW2xhc3RJbmRleF1dKSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUZsYXRKc29uKGN1cnJlbnRPYmpbc3ViS2V5c1tsYXN0SW5kZXhdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmZ1bmN0aW9uIGdldExvY2FsZU1lc3NhZ2VzKGxvY2FsZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgbWVzc2FnZXMsIF9faTE4biwgbWVzc2FnZVJlc29sdmVyLCBmbGF0SnNvbiB9ID0gb3B0aW9ucztcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCByZXQgPSAoaXNQbGFpbk9iamVjdChtZXNzYWdlcylcbiAgICAgICAgPyBtZXNzYWdlc1xuICAgICAgICA6IGlzQXJyYXkoX19pMThuKVxuICAgICAgICAgICAgPyB7fVxuICAgICAgICAgICAgOiB7IFtsb2NhbGVdOiB7fSB9KTtcbiAgICAvLyBtZXJnZSBsb2NhbGUgbWVzc2FnZXMgb2YgaTE4biBjdXN0b20gYmxvY2tcbiAgICBpZiAoaXNBcnJheShfX2kxOG4pKSB7XG4gICAgICAgIF9faTE4bi5mb3JFYWNoKGN1c3RvbSA9PiB7XG4gICAgICAgICAgICBpZiAoJ2xvY2FsZScgaW4gY3VzdG9tICYmICdyZXNvdXJjZScgaW4gY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBsb2NhbGUsIHJlc291cmNlIH0gPSBjdXN0b207XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXRbbG9jYWxlXSA9IHJldFtsb2NhbGVdIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICBkZWVwQ29weShyZXNvdXJjZSwgcmV0W2xvY2FsZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVlcENvcHkocmVzb3VyY2UsIHJldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaXNTdHJpbmcoY3VzdG9tKSAmJiBkZWVwQ29weShKU09OLnBhcnNlKGN1c3RvbSksIHJldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBoYW5kbGUgbWVzc2FnZXMgZm9yIGZsYXQganNvblxuICAgIGlmIChtZXNzYWdlUmVzb2x2ZXIgPT0gbnVsbCAmJiBmbGF0SnNvbikge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXQpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24ocmV0LCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRmxhdEpzb24ocmV0W2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50T3B0aW9ucyhpbnN0YW5jZSkge1xuICAgIHJldHVybiBpbnN0YW5jZS50eXBlIDtcbn1cbmZ1bmN0aW9uIGFkanVzdEkxOG5SZXNvdXJjZXMoZ2wsIG9wdGlvbnMsIGNvbXBvbmVudE9wdGlvbnMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4pIHtcbiAgICBsZXQgbWVzc2FnZXMgPSBpc09iamVjdChvcHRpb25zLm1lc3NhZ2VzKSA/IG9wdGlvbnMubWVzc2FnZXMgOiB7fTtcbiAgICBpZiAoJ19faTE4bkdsb2JhbCcgaW4gY29tcG9uZW50T3B0aW9ucykge1xuICAgICAgICBtZXNzYWdlcyA9IGdldExvY2FsZU1lc3NhZ2VzKGdsLmxvY2FsZS52YWx1ZSwge1xuICAgICAgICAgICAgbWVzc2FnZXMsXG4gICAgICAgICAgICBfX2kxOG46IGNvbXBvbmVudE9wdGlvbnMuX19pMThuR2xvYmFsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBtZXJnZSBsb2NhbGUgbWVzc2FnZXNcbiAgICBjb25zdCBsb2NhbGVzID0gT2JqZWN0LmtleXMobWVzc2FnZXMpO1xuICAgIGlmIChsb2NhbGVzLmxlbmd0aCkge1xuICAgICAgICBsb2NhbGVzLmZvckVhY2gobG9jYWxlID0+IHtcbiAgICAgICAgICAgIGdsLm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2VzW2xvY2FsZV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAge1xuICAgICAgICAvLyBtZXJnZSBkYXRldGltZSBmb3JtYXRzXG4gICAgICAgIGlmIChpc09iamVjdChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGV0aW1lRm9ybWF0cyk7XG4gICAgICAgICAgICBpZiAobG9jYWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVzLmZvckVhY2gobG9jYWxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZ2wubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzW2xvY2FsZV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIG1lcmdlIG51bWJlciBmb3JtYXRzXG4gICAgICAgIGlmIChpc09iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbGVzID0gT2JqZWN0LmtleXMob3B0aW9ucy5udW1iZXJGb3JtYXRzKTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxvY2FsZXMuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnbC5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMubnVtYmVyRm9ybWF0c1tsb2NhbGVdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKGtleSkge1xuICAgIHJldHVybiBjcmVhdGVWTm9kZShUZXh0LCBudWxsLCBrZXksIDApXG4gICAgICAgIDtcbn1cbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vLyBleHRlbmQgVk5vZGUgaW50ZXJmYWNlXG5jb25zdCBERVZUT09MU19NRVRBID0gJ19fSU5UTElGWV9NRVRBX18nO1xuY29uc3QgTk9PUF9SRVRVUk5fQVJSQVkgPSAoKSA9PiBbXTtcbmNvbnN0IE5PT1BfUkVUVVJOX0ZBTFNFID0gKCkgPT4gZmFsc2U7XG5sZXQgY29tcG9zZXJJRCA9IDA7XG5mdW5jdGlvbiBkZWZpbmVDb3JlTWlzc2luZ0hhbmRsZXIobWlzc2luZykge1xuICAgIHJldHVybiAoKGN0eCwgbG9jYWxlLCBrZXksIHR5cGUpID0+IHtcbiAgICAgICAgcmV0dXJuIG1pc3NpbmcobG9jYWxlLCBrZXksIGdldEN1cnJlbnRJbnN0YW5jZSgpIHx8IHVuZGVmaW5lZCwgdHlwZSk7XG4gICAgfSk7XG59XG4vLyBmb3IgSW50bGlmeSBEZXZUb29sc1xuLyogI19fTk9fU0lERV9FRkZFQ1RTX18gKi9cbmNvbnN0IGdldE1ldGFJbmZvID0gKCkgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gICAgbGV0IG1ldGEgPSBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICByZXR1cm4gaW5zdGFuY2UgJiYgKG1ldGEgPSBnZXRDb21wb25lbnRPcHRpb25zKGluc3RhbmNlKVtERVZUT09MU19NRVRBXSlcbiAgICAgICAgPyB7IFtERVZUT09MU19NRVRBXTogbWV0YSB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICA6IG51bGw7XG59O1xuLyoqXG4gKiBDcmVhdGUgY29tcG9zZXIgaW50ZXJmYWNlIGZhY3RvcnlcbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvc2VyKG9wdGlvbnMgPSB7fSwgVnVlSTE4bkxlZ2FjeSkge1xuICAgIGNvbnN0IHsgX19yb290LCBfX2luamVjdFdpdGhPcHRpb24gfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgX2lzR2xvYmFsID0gX19yb290ID09PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgZmxhdEpzb24gPSBvcHRpb25zLmZsYXRKc29uO1xuICAgIGNvbnN0IF9yZWYgPSBpbkJyb3dzZXIgPyByZWYgOiBzaGFsbG93UmVmO1xuICAgIGNvbnN0IHRyYW5zbGF0ZUV4aXN0Q29tcGF0aWJsZSA9ICEhb3B0aW9ucy50cmFuc2xhdGVFeGlzdENvbXBhdGlibGU7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICBpZiAodHJhbnNsYXRlRXhpc3RDb21wYXRpYmxlICYmICFmYWxzZSkge1xuICAgICAgICAgICAgd2Fybk9uY2UoZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RJQ0VfRFJPUF9UUkFOU0xBVEVfRVhJU1RfQ09NUEFUSUJMRV9GTEFHKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IF9pbmhlcml0TG9jYWxlID0gaXNCb29sZWFuKG9wdGlvbnMuaW5oZXJpdExvY2FsZSlcbiAgICAgICAgPyBvcHRpb25zLmluaGVyaXRMb2NhbGVcbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IF9sb2NhbGUgPSBfcmVmKFxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIF9fcm9vdCAmJiBfaW5oZXJpdExvY2FsZVxuICAgICAgICA/IF9fcm9vdC5sb2NhbGUudmFsdWVcbiAgICAgICAgOiBpc1N0cmluZyhvcHRpb25zLmxvY2FsZSlcbiAgICAgICAgICAgID8gb3B0aW9ucy5sb2NhbGVcbiAgICAgICAgICAgIDogREVGQVVMVF9MT0NBTEUpO1xuICAgIGNvbnN0IF9mYWxsYmFja0xvY2FsZSA9IF9yZWYoXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgX19yb290ICYmIF9pbmhlcml0TG9jYWxlXG4gICAgICAgID8gX19yb290LmZhbGxiYWNrTG9jYWxlLnZhbHVlXG4gICAgICAgIDogaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIGlzQXJyYXkob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIGlzUGxhaW5PYmplY3Qob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGVcbiAgICAgICAgICAgIDogX2xvY2FsZS52YWx1ZSk7XG4gICAgY29uc3QgX21lc3NhZ2VzID0gX3JlZihnZXRMb2NhbGVNZXNzYWdlcyhfbG9jYWxlLnZhbHVlLCBvcHRpb25zKSk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX2RhdGV0aW1lRm9ybWF0cyA9IF9yZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cylcbiAgICAgICAgICAgID8gb3B0aW9ucy5kYXRldGltZUZvcm1hdHNcbiAgICAgICAgICAgIDogeyBbX2xvY2FsZS52YWx1ZV06IHt9IH0pXG4gICAgICAgIDtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfbnVtYmVyRm9ybWF0cyA9IF9yZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpXG4gICAgICAgICAgICA/IG9wdGlvbnMubnVtYmVyRm9ybWF0c1xuICAgICAgICAgICAgOiB7IFtfbG9jYWxlLnZhbHVlXToge30gfSlcbiAgICAgICAgO1xuICAgIC8vIHdhcm5pbmcgc3VwcHJlc3Mgb3B0aW9uc1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGxldCBfbWlzc2luZ1dhcm4gPSBfX3Jvb3RcbiAgICAgICAgPyBfX3Jvb3QubWlzc2luZ1dhcm5cbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5taXNzaW5nV2FybilcbiAgICAgICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGxldCBfZmFsbGJhY2tXYXJuID0gX19yb290XG4gICAgICAgID8gX19yb290LmZhbGxiYWNrV2FyblxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgbGV0IF9mYWxsYmFja1Jvb3QgPSBfX3Jvb3RcbiAgICAgICAgPyBfX3Jvb3QuZmFsbGJhY2tSb290XG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tSb290KVxuICAgICAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrUm9vdFxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIC8vIGNvbmZpZ3VyZSBmYWxsIGJhY2sgdG8gcm9vdFxuICAgIGxldCBfZmFsbGJhY2tGb3JtYXQgPSAhIW9wdGlvbnMuZmFsbGJhY2tGb3JtYXQ7XG4gICAgLy8gcnVudGltZSBtaXNzaW5nXG4gICAgbGV0IF9taXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogbnVsbDtcbiAgICBsZXQgX3J1bnRpbWVNaXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpXG4gICAgICAgID8gZGVmaW5lQ29yZU1pc3NpbmdIYW5kbGVyKG9wdGlvbnMubWlzc2luZylcbiAgICAgICAgOiBudWxsO1xuICAgIC8vIHBvc3RUcmFuc2xhdGlvbiBoYW5kbGVyXG4gICAgbGV0IF9wb3N0VHJhbnNsYXRpb24gPSBpc0Z1bmN0aW9uKG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uKVxuICAgICAgICA/IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uXG4gICAgICAgIDogbnVsbDtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBsZXQgX3dhcm5IdG1sTWVzc2FnZSA9IF9fcm9vdFxuICAgICAgICA/IF9fcm9vdC53YXJuSHRtbE1lc3NhZ2VcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgICAgICA/IG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgbGV0IF9lc2NhcGVQYXJhbWV0ZXIgPSAhIW9wdGlvbnMuZXNjYXBlUGFyYW1ldGVyO1xuICAgIC8vIGN1c3RvbSBsaW5rZWQgbW9kaWZpZXJzXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX21vZGlmaWVycyA9IF9fcm9vdFxuICAgICAgICA/IF9fcm9vdC5tb2RpZmllcnNcbiAgICAgICAgOiBpc1BsYWluT2JqZWN0KG9wdGlvbnMubW9kaWZpZXJzKVxuICAgICAgICAgICAgPyBvcHRpb25zLm1vZGlmaWVyc1xuICAgICAgICAgICAgOiB7fTtcbiAgICAvLyBwbHVyYWxSdWxlc1xuICAgIGxldCBfcGx1cmFsUnVsZXMgPSBvcHRpb25zLnBsdXJhbFJ1bGVzIHx8IChfX3Jvb3QgJiYgX19yb290LnBsdXJhbFJ1bGVzKTtcbiAgICAvLyBydW50aW1lIGNvbnRleHRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0XG4gICAgbGV0IF9jb250ZXh0O1xuICAgIGNvbnN0IGdldENvcmVDb250ZXh0ID0gKCkgPT4ge1xuICAgICAgICBfaXNHbG9iYWwgJiYgc2V0RmFsbGJhY2tDb250ZXh0KG51bGwpO1xuICAgICAgICBjb25zdCBjdHhPcHRpb25zID0ge1xuICAgICAgICAgICAgdmVyc2lvbjogVkVSU0lPTixcbiAgICAgICAgICAgIGxvY2FsZTogX2xvY2FsZS52YWx1ZSxcbiAgICAgICAgICAgIGZhbGxiYWNrTG9jYWxlOiBfZmFsbGJhY2tMb2NhbGUudmFsdWUsXG4gICAgICAgICAgICBtZXNzYWdlczogX21lc3NhZ2VzLnZhbHVlLFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBfbW9kaWZpZXJzLFxuICAgICAgICAgICAgcGx1cmFsUnVsZXM6IF9wbHVyYWxSdWxlcyxcbiAgICAgICAgICAgIG1pc3Npbmc6IF9ydW50aW1lTWlzc2luZyA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IF9ydW50aW1lTWlzc2luZyxcbiAgICAgICAgICAgIG1pc3NpbmdXYXJuOiBfbWlzc2luZ1dhcm4sXG4gICAgICAgICAgICBmYWxsYmFja1dhcm46IF9mYWxsYmFja1dhcm4sXG4gICAgICAgICAgICBmYWxsYmFja0Zvcm1hdDogX2ZhbGxiYWNrRm9ybWF0LFxuICAgICAgICAgICAgdW5yZXNvbHZpbmc6IHRydWUsXG4gICAgICAgICAgICBwb3N0VHJhbnNsYXRpb246IF9wb3N0VHJhbnNsYXRpb24gPT09IG51bGwgPyB1bmRlZmluZWQgOiBfcG9zdFRyYW5zbGF0aW9uLFxuICAgICAgICAgICAgd2Fybkh0bWxNZXNzYWdlOiBfd2Fybkh0bWxNZXNzYWdlLFxuICAgICAgICAgICAgZXNjYXBlUGFyYW1ldGVyOiBfZXNjYXBlUGFyYW1ldGVyLFxuICAgICAgICAgICAgbWVzc2FnZVJlc29sdmVyOiBvcHRpb25zLm1lc3NhZ2VSZXNvbHZlcixcbiAgICAgICAgICAgIG1lc3NhZ2VDb21waWxlcjogb3B0aW9ucy5tZXNzYWdlQ29tcGlsZXIsXG4gICAgICAgICAgICBfX21ldGE6IHsgZnJhbWV3b3JrOiAndnVlJyB9XG4gICAgICAgIH07XG4gICAgICAgIHtcbiAgICAgICAgICAgIGN0eE9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzID0gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgICAgIGN0eE9wdGlvbnMubnVtYmVyRm9ybWF0cyA9IF9udW1iZXJGb3JtYXRzLnZhbHVlO1xuICAgICAgICAgICAgY3R4T3B0aW9ucy5fX2RhdGV0aW1lRm9ybWF0dGVycyA9IGlzUGxhaW5PYmplY3QoX2NvbnRleHQpXG4gICAgICAgICAgICAgICAgPyBfY29udGV4dC5fX2RhdGV0aW1lRm9ybWF0dGVyc1xuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY3R4T3B0aW9ucy5fX251bWJlckZvcm1hdHRlcnMgPSBpc1BsYWluT2JqZWN0KF9jb250ZXh0KVxuICAgICAgICAgICAgICAgID8gX2NvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICAgICAgY3R4T3B0aW9ucy5fX3ZfZW1pdHRlciA9IGlzUGxhaW5PYmplY3QoX2NvbnRleHQpXG4gICAgICAgICAgICAgICAgPyBfY29udGV4dC5fX3ZfZW1pdHRlclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN0eCA9IGNyZWF0ZUNvcmVDb250ZXh0KGN0eE9wdGlvbnMpO1xuICAgICAgICBfaXNHbG9iYWwgJiYgc2V0RmFsbGJhY2tDb250ZXh0KGN0eCk7XG4gICAgICAgIHJldHVybiBjdHg7XG4gICAgfTtcbiAgICBfY29udGV4dCA9IGdldENvcmVDb250ZXh0KCk7XG4gICAgdXBkYXRlRmFsbGJhY2tMb2NhbGUoX2NvbnRleHQsIF9sb2NhbGUudmFsdWUsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSk7XG4gICAgLy8gdHJhY2sgcmVhY3Rpdml0eVxuICAgIGZ1bmN0aW9uIHRyYWNrUmVhY3Rpdml0eVZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlLFxuICAgICAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBfbWVzc2FnZXMudmFsdWUsXG4gICAgICAgICAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSxcbiAgICAgICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgO1xuICAgIH1cbiAgICAvLyBsb2NhbGVcbiAgICBjb25zdCBsb2NhbGUgPSBjb21wdXRlZCh7XG4gICAgICAgIGdldDogKCkgPT4gX2xvY2FsZS52YWx1ZSxcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIF9jb250ZXh0LmxvY2FsZSA9IF9sb2NhbGUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBmYWxsYmFja0xvY2FsZVxuICAgIGNvbnN0IGZhbGxiYWNrTG9jYWxlID0gY29tcHV0ZWQoe1xuICAgICAgICBnZXQ6ICgpID0+IF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xuICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tMb2NhbGUgPSBfZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgICAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgdmFsKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIG1lc3NhZ2VzXG4gICAgY29uc3QgbWVzc2FnZXMgPSBjb21wdXRlZCgoKSA9PiBfbWVzc2FnZXMudmFsdWUpO1xuICAgIC8vIGRhdGV0aW1lRm9ybWF0c1xuICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0cyA9IC8qICNfX1BVUkVfXyovIGNvbXB1dGVkKCgpID0+IF9kYXRldGltZUZvcm1hdHMudmFsdWUpO1xuICAgIC8vIG51bWJlckZvcm1hdHNcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gLyogI19fUFVSRV9fKi8gY29tcHV0ZWQoKCkgPT4gX251bWJlckZvcm1hdHMudmFsdWUpO1xuICAgIC8vIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXJcbiAgICBmdW5jdGlvbiBnZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKCkge1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihfcG9zdFRyYW5zbGF0aW9uKSA/IF9wb3N0VHJhbnNsYXRpb24gOiBudWxsO1xuICAgIH1cbiAgICAvLyBzZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyXG4gICAgZnVuY3Rpb24gc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIF9wb3N0VHJhbnNsYXRpb24gPSBoYW5kbGVyO1xuICAgICAgICBfY29udGV4dC5wb3N0VHJhbnNsYXRpb24gPSBoYW5kbGVyO1xuICAgIH1cbiAgICAvLyBnZXRNaXNzaW5nSGFuZGxlclxuICAgIGZ1bmN0aW9uIGdldE1pc3NpbmdIYW5kbGVyKCkge1xuICAgICAgICByZXR1cm4gX21pc3Npbmc7XG4gICAgfVxuICAgIC8vIHNldE1pc3NpbmdIYW5kbGVyXG4gICAgZnVuY3Rpb24gc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICBpZiAoaGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgX3J1bnRpbWVNaXNzaW5nID0gZGVmaW5lQ29yZU1pc3NpbmdIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIF9taXNzaW5nID0gaGFuZGxlcjtcbiAgICAgICAgX2NvbnRleHQubWlzc2luZyA9IF9ydW50aW1lTWlzc2luZztcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNSZXNvbHZlZFRyYW5zbGF0ZU1lc3NhZ2UodHlwZSwgYXJnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICkge1xuICAgICAgICByZXR1cm4gdHlwZSAhPT0gJ3RyYW5zbGF0ZScgfHwgIWFyZy5yZXNvbHZlZE1lc3NhZ2U7XG4gICAgfVxuICAgIGNvbnN0IHdyYXBXaXRoRGVwcyA9IChmbiwgYXJndW1lbnRQYXJzZXIsIHdhcm5UeXBlLCBmYWxsYmFja1N1Y2Nlc3MsIGZhbGxiYWNrRmFpbCwgc3VjY2Vzc0NvbmRpdGlvbikgPT4ge1xuICAgICAgICB0cmFja1JlYWN0aXZpdHlWYWx1ZXMoKTsgLy8gdHJhY2sgcmVhY3RpdmUgZGVwZW5kZW5jeVxuICAgICAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcbiAgICAgICAgbGV0IHJldDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICAgICAgICAgIHNldEFkZGl0aW9uYWxNZXRhKGdldE1ldGFJbmZvKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfaXNHbG9iYWwpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5mYWxsYmFja0NvbnRleHQgPSBfX3Jvb3RcbiAgICAgICAgICAgICAgICAgICAgPyBnZXRGYWxsYmFja0NvbnRleHQoKVxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldCA9IGZuKF9jb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICAgICAgICAgIHNldEFkZGl0aW9uYWxNZXRhKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfaXNHbG9iYWwpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5mYWxsYmFja0NvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh3YXJuVHlwZSAhPT0gJ3RyYW5zbGF0ZSBleGlzdHMnICYmIC8vIGZvciBub3QgYHRlYCAoZS5nIGB0YClcbiAgICAgICAgICAgIGlzTnVtYmVyKHJldCkgJiZcbiAgICAgICAgICAgIHJldCA9PT0gTk9UX1JFT1NMVkVEKSB8fFxuICAgICAgICAgICAgKHdhcm5UeXBlID09PSAndHJhbnNsYXRlIGV4aXN0cycgJiYgIXJldCkgLy8gZm9yIGB0ZWBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBba2V5LCBhcmcyXSA9IGFyZ3VtZW50UGFyc2VyKCk7XG4gICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICAgICAgICAgX19yb290ICYmXG4gICAgICAgICAgICAgICAgaXNTdHJpbmcoa2V5KSAmJlxuICAgICAgICAgICAgICAgIGlzUmVzb2x2ZWRUcmFuc2xhdGVNZXNzYWdlKHdhcm5UeXBlLCBhcmcyKSkge1xuICAgICAgICAgICAgICAgIGlmIChfZmFsbGJhY2tSb290ICYmXG4gICAgICAgICAgICAgICAgICAgIChpc1RyYW5zbGF0ZUZhbGxiYWNrV2FybihfZmFsbGJhY2tXYXJuLCBrZXkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RyYW5zbGF0ZU1pc3NpbmdXYXJuKF9taXNzaW5nV2Fybiwga2V5KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLkZBTExCQUNLX1RPX1JPT1QsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHdhcm5UeXBlXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgICAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBfX3ZfZW1pdHRlcjogZW1pdHRlciB9ID0gX2NvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbWl0dGVyICYmIF9mYWxsYmFja1Jvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImZhbGxiYWNrXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5GQUxCQUNLICovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogd2FyblR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiAnZ2xvYmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt3YXJuVHlwZX06JHtrZXl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX19yb290ICYmIF9mYWxsYmFja1Jvb3RcbiAgICAgICAgICAgICAgICA/IGZhbGxiYWNrU3VjY2VzcyhfX3Jvb3QpXG4gICAgICAgICAgICAgICAgOiBmYWxsYmFja0ZhaWwoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdWNjZXNzQ29uZGl0aW9uKHJldCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfUkVUVVJOX1RZUEUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyB0XG4gICAgZnVuY3Rpb24gdCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB3cmFwV2l0aERlcHMoY29udGV4dCA9PiBSZWZsZWN0LmFwcGx5KHRyYW5zbGF0ZSwgbnVsbCwgW2NvbnRleHQsIC4uLmFyZ3NdKSwgKCkgPT4gcGFyc2VUcmFuc2xhdGVBcmdzKC4uLmFyZ3MpLCAndHJhbnNsYXRlJywgcm9vdCA9PiBSZWZsZWN0LmFwcGx5KHJvb3QudCwgcm9vdCwgWy4uLmFyZ3NdKSwga2V5ID0+IGtleSwgdmFsID0+IGlzU3RyaW5nKHZhbCkpO1xuICAgIH1cbiAgICAvLyBydFxuICAgIGZ1bmN0aW9uIHJ0KC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzNdID0gYXJncztcbiAgICAgICAgaWYgKGFyZzMgJiYgIWlzT2JqZWN0KGFyZzMpKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQoLi4uW2FyZzEsIGFyZzIsIGFzc2lnbih7IHJlc29sdmVkTWVzc2FnZTogdHJ1ZSB9LCBhcmczIHx8IHt9KV0pO1xuICAgIH1cbiAgICAvLyBkXG4gICAgZnVuY3Rpb24gZCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB3cmFwV2l0aERlcHMoY29udGV4dCA9PiBSZWZsZWN0LmFwcGx5KGRhdGV0aW1lLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZURhdGVUaW1lQXJncyguLi5hcmdzKSwgJ2RhdGV0aW1lIGZvcm1hdCcsIHJvb3QgPT4gUmVmbGVjdC5hcHBseShyb290LmQsIHJvb3QsIFsuLi5hcmdzXSksICgpID0+IE1JU1NJTkdfUkVTT0xWRV9WQUxVRSwgdmFsID0+IGlzU3RyaW5nKHZhbCkpO1xuICAgIH1cbiAgICAvLyBuXG4gICAgZnVuY3Rpb24gbiguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB3cmFwV2l0aERlcHMoY29udGV4dCA9PiBSZWZsZWN0LmFwcGx5KG51bWJlciwgbnVsbCwgW2NvbnRleHQsIC4uLmFyZ3NdKSwgKCkgPT4gcGFyc2VOdW1iZXJBcmdzKC4uLmFyZ3MpLCAnbnVtYmVyIGZvcm1hdCcsIHJvb3QgPT4gUmVmbGVjdC5hcHBseShyb290Lm4sIHJvb3QsIFsuLi5hcmdzXSksICgpID0+IE1JU1NJTkdfUkVTT0xWRV9WQUxVRSwgdmFsID0+IGlzU3RyaW5nKHZhbCkpO1xuICAgIH1cbiAgICAvLyBmb3IgY3VzdG9tIHByb2Nlc3NvclxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAodmFsID0+IGlzU3RyaW5nKHZhbCkgfHwgaXNOdW1iZXIodmFsKSB8fCBpc0Jvb2xlYW4odmFsKVxuICAgICAgICAgICAgPyBjcmVhdGVUZXh0Tm9kZShTdHJpbmcodmFsKSlcbiAgICAgICAgICAgIDogdmFsKTtcbiAgICB9XG4gICAgY29uc3QgaW50ZXJwb2xhdGUgPSAodmFsKSA9PiB2YWw7XG4gICAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgICAgICBub3JtYWxpemUsXG4gICAgICAgIGludGVycG9sYXRlLFxuICAgICAgICB0eXBlOiAndm5vZGUnXG4gICAgfTtcbiAgICAvLyB0cmFuc2xhdGVWTm9kZSwgdXNpbmcgZm9yIGBpMThuLXRgIGNvbXBvbmVudFxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVZOb2RlKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IHtcbiAgICAgICAgICAgIGxldCByZXQ7XG4gICAgICAgICAgICBjb25zdCBfY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LnByb2Nlc3NvciA9IHByb2Nlc3NvcjtcbiAgICAgICAgICAgICAgICByZXQgPSBSZWZsZWN0LmFwcGx5KHRyYW5zbGF0ZSwgbnVsbCwgW19jb250ZXh0LCAuLi5hcmdzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5wcm9jZXNzb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSwgKCkgPT4gcGFyc2VUcmFuc2xhdGVBcmdzKC4uLmFyZ3MpLCAndHJhbnNsYXRlJywgXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHJvb3QgPT4gcm9vdFtUcmFuc2xhdGVWTm9kZVN5bWJvbF0oLi4uYXJncyksIGtleSA9PiBbY3JlYXRlVGV4dE5vZGUoa2V5KV0sIHZhbCA9PiBpc0FycmF5KHZhbCkpO1xuICAgIH1cbiAgICAvLyBudW1iZXJQYXJ0cywgdXNpbmcgZm9yIGBpMThuLW5gIGNvbXBvbmVudFxuICAgIGZ1bmN0aW9uIG51bWJlclBhcnRzKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkobnVtYmVyLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZU51bWJlckFyZ3MoLi4uYXJncyksICdudW1iZXIgZm9ybWF0JywgXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHJvb3QgPT4gcm9vdFtOdW1iZXJQYXJ0c1N5bWJvbF0oLi4uYXJncyksIE5PT1BfUkVUVVJOX0FSUkFZLCB2YWwgPT4gaXNTdHJpbmcodmFsKSB8fCBpc0FycmF5KHZhbCkpO1xuICAgIH1cbiAgICAvLyBkYXRldGltZVBhcnRzLCB1c2luZyBmb3IgYGkxOG4tZGAgY29tcG9uZW50XG4gICAgZnVuY3Rpb24gZGF0ZXRpbWVQYXJ0cyguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB3cmFwV2l0aERlcHMoY29udGV4dCA9PiBSZWZsZWN0LmFwcGx5KGRhdGV0aW1lLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZURhdGVUaW1lQXJncyguLi5hcmdzKSwgJ2RhdGV0aW1lIGZvcm1hdCcsIFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICByb290ID0+IHJvb3RbRGF0ZXRpbWVQYXJ0c1N5bWJvbF0oLi4uYXJncyksIE5PT1BfUkVUVVJOX0FSUkFZLCB2YWwgPT4gaXNTdHJpbmcodmFsKSB8fCBpc0FycmF5KHZhbCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQbHVyYWxSdWxlcyhydWxlcykge1xuICAgICAgICBfcGx1cmFsUnVsZXMgPSBydWxlcztcbiAgICAgICAgX2NvbnRleHQucGx1cmFsUnVsZXMgPSBfcGx1cmFsUnVsZXM7XG4gICAgfVxuICAgIC8vIHRlXG4gICAgZnVuY3Rpb24gdGUoa2V5LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcygoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhcmdldExvY2FsZSA9IGlzU3RyaW5nKGxvY2FsZSkgPyBsb2NhbGUgOiBfbG9jYWxlLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGdldExvY2FsZU1lc3NhZ2UodGFyZ2V0TG9jYWxlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gX2NvbnRleHQubWVzc2FnZVJlc29sdmVyKG1lc3NhZ2UsIGtleSk7XG4gICAgICAgICAgICByZXR1cm4gIXRyYW5zbGF0ZUV4aXN0Q29tcGF0aWJsZVxuICAgICAgICAgICAgICAgID8gaXNNZXNzYWdlQVNUKHJlc29sdmVkKSB8fFxuICAgICAgICAgICAgICAgICAgICBpc01lc3NhZ2VGdW5jdGlvbihyZXNvbHZlZCkgfHxcbiAgICAgICAgICAgICAgICAgICAgaXNTdHJpbmcocmVzb2x2ZWQpXG4gICAgICAgICAgICAgICAgOiByZXNvbHZlZCAhPSBudWxsO1xuICAgICAgICB9LCAoKSA9PiBba2V5XSwgJ3RyYW5zbGF0ZSBleGlzdHMnLCByb290ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KHJvb3QudGUsIHJvb3QsIFtrZXksIGxvY2FsZV0pO1xuICAgICAgICB9LCBOT09QX1JFVFVSTl9GQUxTRSwgdmFsID0+IGlzQm9vbGVhbih2YWwpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzb2x2ZU1lc3NhZ2VzKGtleSkge1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSBudWxsO1xuICAgICAgICBjb25zdCBsb2NhbGVzID0gZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4oX2NvbnRleHQsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSwgX2xvY2FsZS52YWx1ZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0TG9jYWxlTWVzc2FnZXMgPSBfbWVzc2FnZXMudmFsdWVbbG9jYWxlc1tpXV0gfHwge307XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlVmFsdWUgPSBfY29udGV4dC5tZXNzYWdlUmVzb2x2ZXIodGFyZ2V0TG9jYWxlTWVzc2FnZXMsIGtleSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgfVxuICAgIC8vIHRtXG4gICAgZnVuY3Rpb24gdG0oa2V5KSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gcmVzb2x2ZU1lc3NhZ2VzKGtleSk7XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICByZXR1cm4gbWVzc2FnZXMgIT0gbnVsbFxuICAgICAgICAgICAgPyBtZXNzYWdlc1xuICAgICAgICAgICAgOiBfX3Jvb3RcbiAgICAgICAgICAgICAgICA/IF9fcm9vdC50bShrZXkpIHx8IHt9XG4gICAgICAgICAgICAgICAgOiB7fTtcbiAgICB9XG4gICAgLy8gZ2V0TG9jYWxlTWVzc2FnZVxuICAgIGZ1bmN0aW9uIGdldExvY2FsZU1lc3NhZ2UobG9jYWxlKSB7XG4gICAgICAgIHJldHVybiAoX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gfHwge30pO1xuICAgIH1cbiAgICAvLyBzZXRMb2NhbGVNZXNzYWdlXG4gICAgZnVuY3Rpb24gc2V0TG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGZsYXRKc29uKSB7XG4gICAgICAgICAgICBjb25zdCBfbWVzc2FnZSA9IHsgW2xvY2FsZV06IG1lc3NhZ2UgfTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIF9tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc093bihfbWVzc2FnZSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVGbGF0SnNvbihfbWVzc2FnZVtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXNzYWdlID0gX21lc3NhZ2VbbG9jYWxlXTtcbiAgICAgICAgfVxuICAgICAgICBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSA9IG1lc3NhZ2U7XG4gICAgICAgIF9jb250ZXh0Lm1lc3NhZ2VzID0gX21lc3NhZ2VzLnZhbHVlO1xuICAgIH1cbiAgICAvLyBtZXJnZUxvY2FsZU1lc3NhZ2VcbiAgICBmdW5jdGlvbiBtZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XG4gICAgICAgIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdID0gX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gfHwge307XG4gICAgICAgIGNvbnN0IF9tZXNzYWdlID0geyBbbG9jYWxlXTogbWVzc2FnZSB9O1xuICAgICAgICBpZiAoZmxhdEpzb24pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIF9tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc093bihfbWVzc2FnZSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVGbGF0SnNvbihfbWVzc2FnZVtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZSA9IF9tZXNzYWdlW2xvY2FsZV07XG4gICAgICAgIGRlZXBDb3B5KG1lc3NhZ2UsIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdKTtcbiAgICAgICAgX2NvbnRleHQubWVzc2FnZXMgPSBfbWVzc2FnZXMudmFsdWU7XG4gICAgfVxuICAgIC8vIGdldERhdGVUaW1lRm9ybWF0XG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge307XG4gICAgfVxuICAgIC8vIHNldERhdGVUaW1lRm9ybWF0XG4gICAgZnVuY3Rpb24gc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gZm9ybWF0O1xuICAgICAgICBfY29udGV4dC5kYXRldGltZUZvcm1hdHMgPSBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xuICAgICAgICBjbGVhckRhdGVUaW1lRm9ybWF0KF9jb250ZXh0LCBsb2NhbGUsIGZvcm1hdCk7XG4gICAgfVxuICAgIC8vIG1lcmdlRGF0ZVRpbWVGb3JtYXRcbiAgICBmdW5jdGlvbiBtZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSA9IGFzc2lnbihfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge30sIGZvcm1hdCk7XG4gICAgICAgIF9jb250ZXh0LmRhdGV0aW1lRm9ybWF0cyA9IF9kYXRldGltZUZvcm1hdHMudmFsdWU7XG4gICAgICAgIGNsZWFyRGF0ZVRpbWVGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcbiAgICB9XG4gICAgLy8gZ2V0TnVtYmVyRm9ybWF0XG4gICAgZnVuY3Rpb24gZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gX251bWJlckZvcm1hdHMudmFsdWVbbG9jYWxlXSB8fCB7fTtcbiAgICB9XG4gICAgLy8gc2V0TnVtYmVyRm9ybWF0XG4gICAgZnVuY3Rpb24gc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XG4gICAgICAgIF9jb250ZXh0Lm51bWJlckZvcm1hdHMgPSBfbnVtYmVyRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgY2xlYXJOdW1iZXJGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcbiAgICB9XG4gICAgLy8gbWVyZ2VOdW1iZXJGb3JtYXRcbiAgICBmdW5jdGlvbiBtZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gYXNzaWduKF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge30sIGZvcm1hdCk7XG4gICAgICAgIF9jb250ZXh0Lm51bWJlckZvcm1hdHMgPSBfbnVtYmVyRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgY2xlYXJOdW1iZXJGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcbiAgICB9XG4gICAgLy8gZm9yIGRlYnVnXG4gICAgY29tcG9zZXJJRCsrO1xuICAgIC8vIHdhdGNoIHJvb3QgbG9jYWxlICYgZmFsbGJhY2tMb2NhbGVcbiAgICBpZiAoX19yb290ICYmIGluQnJvd3Nlcikge1xuICAgICAgICB3YXRjaChfX3Jvb3QubG9jYWxlLCAodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAoX2luaGVyaXRMb2NhbGUpIHtcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LmxvY2FsZSA9IHZhbDtcbiAgICAgICAgICAgICAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdhdGNoKF9fcm9vdC5mYWxsYmFja0xvY2FsZSwgKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKF9pbmhlcml0TG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrTG9jYWxlID0gdmFsO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKF9jb250ZXh0LCBfbG9jYWxlLnZhbHVlLCBfZmFsbGJhY2tMb2NhbGUudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gZGVmaW5lIGJhc2ljIGNvbXBvc2l0aW9uIEFQSSFcbiAgICBjb25zdCBjb21wb3NlciA9IHtcbiAgICAgICAgaWQ6IGNvbXBvc2VySUQsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXG4gICAgICAgIGdldCBpbmhlcml0TG9jYWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9pbmhlcml0TG9jYWxlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgaW5oZXJpdExvY2FsZSh2YWwpIHtcbiAgICAgICAgICAgIF9pbmhlcml0TG9jYWxlID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCAmJiBfX3Jvb3QpIHtcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gX19yb290LmxvY2FsZS52YWx1ZTtcbiAgICAgICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUgPSBfX3Jvb3QuZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlRmFsbGJhY2tMb2NhbGUoX2NvbnRleHQsIF9sb2NhbGUudmFsdWUsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBhdmFpbGFibGVMb2NhbGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKF9tZXNzYWdlcy52YWx1ZSkuc29ydCgpO1xuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgZ2V0IG1vZGlmaWVycygpIHtcbiAgICAgICAgICAgIHJldHVybiBfbW9kaWZpZXJzO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcGx1cmFsUnVsZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3BsdXJhbFJ1bGVzIHx8IHt9O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgaXNHbG9iYWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2lzR2xvYmFsO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbWlzc2luZ1dhcm4oKSB7XG4gICAgICAgICAgICByZXR1cm4gX21pc3NpbmdXYXJuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgbWlzc2luZ1dhcm4odmFsKSB7XG4gICAgICAgICAgICBfbWlzc2luZ1dhcm4gPSB2YWw7XG4gICAgICAgICAgICBfY29udGV4dC5taXNzaW5nV2FybiA9IF9taXNzaW5nV2FybjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGZhbGxiYWNrV2FybigpIHtcbiAgICAgICAgICAgIHJldHVybiBfZmFsbGJhY2tXYXJuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgZmFsbGJhY2tXYXJuKHZhbCkge1xuICAgICAgICAgICAgX2ZhbGxiYWNrV2FybiA9IHZhbDtcbiAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrV2FybiA9IF9mYWxsYmFja1dhcm47XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBmYWxsYmFja1Jvb3QoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2ZhbGxiYWNrUm9vdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGZhbGxiYWNrUm9vdCh2YWwpIHtcbiAgICAgICAgICAgIF9mYWxsYmFja1Jvb3QgPSB2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBmYWxsYmFja0Zvcm1hdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfZmFsbGJhY2tGb3JtYXQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBmYWxsYmFja0Zvcm1hdCh2YWwpIHtcbiAgICAgICAgICAgIF9mYWxsYmFja0Zvcm1hdCA9IHZhbDtcbiAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrRm9ybWF0ID0gX2ZhbGxiYWNrRm9ybWF0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgd2Fybkh0bWxNZXNzYWdlKCkge1xuICAgICAgICAgICAgcmV0dXJuIF93YXJuSHRtbE1lc3NhZ2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCB3YXJuSHRtbE1lc3NhZ2UodmFsKSB7XG4gICAgICAgICAgICBfd2Fybkh0bWxNZXNzYWdlID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQud2Fybkh0bWxNZXNzYWdlID0gdmFsO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgZXNjYXBlUGFyYW1ldGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9lc2NhcGVQYXJhbWV0ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBlc2NhcGVQYXJhbWV0ZXIodmFsKSB7XG4gICAgICAgICAgICBfZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQuZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xuICAgICAgICB9LFxuICAgICAgICB0LFxuICAgICAgICBnZXRMb2NhbGVNZXNzYWdlLFxuICAgICAgICBzZXRMb2NhbGVNZXNzYWdlLFxuICAgICAgICBtZXJnZUxvY2FsZU1lc3NhZ2UsXG4gICAgICAgIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgIHNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgIGdldE1pc3NpbmdIYW5kbGVyLFxuICAgICAgICBzZXRNaXNzaW5nSGFuZGxlcixcbiAgICAgICAgW1NldFBsdXJhbFJ1bGVzU3ltYm9sXTogc2V0UGx1cmFsUnVsZXNcbiAgICB9O1xuICAgIHtcbiAgICAgICAgY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzID0gZGF0ZXRpbWVGb3JtYXRzO1xuICAgICAgICBjb21wb3Nlci5udW1iZXJGb3JtYXRzID0gbnVtYmVyRm9ybWF0cztcbiAgICAgICAgY29tcG9zZXIucnQgPSBydDtcbiAgICAgICAgY29tcG9zZXIudGUgPSB0ZTtcbiAgICAgICAgY29tcG9zZXIudG0gPSB0bTtcbiAgICAgICAgY29tcG9zZXIuZCA9IGQ7XG4gICAgICAgIGNvbXBvc2VyLm4gPSBuO1xuICAgICAgICBjb21wb3Nlci5nZXREYXRlVGltZUZvcm1hdCA9IGdldERhdGVUaW1lRm9ybWF0O1xuICAgICAgICBjb21wb3Nlci5zZXREYXRlVGltZUZvcm1hdCA9IHNldERhdGVUaW1lRm9ybWF0O1xuICAgICAgICBjb21wb3Nlci5tZXJnZURhdGVUaW1lRm9ybWF0ID0gbWVyZ2VEYXRlVGltZUZvcm1hdDtcbiAgICAgICAgY29tcG9zZXIuZ2V0TnVtYmVyRm9ybWF0ID0gZ2V0TnVtYmVyRm9ybWF0O1xuICAgICAgICBjb21wb3Nlci5zZXROdW1iZXJGb3JtYXQgPSBzZXROdW1iZXJGb3JtYXQ7XG4gICAgICAgIGNvbXBvc2VyLm1lcmdlTnVtYmVyRm9ybWF0ID0gbWVyZ2VOdW1iZXJGb3JtYXQ7XG4gICAgICAgIGNvbXBvc2VyW0luZWpjdFdpdGhPcHRpb25TeW1ib2xdID0gX19pbmplY3RXaXRoT3B0aW9uO1xuICAgICAgICBjb21wb3NlcltUcmFuc2xhdGVWTm9kZVN5bWJvbF0gPSB0cmFuc2xhdGVWTm9kZTtcbiAgICAgICAgY29tcG9zZXJbRGF0ZXRpbWVQYXJ0c1N5bWJvbF0gPSBkYXRldGltZVBhcnRzO1xuICAgICAgICBjb21wb3NlcltOdW1iZXJQYXJ0c1N5bWJvbF0gPSBudW1iZXJQYXJ0cztcbiAgICB9XG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0gPSAoZW1pdHRlcikgPT4ge1xuICAgICAgICAgICAgX2NvbnRleHQuX192X2VtaXR0ZXIgPSBlbWl0dGVyO1xuICAgICAgICB9O1xuICAgICAgICBjb21wb3NlcltEaXNhYmxlRW1pdHRlcl0gPSAoKSA9PiB7XG4gICAgICAgICAgICBfY29udGV4dC5fX3ZfZW1pdHRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvc2VyO1xufVxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qKlxuICogQ29udmVydCB0byBJMThuIENvbXBvc2VyIE9wdGlvbnMgZnJvbSBWdWVJMThuIE9wdGlvbnNcbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gY29udmVydENvbXBvc2VyT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgY29uc3QgbG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpID8gb3B0aW9ucy5sb2NhbGUgOiBERUZBVUxUX0xPQ0FMRTtcbiAgICBjb25zdCBmYWxsYmFja0xvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgIGlzQXJyYXkob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgaXNQbGFpbk9iamVjdChvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICBvcHRpb25zLmZhbGxiYWNrTG9jYWxlID09PSBmYWxzZVxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGVcbiAgICAgICAgOiBsb2NhbGU7XG4gICAgY29uc3QgbWlzc2luZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5taXNzaW5nKSA/IG9wdGlvbnMubWlzc2luZyA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBtaXNzaW5nV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLnNpbGVudFRyYW5zbGF0aW9uV2FybikgfHxcbiAgICAgICAgaXNSZWdFeHAob3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm4pXG4gICAgICAgID8gIW9wdGlvbnMuc2lsZW50VHJhbnNsYXRpb25XYXJuXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5zaWxlbnRGYWxsYmFja1dhcm4pIHx8XG4gICAgICAgIGlzUmVnRXhwKG9wdGlvbnMuc2lsZW50RmFsbGJhY2tXYXJuKVxuICAgICAgICA/ICFvcHRpb25zLnNpbGVudEZhbGxiYWNrV2FyblxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgZmFsbGJhY2tSb290ID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tSb290KVxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tSb290XG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBmYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mb3JtYXRGYWxsYmFja01lc3NhZ2VzO1xuICAgIGNvbnN0IG1vZGlmaWVycyA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5tb2RpZmllcnMpID8gb3B0aW9ucy5tb2RpZmllcnMgOiB7fTtcbiAgICBjb25zdCBwbHVyYWxpemF0aW9uUnVsZXMgPSBvcHRpb25zLnBsdXJhbGl6YXRpb25SdWxlcztcbiAgICBjb25zdCBwb3N0VHJhbnNsYXRpb24gPSBpc0Z1bmN0aW9uKG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uKVxuICAgICAgICA/IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHdhcm5IdG1sTWVzc2FnZSA9IGlzU3RyaW5nKG9wdGlvbnMud2Fybkh0bWxJbk1lc3NhZ2UpXG4gICAgICAgID8gb3B0aW9ucy53YXJuSHRtbEluTWVzc2FnZSAhPT0gJ29mZidcbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGVzY2FwZVBhcmFtZXRlciA9ICEhb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXJIdG1sO1xuICAgIGNvbnN0IGluaGVyaXRMb2NhbGUgPSBpc0Jvb2xlYW4ob3B0aW9ucy5zeW5jKSA/IG9wdGlvbnMuc3luYyA6IHRydWU7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBvcHRpb25zLmZvcm1hdHRlcikge1xuICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9GT1JNQVRURVIpKTtcbiAgICB9XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBvcHRpb25zLnByZXNlcnZlRGlyZWN0aXZlQ29udGVudCkge1xuICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRV9ESVJFQ1RJVkUpKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2VzID0gb3B0aW9ucy5tZXNzYWdlcztcbiAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb25zLnNoYXJlZE1lc3NhZ2VzKSkge1xuICAgICAgICBjb25zdCBzaGFyZWRNZXNzYWdlcyA9IG9wdGlvbnMuc2hhcmVkTWVzc2FnZXM7XG4gICAgICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhzaGFyZWRNZXNzYWdlcyk7XG4gICAgICAgIG1lc3NhZ2VzID0gbG9jYWxlcy5yZWR1Y2UoKG1lc3NhZ2VzLCBsb2NhbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1tsb2NhbGVdIHx8IChtZXNzYWdlc1tsb2NhbGVdID0ge30pO1xuICAgICAgICAgICAgYXNzaWduKG1lc3NhZ2UsIHNoYXJlZE1lc3NhZ2VzW2xvY2FsZV0pO1xuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xuICAgICAgICB9LCAobWVzc2FnZXMgfHwge30pKTtcbiAgICB9XG4gICAgY29uc3QgeyBfX2kxOG4sIF9fcm9vdCwgX19pbmplY3RXaXRoT3B0aW9uIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0cyA9IG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzO1xuICAgIGNvbnN0IG51bWJlckZvcm1hdHMgPSBvcHRpb25zLm51bWJlckZvcm1hdHM7XG4gICAgY29uc3QgZmxhdEpzb24gPSBvcHRpb25zLmZsYXRKc29uO1xuICAgIGNvbnN0IHRyYW5zbGF0ZUV4aXN0Q29tcGF0aWJsZSA9IG9wdGlvbnNcbiAgICAgICAgLnRyYW5zbGF0ZUV4aXN0Q29tcGF0aWJsZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2NhbGUsXG4gICAgICAgIGZhbGxiYWNrTG9jYWxlLFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgZmxhdEpzb24sXG4gICAgICAgIGRhdGV0aW1lRm9ybWF0cyxcbiAgICAgICAgbnVtYmVyRm9ybWF0cyxcbiAgICAgICAgbWlzc2luZyxcbiAgICAgICAgbWlzc2luZ1dhcm4sXG4gICAgICAgIGZhbGxiYWNrV2FybixcbiAgICAgICAgZmFsbGJhY2tSb290LFxuICAgICAgICBmYWxsYmFja0Zvcm1hdCxcbiAgICAgICAgbW9kaWZpZXJzLFxuICAgICAgICBwbHVyYWxSdWxlczogcGx1cmFsaXphdGlvblJ1bGVzLFxuICAgICAgICBwb3N0VHJhbnNsYXRpb24sXG4gICAgICAgIHdhcm5IdG1sTWVzc2FnZSxcbiAgICAgICAgZXNjYXBlUGFyYW1ldGVyLFxuICAgICAgICBtZXNzYWdlUmVzb2x2ZXI6IG9wdGlvbnMubWVzc2FnZVJlc29sdmVyLFxuICAgICAgICBpbmhlcml0TG9jYWxlLFxuICAgICAgICB0cmFuc2xhdGVFeGlzdENvbXBhdGlibGUsXG4gICAgICAgIF9faTE4bixcbiAgICAgICAgX19yb290LFxuICAgICAgICBfX2luamVjdFdpdGhPcHRpb25cbiAgICB9O1xufVxuLyoqXG4gKiBjcmVhdGUgVnVlSTE4biBpbnRlcmZhY2UgZmFjdG9yeVxuICpcbiAqIEBpbnRlcm5hbFxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gY3JlYXRlVnVlSTE4bihvcHRpb25zID0ge30sIFZ1ZUkxOG5MZWdhY3kpIHtcbiAgICB7XG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gY3JlYXRlQ29tcG9zZXIoY29udmVydENvbXBvc2VyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgICAgIGNvbnN0IHsgX19leHRlbmRlciB9ID0gb3B0aW9ucztcbiAgICAgICAgLy8gZGVmaW5lcyBWdWVJMThuXG4gICAgICAgIGNvbnN0IHZ1ZUkxOG4gPSB7XG4gICAgICAgICAgICAvLyBpZFxuICAgICAgICAgICAgaWQ6IGNvbXBvc2VyLmlkLFxuICAgICAgICAgICAgLy8gbG9jYWxlXG4gICAgICAgICAgICBnZXQgbG9jYWxlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5sb2NhbGUudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGxvY2FsZSh2YWwpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5sb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZmFsbGJhY2tMb2NhbGVcbiAgICAgICAgICAgIGdldCBmYWxsYmFja0xvY2FsZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGZhbGxiYWNrTG9jYWxlKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VzXG4gICAgICAgICAgICBnZXQgbWVzc2FnZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGRhdGV0aW1lRm9ybWF0c1xuICAgICAgICAgICAgZ2V0IGRhdGV0aW1lRm9ybWF0cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG51bWJlckZvcm1hdHNcbiAgICAgICAgICAgIGdldCBudW1iZXJGb3JtYXRzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5udW1iZXJGb3JtYXRzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGF2YWlsYWJsZUxvY2FsZXNcbiAgICAgICAgICAgIGdldCBhdmFpbGFibGVMb2NhbGVzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5hdmFpbGFibGVMb2NhbGVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGZvcm1hdHRlclxuICAgICAgICAgICAgZ2V0IGZvcm1hdHRlcigpIHtcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfRk9STUFUVEVSKSk7XG4gICAgICAgICAgICAgICAgLy8gZHVtbXlcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGZvcm1hdHRlcih2YWwpIHtcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfRk9STUFUVEVSKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbWlzc2luZ1xuICAgICAgICAgICAgZ2V0IG1pc3NpbmcoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldE1pc3NpbmdIYW5kbGVyKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IG1pc3NpbmcoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldE1pc3NpbmdIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNpbGVudFRyYW5zbGF0aW9uV2FyblxuICAgICAgICAgICAgZ2V0IHNpbGVudFRyYW5zbGF0aW9uV2FybigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNCb29sZWFuKGNvbXBvc2VyLm1pc3NpbmdXYXJuKVxuICAgICAgICAgICAgICAgICAgICA/ICFjb21wb3Nlci5taXNzaW5nV2FyblxuICAgICAgICAgICAgICAgICAgICA6IGNvbXBvc2VyLm1pc3NpbmdXYXJuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaWxlbnRUcmFuc2xhdGlvbldhcm4odmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4odmFsKSA/ICF2YWwgOiB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2lsZW50RmFsbGJhY2tXYXJuXG4gICAgICAgICAgICBnZXQgc2lsZW50RmFsbGJhY2tXYXJuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0Jvb2xlYW4oY29tcG9zZXIuZmFsbGJhY2tXYXJuKVxuICAgICAgICAgICAgICAgICAgICA/ICFjb21wb3Nlci5mYWxsYmFja1dhcm5cbiAgICAgICAgICAgICAgICAgICAgOiBjb21wb3Nlci5mYWxsYmFja1dhcm47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHNpbGVudEZhbGxiYWNrV2Fybih2YWwpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5mYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4odmFsKSA/ICF2YWwgOiB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbW9kaWZpZXJzXG4gICAgICAgICAgICBnZXQgbW9kaWZpZXJzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5tb2RpZmllcnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZm9ybWF0RmFsbGJhY2tNZXNzYWdlc1xuICAgICAgICAgICAgZ2V0IGZvcm1hdEZhbGxiYWNrTWVzc2FnZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmZhbGxiYWNrRm9ybWF0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBmb3JtYXRGYWxsYmFja01lc3NhZ2VzKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrRm9ybWF0ID0gdmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHBvc3RUcmFuc2xhdGlvblxuICAgICAgICAgICAgZ2V0IHBvc3RUcmFuc2xhdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBwb3N0VHJhbnNsYXRpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc3luY1xuICAgICAgICAgICAgZ2V0IHN5bmMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmluaGVyaXRMb2NhbGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHN5bmModmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuaW5oZXJpdExvY2FsZSA9IHZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyB3YXJuSW5IdG1sTWVzc2FnZVxuICAgICAgICAgICAgZ2V0IHdhcm5IdG1sSW5NZXNzYWdlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci53YXJuSHRtbE1lc3NhZ2UgPyAnd2FybicgOiAnb2ZmJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgd2Fybkh0bWxJbk1lc3NhZ2UodmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIud2Fybkh0bWxNZXNzYWdlID0gdmFsICE9PSAnb2ZmJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBlc2NhcGVQYXJhbWV0ZXJIdG1sXG4gICAgICAgICAgICBnZXQgZXNjYXBlUGFyYW1ldGVySHRtbCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZXNjYXBlUGFyYW1ldGVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBlc2NhcGVQYXJhbWV0ZXJIdG1sKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmVzY2FwZVBhcmFtZXRlciA9IHZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnRcbiAgICAgICAgICAgIGdldCBwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnQoKSB7XG4gICAgICAgICAgICAgICAgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICAgICAgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHBsdXJhbGl6YXRpb25SdWxlc1xuICAgICAgICAgICAgZ2V0IHBsdXJhbGl6YXRpb25SdWxlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIucGx1cmFsUnVsZXMgfHwge307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZm9yIGludGVybmFsXG4gICAgICAgICAgICBfX2NvbXBvc2VyOiBjb21wb3NlcixcbiAgICAgICAgICAgIC8vIHRcbiAgICAgICAgICAgIHQoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczXSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaXNTdHJpbmcoYXJnMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBhcmcxO1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoYXJnMikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZWQgPSBhcmcyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShhcmczKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBjb21wb3Nlci50KGtleSwgKGxpc3QgfHwgbmFtZWQgfHwge30pIGFzIGFueSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci50LCBjb21wb3NlciwgW1xuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIChsaXN0IHx8IG5hbWVkIHx8IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ0KC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci5ydCwgY29tcG9zZXIsIFsuLi5hcmdzXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gdGNcbiAgICAgICAgICAgIHRjKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnM10gPSBhcmdzO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBsdXJhbDogMSB9O1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaXNTdHJpbmcoYXJnMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBhcmcxO1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzTnVtYmVyKGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGx1cmFsID0gYXJnMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmczKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoYXJnMykpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGFyZzM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZWQgPSBhcmczO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gY29tcG9zZXIudChrZXksIChsaXN0IHx8IG5hbWVkIHx8IHt9KSBhcyBhbnksIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIudCwgY29tcG9zZXIsIFtcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAobGlzdCB8fCBuYW1lZCB8fCB7fSksXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyB0ZVxuICAgICAgICAgICAgdGUoa2V5LCBsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIudGUoa2V5LCBsb2NhbGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHRtXG4gICAgICAgICAgICB0bShrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIudG0oa2V5KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBnZXRMb2NhbGVNZXNzYWdlXG4gICAgICAgICAgICBnZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0TG9jYWxlTWVzc2FnZVxuICAgICAgICAgICAgc2V0TG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5zZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbWVyZ2VMb2NhbGVNZXNzYWdlXG4gICAgICAgICAgICBtZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZFxuICAgICAgICAgICAgZCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIuZCwgY29tcG9zZXIsIFsuLi5hcmdzXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0RGF0ZVRpbWVGb3JtYXRcbiAgICAgICAgICAgIGdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXREYXRlVGltZUZvcm1hdChsb2NhbGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldERhdGVUaW1lRm9ybWF0XG4gICAgICAgICAgICBzZXREYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldERhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtZXJnZURhdGVUaW1lRm9ybWF0XG4gICAgICAgICAgICBtZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gblxuICAgICAgICAgICAgbiguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIubiwgY29tcG9zZXIsIFsuLi5hcmdzXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0TnVtYmVyRm9ybWF0XG4gICAgICAgICAgICBnZXROdW1iZXJGb3JtYXQobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldE51bWJlckZvcm1hdChsb2NhbGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldE51bWJlckZvcm1hdFxuICAgICAgICAgICAgc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtZXJnZU51bWJlckZvcm1hdFxuICAgICAgICAgICAgbWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0Q2hvaWNlSW5kZXhcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgICAgIGdldENob2ljZUluZGV4KGNob2ljZSwgY2hvaWNlc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxuICAgICAgICAgICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9HRVRfQ0hPSUNFX0lOREVYKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2dWVJMThuLl9fZXh0ZW5kZXIgPSBfX2V4dGVuZGVyO1xuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgICAgIHZ1ZUkxOG4uX19lbmFibGVFbWl0dGVyID0gKGVtaXR0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfX2NvbXBvc2VyID0gY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgX19jb21wb3NlcltFbmFibGVFbWl0dGVyXSAmJiBfX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdKGVtaXR0ZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZ1ZUkxOG4uX19kaXNhYmxlRW1pdHRlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfX2NvbXBvc2VyID0gY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgX19jb21wb3NlcltEaXNhYmxlRW1pdHRlcl0gJiYgX19jb21wb3NlcltEaXNhYmxlRW1pdHRlcl0oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZ1ZUkxOG47XG4gICAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbmNvbnN0IGJhc2VGb3JtYXRQcm9wcyA9IHtcbiAgICB0YWc6IHtcbiAgICAgICAgdHlwZTogW1N0cmluZywgT2JqZWN0XVxuICAgIH0sXG4gICAgbG9jYWxlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgc2NvcGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAvLyBOT1RFOiBhdm9pZCBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L3J1c2hzdGFjay9pc3N1ZXMvMTA1MFxuICAgICAgICB2YWxpZGF0b3I6ICh2YWwgLyogQ29tcG9uZW50STE4blNjb3BlICovKSA9PiB2YWwgPT09ICdwYXJlbnQnIHx8IHZhbCA9PT0gJ2dsb2JhbCcsXG4gICAgICAgIGRlZmF1bHQ6ICdwYXJlbnQnIC8qIENvbXBvbmVudEkxOG5TY29wZSAqL1xuICAgIH0sXG4gICAgaTE4bjoge1xuICAgICAgICB0eXBlOiBPYmplY3RcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBnZXRJbnRlcnBvbGF0ZUFyZyhcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG57IHNsb3RzIH0sIC8vIFNldHVwQ29udGV4dCxcbmtleXMpIHtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIC8vIGRlZmF1bHQgc2xvdCB3aXRoIGxpc3RcbiAgICAgICAgY29uc3QgcmV0ID0gc2xvdHMuZGVmYXVsdCA/IHNsb3RzLmRlZmF1bHQoKSA6IFtdO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICByZXR1cm4gcmV0LnJlZHVjZSgoc2xvdCwgY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAuLi5zbG90LFxuICAgICAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgIC4uLihjdXJyZW50LnR5cGUgPT09IEZyYWdtZW50ID8gY3VycmVudC5jaGlsZHJlbiA6IFtjdXJyZW50XVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBuYW1lZCBzbG90c1xuICAgICAgICByZXR1cm4ga2V5cy5yZWR1Y2UoKGFyZywga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNba2V5XTtcbiAgICAgICAgICAgIGlmIChzbG90KSB7XG4gICAgICAgICAgICAgICAgYXJnW2tleV0gPSBzbG90KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmZ1bmN0aW9uIGdldEZyYWdtZW50YWJsZVRhZyh0YWcpIHtcbiAgICByZXR1cm4gRnJhZ21lbnQgO1xufVxuXG5jb25zdCBUcmFuc2xhdGlvbkltcGwgPSAvKiNfX1BVUkVfXyovIGRlZmluZUNvbXBvbmVudCh7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBuYW1lOiAnaTE4bi10JyxcbiAgICBwcm9wczogYXNzaWduKHtcbiAgICAgICAga2V5cGF0aDoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgcGx1cmFsOiB7XG4gICAgICAgICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIHZhbGlkYXRvcjogKHZhbCkgPT4gaXNOdW1iZXIodmFsKSB8fCAhaXNOYU4odmFsKVxuICAgICAgICB9XG4gICAgfSwgYmFzZUZvcm1hdFByb3BzKSxcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBzZXR1cChwcm9wcywgY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IHNsb3RzLCBhdHRycyB9ID0gY29udGV4dDtcbiAgICAgICAgLy8gTk9URTogYXZvaWQgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9ydXNoc3RhY2svaXNzdWVzLzEwNTBcbiAgICAgICAgY29uc3QgaTE4biA9IHByb3BzLmkxOG4gfHxcbiAgICAgICAgICAgIHVzZUkxOG4oe1xuICAgICAgICAgICAgICAgIHVzZVNjb3BlOiBwcm9wcy5zY29wZSxcbiAgICAgICAgICAgICAgICBfX3VzZUNvbXBvbmVudDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2xvdHMpLmZpbHRlcihrZXkgPT4ga2V5ICE9PSAnXycpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgaWYgKHByb3BzLmxvY2FsZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gcHJvcHMubG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3BzLnBsdXJhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBpc1N0cmluZyhwcm9wcy5wbHVyYWwpID8gK3Byb3BzLnBsdXJhbCA6IHByb3BzLnBsdXJhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFyZyA9IGdldEludGVycG9sYXRlQXJnKGNvbnRleHQsIGtleXMpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaTE4bltUcmFuc2xhdGVWTm9kZVN5bWJvbF0ocHJvcHMua2V5cGF0aCwgYXJnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVkQXR0cnMgPSBhc3NpZ24oe30sIGF0dHJzKTtcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IGlzU3RyaW5nKHByb3BzLnRhZykgfHwgaXNPYmplY3QocHJvcHMudGFnKVxuICAgICAgICAgICAgICAgID8gcHJvcHMudGFnXG4gICAgICAgICAgICAgICAgOiBnZXRGcmFnbWVudGFibGVUYWcoKTtcbiAgICAgICAgICAgIHJldHVybiBoKHRhZywgYXNzaWduZWRBdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB9O1xuICAgIH1cbn0pO1xuLyoqXG4gKiBleHBvcnQgdGhlIHB1YmxpYyB0eXBlIGZvciBoL3RzeCBpbmZlcmVuY2VcbiAqIGFsc28gdG8gYXZvaWQgaW5saW5lIGltcG9ydCgpIGluIGdlbmVyYXRlZCBkLnRzIGZpbGVzXG4gKi9cbi8qKlxuICogVHJhbnNsYXRpb24gQ29tcG9uZW50XG4gKlxuICogQHJlbWFya3NcbiAqIFNlZSB0aGUgZm9sbG93aW5nIGl0ZW1zIGZvciBwcm9wZXJ0eSBhYm91dCBkZXRhaWxzXG4gKlxuICogQFZ1ZUkxOG5TZWUgW1RyYW5zbGF0aW9uUHJvcHNdKGNvbXBvbmVudCN0cmFuc2xhdGlvbnByb3BzKVxuICogQFZ1ZUkxOG5TZWUgW0Jhc2VGb3JtYXRQcm9wc10oY29tcG9uZW50I2Jhc2Vmb3JtYXRwcm9wcylcbiAqIEBWdWVJMThuU2VlIFtDb21wb25lbnQgSW50ZXJwb2xhdGlvbl0oLi4vZ3VpZGUvYWR2YW5jZWQvY29tcG9uZW50KVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGlkPVwiYXBwXCI+XG4gKiAgIDwhLS0gLi4uIC0tPlxuICogICA8aTE4biBrZXlwYXRoPVwidGVybVwiIHRhZz1cImxhYmVsXCIgZm9yPVwidG9zXCI+XG4gKiAgICAgPGEgOmhyZWY9XCJ1cmxcIiB0YXJnZXQ9XCJfYmxhbmtcIj57eyAkdCgndG9zJykgfX08L2E+XG4gKiAgIDwvaTE4bj5cbiAqICAgPCEtLSAuLi4gLS0+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogYGBganNcbiAqIGltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcbiAqIGltcG9ydCB7IGNyZWF0ZUkxOG4gfSBmcm9tICd2dWUtaTE4bidcbiAqXG4gKiBjb25zdCBtZXNzYWdlcyA9IHtcbiAqICAgZW46IHtcbiAqICAgICB0b3M6ICdUZXJtIG9mIFNlcnZpY2UnLFxuICogICAgIHRlcm06ICdJIGFjY2VwdCB4eHggezB9LidcbiAqICAgfSxcbiAqICAgamE6IHtcbiAqICAgICB0b3M6ICfliKnnlKjopo/ntIQnLFxuICogICAgIHRlcm06ICfnp4Hjga8geHh4IOOBrnswfeOBq+WQjOaEj+OBl+OBvuOBmeOAgidcbiAqICAgfVxuICogfVxuICpcbiAqIGNvbnN0IGkxOG4gPSBjcmVhdGVJMThuKHtcbiAqICAgbG9jYWxlOiAnZW4nLFxuICogICBtZXNzYWdlc1xuICogfSlcbiAqXG4gKiBjb25zdCBhcHAgPSBjcmVhdGVBcHAoe1xuICogICBkYXRhOiB7XG4gKiAgICAgdXJsOiAnL3Rlcm0nXG4gKiAgIH1cbiAqIH0pLnVzZShpMThuKS5tb3VudCgnI2FwcCcpXG4gKiBgYGBcbiAqXG4gKiBAVnVlSTE4bkNvbXBvbmVudFxuICovXG5jb25zdCBUcmFuc2xhdGlvbiA9IFRyYW5zbGF0aW9uSW1wbDtcbmNvbnN0IEkxOG5UID0gVHJhbnNsYXRpb247XG5cbmZ1bmN0aW9uIGlzVk5vZGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNTdHJpbmcodGFyZ2V0WzBdKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckZvcm1hdHRlcihwcm9wcywgY29udGV4dCwgc2xvdEtleXMsIHBhcnRGb3JtYXR0ZXIpIHtcbiAgICBjb25zdCB7IHNsb3RzLCBhdHRycyB9ID0gY29udGV4dDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0geyBwYXJ0OiB0cnVlIH07XG4gICAgICAgIGxldCBvdmVycmlkZXMgPSB7fTtcbiAgICAgICAgaWYgKHByb3BzLmxvY2FsZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBwcm9wcy5sb2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaW5nKHByb3BzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMua2V5ID0gcHJvcHMuZm9ybWF0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHByb3BzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcocHJvcHMuZm9ybWF0LmtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgIG9wdGlvbnMua2V5ID0gcHJvcHMuZm9ybWF0LmtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgbnVtYmVyIGZvcm1hdCBvcHRpb25zIG9ubHlcbiAgICAgICAgICAgIG92ZXJyaWRlcyA9IE9iamVjdC5rZXlzKHByb3BzLmZvcm1hdCkucmVkdWNlKChvcHRpb25zLCBwcm9wKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNsb3RLZXlzLmluY2x1ZGVzKHByb3ApXG4gICAgICAgICAgICAgICAgICAgID8gYXNzaWduKHt9LCBvcHRpb25zLCB7IFtwcm9wXTogcHJvcHMuZm9ybWF0W3Byb3BdIH0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnM7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFydHMgPSBwYXJ0Rm9ybWF0dGVyKC4uLltwcm9wcy52YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXSk7XG4gICAgICAgIGxldCBjaGlsZHJlbiA9IFtvcHRpb25zLmtleV07XG4gICAgICAgIGlmIChpc0FycmF5KHBhcnRzKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBwYXJ0cy5tYXAoKHBhcnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xvdCA9IHNsb3RzW3BhcnQudHlwZV07XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHNsb3RcbiAgICAgICAgICAgICAgICAgICAgPyBzbG90KHsgW3BhcnQudHlwZV06IHBhcnQudmFsdWUsIGluZGV4LCBwYXJ0cyB9KVxuICAgICAgICAgICAgICAgICAgICA6IFtwYXJ0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAoaXNWTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlWzBdLmtleSA9IGAke3BhcnQudHlwZX0tJHtpbmRleH1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzU3RyaW5nKHBhcnRzKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbcGFydHNdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFzc2lnbmVkQXR0cnMgPSBhc3NpZ24oe30sIGF0dHJzKTtcbiAgICAgICAgY29uc3QgdGFnID0gaXNTdHJpbmcocHJvcHMudGFnKSB8fCBpc09iamVjdChwcm9wcy50YWcpXG4gICAgICAgICAgICA/IHByb3BzLnRhZ1xuICAgICAgICAgICAgOiBnZXRGcmFnbWVudGFibGVUYWcoKTtcbiAgICAgICAgcmV0dXJuIGgodGFnLCBhc3NpZ25lZEF0dHJzLCBjaGlsZHJlbik7XG4gICAgfTtcbn1cblxuY29uc3QgTnVtYmVyRm9ybWF0SW1wbCA9IC8qI19fUFVSRV9fKi8gZGVmaW5lQ29tcG9uZW50KHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgIG5hbWU6ICdpMThuLW4nLFxuICAgIHByb3BzOiBhc3NpZ24oe1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdXG4gICAgICAgIH1cbiAgICB9LCBiYXNlRm9ybWF0UHJvcHMpLFxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHNldHVwKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGkxOG4gPSBwcm9wcy5pMThuIHx8XG4gICAgICAgICAgICB1c2VJMThuKHtcbiAgICAgICAgICAgICAgICB1c2VTY29wZTogcHJvcHMuc2NvcGUsXG4gICAgICAgICAgICAgICAgX191c2VDb21wb25lbnQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVuZGVyRm9ybWF0dGVyKHByb3BzLCBjb250ZXh0LCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUywgKC4uLmFyZ3MpID0+IFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpMThuW051bWJlclBhcnRzU3ltYm9sXSguLi5hcmdzKSk7XG4gICAgfVxufSk7XG4vKipcbiAqIGV4cG9ydCB0aGUgcHVibGljIHR5cGUgZm9yIGgvdHN4IGluZmVyZW5jZVxuICogYWxzbyB0byBhdm9pZCBpbmxpbmUgaW1wb3J0KCkgaW4gZ2VuZXJhdGVkIGQudHMgZmlsZXNcbiAqL1xuLyoqXG4gKiBOdW1iZXIgRm9ybWF0IENvbXBvbmVudFxuICpcbiAqIEByZW1hcmtzXG4gKiBTZWUgdGhlIGZvbGxvd2luZyBpdGVtcyBmb3IgcHJvcGVydHkgYWJvdXQgZGV0YWlsc1xuICpcbiAqIEBWdWVJMThuU2VlIFtGb3JtYXR0YWJsZVByb3BzXShjb21wb25lbnQjZm9ybWF0dGFibGVwcm9wcylcbiAqIEBWdWVJMThuU2VlIFtCYXNlRm9ybWF0UHJvcHNdKGNvbXBvbmVudCNiYXNlZm9ybWF0cHJvcHMpXG4gKiBAVnVlSTE4blNlZSBbQ3VzdG9tIEZvcm1hdHRpbmddKC4uL2d1aWRlL2Vzc2VudGlhbHMvbnVtYmVyI2N1c3RvbS1mb3JtYXR0aW5nKVxuICpcbiAqIEBWdWVJMThuRGFuZ2VyXG4gKiBOb3Qgc3VwcG9ydGVkIElFLCBkdWUgdG8gbm8gc3VwcG9ydCBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0VG9QYXJ0c2AgaW4gW0lFXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsL051bWJlckZvcm1hdC9mb3JtYXRUb1BhcnRzKVxuICpcbiAqIElmIHlvdSB3YW50IHRvIHVzZSBpdCwgeW91IG5lZWQgdG8gdXNlIFtwb2x5ZmlsbF0oaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1hdGpzL2Zvcm1hdGpzL3RyZWUvbWFpbi9wYWNrYWdlcy9pbnRsLW51bWJlcmZvcm1hdClcbiAqXG4gKiBAVnVlSTE4bkNvbXBvbmVudFxuICovXG5jb25zdCBOdW1iZXJGb3JtYXQgPSBOdW1iZXJGb3JtYXRJbXBsO1xuY29uc3QgSTE4bk4gPSBOdW1iZXJGb3JtYXQ7XG5cbmNvbnN0IERhdGV0aW1lRm9ybWF0SW1wbCA9IC8qICNfX1BVUkVfXyovIGRlZmluZUNvbXBvbmVudCh7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBuYW1lOiAnaTE4bi1kJyxcbiAgICBwcm9wczogYXNzaWduKHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIERhdGVdLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdXG4gICAgICAgIH1cbiAgICB9LCBiYXNlRm9ybWF0UHJvcHMpLFxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHNldHVwKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGkxOG4gPSBwcm9wcy5pMThuIHx8XG4gICAgICAgICAgICB1c2VJMThuKHtcbiAgICAgICAgICAgICAgICB1c2VTY29wZTogcHJvcHMuc2NvcGUsXG4gICAgICAgICAgICAgICAgX191c2VDb21wb25lbnQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVuZGVyRm9ybWF0dGVyKHByb3BzLCBjb250ZXh0LCBEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTLCAoLi4uYXJncykgPT4gXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGkxOG5bRGF0ZXRpbWVQYXJ0c1N5bWJvbF0oLi4uYXJncykpO1xuICAgIH1cbn0pO1xuLyoqXG4gKiBEYXRldGltZSBGb3JtYXQgQ29tcG9uZW50XG4gKlxuICogQHJlbWFya3NcbiAqIFNlZSB0aGUgZm9sbG93aW5nIGl0ZW1zIGZvciBwcm9wZXJ0eSBhYm91dCBkZXRhaWxzXG4gKlxuICogQFZ1ZUkxOG5TZWUgW0Zvcm1hdHRhYmxlUHJvcHNdKGNvbXBvbmVudCNmb3JtYXR0YWJsZXByb3BzKVxuICogQFZ1ZUkxOG5TZWUgW0Jhc2VGb3JtYXRQcm9wc10oY29tcG9uZW50I2Jhc2Vmb3JtYXRwcm9wcylcbiAqIEBWdWVJMThuU2VlIFtDdXN0b20gRm9ybWF0dGluZ10oLi4vZ3VpZGUvZXNzZW50aWFscy9kYXRldGltZSNjdXN0b20tZm9ybWF0dGluZylcbiAqXG4gKiBAVnVlSTE4bkRhbmdlclxuICogTm90IHN1cHBvcnRlZCBJRSwgZHVlIHRvIG5vIHN1cHBvcnQgYEludGwuRGF0ZVRpbWVGb3JtYXQjZm9ybWF0VG9QYXJ0c2AgaW4gW0lFXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsL0RhdGVUaW1lRm9ybWF0L2Zvcm1hdFRvUGFydHMpXG4gKlxuICogSWYgeW91IHdhbnQgdG8gdXNlIGl0LCB5b3UgbmVlZCB0byB1c2UgW3BvbHlmaWxsXShodHRwczovL2dpdGh1Yi5jb20vZm9ybWF0anMvZm9ybWF0anMvdHJlZS9tYWluL3BhY2thZ2VzL2ludGwtZGF0ZXRpbWVmb3JtYXQpXG4gKlxuICogQFZ1ZUkxOG5Db21wb25lbnRcbiAqL1xuY29uc3QgRGF0ZXRpbWVGb3JtYXQgPSBEYXRldGltZUZvcm1hdEltcGw7XG5jb25zdCBJMThuRCA9IERhdGV0aW1lRm9ybWF0O1xuXG5mdW5jdGlvbiBnZXRDb21wb3NlciQyKGkxOG4sIGluc3RhbmNlKSB7XG4gICAgY29uc3QgaTE4bkludGVybmFsID0gaTE4bjtcbiAgICBpZiAoaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nKSB7XG4gICAgICAgIHJldHVybiAoaTE4bkludGVybmFsLl9fZ2V0SW5zdGFuY2UoaW5zdGFuY2UpIHx8IGkxOG4uZ2xvYmFsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHZ1ZUkxOG4gPSBpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgICAgIHJldHVybiB2dWVJMThuICE9IG51bGxcbiAgICAgICAgICAgID8gdnVlSTE4bi5fX2NvbXBvc2VyXG4gICAgICAgICAgICA6IGkxOG4uZ2xvYmFsLl9fY29tcG9zZXI7XG4gICAgfVxufVxuZnVuY3Rpb24gdlREaXJlY3RpdmUoaTE4bikge1xuICAgIGNvbnN0IF9wcm9jZXNzID0gKGJpbmRpbmcpID0+IHtcbiAgICAgICAgY29uc3QgeyBpbnN0YW5jZSwgbW9kaWZpZXJzLCB2YWx1ZSB9ID0gYmluZGluZztcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghaW5zdGFuY2UgfHwgIWluc3RhbmNlLiQpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb21wb3NlciA9IGdldENvbXBvc2VyJDIoaTE4biwgaW5zdGFuY2UuJCk7XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbW9kaWZpZXJzLnByZXNlcnZlKSB7XG4gICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gcGFyc2VWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbLi4ubWFrZVBhcmFtcyhwYXJzZWRWYWx1ZSldKSxcbiAgICAgICAgICAgIGNvbXBvc2VyXG4gICAgICAgIF07XG4gICAgfTtcbiAgICBjb25zdCByZWdpc3RlciA9IChlbCwgYmluZGluZykgPT4ge1xuICAgICAgICBjb25zdCBbdGV4dENvbnRlbnQsIGNvbXBvc2VyXSA9IF9wcm9jZXNzKGJpbmRpbmcpO1xuICAgICAgICBpZiAoaW5Ccm93c2VyICYmIGkxOG4uZ2xvYmFsID09PSBjb21wb3Nlcikge1xuICAgICAgICAgICAgLy8gZ2xvYmFsIHNjb3BlIG9ubHlcbiAgICAgICAgICAgIGVsLl9faTE4bldhdGNoZXIgPSB3YXRjaChjb21wb3Nlci5sb2NhbGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICBiaW5kaW5nLmluc3RhbmNlICYmIGJpbmRpbmcuaW5zdGFuY2UuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbC5fX2NvbXBvc2VyID0gY29tcG9zZXI7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XG4gICAgfTtcbiAgICBjb25zdCB1bnJlZ2lzdGVyID0gKGVsKSA9PiB7XG4gICAgICAgIGlmIChpbkJyb3dzZXIgJiYgZWwuX19pMThuV2F0Y2hlcikge1xuICAgICAgICAgICAgZWwuX19pMThuV2F0Y2hlcigpO1xuICAgICAgICAgICAgZWwuX19pMThuV2F0Y2hlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGRlbGV0ZSBlbC5fX2kxOG5XYXRjaGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbC5fX2NvbXBvc2VyKSB7XG4gICAgICAgICAgICBlbC5fX2NvbXBvc2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZGVsZXRlIGVsLl9fY29tcG9zZXI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVwZGF0ZSA9IChlbCwgeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIGlmIChlbC5fX2NvbXBvc2VyKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb3NlciA9IGVsLl9fY29tcG9zZXI7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHBhcnNlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbXG4gICAgICAgICAgICAgICAgLi4ubWFrZVBhcmFtcyhwYXJzZWRWYWx1ZSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRTU1JQcm9wcyA9IChiaW5kaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IFt0ZXh0Q29udGVudF0gPSBfcHJvY2VzcyhiaW5kaW5nKTtcbiAgICAgICAgcmV0dXJuIHsgdGV4dENvbnRlbnQgfTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZWQ6IHJlZ2lzdGVyLFxuICAgICAgICB1bm1vdW50ZWQ6IHVucmVnaXN0ZXIsXG4gICAgICAgIGJlZm9yZVVwZGF0ZTogdXBkYXRlLFxuICAgICAgICBnZXRTU1JQcm9wc1xuICAgIH07XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4geyBwYXRoOiB2YWx1ZSB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBpZiAoISgncGF0aCcgaW4gdmFsdWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuUkVRVUlSRURfVkFMVUUsICdwYXRoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLklOVkFMSURfVkFMVUUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1ha2VQYXJhbXModmFsdWUpIHtcbiAgICBjb25zdCB7IHBhdGgsIGxvY2FsZSwgYXJncywgY2hvaWNlLCBwbHVyYWwgfSA9IHZhbHVlO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBjb25zdCBuYW1lZCA9IGFyZ3MgfHwge307XG4gICAgaWYgKGlzU3RyaW5nKGxvY2FsZSkpIHtcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBsb2NhbGU7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihjaG9pY2UpKSB7XG4gICAgICAgIG9wdGlvbnMucGx1cmFsID0gY2hvaWNlO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIocGx1cmFsKSkge1xuICAgICAgICBvcHRpb25zLnBsdXJhbCA9IHBsdXJhbDtcbiAgICB9XG4gICAgcmV0dXJuIFtwYXRoLCBuYW1lZCwgb3B0aW9uc107XG59XG5cbmZ1bmN0aW9uIGFwcGx5KGFwcCwgaTE4biwgLi4ub3B0aW9ucykge1xuICAgIGNvbnN0IHBsdWdpbk9wdGlvbnMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnNbMF0pXG4gICAgICAgID8gb3B0aW9uc1swXVxuICAgICAgICA6IHt9O1xuICAgIGNvbnN0IHVzZUkxOG5Db21wb25lbnROYW1lID0gISFwbHVnaW5PcHRpb25zLnVzZUkxOG5Db21wb25lbnROYW1lO1xuICAgIGNvbnN0IGdsb2JhbEluc3RhbGwgPSBpc0Jvb2xlYW4ocGx1Z2luT3B0aW9ucy5nbG9iYWxJbnN0YWxsKVxuICAgICAgICA/IHBsdWdpbk9wdGlvbnMuZ2xvYmFsSW5zdGFsbFxuICAgICAgICA6IHRydWU7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBnbG9iYWxJbnN0YWxsICYmIHVzZUkxOG5Db21wb25lbnROYW1lKSB7XG4gICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5DT01QT05FTlRfTkFNRV9MRUdBQ1lfQ09NUEFUSUJMRSwge1xuICAgICAgICAgICAgbmFtZTogVHJhbnNsYXRpb24ubmFtZVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChnbG9iYWxJbnN0YWxsKSB7XG4gICAgICAgIFshdXNlSTE4bkNvbXBvbmVudE5hbWUgPyBUcmFuc2xhdGlvbi5uYW1lIDogJ2kxOG4nLCAnSTE4blQnXS5mb3JFYWNoKG5hbWUgPT4gYXBwLmNvbXBvbmVudChuYW1lLCBUcmFuc2xhdGlvbikpO1xuICAgICAgICBbTnVtYmVyRm9ybWF0Lm5hbWUsICdJMThuTiddLmZvckVhY2gobmFtZSA9PiBhcHAuY29tcG9uZW50KG5hbWUsIE51bWJlckZvcm1hdCkpO1xuICAgICAgICBbRGF0ZXRpbWVGb3JtYXQubmFtZSwgJ0kxOG5EJ10uZm9yRWFjaChuYW1lID0+IGFwcC5jb21wb25lbnQobmFtZSwgRGF0ZXRpbWVGb3JtYXQpKTtcbiAgICB9XG4gICAgLy8gaW5zdGFsbCBkaXJlY3RpdmVcbiAgICB7XG4gICAgICAgIGFwcC5kaXJlY3RpdmUoJ3QnLCB2VERpcmVjdGl2ZShpMThuKSk7XG4gICAgfVxufVxuXG5jb25zdCBWdWVEZXZUb29sc0xhYmVscyA9IHtcbiAgICBbXCJ2dWUtZGV2dG9vbHMtcGx1Z2luLXZ1ZS1pMThuXCIgLyogVnVlRGV2VG9vbHNJRHMuUExVR0lOICovXTogJ1Z1ZSBJMThuIGRldnRvb2xzJyxcbiAgICBbXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovXTogJ0kxOG4gUmVzb3VyY2VzJyxcbiAgICBbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovXTogJ1Z1ZSBJMThuJ1xufTtcbmNvbnN0IFZ1ZURldlRvb2xzUGxhY2Vob2xkZXJzID0ge1xuICAgIFtcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIFZ1ZURldlRvb2xzSURzLkNVU1RPTV9JTlNQRUNUT1IgKi9dOiAnU2VhcmNoIGZvciBzY29wZXMgLi4uJ1xufTtcbmNvbnN0IFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnMgPSB7XG4gICAgW1widnVlLWkxOG4tdGltZWxpbmVcIiAvKiBWdWVEZXZUb29sc0lEcy5USU1FTElORSAqL106IDB4ZmZjZDE5XG59O1xuXG5jb25zdCBWVUVfSTE4Tl9DT01QT05FTlRfVFlQRVMgPSAndnVlLWkxOG46IGNvbXBvc2VyIHByb3BlcnRpZXMnO1xubGV0IGRldnRvb2xzQXBpO1xuYXN5bmMgZnVuY3Rpb24gZW5hYmxlRGV2VG9vbHMoYXBwLCBpMThuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldHVwRGV2dG9vbHNQbHVnaW4oe1xuICAgICAgICAgICAgICAgIGlkOiBcInZ1ZS1kZXZ0b29scy1wbHVnaW4tdnVlLWkxOG5cIiAvKiBWdWVEZXZUb29sc0lEcy5QTFVHSU4gKi8sXG4gICAgICAgICAgICAgICAgbGFiZWw6IFZ1ZURldlRvb2xzTGFiZWxzW1widnVlLWRldnRvb2xzLXBsdWdpbi12dWUtaTE4blwiIC8qIFZ1ZURldlRvb2xzSURzLlBMVUdJTiAqL10sXG4gICAgICAgICAgICAgICAgcGFja2FnZU5hbWU6ICd2dWUtaTE4bicsXG4gICAgICAgICAgICAgICAgaG9tZXBhZ2U6ICdodHRwczovL3Z1ZS1pMThuLmludGxpZnkuZGV2JyxcbiAgICAgICAgICAgICAgICBsb2dvOiAnaHR0cHM6Ly92dWUtaTE4bi5pbnRsaWZ5LmRldi92dWUtaTE4bi1kZXZ0b29scy1sb2dvLnBuZycsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50U3RhdGVUeXBlczogW1ZVRV9JMThOX0NPTVBPTkVOVF9UWVBFU10sXG4gICAgICAgICAgICAgICAgYXBwOiBhcHAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICB9LCBhcGkgPT4ge1xuICAgICAgICAgICAgICAgIGRldnRvb2xzQXBpID0gYXBpO1xuICAgICAgICAgICAgICAgIGFwaS5vbi52aXNpdENvbXBvbmVudFRyZWUoKHsgY29tcG9uZW50SW5zdGFuY2UsIHRyZWVOb2RlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ29tcG9uZW50VHJlZVRhZ3MoY29tcG9uZW50SW5zdGFuY2UsIHRyZWVOb2RlLCBpMThuKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhcGkub24uaW5zcGVjdENvbXBvbmVudCgoeyBjb21wb25lbnRJbnN0YW5jZSwgaW5zdGFuY2VEYXRhIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkxOG4ubW9kZSA9PT0gJ2xlZ2FjeScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZ2xvYmFsIHNjb3BlIG9uIGxlZ2FjeSBtb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyAhPT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaTE4bi5nbG9iYWwuX19jb21wb3Nlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNwZWN0Q29tcG9zZXIoaW5zdGFuY2VEYXRhLCBjb21wb25lbnRJbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3BlY3RDb21wb3NlcihpbnN0YW5jZURhdGEsIGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhcGkuYWRkSW5zcGVjdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogVnVlRGV2VG9vbHNJRHMuQ1VTVE9NX0lOU1BFQ1RPUiAqLyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFZ1ZURldlRvb2xzTGFiZWxzW1widnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogVnVlRGV2VG9vbHNJRHMuQ1VTVE9NX0lOU1BFQ1RPUiAqL10sXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdsYW5ndWFnZScsXG4gICAgICAgICAgICAgICAgICAgIHRyZWVGaWx0ZXJQbGFjZWhvbGRlcjogVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnNbXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFwaS5vbi5nZXRJbnNwZWN0b3JUcmVlKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hcHAgPT09IGFwcCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5pbnNwZWN0b3JJZCA9PT0gXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlclNjb3BlKHBheWxvYWQsIGkxOG4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdHMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgYXBpLm9uLmdldEluc3BlY3RvclN0YXRlKGFzeW5jIChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmFwcCA9PT0gYXBwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLmluc3BlY3RvcklkID09PSBcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIFZ1ZURldlRvb2xzSURzLkNVU1RPTV9JTlNQRUNUT1IgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS51bmhpZ2hsaWdodEVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3BlY3RTY29wZShwYXlsb2FkLCBpMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLm5vZGVJZCA9PT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvb3RzLmhhcyhwYXlsb2FkLmFwcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Jvb3RdID0gYXdhaXQgYXBpLmdldENvbXBvbmVudEluc3RhbmNlcyhwYXlsb2FkLmFwcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RzLnNldChwYXlsb2FkLmFwcCwgcm9vdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5oaWdobGlnaHRFbGVtZW50KHJvb3RzLmdldChwYXlsb2FkLmFwcCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDb21wb25lbnRJbnN0YW5jZShwYXlsb2FkLm5vZGVJZCwgaTE4bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgJiYgYXBpLmhpZ2hsaWdodEVsZW1lbnQoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXBpLm9uLmVkaXRJbnNwZWN0b3JTdGF0ZShwYXlsb2FkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXBwID09PSBhcHAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuaW5zcGVjdG9ySWQgPT09IFwidnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogVnVlRGV2VG9vbHNJRHMuQ1VTVE9NX0lOU1BFQ1RPUiAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdFNjb3BlKHBheWxvYWQsIGkxOG4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXBpLmFkZFRpbWVsaW5lTGF5ZXIoe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogVnVlRGV2VG9vbHNMYWJlbHNbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovXSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnNbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBnZXRJMThuU2NvcGVMYWJsZShpbnN0YW5jZSkge1xuICAgIHJldHVybiAoaW5zdGFuY2UudHlwZS5uYW1lIHx8XG4gICAgICAgIGluc3RhbmNlLnR5cGUuZGlzcGxheU5hbWUgfHxcbiAgICAgICAgaW5zdGFuY2UudHlwZS5fX2ZpbGUgfHxcbiAgICAgICAgJ0Fub255bW91cycpO1xufVxuZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50VHJlZVRhZ3MoaW5zdGFuY2UsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxudHJlZU5vZGUsIGkxOG4pIHtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBnbG9iYWwgPSBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcbiAgICAgICAgPyBpMThuLmdsb2JhbFxuICAgICAgICA6IGkxOG4uZ2xvYmFsLl9fY29tcG9zZXI7XG4gICAgaWYgKGluc3RhbmNlICYmIGluc3RhbmNlLnZub2RlLmVsICYmIGluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXykge1xuICAgICAgICAvLyBhZGQgY3VzdG9tIHRhZ3MgbG9jYWwgc2NvcGUgb25seVxuICAgICAgICBpZiAoaW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fICE9PSBnbG9iYWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IHtcbiAgICAgICAgICAgICAgICBsYWJlbDogYGkxOG4gKCR7Z2V0STE4blNjb3BlTGFibGUoaW5zdGFuY2UpfSBTY29wZSlgLFxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogMHgwMDAwMDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAweGZmY2QxOVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyZWVOb2RlLnRhZ3MucHVzaCh0YWcpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaW5zcGVjdENvbXBvc2VyKGluc3RhbmNlRGF0YSwgY29tcG9zZXIpIHtcbiAgICBjb25zdCB0eXBlID0gVlVFX0kxOE5fQ09NUE9ORU5UX1RZUEVTO1xuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5OiAnbG9jYWxlJyxcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBjb21wb3Nlci5sb2NhbGUudmFsdWVcbiAgICB9KTtcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleTogJ2F2YWlsYWJsZUxvY2FsZXMnLFxuICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBjb21wb3Nlci5hdmFpbGFibGVMb2NhbGVzXG4gICAgfSk7XG4gICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xuICAgICAgICB0eXBlLFxuICAgICAgICBrZXk6ICdmYWxsYmFja0xvY2FsZScsXG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWVcbiAgICB9KTtcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleTogJ2luaGVyaXRMb2NhbGUnLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmluaGVyaXRMb2NhbGVcbiAgICB9KTtcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleTogJ21lc3NhZ2VzJyxcbiAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlKVxuICAgIH0pO1xuICAgIHtcbiAgICAgICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIGtleTogJ2RhdGV0aW1lRm9ybWF0cycsXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAga2V5OiAnbnVtYmVyRm9ybWF0cycsXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIubnVtYmVyRm9ybWF0cy52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgdmFsdWUgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhtZXNzYWdlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHYgPSBtZXNzYWdlc1trZXldO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih2KSAmJiAnc291cmNlJyBpbiB2KSB7XG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gZ2V0TWVzc2FnZUZ1bmN0aW9uRGV0YWlscyh2KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc01lc3NhZ2VBU1QodikgJiYgdi5sb2MgJiYgdi5sb2Muc291cmNlKSB7XG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gdi5sb2Muc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKHYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVba2V5XSA9IHY7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5jb25zdCBFU0MgPSB7XG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJyYnOiAnJmFtcDsnXG59O1xuZnVuY3Rpb24gZXNjYXBlKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bPD5cIiZdL2csIGVzY2FwZUNoYXIpO1xufVxuZnVuY3Rpb24gZXNjYXBlQ2hhcihhKSB7XG4gICAgcmV0dXJuIEVTQ1thXSB8fCBhO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmZ1bmN0aW9uIGdldE1lc3NhZ2VGdW5jdGlvbkRldGFpbHMoZnVuYykge1xuICAgIGNvbnN0IGFyZ1N0cmluZyA9IGZ1bmMuc291cmNlID8gYChcIiR7ZXNjYXBlKGZ1bmMuc291cmNlKX1cIilgIDogYCg/KWA7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX2N1c3RvbToge1xuICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJyxcbiAgICAgICAgICAgIGRpc3BsYXk6IGA8c3Bhbj7Gkjwvc3Bhbj4gJHthcmdTdHJpbmd9YFxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyU2NvcGUocGF5bG9hZCwgaTE4bikge1xuICAgIHBheWxvYWQucm9vdE5vZGVzLnB1c2goe1xuICAgICAgICBpZDogJ2dsb2JhbCcsXG4gICAgICAgIGxhYmVsOiAnR2xvYmFsIFNjb3BlJ1xuICAgIH0pO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGdsb2JhbCA9IGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xuICAgICAgICA/IGkxOG4uZ2xvYmFsXG4gICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcbiAgICBmb3IgKGNvbnN0IFtrZXlJbnN0YW5jZSwgaW5zdGFuY2VdIG9mIGkxOG4uX19pbnN0YW5jZXMpIHtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXG4gICAgICAgICAgICA/IGluc3RhbmNlXG4gICAgICAgICAgICA6IGluc3RhbmNlLl9fY29tcG9zZXI7XG4gICAgICAgIGlmIChnbG9iYWwgPT09IGNvbXBvc2VyKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwYXlsb2FkLnJvb3ROb2Rlcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBjb21wb3Nlci5pZC50b1N0cmluZygpLFxuICAgICAgICAgICAgbGFiZWw6IGAke2dldEkxOG5TY29wZUxhYmxlKGtleUluc3RhbmNlKX0gU2NvcGVgXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldENvbXBvbmVudEluc3RhbmNlKG5vZGVJZCwgaTE4bikge1xuICAgIGxldCBpbnN0YW5jZSA9IG51bGw7XG4gICAgaWYgKG5vZGVJZCAhPT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgZm9yIChjb25zdCBbY29tcG9uZW50LCBjb21wb3Nlcl0gb2YgaTE4bi5fX2luc3RhbmNlcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChjb21wb3Nlci5pZC50b1N0cmluZygpID09PSBub2RlSWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5mdW5jdGlvbiBnZXRDb21wb3NlciQxKG5vZGVJZCwgaTE4bikge1xuICAgIGlmIChub2RlSWQgPT09ICdnbG9iYWwnKSB7XG4gICAgICAgIHJldHVybiBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcbiAgICAgICAgICAgID8gaTE4bi5nbG9iYWxcbiAgICAgICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gQXJyYXkuZnJvbShpMThuLl9faW5zdGFuY2VzLnZhbHVlcygpKS5maW5kKGl0ZW0gPT4gaXRlbS5pZC50b1N0cmluZygpID09PSBub2RlSWQpO1xuICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcbiAgICAgICAgICAgICAgICA/IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgOiBpbnN0YW5jZS5fX2NvbXBvc2VyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpbnNwZWN0U2NvcGUocGF5bG9hZCwgaTE4blxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbikge1xuICAgIGNvbnN0IGNvbXBvc2VyID0gZ2V0Q29tcG9zZXIkMShwYXlsb2FkLm5vZGVJZCwgaTE4bik7XG4gICAgaWYgKGNvbXBvc2VyKSB7XG4gICAgICAgIC8vIFRPRE86XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHBheWxvYWQuc3RhdGUgPSBtYWtlU2NvcGVJbnNwZWN0U3RhdGUoY29tcG9zZXIpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIG1ha2VTY29wZUluc3BlY3RTdGF0ZShjb21wb3Nlcikge1xuICAgIGNvbnN0IHN0YXRlID0ge307XG4gICAgY29uc3QgbG9jYWxlVHlwZSA9ICdMb2NhbGUgcmVsYXRlZCBpbmZvJztcbiAgICBjb25zdCBsb2NhbGVTdGF0ZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXG4gICAgICAgICAgICBrZXk6ICdsb2NhbGUnLFxuICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIubG9jYWxlLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXG4gICAgICAgICAgICBrZXk6ICdmYWxsYmFja0xvY2FsZScsXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBsb2NhbGVUeXBlLFxuICAgICAgICAgICAga2V5OiAnYXZhaWxhYmxlTG9jYWxlcycsXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIuYXZhaWxhYmxlTG9jYWxlc1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBsb2NhbGVUeXBlLFxuICAgICAgICAgICAga2V5OiAnaW5oZXJpdExvY2FsZScsXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5pbmhlcml0TG9jYWxlXG4gICAgICAgIH1cbiAgICBdO1xuICAgIHN0YXRlW2xvY2FsZVR5cGVdID0gbG9jYWxlU3RhdGVzO1xuICAgIGNvbnN0IGxvY2FsZU1lc3NhZ2VzVHlwZSA9ICdMb2NhbGUgbWVzc2FnZXMgaW5mbyc7XG4gICAgY29uc3QgbG9jYWxlTWVzc2FnZXNTdGF0ZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZU1lc3NhZ2VzVHlwZSxcbiAgICAgICAgICAgIGtleTogJ21lc3NhZ2VzJyxcbiAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBnZXRMb2NhbGVNZXNzYWdlVmFsdWUoY29tcG9zZXIubWVzc2FnZXMudmFsdWUpXG4gICAgICAgIH1cbiAgICBdO1xuICAgIHN0YXRlW2xvY2FsZU1lc3NhZ2VzVHlwZV0gPSBsb2NhbGVNZXNzYWdlc1N0YXRlcztcbiAgICB7XG4gICAgICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0c1R5cGUgPSAnRGF0ZXRpbWUgZm9ybWF0cyBpbmZvJztcbiAgICAgICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzU3RhdGVzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IGRhdGV0aW1lRm9ybWF0c1R5cGUsXG4gICAgICAgICAgICAgICAga2V5OiAnZGF0ZXRpbWVGb3JtYXRzJyxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmRhdGV0aW1lRm9ybWF0cy52YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICBzdGF0ZVtkYXRldGltZUZvcm1hdHNUeXBlXSA9IGRhdGV0aW1lRm9ybWF0c1N0YXRlcztcbiAgICAgICAgY29uc3QgbnVtYmVyRm9ybWF0c1R5cGUgPSAnRGF0ZXRpbWUgZm9ybWF0cyBpbmZvJztcbiAgICAgICAgY29uc3QgbnVtYmVyRm9ybWF0c1N0YXRlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBudW1iZXJGb3JtYXRzVHlwZSxcbiAgICAgICAgICAgICAgICBrZXk6ICdudW1iZXJGb3JtYXRzJyxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLm51bWJlckZvcm1hdHMudmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgc3RhdGVbbnVtYmVyRm9ybWF0c1R5cGVdID0gbnVtYmVyRm9ybWF0c1N0YXRlcztcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xufVxuZnVuY3Rpb24gYWRkVGltZWxpbmVFdmVudChldmVudCwgcGF5bG9hZCkge1xuICAgIGlmIChkZXZ0b29sc0FwaSkge1xuICAgICAgICBsZXQgZ3JvdXBJZDtcbiAgICAgICAgaWYgKHBheWxvYWQgJiYgJ2dyb3VwSWQnIGluIHBheWxvYWQpIHtcbiAgICAgICAgICAgIGdyb3VwSWQgPSBwYXlsb2FkLmdyb3VwSWQ7XG4gICAgICAgICAgICBkZWxldGUgcGF5bG9hZC5ncm91cElkO1xuICAgICAgICB9XG4gICAgICAgIGRldnRvb2xzQXBpLmFkZFRpbWVsaW5lRXZlbnQoe1xuICAgICAgICAgICAgbGF5ZXJJZDogXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovLFxuICAgICAgICAgICAgZXZlbnQ6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZXZlbnQsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIG1ldGE6IHt9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHBheWxvYWQgfHwge30sXG4gICAgICAgICAgICAgICAgbG9nVHlwZTogZXZlbnQgPT09IFwiY29tcGlsZS1lcnJvclwiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuQ09NUElMRV9FUlJPUiAqL1xuICAgICAgICAgICAgICAgICAgICA/ICdlcnJvcidcbiAgICAgICAgICAgICAgICAgICAgOiBldmVudCA9PT0gXCJmYWxsYmFja1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuRkFMQkFDSyAqLyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPT09IFwibWlzc2luZ1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuTUlTU0lORyAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnd2FybmluZydcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2RlZmF1bHQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVkaXRTY29wZShwYXlsb2FkLCBpMThuKSB7XG4gICAgY29uc3QgY29tcG9zZXIgPSBnZXRDb21wb3NlciQxKHBheWxvYWQubm9kZUlkLCBpMThuKTtcbiAgICBpZiAoY29tcG9zZXIpIHtcbiAgICAgICAgY29uc3QgW2ZpZWxkXSA9IHBheWxvYWQucGF0aDtcbiAgICAgICAgaWYgKGZpZWxkID09PSAnbG9jYWxlJyAmJiBpc1N0cmluZyhwYXlsb2FkLnN0YXRlLnZhbHVlKSkge1xuICAgICAgICAgICAgY29tcG9zZXIubG9jYWxlLnZhbHVlID0gcGF5bG9hZC5zdGF0ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PT0gJ2ZhbGxiYWNrTG9jYWxlJyAmJlxuICAgICAgICAgICAgKGlzU3RyaW5nKHBheWxvYWQuc3RhdGUudmFsdWUpIHx8XG4gICAgICAgICAgICAgICAgaXNBcnJheShwYXlsb2FkLnN0YXRlLnZhbHVlKSB8fFxuICAgICAgICAgICAgICAgIGlzT2JqZWN0KHBheWxvYWQuc3RhdGUudmFsdWUpKSkge1xuICAgICAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWUgPSBwYXlsb2FkLnN0YXRlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09PSAnaW5oZXJpdExvY2FsZScgJiYgaXNCb29sZWFuKHBheWxvYWQuc3RhdGUudmFsdWUpKSB7XG4gICAgICAgICAgICBjb21wb3Nlci5pbmhlcml0TG9jYWxlID0gcGF5bG9hZC5zdGF0ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBTdXBwb3J0cyBjb21wYXRpYmlsaXR5IGZvciBsZWdhY3kgdnVlLWkxOG4gQVBJc1xuICogVGhpcyBtaXhpbiBpcyB1c2VkIHdoZW4gd2UgdXNlIHZ1ZS1pMThuQHY5Lnggb3IgbGF0ZXJcbiAqL1xuZnVuY3Rpb24gZGVmaW5lTWl4aW4odnVlaTE4biwgY29tcG9zZXIsIGkxOG4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pMThuKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uc0kxOG4gPSBvcHRpb25zLmkxOG47XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuX19pMThuKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNJMThuLl9faTE4biA9IG9wdGlvbnMuX19pMThuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRpb25zSTE4bi5fX3Jvb3QgPSBjb21wb3NlcjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcyA9PT0gdGhpcy4kcm9vdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtZXJnZSBvcHRpb24gYW5kIGd0dGFjaCBnbG9iYWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IG1lcmdlVG9HbG9iYWwodnVlaTE4biwgb3B0aW9uc0kxOG4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0kxOG4uX19pbmplY3RXaXRoT3B0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0kxOG4uX19leHRlbmRlciA9IGkxOG4uX192dWVJMThuRXh0ZW5kO1xuICAgICAgICAgICAgICAgICAgICAvLyBhdHR0YWNoIGxvY2FsIFZ1ZUkxOG4gaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IGNyZWF0ZVZ1ZUkxOG4ob3B0aW9uc0kxOG4pO1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgVnVlSTE4biBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBfdnVlSTE4biA9IHRoaXMuJGkxOG47XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdnVlSTE4bi5fX2V4dGVuZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2Rpc3Bvc2VyID0gX3Z1ZUkxOG4uX19leHRlbmRlcih0aGlzLiRpMThuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuX19pMThuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMgPT09IHRoaXMuJHJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWVyZ2Ugb3B0aW9uIGFuZCBndHRhY2ggZ2xvYmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4gPSBtZXJnZVRvR2xvYmFsKHZ1ZWkxOG4sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0dGFjaCBsb2NhbCBWdWVJMThuIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4gPSBjcmVhdGVWdWVJMThuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9faTE4bjogb3B0aW9ucy5fX2kxOG4sXG4gICAgICAgICAgICAgICAgICAgICAgICBfX2luamVjdFdpdGhPcHRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBfX2V4dGVuZGVyOiBpMThuLl9fdnVlSTE4bkV4dGVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fcm9vdDogY29tcG9zZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBWdWVJMThuIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF92dWVJMThuID0gdGhpcy4kaTE4bjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF92dWVJMThuLl9fZXh0ZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZGlzcG9zZXIgPSBfdnVlSTE4bi5fX2V4dGVuZGVyKHRoaXMuJGkxOG4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGdsb2JhbCBWdWVJMThuIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IHZ1ZWkxOG47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5fX2kxOG5HbG9iYWwpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RJMThuUmVzb3VyY2VzKGNvbXBvc2VyLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRlZmluZXMgdnVlLWkxOG4gbGVnYWN5IEFQSXNcbiAgICAgICAgICAgIHRoaXMuJHQgPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi50KC4uLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy4kcnQgPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi5ydCguLi5hcmdzKTtcbiAgICAgICAgICAgIHRoaXMuJHRjID0gKC4uLmFyZ3MpID0+IHRoaXMuJGkxOG4udGMoLi4uYXJncyk7XG4gICAgICAgICAgICB0aGlzLiR0ZSA9IChrZXksIGxvY2FsZSkgPT4gdGhpcy4kaTE4bi50ZShrZXksIGxvY2FsZSk7XG4gICAgICAgICAgICB0aGlzLiRkID0gKC4uLmFyZ3MpID0+IHRoaXMuJGkxOG4uZCguLi5hcmdzKTtcbiAgICAgICAgICAgIHRoaXMuJG4gPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi5uKC4uLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy4kdG0gPSAoa2V5KSA9PiB0aGlzLiRpMThuLnRtKGtleSk7XG4gICAgICAgICAgICBpMThuLl9fc2V0SW5zdGFuY2UoaW5zdGFuY2UsIHRoaXMuJGkxOG4pO1xuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXG4gICAgICAgICAgICAgICAgIWZhbHNlICYmXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwgJiZcbiAgICAgICAgICAgICAgICB0aGlzLiRpMThuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3Z1ZUkxOG4gPSB0aGlzLiRpMThuO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLl9fVlVFX0kxOE5fXyA9IF92dWVJMThuLl9fY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9ICh0aGlzLl9fdl9lbWl0dGVyID1cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRW1pdHRlcigpKTtcbiAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIgJiYgX3Z1ZUkxOG4uX19lbmFibGVFbWl0dGVyKGVtaXR0ZXIpO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdW5tb3VudGVkKCkge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IF92dWVJMThuID0gdGhpcy4kaTE4bjtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJlxuICAgICAgICAgICAgICAgICFmYWxzZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuJGVsICYmXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuX19WVUVfSTE4Tl9fKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX192X2VtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3ZfZW1pdHRlci5vZmYoJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX192X2VtaXR0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRpMThuKSB7XG4gICAgICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZGlzYWJsZUVtaXR0ZXIgJiYgX3Z1ZUkxOG4uX19kaXNhYmxlRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy4kZWwuX19WVUVfSTE4Tl9fO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiR0O1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHJ0O1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHRjO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHRlO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJGQ7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kbjtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiR0bTtcbiAgICAgICAgICAgIGlmIChfdnVlSTE4bi5fX2Rpc3Bvc2VyKSB7XG4gICAgICAgICAgICAgICAgX3Z1ZUkxOG4uX19kaXNwb3NlcigpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdnVlSTE4bi5fX2Rpc3Bvc2VyO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdnVlSTE4bi5fX2V4dGVuZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaTE4bi5fX2RlbGV0ZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRpMThuO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG1lcmdlVG9HbG9iYWwoZywgb3B0aW9ucykge1xuICAgIGcubG9jYWxlID0gb3B0aW9ucy5sb2NhbGUgfHwgZy5sb2NhbGU7XG4gICAgZy5mYWxsYmFja0xvY2FsZSA9IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgfHwgZy5mYWxsYmFja0xvY2FsZTtcbiAgICBnLm1pc3NpbmcgPSBvcHRpb25zLm1pc3NpbmcgfHwgZy5taXNzaW5nO1xuICAgIGcuc2lsZW50VHJhbnNsYXRpb25XYXJuID1cbiAgICAgICAgb3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm4gfHwgZy5zaWxlbnRGYWxsYmFja1dhcm47XG4gICAgZy5zaWxlbnRGYWxsYmFja1dhcm4gPSBvcHRpb25zLnNpbGVudEZhbGxiYWNrV2FybiB8fCBnLnNpbGVudEZhbGxiYWNrV2FybjtcbiAgICBnLmZvcm1hdEZhbGxiYWNrTWVzc2FnZXMgPVxuICAgICAgICBvcHRpb25zLmZvcm1hdEZhbGxiYWNrTWVzc2FnZXMgfHwgZy5mb3JtYXRGYWxsYmFja01lc3NhZ2VzO1xuICAgIGcucG9zdFRyYW5zbGF0aW9uID0gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb24gfHwgZy5wb3N0VHJhbnNsYXRpb247XG4gICAgZy53YXJuSHRtbEluTWVzc2FnZSA9IG9wdGlvbnMud2Fybkh0bWxJbk1lc3NhZ2UgfHwgZy53YXJuSHRtbEluTWVzc2FnZTtcbiAgICBnLmVzY2FwZVBhcmFtZXRlckh0bWwgPSBvcHRpb25zLmVzY2FwZVBhcmFtZXRlckh0bWwgfHwgZy5lc2NhcGVQYXJhbWV0ZXJIdG1sO1xuICAgIGcuc3luYyA9IG9wdGlvbnMuc3luYyB8fCBnLnN5bmM7XG4gICAgZy5fX2NvbXBvc2VyW1NldFBsdXJhbFJ1bGVzU3ltYm9sXShvcHRpb25zLnBsdXJhbGl6YXRpb25SdWxlcyB8fCBnLnBsdXJhbGl6YXRpb25SdWxlcyk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBnZXRMb2NhbGVNZXNzYWdlcyhnLmxvY2FsZSwge1xuICAgICAgICBtZXNzYWdlczogb3B0aW9ucy5tZXNzYWdlcyxcbiAgICAgICAgX19pMThuOiBvcHRpb25zLl9faTE4blxuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG1lc3NhZ2VzKS5mb3JFYWNoKGxvY2FsZSA9PiBnLm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2VzW2xvY2FsZV0pKTtcbiAgICBpZiAob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpLmZvckVhY2gobG9jYWxlID0+IGcubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzW2xvY2FsZV0pKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubnVtYmVyRm9ybWF0cykge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLm51bWJlckZvcm1hdHMpLmZvckVhY2gobG9jYWxlID0+IGcubWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zLm51bWJlckZvcm1hdHNbbG9jYWxlXSkpO1xuICAgIH1cbiAgICByZXR1cm4gZztcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24ga2V5IGZvciB7QGxpbmsgdXNlSTE4bn1cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhlIGdsb2JhbCBpbmplY3Rpb24ga2V5IGZvciBJMThuIGluc3RhbmNlcyB3aXRoIGB1c2VJMThuYC4gdGhpcyBpbmplY3Rpb24ga2V5IGlzIHVzZWQgaW4gV2ViIENvbXBvbmVudHMuXG4gKiBTcGVjaWZ5IHRoZSBpMThuIGluc3RhbmNlIGNyZWF0ZWQgYnkge0BsaW5rIGNyZWF0ZUkxOG59IHRvZ2V0aGVyIHdpdGggYHByb3ZpZGVgIGZ1bmN0aW9uLlxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5jb25zdCBJMThuSW5qZWN0aW9uS2V5ID0gXG4vKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdnbG9iYWwtdnVlLWkxOG4nKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiBjcmVhdGVJMThuKG9wdGlvbnMgPSB7fSwgVnVlSTE4bkxlZ2FjeSkge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9fbGVnYWN5TW9kZSA9IF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIGlzQm9vbGVhbihvcHRpb25zLmxlZ2FjeSlcbiAgICAgICAgICAgID8gb3B0aW9ucy5sZWdhY3lcbiAgICAgICAgICAgIDogX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX187XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX19nbG9iYWxJbmplY3Rpb24gPSBpc0Jvb2xlYW4ob3B0aW9ucy5nbG9iYWxJbmplY3Rpb24pXG4gICAgICAgID8gb3B0aW9ucy5nbG9iYWxJbmplY3Rpb25cbiAgICAgICAgOiB0cnVlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9fYWxsb3dDb21wb3NpdGlvbiA9IF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIF9fbGVnYWN5TW9kZVxuICAgICAgICAgICAgPyAhIW9wdGlvbnMuYWxsb3dDb21wb3NpdGlvblxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IF9faW5zdGFuY2VzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IFtnbG9iYWxTY29wZSwgX19nbG9iYWxdID0gY3JlYXRlR2xvYmFsKG9wdGlvbnMsIF9fbGVnYWN5TW9kZSk7XG4gICAgY29uc3Qgc3ltYm9sID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgPyAndnVlLWkxOG4nIDogJycpO1xuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgaWYgKF9fbGVnYWN5TW9kZSAmJiBfX2FsbG93Q29tcG9zaXRpb24gJiYgIWZhbHNlKSB7XG4gICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9USUNFX0RST1BfQUxMT1dfQ09NUE9TSVRJT04pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBfX2dldEluc3RhbmNlKGNvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gX19pbnN0YW5jZXMuZ2V0KGNvbXBvbmVudCkgfHwgbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gX19zZXRJbnN0YW5jZShjb21wb25lbnQsIGluc3RhbmNlKSB7XG4gICAgICAgIF9faW5zdGFuY2VzLnNldChjb21wb25lbnQsIGluc3RhbmNlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX19kZWxldGVJbnN0YW5jZShjb21wb25lbnQpIHtcbiAgICAgICAgX19pbnN0YW5jZXMuZGVsZXRlKGNvbXBvbmVudCk7XG4gICAgfVxuICAgIHtcbiAgICAgICAgY29uc3QgaTE4biA9IHtcbiAgICAgICAgICAgIC8vIG1vZGVcbiAgICAgICAgICAgIGdldCBtb2RlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXyAmJiBfX2xlZ2FjeU1vZGVcbiAgICAgICAgICAgICAgICAgICAgPyAnbGVnYWN5J1xuICAgICAgICAgICAgICAgICAgICA6ICdjb21wb3NpdGlvbic7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gYWxsb3dDb21wb3NpdGlvblxuICAgICAgICAgICAgZ2V0IGFsbG93Q29tcG9zaXRpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYWxsb3dDb21wb3NpdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBpbnN0YWxsIHBsdWdpblxuICAgICAgICAgICAgYXN5bmMgaW5zdGFsbChhcHAsIC4uLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXG4gICAgICAgICAgICAgICAgICAgICFmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBhcHAuX19WVUVfSTE4Tl9fID0gaTE4bjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gc2V0dXAgZ2xvYmFsIHByb3ZpZGVyXG4gICAgICAgICAgICAgICAgYXBwLl9fVlVFX0kxOE5fU1lNQk9MX18gPSBzeW1ib2w7XG4gICAgICAgICAgICAgICAgYXBwLnByb3ZpZGUoYXBwLl9fVlVFX0kxOE5fU1lNQk9MX18sIGkxOG4pO1xuICAgICAgICAgICAgICAgIC8vIHNldCBjb21wb3NlciAmIHZ1ZWkxOG4gZXh0ZW5kIGhvb2sgb3B0aW9ucyBmcm9tIHBsdWdpbiBvcHRpb25zXG4gICAgICAgICAgICAgICAgaWYgKGlzUGxhaW5PYmplY3Qob3B0aW9uc1swXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0cyA9IG9wdGlvbnNbMF07XG4gICAgICAgICAgICAgICAgICAgIGkxOG4uX19jb21wb3NlckV4dGVuZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLl9fY29tcG9zZXJFeHRlbmQ7XG4gICAgICAgICAgICAgICAgICAgIGkxOG4uX192dWVJMThuRXh0ZW5kID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuX192dWVJMThuRXh0ZW5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBnbG9iYWwgbWV0aG9kIGFuZCBwcm9wZXJ0aWVzIGluamVjdGlvbiBmb3IgQ29tcG9zaXRpb24gQVBJXG4gICAgICAgICAgICAgICAgbGV0IGdsb2JhbFJlbGVhc2VIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIV9fbGVnYWN5TW9kZSAmJiBfX2dsb2JhbEluamVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxSZWxlYXNlSGFuZGxlciA9IGluamVjdEdsb2JhbEZpZWxkcyhhcHAsIGkxOG4uZ2xvYmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaW5zdGFsbCBidWlsdC1pbiBjb21wb25lbnRzIGFuZCBkaXJlY3RpdmVcbiAgICAgICAgICAgICAgICBpZiAoX19WVUVfSTE4Tl9GVUxMX0lOU1RBTExfXykge1xuICAgICAgICAgICAgICAgICAgICBhcHBseShhcHAsIGkxOG4sIC4uLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzZXR1cCBtaXhpbiBmb3IgTGVnYWN5IEFQSVxuICAgICAgICAgICAgICAgIGlmIChfX1ZVRV9JMThOX0xFR0FDWV9BUElfXyAmJiBfX2xlZ2FjeU1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLm1peGluKGRlZmluZU1peGluKF9fZ2xvYmFsLCBfX2dsb2JhbC5fX2NvbXBvc2VyLCBpMThuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJlbGVhc2UgZ2xvYmFsIHNjb3BlXG4gICAgICAgICAgICAgICAgY29uc3QgdW5tb3VudEFwcCA9IGFwcC51bm1vdW50O1xuICAgICAgICAgICAgICAgIGFwcC51bm1vdW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxSZWxlYXNlSGFuZGxlciAmJiBnbG9iYWxSZWxlYXNlSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgICAgICBpMThuLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdW5tb3VudEFwcCgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gc2V0dXAgdnVlLWRldnRvb2xzIHBsdWdpblxuICAgICAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiYgIWZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGVuYWJsZURldlRvb2xzKGFwcCwgaTE4bik7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuQ0FOTk9UX1NFVFVQX1ZVRV9ERVZUT09MU19QTFVHSU4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjcmVhdGVFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfX2xlZ2FjeU1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF92dWVJMThuID0gX19nbG9iYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIgJiYgX3Z1ZUkxOG4uX19lbmFibGVFbWl0dGVyKGVtaXR0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9jb21wb3NlciA9IF9fZ2xvYmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdICYmIF9jb21wb3NlcltFbmFibGVFbWl0dGVyXShlbWl0dGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLm9uKCcqJywgYWRkVGltZWxpbmVFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGdsb2JhbCBhY2Nlc3NvclxuICAgICAgICAgICAgZ2V0IGdsb2JhbCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19nbG9iYWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzcG9zZSgpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxTY29wZS5zdG9wKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQGludGVybmFsXG4gICAgICAgICAgICBfX2luc3RhbmNlcyxcbiAgICAgICAgICAgIC8vIEBpbnRlcm5hbFxuICAgICAgICAgICAgX19nZXRJbnN0YW5jZSxcbiAgICAgICAgICAgIC8vIEBpbnRlcm5hbFxuICAgICAgICAgICAgX19zZXRJbnN0YW5jZSxcbiAgICAgICAgICAgIC8vIEBpbnRlcm5hbFxuICAgICAgICAgICAgX19kZWxldGVJbnN0YW5jZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaTE4bjtcbiAgICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gdXNlSTE4bihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgIGlmIChpbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5NVVNUX0JFX0NBTExfU0VUVVBfVE9QKTtcbiAgICB9XG4gICAgaWYgKCFpbnN0YW5jZS5pc0NFICYmXG4gICAgICAgIGluc3RhbmNlLmFwcENvbnRleHQuYXBwICE9IG51bGwgJiZcbiAgICAgICAgIWluc3RhbmNlLmFwcENvbnRleHQuYXBwLl9fVlVFX0kxOE5fU1lNQk9MX18pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLk5PVF9JTlNUQUxMRUQpO1xuICAgIH1cbiAgICBjb25zdCBpMThuID0gZ2V0STE4bkluc3RhbmNlKGluc3RhbmNlKTtcbiAgICBjb25zdCBnbCA9IGdldEdsb2JhbENvbXBvc2VyKGkxOG4pO1xuICAgIGNvbnN0IGNvbXBvbmVudE9wdGlvbnMgPSBnZXRDb21wb25lbnRPcHRpb25zKGluc3RhbmNlKTtcbiAgICBjb25zdCBzY29wZSA9IGdldFNjb3BlKG9wdGlvbnMsIGNvbXBvbmVudE9wdGlvbnMpO1xuICAgIGlmIChfX1ZVRV9JMThOX0xFR0FDWV9BUElfXykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpZiAoaTE4bi5tb2RlID09PSAnbGVnYWN5JyAmJiAhb3B0aW9ucy5fX3VzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgaWYgKCFpMThuLmFsbG93Q29tcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTk9UX0FWQUlMQUJMRV9JTl9MRUdBQ1lfTU9ERSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXNlSTE4bkZvckxlZ2FjeShpbnN0YW5jZSwgc2NvcGUsIGdsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2NvcGUgPT09ICdnbG9iYWwnKSB7XG4gICAgICAgIGFkanVzdEkxOG5SZXNvdXJjZXMoZ2wsIG9wdGlvbnMsIGNvbXBvbmVudE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZ2w7XG4gICAgfVxuICAgIGlmIChzY29wZSA9PT0gJ3BhcmVudCcpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgbGV0IGNvbXBvc2VyID0gZ2V0Q29tcG9zZXIoaTE4biwgaW5zdGFuY2UsIG9wdGlvbnMuX191c2VDb21wb25lbnQpO1xuICAgICAgICBpZiAoY29tcG9zZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfRk9VTkRfUEFSRU5UX1NDT1BFKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb3NlciA9IGdsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb3NlcjtcbiAgICB9XG4gICAgY29uc3QgaTE4bkludGVybmFsID0gaTE4bjtcbiAgICBsZXQgY29tcG9zZXIgPSBpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgaWYgKGNvbXBvc2VyID09IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29tcG9zZXJPcHRpb25zID0gYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCdfX2kxOG4nIGluIGNvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbXBvc2VyT3B0aW9ucy5fX2kxOG4gPSBjb21wb25lbnRPcHRpb25zLl9faTE4bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2wpIHtcbiAgICAgICAgICAgIGNvbXBvc2VyT3B0aW9ucy5fX3Jvb3QgPSBnbDtcbiAgICAgICAgfVxuICAgICAgICBjb21wb3NlciA9IGNyZWF0ZUNvbXBvc2VyKGNvbXBvc2VyT3B0aW9ucyk7XG4gICAgICAgIGlmIChpMThuSW50ZXJuYWwuX19jb21wb3NlckV4dGVuZCkge1xuICAgICAgICAgICAgY29tcG9zZXJbRGlzcG9zZVN5bWJvbF0gPVxuICAgICAgICAgICAgICAgIGkxOG5JbnRlcm5hbC5fX2NvbXBvc2VyRXh0ZW5kKGNvbXBvc2VyKTtcbiAgICAgICAgfVxuICAgICAgICBzZXR1cExpZmVDeWNsZShpMThuSW50ZXJuYWwsIGluc3RhbmNlLCBjb21wb3Nlcik7XG4gICAgICAgIGkxOG5JbnRlcm5hbC5fX3NldEluc3RhbmNlKGluc3RhbmNlLCBjb21wb3Nlcik7XG4gICAgfVxuICAgIHJldHVybiBjb21wb3Nlcjtcbn1cbi8qKlxuICogQ2FzdCB0byBWdWVJMThuIGxlZ2FjeSBjb21wYXRpYmxlIHR5cGVcbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBBUEkgaXMgcHJvdmlkZWQgb25seSB3aXRoIFt2dWUtaTE4bi1icmlkZ2VdKGh0dHBzOi8vdnVlLWkxOG4uaW50bGlmeS5kZXYvZ3VpZGUvbWlncmF0aW9uL3dheXMuaHRtbCN3aGF0LWlzLXZ1ZS1pMThuLWJyaWRnZSkuXG4gKlxuICogVGhlIHB1cnBvc2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjb252ZXJ0IGFuIHtAbGluayBJMThufSBpbnN0YW5jZSBjcmVhdGVkIHdpdGgge0BsaW5rIGNyZWF0ZUkxOG4gfCBjcmVhdGVJMThuKGxlZ2FjeTogdHJ1ZSl9IGludG8gYSBgdnVlLWkxOG5AdjgueGAgY29tcGF0aWJsZSBpbnN0YW5jZSBvZiBgbmV3IFZ1ZUkxOG5gIGluIGEgVHlwZVNjcmlwdCBlbnZpcm9ubWVudC5cbiAqXG4gKiBAcGFyYW0gaTE4biAtIEFuIGluc3RhbmNlIG9mIHtAbGluayBJMThufVxuICogQHJldHVybnMgQSBpMThuIGluc3RhbmNlIHdoaWNoIGlzIGNhc3RlZCB0byB7QGxpbmsgVnVlSTE4bn0gdHlwZVxuICpcbiAqIEBWdWVJMThuVGlwXG4gKiA6bmV3OiBwcm92aWRlZCBieSAqKnZ1ZS1pMThuLWJyaWRnZSBvbmx5KipcbiAqXG4gKiBAVnVlSTE4bkdlbmVyYWxcbiAqL1xuLyogI19fTk9fU0lERV9FRkZFQ1RTX18gKi9cbmNvbnN0IGNhc3RUb1Z1ZUkxOG4gPSAoaTE4blxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbikgPT4ge1xuICAgIGlmICghKF9fVlVFX0kxOE5fQlJJREdFX18gaW4gaTE4bikpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLk5PVF9DT01QQVRJQkxFX0xFR0FDWV9WVUVfSTE4Tik7XG4gICAgfVxuICAgIHJldHVybiBpMThuO1xufTtcbmZ1bmN0aW9uIGNyZWF0ZUdsb2JhbChvcHRpb25zLCBsZWdhY3lNb2RlLCBWdWVJMThuTGVnYWN5IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuKSB7XG4gICAgY29uc3Qgc2NvcGUgPSBlZmZlY3RTY29wZSgpO1xuICAgIHtcbiAgICAgICAgY29uc3Qgb2JqID0gX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX18gJiYgbGVnYWN5TW9kZVxuICAgICAgICAgICAgPyBzY29wZS5ydW4oKCkgPT4gY3JlYXRlVnVlSTE4bihvcHRpb25zKSlcbiAgICAgICAgICAgIDogc2NvcGUucnVuKCgpID0+IGNyZWF0ZUNvbXBvc2VyKG9wdGlvbnMpKTtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtzY29wZSwgb2JqXTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRJMThuSW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICB7XG4gICAgICAgIGNvbnN0IGkxOG4gPSBpbmplY3QoIWluc3RhbmNlLmlzQ0VcbiAgICAgICAgICAgID8gaW5zdGFuY2UuYXBwQ29udGV4dC5hcHAuX19WVUVfSTE4Tl9TWU1CT0xfX1xuICAgICAgICAgICAgOiBJMThuSW5qZWN0aW9uS2V5KTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghaTE4bikge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKCFpbnN0YW5jZS5pc0NFXG4gICAgICAgICAgICAgICAgPyBJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SXG4gICAgICAgICAgICAgICAgOiBJMThuRXJyb3JDb2Rlcy5OT1RfSU5TVEFMTEVEX1dJVEhfUFJPVklERSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG47XG4gICAgfVxufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmZ1bmN0aW9uIGdldFNjb3BlKG9wdGlvbnMsIGNvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICByZXR1cm4gaXNFbXB0eU9iamVjdChvcHRpb25zKVxuICAgICAgICA/ICgnX19pMThuJyBpbiBjb21wb25lbnRPcHRpb25zKVxuICAgICAgICAgICAgPyAnbG9jYWwnXG4gICAgICAgICAgICA6ICdnbG9iYWwnXG4gICAgICAgIDogIW9wdGlvbnMudXNlU2NvcGVcbiAgICAgICAgICAgID8gJ2xvY2FsJ1xuICAgICAgICAgICAgOiBvcHRpb25zLnVzZVNjb3BlO1xufVxuZnVuY3Rpb24gZ2V0R2xvYmFsQ29tcG9zZXIoaTE4bikge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIHJldHVybiBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcbiAgICAgICAgICAgID8gaTE4bi5nbG9iYWxcbiAgICAgICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlclxuICAgICAgICA7XG59XG5mdW5jdGlvbiBnZXRDb21wb3NlcihpMThuLCB0YXJnZXQsIHVzZUNvbXBvbmVudCA9IGZhbHNlKSB7XG4gICAgbGV0IGNvbXBvc2VyID0gbnVsbDtcbiAgICBjb25zdCByb290ID0gdGFyZ2V0LnJvb3Q7XG4gICAgbGV0IGN1cnJlbnQgPSBnZXRQYXJlbnRDb21wb25lbnRJbnN0YW5jZSh0YXJnZXQsIHVzZUNvbXBvbmVudCk7XG4gICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBpMThuSW50ZXJuYWwgPSBpMThuO1xuICAgICAgICBpZiAoaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nKSB7XG4gICAgICAgICAgICBjb21wb3NlciA9IGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdnVlSTE4biA9IGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIGlmICh2dWVJMThuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9zZXIgPSB2dWVJMThuXG4gICAgICAgICAgICAgICAgICAgICAgICAuX19jb21wb3NlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZUNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICFjb21wb3NlcltJbmVqY3RXaXRoT3B0aW9uU3ltYm9sXSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBvc2VyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb290ID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBjb21wb3Nlcjtcbn1cbmZ1bmN0aW9uIGdldFBhcmVudENvbXBvbmVudEluc3RhbmNlKHRhcmdldCwgdXNlQ29tcG9uZW50ID0gZmFsc2UpIHtcbiAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHtcbiAgICAgICAgLy8gaWYgYHVzZUNvbXBvbmVudDogdHJ1ZWAgd2lsbCBiZSBzcGVjaWZpZWQsIHdlIGdldCBsZXhpY2FsIHNjb3BlIG93bmVyIGluc3RhbmNlIGZvciB1c2UtY2FzZSBzbG90c1xuICAgICAgICByZXR1cm4gIXVzZUNvbXBvbmVudFxuICAgICAgICAgICAgPyB0YXJnZXQucGFyZW50XG4gICAgICAgICAgICA6IHRhcmdldC52bm9kZS5jdHggfHwgdGFyZ2V0LnBhcmVudDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0dXBMaWZlQ3ljbGUoaTE4biwgdGFyZ2V0LCBjb21wb3Nlcikge1xuICAgIGxldCBlbWl0dGVyID0gbnVsbDtcbiAgICB7XG4gICAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBpbmplY3QgY29tcG9zZXIgaW5zdGFuY2UgdG8gRE9NIGZvciBpbnRsaWZ5LWRldnRvb2xzXG4gICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXG4gICAgICAgICAgICAgICAgIWZhbHNlICYmXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZub2RlLmVsKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZub2RlLmVsLl9fVlVFX0kxOE5fXyA9IGNvbXBvc2VyO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIgPSBjcmVhdGVFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgICBjb25zdCBfY29tcG9zZXIgPSBjb21wb3NlcjtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0gJiYgX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdKGVtaXR0ZXIpO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGFyZ2V0KTtcbiAgICAgICAgb25Vbm1vdW50ZWQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGNvbnN0IF9jb21wb3NlciA9IGNvbXBvc2VyO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGNvbXBvc2VyIGluc3RhbmNlIGZyb20gRE9NIGZvciBpbnRsaWZ5LWRldnRvb2xzXG4gICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXG4gICAgICAgICAgICAgICAgIWZhbHNlICYmXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZub2RlLmVsICYmXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZub2RlLmVsLl9fVlVFX0kxOE5fXykge1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIgJiYgZW1pdHRlci5vZmYoJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXJbRGlzYWJsZUVtaXR0ZXJdICYmIF9jb21wb3NlcltEaXNhYmxlRW1pdHRlcl0oKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGFyZ2V0LnZub2RlLmVsLl9fVlVFX0kxOE5fXztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkxOG4uX19kZWxldGVJbnN0YW5jZSh0YXJnZXQpO1xuICAgICAgICAgICAgLy8gZGlzcG9zZSBleHRlbmRlZCByZXNvdXJjZXNcbiAgICAgICAgICAgIGNvbnN0IGRpc3Bvc2UgPSBfY29tcG9zZXJbRGlzcG9zZVN5bWJvbF07XG4gICAgICAgICAgICBpZiAoZGlzcG9zZSkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgX2NvbXBvc2VyW0Rpc3Bvc2VTeW1ib2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0YXJnZXQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVzZUkxOG5Gb3JMZWdhY3koaW5zdGFuY2UsIHNjb3BlLCByb290LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4pIHtcbiAgICBjb25zdCBpc0xvY2FsU2NvcGUgPSBzY29wZSA9PT0gJ2xvY2FsJztcbiAgICBjb25zdCBfY29tcG9zZXIgPSBzaGFsbG93UmVmKG51bGwpO1xuICAgIGlmIChpc0xvY2FsU2NvcGUgJiZcbiAgICAgICAgaW5zdGFuY2UucHJveHkgJiZcbiAgICAgICAgIShpbnN0YW5jZS5wcm94eS4kb3B0aW9ucy5pMThuIHx8IGluc3RhbmNlLnByb3h5LiRvcHRpb25zLl9faTE4bikpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLk1VU1RfREVGSU5FX0kxOE5fT1BUSU9OX0lOX0FMTE9XX0NPTVBPU0lUSU9OKTtcbiAgICB9XG4gICAgY29uc3QgX2luaGVyaXRMb2NhbGUgPSBpc0Jvb2xlYW4ob3B0aW9ucy5pbmhlcml0TG9jYWxlKVxuICAgICAgICA/IG9wdGlvbnMuaW5oZXJpdExvY2FsZVxuICAgICAgICA6ICFpc1N0cmluZyhvcHRpb25zLmxvY2FsZSk7XG4gICAgY29uc3QgX2xvY2FsZSA9IHJlZihcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAhaXNMb2NhbFNjb3BlIHx8IF9pbmhlcml0TG9jYWxlXG4gICAgICAgID8gcm9vdC5sb2NhbGUudmFsdWVcbiAgICAgICAgOiBpc1N0cmluZyhvcHRpb25zLmxvY2FsZSlcbiAgICAgICAgICAgID8gb3B0aW9ucy5sb2NhbGVcbiAgICAgICAgICAgIDogREVGQVVMVF9MT0NBTEUpO1xuICAgIGNvbnN0IF9mYWxsYmFja0xvY2FsZSA9IHJlZihcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAhaXNMb2NhbFNjb3BlIHx8IF9pbmhlcml0TG9jYWxlXG4gICAgICAgID8gcm9vdC5mYWxsYmFja0xvY2FsZS52YWx1ZVxuICAgICAgICA6IGlzU3RyaW5nKG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgICAgICBpc0FycmF5KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgICAgICBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgICAgICBvcHRpb25zLmZhbGxiYWNrTG9jYWxlID09PSBmYWxzZVxuICAgICAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrTG9jYWxlXG4gICAgICAgICAgICA6IF9sb2NhbGUudmFsdWUpO1xuICAgIGNvbnN0IF9tZXNzYWdlcyA9IHJlZihnZXRMb2NhbGVNZXNzYWdlcyhfbG9jYWxlLnZhbHVlLCBvcHRpb25zKSk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX2RhdGV0aW1lRm9ybWF0cyA9IHJlZihpc1BsYWluT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKVxuICAgICAgICA/IG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzXG4gICAgICAgIDogeyBbX2xvY2FsZS52YWx1ZV06IHt9IH0pO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9udW1iZXJGb3JtYXRzID0gcmVmKGlzUGxhaW5PYmplY3Qob3B0aW9ucy5udW1iZXJGb3JtYXRzKVxuICAgICAgICA/IG9wdGlvbnMubnVtYmVyRm9ybWF0c1xuICAgICAgICA6IHsgW19sb2NhbGUudmFsdWVdOiB7fSB9KTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfbWlzc2luZ1dhcm4gPSBpc0xvY2FsU2NvcGVcbiAgICAgICAgPyByb290Lm1pc3NpbmdXYXJuXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pIHx8IGlzUmVnRXhwKG9wdGlvbnMubWlzc2luZ1dhcm4pXG4gICAgICAgICAgICA/IG9wdGlvbnMubWlzc2luZ1dhcm5cbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfZmFsbGJhY2tXYXJuID0gaXNMb2NhbFNjb3BlXG4gICAgICAgID8gcm9vdC5mYWxsYmFja1dhcm5cbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pIHx8IGlzUmVnRXhwKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxuICAgICAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrV2FyblxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9mYWxsYmFja1Jvb3QgPSBpc0xvY2FsU2NvcGVcbiAgICAgICAgPyByb290LmZhbGxiYWNrUm9vdFxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrUm9vdClcbiAgICAgICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1Jvb3RcbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAvLyBjb25maWd1cmUgZmFsbCBiYWNrIHRvIHJvb3RcbiAgICBjb25zdCBfZmFsbGJhY2tGb3JtYXQgPSAhIW9wdGlvbnMuZmFsbGJhY2tGb3JtYXQ7XG4gICAgLy8gcnVudGltZSBtaXNzaW5nXG4gICAgY29uc3QgX21pc3NpbmcgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWlzc2luZykgPyBvcHRpb25zLm1pc3NpbmcgOiBudWxsO1xuICAgIC8vIHBvc3RUcmFuc2xhdGlvbiBoYW5kbGVyXG4gICAgY29uc3QgX3Bvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXG4gICAgICAgID8gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb25cbiAgICAgICAgOiBudWxsO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF93YXJuSHRtbE1lc3NhZ2UgPSBpc0xvY2FsU2NvcGVcbiAgICAgICAgPyByb290Lndhcm5IdG1sTWVzc2FnZVxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLndhcm5IdG1sTWVzc2FnZSlcbiAgICAgICAgICAgID8gb3B0aW9ucy53YXJuSHRtbE1lc3NhZ2VcbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBfZXNjYXBlUGFyYW1ldGVyID0gISFvcHRpb25zLmVzY2FwZVBhcmFtZXRlcjtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfbW9kaWZpZXJzID0gaXNMb2NhbFNjb3BlXG4gICAgICAgID8gcm9vdC5tb2RpZmllcnNcbiAgICAgICAgOiBpc1BsYWluT2JqZWN0KG9wdGlvbnMubW9kaWZpZXJzKVxuICAgICAgICAgICAgPyBvcHRpb25zLm1vZGlmaWVyc1xuICAgICAgICAgICAgOiB7fTtcbiAgICAvLyBwbHVyYWxSdWxlc1xuICAgIGNvbnN0IF9wbHVyYWxSdWxlcyA9IG9wdGlvbnMucGx1cmFsUnVsZXMgfHwgKGlzTG9jYWxTY29wZSAmJiByb290LnBsdXJhbFJ1bGVzKTtcbiAgICAvLyB0cmFjayByZWFjdGl2aXR5XG4gICAgZnVuY3Rpb24gdHJhY2tSZWFjdGl2aXR5VmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSxcbiAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcbiAgICAgICAgICAgIF9tZXNzYWdlcy52YWx1ZSxcbiAgICAgICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWUsXG4gICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVxuICAgICAgICBdO1xuICAgIH1cbiAgICAvLyBsb2NhbGVcbiAgICBjb25zdCBsb2NhbGUgPSBjb21wdXRlZCh7XG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5sb2NhbGUudmFsdWUgOiBfbG9jYWxlLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IHZhbCA9PiB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmxvY2FsZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBmYWxsYmFja0xvY2FsZVxuICAgIGNvbnN0IGZhbGxiYWNrTG9jYWxlID0gY29tcHV0ZWQoe1xuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgICAgICA/IF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja0xvY2FsZS52YWx1ZVxuICAgICAgICAgICAgICAgIDogX2ZhbGxiYWNrTG9jYWxlLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IHZhbCA9PiB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gbWVzc2FnZXNcbiAgICBjb25zdCBtZXNzYWdlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUubWVzc2FnZXMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgcmV0dXJuIF9tZXNzYWdlcy52YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0cyA9IGNvbXB1dGVkKCgpID0+IF9kYXRldGltZUZvcm1hdHMudmFsdWUpO1xuICAgIGNvbnN0IG51bWJlckZvcm1hdHMgPSBjb21wdXRlZCgoKSA9PiBfbnVtYmVyRm9ybWF0cy52YWx1ZSk7XG4gICAgZnVuY3Rpb24gZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUuZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcigpXG4gICAgICAgICAgICA6IF9wb3N0VHJhbnNsYXRpb247XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcihoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRNaXNzaW5nSGFuZGxlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5nZXRNaXNzaW5nSGFuZGxlcigpIDogX21pc3Npbmc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldE1pc3NpbmdIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldE1pc3NpbmdIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdhcnBXaXRoRGVwcyhmbikge1xuICAgICAgICB0cmFja1JlYWN0aXZpdHlWYWx1ZXMoKTtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHQoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICA/IHdhcnBXaXRoRGVwcygoKSA9PiBSZWZsZWN0LmFwcGx5KF9jb21wb3Nlci52YWx1ZS50LCBudWxsLCBbLi4uYXJnc10pKVxuICAgICAgICAgICAgOiB3YXJwV2l0aERlcHMoKCkgPT4gJycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBydCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgID8gUmVmbGVjdC5hcHBseShfY29tcG9zZXIudmFsdWUucnQsIG51bGwsIFsuLi5hcmdzXSlcbiAgICAgICAgICAgIDogJyc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGQoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICA/IHdhcnBXaXRoRGVwcygoKSA9PiBSZWZsZWN0LmFwcGx5KF9jb21wb3Nlci52YWx1ZS5kLCBudWxsLCBbLi4uYXJnc10pKVxuICAgICAgICAgICAgOiB3YXJwV2l0aERlcHMoKCkgPT4gJycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBuKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgPyB3YXJwV2l0aERlcHMoKCkgPT4gUmVmbGVjdC5hcHBseShfY29tcG9zZXIudmFsdWUubiwgbnVsbCwgWy4uLmFyZ3NdKSlcbiAgICAgICAgICAgIDogd2FycFdpdGhEZXBzKCgpID0+ICcnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG0oa2V5KSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUudG0oa2V5KSA6IHt9O1xuICAgIH1cbiAgICBmdW5jdGlvbiB0ZShrZXksIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLnRlKGtleSwgbG9jYWxlKSA6IGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmdldExvY2FsZU1lc3NhZ2UobG9jYWxlKSA6IHt9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuc2V0TG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gPSBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSkgOiB7fTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldERhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSA9IGZvcm1hdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXROdW1iZXJGb3JtYXQobG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSkgOiB7fTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5zZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xuICAgICAgICAgICAgX251bWJlckZvcm1hdHMudmFsdWVbbG9jYWxlXSA9IGZvcm1hdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHdyYXBwZXIgPSB7XG4gICAgICAgIGdldCBpZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuaWQgOiAtMTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBmYWxsYmFja0xvY2FsZSxcbiAgICAgICAgbWVzc2FnZXMsXG4gICAgICAgIGRhdGV0aW1lRm9ybWF0cyxcbiAgICAgICAgbnVtYmVyRm9ybWF0cyxcbiAgICAgICAgZ2V0IGluaGVyaXRMb2NhbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmluaGVyaXRMb2NhbGUgOiBfaW5oZXJpdExvY2FsZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGluaGVyaXRMb2NhbGUodmFsKSB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmluaGVyaXRMb2NhbGUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBhdmFpbGFibGVMb2NhbGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgICAgID8gX2NvbXBvc2VyLnZhbHVlLmF2YWlsYWJsZUxvY2FsZXNcbiAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKF9tZXNzYWdlcy52YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBtb2RpZmllcnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gKF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5tb2RpZmllcnMgOiBfbW9kaWZpZXJzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHBsdXJhbFJ1bGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIChfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUucGx1cmFsUnVsZXMgOiBfcGx1cmFsUnVsZXMpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgaXNHbG9iYWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmlzR2xvYmFsIDogZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBtaXNzaW5nV2FybigpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUubWlzc2luZ1dhcm4gOiBfbWlzc2luZ1dhcm47XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBtaXNzaW5nV2Fybih2YWwpIHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubWlzc2luZ1dhcm4gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBmYWxsYmFja1dhcm4oKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrV2FybiA6IF9mYWxsYmFja1dhcm47XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBmYWxsYmFja1dhcm4odmFsKSB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLm1pc3NpbmdXYXJuID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgZmFsbGJhY2tSb290KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja1Jvb3QgOiBfZmFsbGJhY2tSb290O1xuICAgICAgICB9LFxuICAgICAgICBzZXQgZmFsbGJhY2tSb290KHZhbCkge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja1Jvb3QgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBmYWxsYmFja0Zvcm1hdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tGb3JtYXQgOiBfZmFsbGJhY2tGb3JtYXQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBmYWxsYmFja0Zvcm1hdCh2YWwpIHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tGb3JtYXQgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldCB3YXJuSHRtbE1lc3NhZ2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICAgICAgOiBfd2Fybkh0bWxNZXNzYWdlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgd2Fybkh0bWxNZXNzYWdlKHZhbCkge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS53YXJuSHRtbE1lc3NhZ2UgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBlc2NhcGVQYXJhbWV0ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUuZXNjYXBlUGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgOiBfZXNjYXBlUGFyYW1ldGVyO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgZXNjYXBlUGFyYW1ldGVyKHZhbCkge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5lc2NhcGVQYXJhbWV0ZXIgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHQsXG4gICAgICAgIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgIHNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgIGdldE1pc3NpbmdIYW5kbGVyLFxuICAgICAgICBzZXRNaXNzaW5nSGFuZGxlcixcbiAgICAgICAgcnQsXG4gICAgICAgIGQsXG4gICAgICAgIG4sXG4gICAgICAgIHRtLFxuICAgICAgICB0ZSxcbiAgICAgICAgZ2V0TG9jYWxlTWVzc2FnZSxcbiAgICAgICAgc2V0TG9jYWxlTWVzc2FnZSxcbiAgICAgICAgbWVyZ2VMb2NhbGVNZXNzYWdlLFxuICAgICAgICBnZXREYXRlVGltZUZvcm1hdCxcbiAgICAgICAgc2V0RGF0ZVRpbWVGb3JtYXQsXG4gICAgICAgIG1lcmdlRGF0ZVRpbWVGb3JtYXQsXG4gICAgICAgIGdldE51bWJlckZvcm1hdCxcbiAgICAgICAgc2V0TnVtYmVyRm9ybWF0LFxuICAgICAgICBtZXJnZU51bWJlckZvcm1hdFxuICAgIH07XG4gICAgZnVuY3Rpb24gc3luYyhjb21wb3Nlcikge1xuICAgICAgICBjb21wb3Nlci5sb2NhbGUudmFsdWUgPSBfbG9jYWxlLnZhbHVlO1xuICAgICAgICBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZSA9IF9mYWxsYmFja0xvY2FsZS52YWx1ZTtcbiAgICAgICAgT2JqZWN0LmtleXMoX21lc3NhZ2VzLnZhbHVlKS5mb3JFYWNoKGxvY2FsZSA9PiB7XG4gICAgICAgICAgICBjb21wb3Nlci5tZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3Qua2V5cyhfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlKS5mb3JFYWNoKGxvY2FsZSA9PiB7XG4gICAgICAgICAgICBjb21wb3Nlci5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZVtsb2NhbGVdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5rZXlzKF9udW1iZXJGb3JtYXRzLnZhbHVlKS5mb3JFYWNoKGxvY2FsZSA9PiB7XG4gICAgICAgICAgICBjb21wb3Nlci5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29tcG9zZXIuZXNjYXBlUGFyYW1ldGVyID0gX2VzY2FwZVBhcmFtZXRlcjtcbiAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tGb3JtYXQgPSBfZmFsbGJhY2tGb3JtYXQ7XG4gICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrUm9vdCA9IF9mYWxsYmFja1Jvb3Q7XG4gICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrV2FybiA9IF9mYWxsYmFja1dhcm47XG4gICAgICAgIGNvbXBvc2VyLm1pc3NpbmdXYXJuID0gX21pc3NpbmdXYXJuO1xuICAgICAgICBjb21wb3Nlci53YXJuSHRtbE1lc3NhZ2UgPSBfd2Fybkh0bWxNZXNzYWdlO1xuICAgIH1cbiAgICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICAgICAgaWYgKGluc3RhbmNlLnByb3h5ID09IG51bGwgfHwgaW5zdGFuY2UucHJveHkuJGkxOG4gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLk5PVF9BVkFJTEFCTEVfQ09NUE9TSVRJT05fSU5fTEVHQUNZKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBjb25zdCBjb21wb3NlciA9IChfY29tcG9zZXIudmFsdWUgPSBpbnN0YW5jZS5wcm94eS4kaTE4blxuICAgICAgICAgICAgLl9fY29tcG9zZXIpO1xuICAgICAgICBpZiAoc2NvcGUgPT09ICdnbG9iYWwnKSB7XG4gICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gY29tcG9zZXIubG9jYWxlLnZhbHVlO1xuICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgICAgICBfbWVzc2FnZXMudmFsdWUgPSBjb21wb3Nlci5tZXNzYWdlcy52YWx1ZTtcbiAgICAgICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWUgPSBjb21wb3Nlci5kYXRldGltZUZvcm1hdHMudmFsdWU7XG4gICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZSA9IGNvbXBvc2VyLm51bWJlckZvcm1hdHMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNMb2NhbFNjb3BlKSB7XG4gICAgICAgICAgICBzeW5jKGNvbXBvc2VyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB3cmFwcGVyO1xufVxuY29uc3QgZ2xvYmFsRXhwb3J0UHJvcHMgPSBbXG4gICAgJ2xvY2FsZScsXG4gICAgJ2ZhbGxiYWNrTG9jYWxlJyxcbiAgICAnYXZhaWxhYmxlTG9jYWxlcydcbl07XG5jb25zdCBnbG9iYWxFeHBvcnRNZXRob2RzID0gWyd0JywgJ3J0JywgJ2QnLCAnbicsICd0bScsICd0ZSddXG4gICAgO1xuZnVuY3Rpb24gaW5qZWN0R2xvYmFsRmllbGRzKGFwcCwgY29tcG9zZXIpIHtcbiAgICBjb25zdCBpMThuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBnbG9iYWxFeHBvcnRQcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb21wb3NlciwgcHJvcCk7XG4gICAgICAgIGlmICghZGVzYykge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdyYXAgPSBpc1JlZihkZXNjLnZhbHVlKSAvLyBjaGVjayBjb21wdXRlZCBwcm9wc1xuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVzYy52YWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgc2V0KHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBkZXNjLnZhbHVlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlc2MuZ2V0ICYmIGRlc2MuZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGkxOG4sIHByb3AsIHdyYXApO1xuICAgIH0pO1xuICAgIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kaTE4biA9IGkxOG47XG4gICAgZ2xvYmFsRXhwb3J0TWV0aG9kcy5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbXBvc2VyLCBtZXRob2QpO1xuICAgICAgICBpZiAoIWRlc2MgfHwgIWRlc2MudmFsdWUpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBwLmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLCBgJCR7bWV0aG9kfWAsIGRlc2MpO1xuICAgIH0pO1xuICAgIGNvbnN0IGRpc3Bvc2UgPSAoKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGRlbGV0ZSBhcHAuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJGkxOG47XG4gICAgICAgIGdsb2JhbEV4cG9ydE1ldGhvZHMuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGRlbGV0ZSBhcHAuY29uZmlnLmdsb2JhbFByb3BlcnRpZXNbYCQke21ldGhvZH1gXTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gZGlzcG9zZTtcbn1cblxue1xuICAgIGluaXRGZWF0dXJlRmxhZ3MoKTtcbn1cbi8vIHJlZ2lzdGVyIG1lc3NhZ2UgY29tcGlsZXIgZm9yIGppdCBjb21waWxhdGlvblxuaWYgKF9fSU5UTElGWV9KSVRfQ09NUElMQVRJT05fXykge1xuICAgIHJlZ2lzdGVyTWVzc2FnZUNvbXBpbGVyKGNvbXBpbGUpO1xufVxuLy8gcmVnaXN0ZXIgbWVzc2FnZSByZXNvbHZlciBhdCB2dWUtaTE4blxucmVnaXN0ZXJNZXNzYWdlUmVzb2x2ZXIocmVzb2x2ZVZhbHVlKTtcbi8vIHJlZ2lzdGVyIGZhbGxiYWNrIGxvY2FsZSBhdCB2dWUtaTE4blxucmVnaXN0ZXJMb2NhbGVGYWxsYmFja2VyKGZhbGxiYWNrV2l0aExvY2FsZUNoYWluKTtcbi8vIE5PVEU6IGV4cGVyaW1lbnRhbCAhIVxuaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZ2V0R2xvYmFsVGhpcygpO1xuICAgIHRhcmdldC5fX0lOVExJRllfXyA9IHRydWU7XG4gICAgc2V0RGV2VG9vbHNIb29rKHRhcmdldC5fX0lOVExJRllfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyk7XG59XG5pZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSA7XG5cbmV4cG9ydCB7IERhdGV0aW1lRm9ybWF0LCBJMThuRCwgSTE4bkluamVjdGlvbktleSwgSTE4bk4sIEkxOG5ULCBOdW1iZXJGb3JtYXQsIFRyYW5zbGF0aW9uLCBWRVJTSU9OLCBjYXN0VG9WdWVJMThuLCBjcmVhdGVJMThuLCB1c2VJMThuLCB2VERpcmVjdGl2ZSB9O1xuIiwiLy8gVGhpcyBpcyBqdXN0IGFuIGV4YW1wbGUsXHJcbi8vIHNvIHlvdSBjYW4gc2FmZWx5IGRlbGV0ZSBhbGwgZGVmYXVsdCBwcm9wcyBiZWxvd1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGZhaWxlZDogJ0FjdGlvbiBmYWlsZWQnLFxyXG4gIHN1Y2Nlc3M6ICdBY3Rpb24gd2FzIHN1Y2Nlc3NmdWwnXHJcbn1cclxuIiwiaW1wb3J0IGVuVVMgZnJvbSAnLi9lbi1VUydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAnZW4tVVMnOiBlblVTXHJcbn1cclxuIiwiaW1wb3J0IHsgYm9vdCB9IGZyb20gJ3F1YXNhci93cmFwcGVycydcclxuaW1wb3J0IHsgY3JlYXRlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJ1xyXG5pbXBvcnQgbWVzc2FnZXMgZnJvbSAnc3JjL2kxOG4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBib290KCh7IGFwcCB9KSA9PiB7XHJcbiAgY29uc3QgaTE4biA9IGNyZWF0ZUkxOG4oe1xyXG4gICAgbG9jYWxlOiAnZW4tVVMnLFxyXG4gICAgZ2xvYmFsSW5qZWN0aW9uOiB0cnVlLFxyXG4gICAgbWVzc2FnZXNcclxuICB9KVxyXG5cclxuICAvLyBTZXQgaTE4biBpbnN0YW5jZSBvbiBhcHBcclxuICBhcHAudXNlKGkxOG4pXHJcbn0pXHJcbiJdLCJuYW1lcyI6WyJhc3NpZ24iLCJpc1N0cmluZyIsImlzT2JqZWN0Iiwiam9pbiIsImNvZGUiLCJzcmMiLCJkZXMiLCJmb3JtYXQiLCJtZXNzYWdlcyIsImluZGV4IiwiY29udGV4dCIsImlzTGl0ZXJhbCIsInBhcnNlIiwiYmFzZUNvbXBpbGUiLCJpbml0RmVhdHVyZUZsYWdzIiwidHlwZSIsImkxOG4iLCJjb2RlJDEiLCJpbmMkMSIsImluYyIsIlZFUlNJT04iLCJyZXNvbHZlVmFsdWUiLCJtc2ciLCJzb3VyY2UiLCJtZXNzYWdlIiwibG9jYWxlIiwibG9jYWxlcyIsIl9jb250ZXh0Iiwib3B0aW9ucyIsImdsb2JhbCIsImNvbXBvc2VyIl0sIm1hcHBpbmdzIjoiO0FBQUE7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
