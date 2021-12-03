// todo.spec.js
import controllerUser from "../controllers/user.controller"
import jest from "jest"


describe("Check method \'user register\' ", () => {
    const mockRequest  = () => {
        const req = {}
        req.body = jest.fn().mockReturnValue(req)
        req.params = jest.fn().mockReturnValue(req)
        return req
      },
    
      const mockResponse= () => {
        const res = {}
        res.send = jest.fn().mockReturnValue(res)
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
      },

  test('should 200 and return correct value', async () => {
    let req = mockRequest();
    req.params.id = 1;
    const res = mockResponse();

    await controller.todoController(req, res);

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith('Hello i am todo controller');
  });

  test('should 404 and return correct value', async () => {
    let req = mockRequest();
    req.params.id = null;
    const res = mockResponse();

    await controller.todoController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
  });
});