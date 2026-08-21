import mongoose from "mongoose";
import plm from "passport-local-mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/FOODDELIVERYAPP");

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
    },
    // name:{
    //     type:String,
    //     required:true,
    // },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    secret:{
        type:String,
    }, 
    cartData: {
        type: Object,
        default: {},
    }
}, { minimize: false });

userSchema.plugin(plm); 
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
