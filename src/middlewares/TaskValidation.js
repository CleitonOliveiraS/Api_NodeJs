const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) =>{

    const {macaddress, type, title, description, when} = req.body;

    if(!macaddress){
        return res.status(400).json({erorr: 'Macaddres é obrigatório'});
    }else if(!type){
        return res.status(400).json({erorr: 'Tipo é obrigatório'});
    }else if(!title){
        return res.status(400).json({erorr: 'Título é obrigatório'});
    }else if(!description){
        return res.status(400).json({erorr: 'Descrição é obrigatória'});
    }else if(!when){
        return res.status(400).json({erorr: 'Data e Horaa são obrigatórios'});
    }else if(isPast(new Date(when))){
        return res.status(400).json({erorr: 'Escolha uma data e hora futura'});
    }
    else{
        let exists;

        if(req.params.id){
            exists = await TaskModel.
                findOne(
                    {
                        '_id': {'$ne': req.params.id},
                        'when': {'$eq': new Date(when)}, 
                        'macaddress': {'$in': macaddress}
                    });
        }else{
            exists = await TaskModel.
                findOne(
                    {
                        'when': {'$eq': new Date(when)}, 
                        'macaddress': {'$in': macaddress}
                    });
        }

        if(exists){
            return res.status(400).json({erorr: 'Já existe uma tarefa neste dia e horario'});
        }

        next();
    }

}

module.exports = TaskValidation;