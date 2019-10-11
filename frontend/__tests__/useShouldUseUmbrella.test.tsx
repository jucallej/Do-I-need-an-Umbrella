import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import { useShouldUseUmbrella } from "../useShouldUseUmbrella";
import { UmbrellaState } from "../app";

describe('shouldUseUmbrella', () => {

  it('should return by default LOADING', () => {
    const { result } = renderHook(() => useShouldUseUmbrella(123, 1234));
    expect(result.current).toBe(UmbrellaState.LOADING);
  });

  it('should change from LOADING to USE_UMBRELLA when fetch response is shouldUseUmbrella true', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({shouldUseUmbrella: true}));

    const { result, waitForNextUpdate } = renderHook(() => useShouldUseUmbrella(123, 1234));
    expect(result.current).toBe(UmbrellaState.LOADING);

    await waitForNextUpdate();
    expect(result.current).toBe(UmbrellaState.USE_UMBRELLA);
    expect(fetch).toHaveBeenCalledWith('/api/needUmbrella?lat=123&lon=1234');
  });

  it('should change from LOADING to USE_UMBRELLA when fetch response is shouldUseUmbrella false', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({shouldUseUmbrella: false}));

    const { result, waitForNextUpdate } = renderHook(() => useShouldUseUmbrella(123, 1234));
    expect(result.current).toBe(UmbrellaState.LOADING);

    await waitForNextUpdate();
    expect(result.current).toBe(UmbrellaState.DO_NOT_USE_UMBRELLA);
    expect(fetch).toHaveBeenCalledWith('/api/needUmbrella?lat=123&lon=1234');
  });
});
