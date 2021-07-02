import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../Models/User';
import { UserLoginData, UserSignupParams } from './InputTypes/UserInputTypes';
import { hash, verify } from 'argon2';
import { UserResponse } from './Responses/UserResponse';
import { SocketIO } from '../../utils/Socket';
import { Context } from '../Context';
import { Error } from '../../@types/Error';

import validator from 'validator';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async login(@Arg('data') data: UserLoginData, @Ctx() { req, res, redis }: Context) {
    const { password, emailOrUsername } = data;
    const response: UserResponse = { errors: [] };

    console.log(data);

    for (const key in data)
      if (validator.isEmpty(data[key as keyof UserLoginData])) {
        response.errors!.push({
          type: 'empty field',
          field: key,
          message: 'Ce champ ne peut pas être vide !',
        });

        return response;
      }

    let user = await User.findOne({
      where: [{ username: emailOrUsername }, { email: emailOrUsername }],
      relations: ['messages', 'current_room'],
    });

    if (!user || !(await verify(user?.password, password))) {
      response.errors = [
        { message: 'Utilisateur inconnu ou mot de passe incorrect.', type: 'auth failure' },
      ];
    }

    response.user = user;

    if (user) {
      req.session.user = user;
    }

    // const io = SocketIO.getIo();

    return response;
  }

  @Query(() => UserResponse)
  async checkAuth(@Ctx() { req }: Context) {
    const response: UserResponse = { errors: [] };

    if (req.session.user) response.user = req.session.user;

    return response;
  }
  @Mutation(() => [Error])
  async signup(@Arg('params') params: UserSignupParams) {
    const errors: Error[] = [];

    const requiredFields = ['username', 'email', 'password'];
    const requiredFieldsErrors = [];
    try {
      for (const key in params) {
        if (
          requiredFields.includes(key) &&
          validator.isEmpty(params[key as keyof UserSignupParams])
        ) {
          requiredFieldsErrors.push({ field: key, message: 'Ce champ ne peut pas être vide !' });
        }
      }

      errors.push(...requiredFieldsErrors);

      if (requiredFieldsErrors.length) return errors;

      if (
        !validator.isStrongPassword(params.password, {
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minUppercase: 1,
        })
      )
        errors.push({ field: 'password', message: "Le mot de passe n'est pas assez sécurisé" });

      if (!validator.isEmail(params.email))
        errors.push({ field: 'email', message: "Cet email n'est pas accepté" });

      if (!errors.length) {
        const hashedPassword = await hash(params.password);

        const user = User.create({
          username: params.username,
          email: params.email,
          password: hashedPassword,
        });

        const savedUser = await user.save();
        if (!savedUser)
          errors.push({
            type: 'database error',
            message: 'Un problème est survenu lors de la création du compte',
          });
      }

      return errors;
    } catch (e) {
      console.log(e);
      if (e.code === '23505') {
        const column = (e.detail as string).match(/\(([^()]*)\)/)?.[1];

        errors.push({
          type: 'duplication',
          field: column,
          message: 'Cette valeur est déjà présente !',
        });
      }
      return errors;
    }
  }
}
