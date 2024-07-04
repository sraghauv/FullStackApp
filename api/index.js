const express = require('express');
const cors = require('cors');
const { default: mongoose, mongo } = require('mongoose');
const bycrpt = require('bcryptjs');
const User = require('./models/User.js');
const Booking = require('./models/Booking.js')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Place = require('./models/Place.js');
const Review = require('./models/Review.js');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const fs = require('fs');
const mime = require('mime-types');

require('dotenv').config();

const app = express();
let filters = {};


const bycrptSalt = bycrpt.genSaltSync(10);
const jwtSecret = 'bruhhhhhhh'
const bucket = 'raghauv-booking-app'

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));



async function uploadToS3(path, originalFilename, mimetype) {
    const client = new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY ,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        },
    })
    const parts = originalFilename.split('.');
    const ext = parts[parts.length-1];
    const newFilename = Date.now() + '.' + ext;
    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFilename, 
        ContentType: mimetype,
        ACL: 'public-read',
    }));
    const url = 'https://' + bucket + '.s3.amazonaws.com/' + newFilename;
    return url;
}




function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);

        });
    });
}

app.get('/api/test', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok')
});

app.post('/api/register', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bycrpt.hashSync(password, bycrptSalt),

        })
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
})

app.post('/api/login', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email: email })
    if (userDoc) {
        const passOk = bycrpt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
                name: userDoc
            },
                jwtSecret, {}, (err, token) => {
                    if (err) {
                        console.error('JWT Signigng Error:', err);
                        return res.status(444).json({ error: 'Unauthorized' });
                    }
                    res.cookie('token', token).json(userDoc);
                })
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
       
        res.json(null);;
    }
})

app.get('/api/profile', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                console.error('JWT Verification Error:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const { name, email, favorites, _id } = await User.findById(userData.id);
            res.json({ name, email, favorites , _id});

        })

    } else {
        res.json(null);
    }

})

app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/api/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    try {
        await imageDownloader.image({
            url: link,
            dest: '/tmp/' + newName
        })
    } catch {
            res.json('');
    }
    const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName))
   
    res.json(url);

})


const photosMiddleware = multer({dest: '/tmp'});

app.post('/api/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname, mimetype } = req.files[i];
        uploadedFiles.push(await uploadToS3(path, originalname, mimetype));
    }
    
    res.json(uploadedFiles);
})

app.post('/api/places', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    const {
        title, address, region,
        addedPhotos, description,
        perks, extraInfo, bedrooms, bathrooms, checkIn,
        checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const placeDoc = await Place.create({
                owner: userData.id,
                name: userData.name.name,
                title: title,
                address: address,
                region: region,
                photos: addedPhotos,
                description: description,
                perks: perks,
                extraInfo: extraInfo,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                checkIn: checkIn,
                checkOut: checkOut,
                maxGuests: maxGuests,
                price: price,
                rating: [],
                averageRating: 0
            });

            res.json(placeDoc);
        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});


app.get('/api/user-places', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => { 
        const {id} = userData;
        res.json(await Place.find({owner:id}));
    });
})

app.get('/api/places/:id', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    res.json(await Place.findById(id));
})

app.put('/api/places', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    
    const {id,
        title, address, region,
        addedPhotos, description,
        perks, extraInfo, bedrooms, bathrooms, checkIn,
        checkOut, maxGuests, price
    } = req.body;
    
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        
        if(userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
    
                title: title,
                address: address,
                region: region,
                photos: addedPhotos,
                description: description,
                perks: perks,
                extraInfo: extraInfo,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                checkIn: checkIn,
                checkOut: checkOut,
                maxGuests: maxGuests,
                price: price,
            })
            await placeDoc.save();
            res.json('ok');
        }
    });


});



app.post('/api/booking', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price, user: userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    })



})



app.get('/api/booking', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({user:userData.id}).populate('place'))
})

async function updateReview(bookingId, placeId, userData) {
    mongoose.connect(process.env.MONGO_URL);
    const reviews = await Review.find({place: placeId})
    let allReviews = [];
    let total = 0;
    reviews.map(review => {
        allReviews.push(review.rating);
        total = total + review.rating;
    })
    const average = total / reviews.length
  
    const placeDoc = await Place.findById(placeId);
    placeDoc.set({
        rating: allReviews,
        averageRating: average
    })
    
    await placeDoc.save();
}

app.post('/api/review', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    const {placeId, bookingId, comment, rating, name} = req.body;
    const reviewDoc = await Review.create({
        place: placeId, user: userData.id, booking: bookingId, comment: comment, rating: rating, name: name
    })
    const placeDoc = await Place.findById(placeId);
    await placeDoc.save();
    updateReview(bookingId, placeId, userData);
    res.json(reviewDoc);
   
})

app.get('/api/reviews/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { id } = req.params;
    res.json(await Review.find({ place: id}))
})

app.get('/api/review/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    const {id} = req.params;
    res.json(await Review.find({booking: id, user: userData.id}));
})

app.put('/api/review', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    const { placeId, bookingId, comment, rating, name, reviewId } = req.body;
    const reviewDoc = await Review.findById(reviewId);
  
    reviewDoc.set({
        place: placeId, 
        user: userData.id, 
        booking: bookingId, 
        comment: comment, 
        rating: rating, 
        name: name
    })
    await reviewDoc.save();
    updateReview(bookingId, placeId, userData);
    res.json('ok');

})

app.delete('/api/booking/:id', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
  
    res.json(await Booking.findByIdAndDelete(id))
})

app.put('/api/addFavorites', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    const userDoc = await User.findById(userData.id);
   
    const {placeId} = req.body
    userDoc.favorites.push(placeId);
    await userDoc.save();
    res.json(userDoc.favorites);
})

app.put('/api/removeFavorites', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    const userDoc = await User.findById(userData.id);
    const {placeId} = req.body   
    userDoc.favorites = userDoc.favorites.filter((id => id !== placeId));
    await userDoc.save();
    res.json(userDoc.favorites);
})

app.get('/api/favorites', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);

    const userDoc = await User.findById(userData.id);
    res.json(userDoc.favorites);

})



app.post('/api/filters', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { location, guests } = req.body;
     filters = {};
    
    if (location !== 'Anywhere') {
        filters.region = location
    }
   
    if (guests) {
        filters.maxGuests = { $gte: guests };
    }

    res.json(filters);
    
})



app.get('/api/places', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json(await Place.find(filters))
    
    
})

app.get('/api/filters', (req, res) => {
    res.json(filters);
   
})




app.listen(4000);
