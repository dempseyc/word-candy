import { FIRST65 } from "../../../blacklist";

const baseURL = "https://api.datamuse.com/words?";
const maxItems = "&max=5";

export default async function handler(req, res) {
   const queryParams = req.body;
   const word = req.query.word;
   const result = {[word]: {}};

   const fetchByParam = (word,param) => fetch(baseURL+param+'='+word+maxItems)

   const tasks = queryParams.map(queryParam => {
      return async function () {
         try {
            const response = await fetchByParam(word,queryParam);
            let jsonData = await response.json();
            // filter out common words
            jsonData = jsonData.filter(item => !FIRST65.includes(item.word));
            // filter out punctuation
            const isWordPattern = new RegExp(/[A-Za-z][a-z]*\-?[a-z]*/g);
            jsonData = jsonData.filter(item => isWordPattern.test(item.word));

            result[word][queryParam] = jsonData;
         } catch (err) {
            res.status(500).json({error: `failed to load ${queryParam},${res.query.word}`});
         }
      }()
   })

   await Promise.all(tasks);

   // console.log(JSON.stringify(result));
   res.status(200).json(result);

}
