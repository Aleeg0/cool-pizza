class Validator {
  public readonly PASSWORD_MIN_LENGTH = 8;

  public isValidPhone(value: string): boolean {
    return /^[\d\+][\d\s\-\(\)]{7,}$/.test(value);
  }

  public isNotEmpty(value?: string): boolean {
    return !!(value && value.trim());
  }

  public isValidEmail(value?: string): boolean {
    return !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  public isValidPassword(password?: string) {
    return !!(password && password.trim().length >= this.PASSWORD_MIN_LENGTH);
  }
}

const validator = new Validator();
export default validator;