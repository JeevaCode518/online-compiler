import { generateAiReview } from "./generateAiReview.js";

export const getAiReview = async (req, res) =>{
    
    console.log(req.body);
    const {code} = req.body;

    if(code == undefined || code.trim() == ''){
        res.status(400).json({
            success:false,
            error:"Empty code!! Please provide a valid code"
        });
    }
    try{
        const review = await generateAiReview(code);
        console.log("REVIEW ", review);
        return res.status(200).send({message: review});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Error message"});
    }
};