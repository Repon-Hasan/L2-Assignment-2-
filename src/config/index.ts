import dotenv from 'dotenv'
import path from 'path'


dotenv.config({ path: path.join(process.cwd(), ".env") });

const config={
    PORT:process.env.PORT,
    connection_str:process.env.CONNECTION_STR,
    JWT_SECRET:process.env.JWT_SECRET
}

export default config