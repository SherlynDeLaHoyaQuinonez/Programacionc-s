const{check, validationResult}= require('express-validator');


const generatepetValidators= ()=>[
    check('alias').notEmpty().isLength({max:50}).withMessage("Invalid alias"),
    check('type').isIn(['DOG', 'CAT']).notEmpty().isLength({max:50}).withMessage("Invalid type"),
    check('color').notEmpty().isLength({max:20}).withMessage("Invalid color"),
    check('notes').notEmpty().isLength({max:150}).withMessage("Invalid notes")
] 
const updatepetValidators= ()=>[
    check('id').notEmpty().isLength({max:11}).withMessage("Invalid id"),
    check('alias').optional().isLength({max:50}).withMessage("Invalid alias"),
    check('type').optional().isIn(['DOG','Cat']).withMessage("Invalid type"),
    check('color').optional().isLength({max:20}).withMessage("Invalid color"),
    check('notes').optional().isLength({max:150}).withMessage("Invalid notes")
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
        generatepetValidators(),
        reporter
    ],
    id:[
        generateIdValidators(),
        reporter 
    ],
    update:[
        updatepetValidators(),
        reporter
    ]
}