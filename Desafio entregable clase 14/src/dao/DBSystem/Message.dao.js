import message from "../../models/message.js"
import BaseDao from "./Base.dao.js";

class MessageDao extends BaseDao{
    constructor(){
        super(message)
    }
}

export default new MessageDao();