import express from "express"
import { getThought } from "./data_service"

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/thought', (req, res) => {

  const thought_id = req.query.id as string;
  const user_id = req.query.user_id as string;

  const thought = getThought(thought_id, user_id).then((result) => {

    console.log(result);

    if (result.success) {
      res.send(result.thought);
    } else {
      res.send("Error");
    }

  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});