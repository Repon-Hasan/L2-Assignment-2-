import app from "./app"
import config from "./config"


app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})
