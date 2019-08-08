import faker from 'faker';
import fakerBr from 'faker-br';

export default {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: fakerBr.br.cpf(),
  phone_number: faker.phone.phoneNumber(),
};
