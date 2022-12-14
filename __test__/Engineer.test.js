const Engineer = require('../lib/Engineer')

test("Return Name", () => {
    const EngineerInfo = new Engineer("Ing. firstName", "testId", "email@test.com")

    expect(EngineerInfo.name).toBe("Ing. firstName")
})

test("Return Id", () => {
    const EngineerInfo = new Engineer("Ing. firstName", "testId", "email@test.com")

    expect(EngineerInfo.id).toBe("testId")
})

test("Return Email", () => {
    const EngineerInfo = new Engineer("Ing. firstName", "testId", "email@test.com")

    expect(EngineerInfo.email).toBe("email@test.com")
})

// Should fail... Role Shoul be Engineer
test("Return Role", () => {
    const EngineerInfo = new Engineer("Intern1", "testId", "email@test.com")

    expect(EngineerInfo.getRole()).toBe("Intern")
})
