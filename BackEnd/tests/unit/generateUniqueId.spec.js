const generateUniqueId = require('../../src/utils/genenateUniqueId')

describe('Generete Unique ID', () => {
  it('shold generate unique ID',() =>{
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  })
})