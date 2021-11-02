const { response } = require("express");
const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "banco",

});

app.use(express.json());



app.post("/register", (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const nomecompleto = req.body.pnomecompleto;
    const cpf = req.body.cpf;
    app.use(cors());
    const bcrypt = require("bcrypt")
    const saltRounds = 10;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], 
    (err, res) => {
        if(err) {
            res.send(err);
        }
        if(Result.length ==0){
            bcrypt.hash(password, saltRounds, (err, hash) =>{
                db.query("INSERT INTO usuarios (email, password, cpf, nomecompleto) VALUES (?, ?, ?, ?)", 
                [email, hash], 
                (err, response) =>{
                if(err){
                    res.send(err);
                }    
     
                res.send({msg: "Cadastrado com sucesso"});
             });
            }) 
           
           
        }else{
            res.send({
                msg: "Usuário já cadastrado"
            });
        };
    });
});

app.post("/login", (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?",  
    [email], (err, result)=>{
        if(err){
        res.send(err);
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (erro, response) =>{
                if(result){
                    res.send("Usuário logado com sucesso");
                }else{
                    res.send("Senha está incorreta")
                };
                
            })
            
        }else{
            res.send({msg:"Email não encontrado"})
        }

    });
});


app.listen(3001, () =>{
    console.log("rodando na porta 3001")
});
