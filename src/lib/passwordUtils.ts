// Helper function to dispatch password events for history tracking
export const addPasswordToHistory = (password: string) => {
  const event = new CustomEvent("newPassword", { detail: { password } });
  window.dispatchEvent(event);
};

// Password strength calculation
export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;

  let score = 0;

  // Length checks
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character type checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  // Variety check
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.7) score += 1;

  return score;
};

// Calculate password entropy
export const calculateEntropy = (password: string): number => {
  if (!password) return 0;

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  let charsetSize = 0;
  if (hasLowercase) charsetSize += 26;
  if (hasUppercase) charsetSize += 26;
  if (hasNumbers) charsetSize += 10;
  if (hasSymbols) charsetSize += 32;

  return Math.log2(Math.pow(charsetSize, password.length));
};
