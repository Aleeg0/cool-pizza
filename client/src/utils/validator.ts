class Validator {

  public isValidPhone(value: string): boolean {
    return /^[\d\+][\d\s\-\(\)]{7,}$/.test(value);
  }

  public isNotEmpty(value?: string): boolean {
    return !!(value && value.trim());
  }

  public isValidEmail(value?: string): boolean {
    return !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

const validator = new Validator();
export default validator;