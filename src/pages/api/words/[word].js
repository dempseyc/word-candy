
const baseURL = "https://api.datamuse.com/words?";
const queryType = "ml=";
const maxItems = "&max=5";

export default async function handler(req, res) {
   try {
      const resData = await fetch(baseURL+queryType+req.query.word+maxItems);
      const jsonData = await resData.json();
      res.status(200).json({words: jsonData});
   } catch (err) {
      res.status(500).json({error: 'failed to load'});
   }
}
