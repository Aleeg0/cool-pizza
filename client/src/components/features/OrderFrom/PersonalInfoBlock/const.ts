export const FIELDS_CONFIG = [
  {
    field: 'firstName',
    title: 'Имя',
    type: 'text',
    placeholder: 'Иван'
  },
  {
    field: 'lastName',
    title: 'Фамилия',
    type: 'text',
    placeholder: 'Иванов'
  },
  {
    field: 'email',
    title: 'E-mail',
    type: 'email',
    placeholder: 'ivan@gmail.com'
  },
  {
    field: 'phone',
    title: 'Телефон',
    type: 'text',
    placeholder: '+375 29 111 2233'
  }
] as const;