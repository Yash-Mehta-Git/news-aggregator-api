class requestValidator {
    static registorPostRequestValidator(data){
        if(data.fullName && requestValidator.emailValidator(data.email) && requestValidator.passwordValidator(data.password) && requestValidator.roleValidator(data.role)){
            return true;
        }
        return false;
    }
    static emailValidator(emailAddress){
        if(emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            return true;
        }
        return false;
    }
    static passwordValidator(password){
        if(password.length > 5){
            return true;
        }
        return false
    }
    static roleValidator(role){
        let roles = ['admin','normal'];
        if(roles.includes(role)){
            return true;
        }
        return false;
    }
}
module.exports = requestValidator;