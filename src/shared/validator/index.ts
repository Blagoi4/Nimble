// Validator/validator.ts

// Функция для проверки корректности email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Функция для проверки, что хотя бы одно имя (firstName или lastName) и email заполнены
export function hasValidNameAndEmail(firstName: string, lastName: string, email: string): boolean {
  return (
    isValidEmail(email) && 
    (firstName.trim().length > 0 || lastName.trim().length > 0)
  );
}