import { object, array, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      permissions: array().of(
        string().matches(/[^0-9]/, { excludeEmptyString: true })
      ),
      roles: array().of(
        string().matches(/[^0-9]/, { excludeEmptyString: true })
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
