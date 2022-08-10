export default function (req,res) {
    res.status(200).json({words: [{word: "start typing"}]});
}