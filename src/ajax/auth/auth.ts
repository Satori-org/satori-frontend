import {fetchPost} from "../index";

export function generateNonce(address: string) {
    return fetchPost<{address: string, nonce: string}>("/auth/auth/generateNonce", {address})
}

export function getUserToken(address: string, signature: string) {
    return fetchPost<string>("/auth//auth/token", {address, signature})
}
