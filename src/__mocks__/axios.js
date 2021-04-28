// const mockAxios =  {
// 	get: jest.fn(() => Promise.resolve({data:{}})),
// 	post: jest.fn(()=>Promise.resolve({data: {}})),
// 	delete: jest.fn(()=> Promise.resolve({data:{}}))
// }

// import {backendInstance} from "../../../store/apiHelpers/backendApiFetcher";

//
const mockAxios = jest.genMockFromModule('axios')
mockAxios.create = jest.fn(() => mockAxios)
mockAxios.request = jest.fn(() => mockAxios)
// mockAxios.get = jest.fn(() => Promise.resolve({data:null}))


export default mockAxios;
// export default {
//   get: jest.fn(() => Promise.resolve({data: null}))
//   create: jest.fn(() => Promise.resolve({data: null}))
//
// }