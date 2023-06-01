import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import { register, login, getMe,getAllUsers,deleteOne , update} from './controllers/userController.js';


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB OK'))
    .catch((error) => console.log('DB error', error));

const app = express();

app.use(history({
    verbose: true
  }))
app.use(express.json());
app.use(express.static('.'))
app.use(cors());


app.post('/auth/login', loginValidation, login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);
app.get('/auth/table', getAllUsers);
app.delete('/auth/table/:id', checkAuth, deleteOne);
app.patch('/auth/table/:id', update)

app.listen(process.env.PORT||4444, () => {
    return console.log('Server OK');
})