export default function (req,res) {
    res.status(200).json({words: { default:[{word: "start typing"}] } });
}