export default function (req,res) {
    res.status(200).json({initial: { default:[{word: "start typing"}] } });
}