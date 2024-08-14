class Config{
    public webPort = 8080;
    public webHost = 'localhost';   

    //for mongoDB
    public connectionString = "mongodb://localhost:27017/bank"
}

const config = new Config();
export default config;