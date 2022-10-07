class Employee {
    constructor(name, id, email) {
        this.name  = name // getName()
        this.id    = id // getId()
        this.email = email // getEmail()
    }

    getName() {
        return this.name
    }
    
    getId() {
        return this.id
    }

    getEmail() {
        this.email
    }

    getRole() {
        return 'Employee'
    }

}

module.exports =  Employee
