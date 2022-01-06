const {body, validationResult} = require('express-validator');
const RessourceSchema = require('../Model/ressource_shema');
const QRCode = require('qrcode');


module.exports.ressourceValiations = [
   body('description').not().isEmpty().trim().withMessage('Description is required'),
   body('location').not().isEmpty().trim().withMessage('Location is required'),
   body('Responsable').not().isEmpty().trim().withMessage('Responsable is required'),
   body('Annomalies').not().isEmpty().trim().withMessage('Annomalies is required'),
];

 const generateQR = async (id) => {
     try{
        const url = QRCode.toDataURL(id);
        return url;
     }catch(err){
        console.error(err);
     }
 }


module.exports.create_ressource = async (req,res) => {
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
     }
     try{
     const { title,description,location, Responsable, Annomalies, AnomalieString} = req.body;   
     
     const ressource = await RessourceSchema.create({
          url:'',
          title :title,
          description : description,
          location : location,
          Responsable : Responsable,
          Annomalies: AnomalieString,
          QRCODE:'',
          CurrentAnomalie:''
    });

    const _id = ressource._id
    const findRessource = await RessourceSchema.findOne({ _id })
    
    if (findRessource){
        findRessource.url = `Ressources/id/${_id}`;
        const urlqr = await generateQR(`Ressources/id/${_id}`);
        findRessource.QRCODE=urlqr;
        await findRessource.save();
    }
     return res.status(200).json({
        msg:'Your resource has been created successfully',
    });
    } catch (error) {
       return res.status(500).json({ errors: error, msg: error.message });
    }
}  


   module.exports.getRessource = async (req,res) => {
      RessourceSchema.find({}, function(err, ressources) {
         res.send(ressources);  
       });
   }


   module.exports.getRessourceId = async (req,res) => {
      
      try{
         const _id = req.params.id;
         const ressource = await RessourceSchema.findOne({_id});  

         return res.status(200).json({
            msg:'Ressource Trouvée',
            ressource
        });
      }catch(err){
         console.error(err);
      }
     
   }

    module.exports.DeleteRess = async (req,res) => {
      const { id } = req.params;
      RessourceSchema.findOneAndDelete({_id: id}, 
       (err, result) => {
       if (err) return res.send(500, err)
       return res.status(200).json({ message: " Ressource has been deleted " })
       });
   }


   
   module.exports.saveValiations = [
      body('CurrentAnomalie').not().isEmpty().withMessage('Anomalie is required'),
   ];

   
module.exports.Save = async (req,res) => {
   
    try{
      
    const { resId,CurrentAnomalie} = req.body;  

    const _id = resId;
    const findRessource = await RessourceSchema.findOne({ _id })    
    if (findRessource){
        findRessource.CurrentAnomalie = CurrentAnomalie.label;
        await findRessource.save();
    }
    return res.status(200).json({
       msg:'Your resource has been created successfully',
   });
   } catch (error) {
      return res.status(500).json({ errors: error, msg: error.message });
   }
}  



   
module.exports.deleteTicket = async (req,res) => {
   
   try{
     
      const _id = req.params.id;

      const findRessource = await RessourceSchema.findOne({ _id })    
      if (findRessource){
          findRessource.CurrentAnomalie ='';
          await findRessource.save();
      }
  
   return res.status(200).json({
      msg:'Your resource has been created successfully',
  });
  } catch (error) {
     return res.status(500).json({ errors: error, msg: error.message });
  }
}  



   





