import { Router } from 'express';
import {
    getEventsByRole,
    getCalendarEventsByDay,
    cancelEvent,
    removeAlert,
    giveReview,
} from '../controllers/getEvents';
import Pets from "../models/Pets";
import Users from "../models/Users";
import fs from 'fs';
import path from 'path';

const router = Router();

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.get('/:id', (req, res) => {
    Pets.find({ user: req.params.id }, (err: any, items: any) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        }
        else {
            res.send({ items: items });
        }
    });
});

router.post('/:id', upload.single('file'), async (req: any, res, next) => {
    const user = await Users.findById(req.params.id);

    var obj = {
        name: req.body.name,
        race: req.body.race,
        age: req.body.age,
        animal: req.body.animal,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        user: user
    }

    Pets.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect(`http://localhost:3000/perfil/Mascotas`);
        }
    });
});

router.delete('/:id/:name', async (req: any, res, next) => {
    const user = await Users.findById(req.params.id);
    try {
        Pets.findOneAndDelete({name: req.params.name})
        res.send('success');
    } catch (error) {
        res.send(error);
    }
})

export default router;