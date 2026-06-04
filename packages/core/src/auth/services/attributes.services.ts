import type {SignedAttributes} from '@icp-sdk/auth/client';
import {isNullish} from '@junobuild/utils';
import {AuthClientStore} from '../stores/auth-client.store';
import {RequestAttributesInitError} from '../types/errors';

/**
 * Requests signed identity attributes (e.g. `email`) from the identity provider
 * for the currently signed-in user.
 *
 * The `nonce` is typically issued by your canister for the action at hand. It may
 * be a `Uint8Array` or a `Promise<Uint8Array>` — passing a promise lets the
 * identity provider window open while the nonce is still being fetched.
 *
 * @param {Object} params - The request parameters.
 * @param {string[]} params.keys - Attribute keys to request (e.g. `['email']`).
 * @param {Uint8Array | Promise<Uint8Array>} params.nonce - The nonce issued by the relying-party canister.
 * @returns {Promise<SignedAttributes>} The signed attribute data and signature.
 * @throws {RequestAttributesInitError} If no AuthClient is available (i.e. the user is not signed in).
 */
export const requestAttributes = async (params: {
  keys: string[];
  nonce: Uint8Array | Promise<Uint8Array>;
}): Promise<SignedAttributes> => {
  const authClient = AuthClientStore.getInstance().getAuthClient();

  if (isNullish(authClient)) {
    throw new RequestAttributesInitError(
      'No client is ready to request attributes. Have you signed in?'
    );
  }

  return await authClient.requestAttributes(params);
};
