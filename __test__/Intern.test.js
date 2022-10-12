const Intern = require('../lib/Intern')

test("Return Name", () => {
    const InternInfo = new Intern("Intern1", "testId", "email@test.com")

    expect(InternInfo.getRole()).toBe("Intern")
})

// test("Return Id", () => {
//     const EngineerInfo = new Engineer("Ing. firstName", "testId", "email@test.com")

//     expect(EngineerInfo.id).toBe("testId")
// })

// test("Return Name", () => {
//     const EngineerInfo = new Engineer("Ing. firstName", "testId", "email@test.com")

//     expect(EngineerInfo.email).toBe("email@test.com")
// })
