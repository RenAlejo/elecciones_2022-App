

const votosPut = (req,res) => {
    res.json({
        msg:"put API"
    });
}


const votosPost = (req,res) => {
    res.json({
        msg:"post API"
    });
}

module.exports = {
    votosPut,
    votosPost
}