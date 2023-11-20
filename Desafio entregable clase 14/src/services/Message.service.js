import message from "../models/message.js"
import BaseService from "./base.service.js";

class MessageService extends BaseService{
    constructor(){
        super(message)
    }
}

export default new MessageService();