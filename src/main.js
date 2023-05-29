import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import { register, login, getMe,getAllUsers,deleteOne , update} from './controllers/userController.js';




const MONGO_URL = 'mongodb+srv://pechkoaleks:kMBCbcWIXBe3MiaJ@datacloud.w2wnoou.mongodb.net/webApp?retryWrites=true&w=majority';

mongoose
    .connect(MONGO_URL)
    .then(() => console.log('DB OK'))
    .catch((error) => console.log('DB error', error));

const app = express();


app.use(express.json());
app.use(cors());


app.post('/auth/login', loginValidation, login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);
app.get('/auth/table', getAllUsers);
app.delete('/auth/table/:id', checkAuth, deleteOne);
app.patch('/auth/table/:id', update)

app.listen(4444, () => {
    return console.log('Server OK');
})