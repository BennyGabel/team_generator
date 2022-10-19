const Intern = require('../lib/Intern')

test("Return Name", () => {
    const InternInfo = new Intern("Intern1", "testId", "email@test.com")

    expect(InternInfo.getRole()).toBe("Intern")
})
