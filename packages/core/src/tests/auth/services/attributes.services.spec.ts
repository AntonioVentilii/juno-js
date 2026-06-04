import type {AuthClient} from '@icp-sdk/auth/client';
import {mock} from 'vitest-mock-extended';
import {requestAttributes} from '../../../auth/services/attributes.services';
import {AuthClientStore} from '../../../auth/stores/auth-client.store';
import {RequestAttributesInitError} from '../../../auth/types/errors';

describe('attributes.services', () => {
  const authClientMock = mock<AuthClient>();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws RequestAttributesInitError when no auth client is available', async () => {
    vi.spyOn(AuthClientStore.getInstance(), 'getAuthClient').mockReturnValue(undefined);

    await expect(
      requestAttributes({keys: ['email'], nonce: new Uint8Array()})
    ).rejects.toBeInstanceOf(RequestAttributesInitError);
  });

  it('delegates to authClient.requestAttributes and returns the result', async () => {
    const signed = {data: new Uint8Array([1]), signature: new Uint8Array([2])};
    authClientMock.requestAttributes.mockResolvedValue(signed);
    vi.spyOn(AuthClientStore.getInstance(), 'getAuthClient').mockReturnValue(authClientMock);

    const nonce = new Uint8Array([9]);
    const result = await requestAttributes({keys: ['email'], nonce});

    expect(authClientMock.requestAttributes).toHaveBeenCalledWith({keys: ['email'], nonce});
    expect(result).toBe(signed);
  });
});
