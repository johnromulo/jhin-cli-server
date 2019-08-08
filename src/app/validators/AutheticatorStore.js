import { object, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape(
      {
        email: string()
          .email()
          .when(['cpf'], {
            is: cpf => !cpf,
            then: string().required('email or cpf is required field'),
          }),
        cpf: string().when(['email'], {
          is: email => !email,
          then: string().required(),
        }),
        password: string().required(),
      },
      [['email', 'cpf']]
    );

    const shemaHeader = object().shape({
      client_key: string().required(),
      client_secret: string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    await shemaHeader.validate(req.headers, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
