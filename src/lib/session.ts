// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from 'next/server';
import { NextApiRequest } from 'next';
import { NextPageRequest } from '@/lib/types';

export const userCookieKey = '_un';
export const sessionKey = '_sess';
export const cookieSep = '^)&_*($';

const iv = encode('encryptiv');
const password = process.env.SESSION_KEY;

const pwUtf8 = encode(password);
const algo = { name: 'AES-GCM', iv };

function encode(value?: string) {
  return new TextEncoder().encode(value);
}

function decode(value: Uint8Array) {
  return new TextDecoder().decode(value);
}

function base64ToArrayBuffer(base64: string) {
  // const binary = atob(base64);
  const binary = Buffer.from(base64, 'base64').toString();
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function arrayBufferToBase64(buffer: Buffer) {
  const bytes = new Uint8Array(buffer);
  const binary = String.fromCharCode(...bytes);
  return btoa(binary);
}

// Encrypt
export function createEncrypt() {
  return async function (data?: string) {
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
    const encryptKey = await crypto.subtle.importKey(
      'raw',
      pwHash,
      algo,
      false,
      ['encrypt']
    );
    const encrypted = await crypto.subtle.encrypt(
      algo,
      encryptKey,
      encode(data)
    );
    return arrayBufferToBase64(encrypted);
  };
}

// Decrypt
export function createDecrypt() {
  return async function decrypt(data: string) {
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
    const buffer = base64ToArrayBuffer(data);
    const decryptKey = await crypto.subtle.importKey(
      'raw',
      pwHash,
      algo,
      false,
      ['decrypt']
    );
    const ptBuffer = await crypto.subtle.decrypt(algo, decryptKey, buffer);
    const decryptedText = decode(ptBuffer);
    return decryptedText;
  };
}

type NextAllRequest = NextRequest | NextPageRequest | NextApiRequest;

export function getSession(req: NextAllRequest) {
  const none = [null, null] as const;
  const value = req.cookies[userCookieKey];

  if (!value) return none;

  const index = value.indexOf(cookieSep);

  if (index === -1) return none;

  const user = value.slice(0, index);
  const session = value.slice(index + cookieSep.length);

  return [user, session] as const;
}

export function getUser(req: NextAllRequest) {
  return getSession(req)[0];
}
