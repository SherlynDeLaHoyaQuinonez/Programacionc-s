const{check, validationResult}= require('express-validator');


const generateadoptionValidators= ()=>[
    check('user_id').notEmpty().isLength({max:50}).withMessage("Invalid user_id"),
    check('pet_id').notEmpty().isLength({max:50}).withMessage("Invalid pet_id"),
    check('date').isDate().notEmpty().withMessage("Invalid date")
]
const updateadoptionValidators= ()=>[
    check('id').notEmpty().isNumeric().isLength({max:11}).withMessage("Invalid id"),
    check('user_id').optional().isLength({max:50}).withMessage("Invalid user_id"),
    check('pet_id').optional().isLength({max:50}).withMessage("Invalid pet_id"),
    check('date').optional().isDate().optional().withMessage("Invalid date")
]

const generateIdValidators=()=>[
    check('id').notEmpty().isNumeric().withMessage("invalid id"),
]

const reporter = (req,res,next) =>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            "success": false, 
            "code": 400,
            "message": errors, 
            "data": []
        })
    }
    next();
}


module.exports={
    add: [
        generateadoptionValidators(),
        reporter
    ],
    id:[
        generateIdValidators(),
        reporter 
    ],
    update:[
        updateadoptionValidators(),
        reporter
    ]
}