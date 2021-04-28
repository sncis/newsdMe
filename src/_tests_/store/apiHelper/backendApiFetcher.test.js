import backendAxiosInstance from "../../../store/apiHelpers/backendAxiosInstance";
// import newBackendApiFetcher from "../../../store/apiHelpers/newBackendApiFetcher";
import backendApiFetcher from "../../../store/apiHelpers/backendApiFetcher";

jest.mock("../../../store/apiHelpers/backendAxiosInstance", () =>{
return {  baseUrl:"some url",
   request: jest.fn()   }
})

describe("backendFetcher", ()=> {

  beforeEach(()=>{
    jest.clearAllMocks()
  })

  it('should make a get request and return data',async ()=>{

    const options = {url: '/some/url', method:'get'}
    backendAxiosInstance.request.mockImplementationOnce(() => Promise.resolve({data:'some data', status:200}));

    try{
      const response = await backendApiFetcher()(options);

      expect(response.status).toEqual(200)
      expect(response.data).toBe('some data')
      expect(backendAxiosInstance.request).toHaveBeenCalledWith({url: '/some/url',method:'get'})

    }catch(error){
      return error.message
    }

    })

  it("should make a post request and return data", async() => {
    const options = {url: '/some/url/post',method:'post',data: 'some data to post'}
    backendAxiosInstance.request.mockImplementationOnce(() => Promise.resolve({data:'some response data', status:200}));

     await backendApiFetcher()(options).then((response)=>{
      expect(response.status).toEqual(200)
      expect(response.data).toBe('some response data')
      expect(backendAxiosInstance.request).toHaveBeenCalledWith({url: '/some/url/post',method:'post',data: 'some data to post'})
    })

  })

  it("should handle 401 and return error message and call onAuthFailure", async ()=> {

    const mockFailure = jest.fn()
    const options = {url: '/some/url/post',method:'post',data: 'some data'}

    backendAxiosInstance.request.mockImplementationOnce(() => Promise.reject({response: {message:'some auth error', status:401}
    }));

    await expect(backendApiFetcher(mockFailure)(options)).rejects.toThrowError('some auth error');
    expect(mockFailure).toHaveBeenCalledTimes(1)

  })
  it("should handle 403 error and NOT call onAuthFailure", async ()=> {

    const mockFailure = jest.fn()
    const options = {url: '/some/url/post',method:'post',data: 'some data'}

    backendAxiosInstance.request.mockImplementationOnce(() => Promise.reject({response: {message:'forbidden', status:403}
    }));
    await expect(backendApiFetcher(mockFailure)(options)).rejects.toThrowError('forbidden')

    expect(mockFailure).not.toHaveBeenCalled()

  })

  it("should handle 500 error, NOT call onAuthFailure and  return default errorMSg", async ()=> {

    const mockFailure = jest.fn()
    const options = {url: '/some/url/post',method:'post',data: 'some data'}

    backendAxiosInstance.request.mockImplementationOnce(() => Promise.reject({response: {message:'some test msg', status:500}
    }));

    await expect(backendApiFetcher(mockFailure)(options)).rejects.toThrowError("Ups something went wrong with the server. We are sorry for that!");
    expect(mockFailure).not.toHaveBeenCalled()

  })
})