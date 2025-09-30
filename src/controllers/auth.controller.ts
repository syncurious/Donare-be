export const signUp = async (req: Request, res: Response) => {
  try {
    let user: functionReturnObjectType = await authFunction.signUpWithEmail(req);
    return response.basicControllerRes(res, user);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let user = await authFunction.signin(req);
    return response.basicControllerRes(res, user);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const logout = async (req: RequestUserToken, res: Response) => {
  try {
    let user = await authFunction.logout(req);
    return response.basicControllerRes(res, user);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};
