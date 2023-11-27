import message from "../repositories/message.js"
import BaseService from "./base.service.js";

class MessageService extends BaseService{
    constructor(){
        super(message)
    }
}

export default new MessageService();