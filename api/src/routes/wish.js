const router = require('express').Router()
const mongoose = require('mongoose')

const Schema = mongoose.Schema
let ChildWish = mongoose.Schema({
  firstName: String,
  age: String,
  homeTown: String,
  wishType: String,
  gender: String,
  wishDate: String,
  illness: String,
  wishDetail: String,
  orgId: String,
  userId: String,
  audio: Object,
  video: Object,
  photo: Object
})

let Wish = mongoose.model('Wish', ChildWish, 'wish')

router.post('/create', function(req, res, next) {
  console.log('creating wish')
  const { age, firstName, homeTown, wishType, gender, wishDate, illness, wishDetail, orgId, userId, audio, photo, video } = req.body
  let newWish = new Wish({
    firstName: firstName,
    age: age,
    homeTown: homeTown,
    wishType: wishType,
    gender: gender,
    wishDate: wishDate,
    illness: illness,
    wishDetail: wishDetail,
    orgId: orgId,
    userId: userId,
    audio: audio,
    video: video,
    photo: photo
  })
  newWish.save()
    .then(data => {
      console.log('creating')
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while creating the wish."
  });
  });
})

router.get('/findAll', function(req, res, next) {
  console.log('fetching wishes')
  Wish.find()
    .then(wishes => {
      res.send(wishes);
    }).catch( err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes"
      });
  });
})


router.get('/findOneById/:id', function(req, res) {
  console.log('finding one by ID', req.params.id)
  let id = req.params.id;
  Wish.findById ({_id: id })
    .then(wish => {
      if(!wish) {
        return res.status(404).send({
          message: "wish not found with id " + req.params.id
        });
      }
      res.send(wish);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "wish not found with id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error retrieving wish with id " + req.params.id
    });
  });
});

router.delete('/delete/:id', function(req, res) {
  console.log('Deleting a wish by Id');
  let id = req.params.id;
  Wish.findOneAndRemove({_id: id})
    .then(wish => {
      if(!wish) {
        return res.status(404).send({
          message: "wish not found with id " + req.params.id
        });
      }
      res.send({message: "Wish successfully deleted"})
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Note not found with id " + req.params._ic
      });
    }
    return res.status(500).send({
      message: "Error deleting wish with id " + req.params._id
    });
  })
})

router.put('/update/', function(req, res) {
  console.log('Updating a wish');
  console.log(req.body)
  if (!req.body) {
    return res.status(400).send({
      message: "Wish content can not be empty"
    });
  }

router.put('/update/', function(req, res, next) {
  console.log('updating', req.params.id)
  Wish.findOneAndUpdate(req.body).then(function(wish) {
      res.status(201).send(wish);
  }).catch( function(err) {
      res.status(400).send({
        message: "Error updating the wish with id: " + id
      })
  })
})


module.exports = router
