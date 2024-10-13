export default async function handler(req, res) {
    try {
        res.setHeader('Set-Cookie', [
            `ACCESS_TOKEN=; Max-Age=0; Path=/; HttpOnly; Secure`,
            `REFRESH_TOKEN=; Max-Age=0; Path=/; HttpOnly; Secure`,
            `X-fnb=; Max-Age=0; Secure; Path=/`
        ]);
        return res.status(200).json({ message: 'OK' })
    } catch (error) {
        return res.status(401).json(error)
    }
}
