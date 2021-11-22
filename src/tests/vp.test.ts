import mongoose from 'mongoose'
import request from 'supertest'
import App from '../app'
import { CreateVpDto } from '../dtos/vp.dto'
import VpRoute from '../routes/vp.route'

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500))
})

describe('Testing VPs', () => {
  describe('[GET] /vp/:address', () => {
    it('response findOne VP', async () => {
      const userId = 'qpwoeiruty'

      const usersRoute = new VpRoute()
      const users = usersRoute.vpController.vpService.vps

      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        email: 'a@email.com'
      })
      ;(mongoose as any).connect = jest.fn()
      const app = new App([usersRoute])
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200)
    })
  })

  describe('[POST] /vp', () => {
    it('response Create User', async () => {
      const vpData: CreateVpDto = {
        address: 'address',
        fileUrl: 'http://google.com'
      }

      const vpRoute = new VpRoute()
      const vps = vpRoute.vpController.vpService.vps

      vps.findOne = jest.fn().mockReturnValue(null)
      vps.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        address: vpData.address,
        vp: vpData.fileUrl
      })
      ;(mongoose as any).connect = jest.fn()
      const app = new App([vpRoute])
      return request(app.getServer()).post(`${vpRoute.path}`).send(vpData).expect(201)
    })
  })

  // describe('[PUT] /users/:id', () => {
  //   it('response Update User', async () => {
  //     const userId = '60706478aad6c9ad19a31c84';
  //     const userData: CreateVpDto = {
  //       email: 'test@email.com',
  //       password: 'q1w2e3r4',
  //     };

  //     const usersRoute = new VpRoute();
  //     const users = usersRoute.usersController.userService.users;

  //     if (userData.email) {
  //       users.findOne = jest.fn().mockReturnValue({
  //         _id: userId,
  //         email: userData.email,
  //         password: await bcrypt.hash(userData.password, 10),
  //       });
  //     }

  //     users.findByIdAndUpdate = jest.fn().mockReturnValue({
  //       _id: userId,
  //       email: userData.email,
  //       password: await bcrypt.hash(userData.password, 10),
  //     });

  //     (mongoose as any).connect = jest.fn();
  //     const app = new App([usersRoute]);
  //     return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);
  //   });
  // });

  // describe('[DELETE] /users/:id', () => {
  //   it('response Delete User', async () => {
  //     const userId = '60706478aad6c9ad19a31c84';

  //     const usersRoute = new VpRoute();
  //     const users = usersRoute.usersController.userService.users;

  //     users.findByIdAndDelete = jest.fn().mockReturnValue({
  //       _id: '60706478aad6c9ad19a31c84',
  //       email: 'test@email.com',
  //       password: await bcrypt.hash('q1w2e3r4!', 10),
  //     });

  //     (mongoose as any).connect = jest.fn();
  //     const app = new App([usersRoute]);
  //     return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
  //   });
  // });
})
