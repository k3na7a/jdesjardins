// Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.
export const PASSWORD_VALIDATION_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

// Username must contain one lowercase letter, one uppercase letter, no space, no digits, no special characters, and it must be 8-16 chaaracters long.
export const USERNAME_VALIDATION_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?!.* )(?!.*\d)(?!.*\W).{8,16}$/;
