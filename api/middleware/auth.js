import tokenService from '../services/token'

export async function checkToken(req, res, next) {
    console.log('checkToken', req.headers.token)
    if (!req.headers.token){
        return res.status(404).send({
            message: 'No token'
        });
    }
    const response = await tokenService.decode(req.headers.token);

    return res.status(200).send({
        message: 'call api success'
    });
}
