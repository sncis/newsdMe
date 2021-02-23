// const mockAxios =  {
// 	get: jest.fn(() => Promise.resolve({data:{}})),
// 	post: jest.fn(()=>Promise.resolve({data: {}})),
// 	delete: jest.fn(()=> Promise.resolve({data:{}}))
// }


const mockAxios = jest.genMockFromModule('axios')
mockAxios.create = jest.fn(() => mockAxios)

export default mockAxios;