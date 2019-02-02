const { Player } = require('../models/player');
const { pick } = require('lodash');


exports.addPlayer = async (req, res, next ) => {
    const data = pick(req.body, ['name', 'sureName', 'age', 'possition', 'email']);
    data.creator = req.user._id;

    const player = await (new Player(data).save());
    if(!player) return next({message: 'something went wrong', status: 400});
    return res.status(200).send(player);

}

exports.editPlayer = async (req, res, next) => {
    const data = pick(req.body, ['name', 'sureName', 'age', 'possition', 'email']);
    const player = await Player.findByIdAndUpdate({_id: req.body._id},{$set:data},{new: true});
    if(!player) return next({message: 'player not found', status :400 })
    res.status(200).send(player);
};

exports.getPlayers = async (req, res , next) => {
    const players = await Player.find().select('-__v -createdAt -updatedAt').populate('creator', 'userName -_id');
    if(!players) return next({message: "no Players to show", status:400});
    res.status(200).send(players);
}

exports.deletePlayer = async (req, res, next) => {
    const player = await Player.findByIdAndRemove(req.body._id);
    if(!player) return next({message: "no Players to delete", status:400});
    res.status(200).send(player);
}