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
import { getPetById } from '../controllers/getPets';

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

router.get('/pet/:id',
    getPetById);
router.get('/:id/:name', async (req, res) => {
    const user = await Users.findById(req.params.id);
    try {
        Pets.findOne({ name: req.params.name })
        res.render('success');
    } catch (error) {
        res.send(error);
    }
});

router.post('/:id', upload.single('file'), async (req: any, res, next) => {
    const user = await Users.findById(req.params.id);

    var obj = {
        name: req.body.name,
        animal: req.body.animal,
        race: req.body.race,
        age: req.body.age,
        sex: req.body.sex,
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
            res.redirect(`http://localhost:3000/pets`);
        }
    });
});

router.delete('/:id/:name', async (req: any, res, next) => {
    const user = await Users.findById(req.params.id);
    try {
        const Results = await Pets.findOneAndRemove({ name: req.params.name })
        console.log(Results)
        res.send('success');
    } catch (error) {
        res.send(error);
    }
});

router.put('/:id', async (req: any, res: any)=> {
    const id = req.params.id;
    const pet = req.body;

    const updatedPet = await Pets.findByIdAndUpdate(id, pet);

    res.status(200).send(updatedPet);
})

export default router;