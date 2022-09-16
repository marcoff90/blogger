import UserService from "../src/app/services/user-service";
import {UserI} from "../src/app/models/user-model";
import UserRepository from "../src/app/repositories/user-repository";
import bcrypt from 'bcryptjs';

describe('userService tests',  () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login non existent user', () => {
    const user = {
      username: 'nonExistentUser',
      password: 'Password123!',
    };
    const spy = jest.spyOn(UserRepository, 'findByUsername');
    spy.mockResolvedValueOnce(null);
    it('Should return null', async () => {
      expect( await UserService.login(user as UserI)).toBe(null);
    })
  })

  describe('login existing user', () => {
    const user = {
      username: 'myUser',
      password: 'Password123!'
    };
    const spy = jest.spyOn(UserRepository, 'findByUsername');
    const spyBcrypt = jest.spyOn(bcrypt, 'compareSync');
    spyBcrypt.mockReturnValue(true);
    spy.mockResolvedValueOnce(user as UserI);
    it ('should return the user back', async () => {
      expect(await UserService.login(user as UserI)).toBe(user);
    })
  })

  describe('Creating user', () => {
    const user = {
      username: 'newUser',
      password: 'Password123!',
      email: 'test@test.com'
    }
    const spy = jest.spyOn(UserRepository, 'create');
    spy.mockResolvedValueOnce(user as UserI);
    it('Should create a user and return the user back', async () => {
      const result = await UserService.create(user as UserI);
      expect(result.username).toBe(user.username);
    })
  });
})
