import {
  normalizeProviderStatus,
  isSuccessStatus,
  isTerminalStatus,
} from './status-map';

describe('status-map', () => {
  it('normalizes paystack statuses', () => {
    expect(normalizeProviderStatus('paystack', 'success')).toBe('success');
    expect(normalizeProviderStatus('paystack', 'failed')).toBe('failed');
    expect(normalizeProviderStatus('paystack', 'abandoned')).toBe('cancelled');
    expect(normalizeProviderStatus('paystack', 'pending')).toBe('pending');
  });

  it('normalizes moniepoint statuses', () => {
    expect(normalizeProviderStatus('moniepoint', 'PENDING')).toBe('pending');
    expect(normalizeProviderStatus('moniepoint', 'APPROVED')).toBe('success');
    expect(normalizeProviderStatus('moniepoint', 'PROCESSED')).toBe('success');
    expect(normalizeProviderStatus('moniepoint', 'DECLINED')).toBe('failed');
    expect(normalizeProviderStatus('moniepoint', 'REVERSED')).toBe('reversed');
  });

  it('normalizes opay statuses', () => {
    expect(normalizeProviderStatus('opay', 'INITIAL')).toBe('pending');
    expect(normalizeProviderStatus('opay', 'PENDING')).toBe('pending');
    expect(normalizeProviderStatus('opay', 'SUCCESS')).toBe('success');
    expect(normalizeProviderStatus('opay', 'FAIL')).toBe('failed');
    expect(normalizeProviderStatus('opay', 'CLOSE')).toBe('cancelled');
  });

  it('normalizes monnify statuses', () => {
    expect(normalizeProviderStatus('monnify', 'PAID')).toBe('success');
    expect(normalizeProviderStatus('monnify', 'PARTIALLY_PAID')).toBe(
      'partial',
    );
    expect(normalizeProviderStatus('monnify', 'REVERSED')).toBe('reversed');
    expect(normalizeProviderStatus('monnify', 'EXPIRED')).toBe('expired');
    expect(normalizeProviderStatus('monnify', 'FAILED')).toBe('failed');
  });

  it('falls back to unknown for unmapped statuses and empty input', () => {
    expect(normalizeProviderStatus('paystack', 'weird')).toBe('unknown');
    expect(normalizeProviderStatus('paystack', undefined)).toBe('unknown');
    expect(normalizeProviderStatus('paystack', '')).toBe('unknown');
  });

  it('treats success/settled as success', () => {
    expect(isSuccessStatus('success')).toBe(true);
    expect(isSuccessStatus('settled')).toBe(true);
    expect(isSuccessStatus('pending')).toBe(false);
  });

  it('treats failed/cancelled/reversed/expired as terminal', () => {
    expect(isTerminalStatus('failed')).toBe(true);
    expect(isTerminalStatus('cancelled')).toBe(true);
    expect(isTerminalStatus('reversed')).toBe(true);
    expect(isTerminalStatus('expired')).toBe(true);
    expect(isTerminalStatus('pending')).toBe(false);
    expect(isTerminalStatus('success')).toBe(true);
  });
});
