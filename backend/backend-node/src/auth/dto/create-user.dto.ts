export class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;  // Recibimos como string
    profilePicture?: string;
    role: string;
  }
  